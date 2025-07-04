import { createPortal } from 'react-dom';
import { Channel as ChannelType } from 'stream-chat';
import {
  Channel,
  DefaultStreamChatGenerics,
  MessageInput,
  MessageList,
  Window,
} from 'stream-chat-react';
import { DateSeparator } from './date-separator';
import ChannelLoading from './channel-loading';
import { ChannelMessage } from './channel-message';
import { InputContainer } from './input-container';
import { SidebarThread } from './sidebar-thread';

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
