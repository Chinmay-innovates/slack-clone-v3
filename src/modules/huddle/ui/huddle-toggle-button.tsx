import clsx from 'clsx';
import { isEqual } from 'lodash';
import { useCallback, useContext } from 'react';
import {
  Call,
  CallingState,
  OwnCapability,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';

import { AppContext } from '@/app/client/layout';
import { CaretDown, Headphones } from '@/components/icons';

interface HuddleToggleButton {
  currentCall: Call | undefined;
}

export const HuddleToggleButton = ({ currentCall }: HuddleToggleButton) => {
  const { user } = useUser();
  const { workspace, channel, setChannelCall } = useContext(AppContext);
  const call = useCall();
  const { useCallCallingState, useParticipantCount } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();

  const callActive = callingState === CallingState.JOINED;
  const callAvailable = participantCount > 0 && callingState !== CallingState.JOINED;

  const leaveCall = useCallback(async (call: Call) => {
    const canEndCall = call?.permissionsContext.hasPermission(OwnCapability.END_CALL);
    if (canEndCall) {
      await call?.endCall();
    } else {
      await call?.leave();
    }
  }, []);

  const createCall = useCallback(async () => {
    try {
      if (currentCall && currentCall.state.callingState === CallingState.JOINED) {
        await leaveCall(currentCall);
      }

      const currentMembers = workspace?.memberships.map((m) => ({
        user_id: m.userId,
        role: m.role!,
      }));

      const customData = {
        channelId: channel?.id,
        channelName: channel?.name,
        createdBy: user?.fullName,
        createdByUserImage: user?.imageUrl,
      };

      if (call?.permissionsContext.hasPermission(OwnCapability.UPDATE_CALL)) {
        if (!isEqual(call?.state.custom, customData)) {
          await call?.update({
            custom: customData,
          });
        }

        if (!isEqual(call?.state.members, currentMembers)) {
          await call?.updateCallMembers({
            update_members: currentMembers,
          });
        }
      }

      await call?.getOrCreate({
        ring: true,
        data: {
          custom: customData,
          members: currentMembers,
        },
      });

      await call?.join();
      setChannelCall(call!);
    } catch (error) {
      console.error(error);
    }
  }, [channel, call, setChannelCall, currentCall, leaveCall, user, workspace?.memberships]);

  const toggleCall = useCallback(async () => {
    if (callActive) {
      await leaveCall(call!);
    } else {
      await createCall();
    }
  }, [call, callActive, createCall, leaveCall]);

  return (
    <div
      className={clsx(
        'w-[59px] hidden sm:flex items-center ml-2 rounded-lg h-7 border border-[#797c814d] text-[#e8e8e8b3]',
        callActive && 'bg-[#259b69] border-[#259b69]',
        callAvailable && 'bg-[#063225] border-[#00553d]',
      )}
    >
      <button
        onClick={toggleCall}
        className={clsx(
          'px-2 h-[26px] rounded-l-lg',
          callActive && 'hover:bg-[#259b69]',
          callAvailable && 'hover:bg-[#10392d]',
          !callActive && !callAvailable && 'hover:bg-[#25272b]',
        )}
      >
        <Headphones color={callActive || callAvailable ? 'var(--primary)' : 'var(--icon-gray)'} />
      </button>
      <div
        className={clsx(
          'h-5 w-[1px] bg-[#797c814d]',
          callActive && 'bg-white',
          callAvailable && 'bg-[#00553d]',
        )}
      />
      <button
        className={clsx(
          'w-5 h-[26px] rounded-r-lg',
          callActive && 'hover:bg-[#259b69]',
          callAvailable && 'hover:bg-[#10392d]',
          !callActive && !callAvailable && 'hover:bg-[#25272b]',
        )}
      >
        <CaretDown color={callActive || callAvailable ? 'var(--primary)' : 'var(--icon-gray)'} />
      </button>
    </div>
  );
};
