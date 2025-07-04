import { Loader2Icon } from 'lucide-react';
import { FC, ReactNode } from 'react';
import { AddReaction, Bookmark, MoreVert, Share, Threads } from './icons';
import EmojiPicker from './emoji-picker';
import { StreamMessage } from 'stream-chat-react';

interface ActionButtonsProps {
  onCancel: () => void;
  loading: boolean;
  onSubmitLabel?: string;
  submittingLabel?: string;
  showIcon?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
}

export const ActionButtons: FC<ActionButtonsProps> = ({
  onCancel,
  loading,
  onSubmitLabel = 'Submit',
  submittingLabel = 'Submitting...',
  showIcon = false,
  disabled = false,
  icon,
}) => {
  return (
    <div className="flex gap-3 pt-4 border-t border-gray-700/50">
      <button
        type="button"
        onClick={onCancel}
        disabled={loading}
        className="flex-1 h-10 px-4 text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg border border-gray-700 transition-colors duration-200"
      >
        Cancel
      </button>

      <button
        type="submit"
        disabled={loading || disabled}
        className="flex-1 h-10 px-4 text-sm font-medium text-white bg-[#00553d] border-[#00553d]
        hover:shadow-[0_1px_4px_#0000004d] hover:bg-blend-lighten hover:bg-[linear-gradient(#d8f5e914,#d8f5e914)] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2Icon className="size-4 animate-spin" />
            {submittingLabel}
          </>
        ) : (
          <>
            {showIcon && icon}
            {onSubmitLabel}
          </>
        )}
      </button>
    </div>
  );
};

interface MessageActionButtonsProps {
  handleReaction: (emoji: string) => void;
  openThread: (message: StreamMessage) => void;
  message: StreamMessage;
}
export const MessageActionButtons: FC<MessageActionButtonsProps> = ({
  handleReaction,
  openThread,
  message,
}) => {
  return (
    <div className="z-20 hidden group-hover/message:inline-flex absolute -top-4 right-[38px]">
      <div className="flex p-0.5 rounded-md ml-2 bg-[#1A1D21] border border-[#797C814D]">
        <EmojiPicker
          ButtonIconComponent={AddReaction}
          wrapperClassName="group/button relative rounded flex w-8 h-8 items-center justify-center hover:bg-[#D1D2D30b]"
          buttonClassName="fill-[#E8E8E8B3] group-hover/button:fill-channel-gray"
          onEmojiSelect={(e) => handleReaction(e.native)}
        />
        <button
          onClick={() => openThread(message)}
          className="group/button flex w-8 h-8 items-center justify-center hover:bg-[#D1D2D30b] rounded-md"
        >
          <Threads className="fill-[#E8E8E8B3] group-hover/button:fill-channel-gray" />
        </button>
        <button className="group/button rounded flex w-8 h-8 items-center justify-center hover:bg-[#D1D2D30b]">
          <Share className="fill-[#E8E8E8B3] group-hover/button:fill-channel-gray" />
        </button>
        <button className="group/button rounded flex w-8 h-8 items-center justify-center hover:bg-[#D1D2D30b]">
          <Bookmark size={18} className="fill-[#E8E8E8B3] group-hover/button:fill-channel-gray" />
        </button>
        <button className="group/button rounded flex w-8 h-8 items-center justify-center hover:bg-[#D1D2D30b]">
          <MoreVert size={18} className="fill-[#E8E8E8B3] group-hover/button:fill-channel-gray" />
        </button>
      </div>
    </div>
  );
};
