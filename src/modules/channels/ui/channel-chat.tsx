import { createPortal } from 'react-dom';
import { Channel as ChannelType } from 'stream-chat';
import {
  Channel,
  DefaultStreamChatGenerics,
  MessageInput,
  MessageList,
  Window,
} from 'stream-chat-react';

import { DateSeparator } from '@/components/date-separator';
import { InputContainer } from '@/components/input-container';

import ChannelLoading from '@/modules/channels/ui/channel-loading';
import { SidebarThread } from '@/modules/sidebar/ui/sidebar-thread';
import { ChannelMessage } from '@/modules/channels/ui/channel-message';

interface ChannelChatProps {
  channel: ChannelType<DefaultStreamChatGenerics>;
}

export function ChannelChat({ channel }: ChannelChatProps) {
  const inputContainer = document.getElementById('message-input');

  return (
    <div className="w-full h-full">
      <Channel LoadingIndicator={ChannelLoading} channel={channel} DateSeparator={DateSeparator}>
        <Window>
          <MessageList Message={ChannelMessage} />
          {inputContainer && createPortal(<MessageInput Input={InputContainer} />, inputContainer)}
        </Window>

        <SidebarThread />
      </Channel>
    </div>
  );
}
