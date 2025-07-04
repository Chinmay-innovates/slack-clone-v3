'use client';

import { Thread, useChannelStateContext, useChannelActionContext } from 'stream-chat-react';
import { useEffect, useRef } from 'react';
import { X, MessageSquare } from 'lucide-react';

export const SidebarThread = () => {
  const { thread } = useChannelStateContext();
  const { closeThread } = useChannelActionContext();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (thread) {
      setTimeout(() => closeButtonRef.current?.focus(), 10);
    }
  }, [thread]);

  const handleClose = () => {
    closeThread();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  if (!thread) return null;

  return (
    <div
      className="custom-thread-wrapper w-[500px] h-full mr-7 border-l border-gray-800 bg-gray-900 flex flex-col shadow-2xl"
      role="complementary"
      aria-label="Thread details"
      onKeyDown={handleKeyDown}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-semibold text-white">Thread</h2>
        </div>
        <button
          ref={closeButtonRef}
          onClick={handleClose}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200 text-gray-400 hover:text-white"
          aria-label="Close thread"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Thread Content */}
      <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        <Thread />
      </div>
    </div>
  );
};
