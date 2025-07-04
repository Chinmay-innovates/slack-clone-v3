import { useMemo } from 'react';
import { useUser } from '@clerk/nextjs';
import {
  MessageText,
  renderText,
  useChannelActionContext,
  useChannelStateContext,
  useMessageContext,
} from 'stream-chat-react';
import clsx from 'clsx';
import emojiData from '@emoji-mart/data';

import { Avatar } from '@/components/ui/avatar';
import EmojiPicker from '@/components/emoji-picker';
import { MessageActionButtons } from '@/components/action-buttons';
import { AddReaction, Download, MoreVert, Share, Threads } from '@/components/icons';

export const ChannelMessage = () => {
  const { message } = useMessageContext();
  const { channel } = useChannelStateContext('ChannelMessage');
  const { user } = useUser();

  const reactionCounts = useMemo(() => {
    if (!message.reaction_groups) {
      return [];
    }
    return Object.entries(
      Object.entries(message.reaction_groups!)
        ?.sort(
          (a, b) =>
            new Date(a[1].first_reaction_at!).getTime() -
            new Date(b[1].first_reaction_at!).getTime(),
        )
        .reduce((acc, entry) => {
          const [type, event] = entry;
          acc[type] = acc[type] || { count: 0, reacted: false };
          acc[type].count = event.count;
          if (
            message.own_reactions?.some(
              (reaction) => reaction.type === type && reaction.user_id === user!.id,
            )
          ) {
            acc[type].reacted = true;
          }
          return acc;
        }, {} as Record<string, { count: number; reacted: boolean }>),
    );
  }, [message.reaction_groups, message.own_reactions, user]);

  const createdAt = new Date(message.created_at!).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const downloadFile = async (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop()!;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReaction = async (e: { id: string; native?: string }) => {
    await channel.sendReaction(message.id, { type: e.id });
  };

  const removeReaction = async (reactionType: string) => {
    await channel.deleteReaction(message.id, reactionType);
  };

  const handleReactionClick = async (reactionType: string, isActive: boolean) => {
    if (isActive) {
      removeReaction(reactionType);
    } else {
      handleReaction({ id: reactionType });
    }
  };

  const getReactionEmoji = (reactionType: string) => {
    const data = emojiData as {
      emojis: {
        [key: string]: { skins: { native: string }[] };
      };
    };
    const emoji = data.emojis[reactionType];
    if (emoji) return emoji.skins[0].native;
    return null;
  };
  const { openThread } = useChannelActionContext();
  const hasReplies = (message.reply_count ?? 0) > 0;

  return (
    <div className="relative flex py-2 pl-5 pr-10 group/message hover:bg-[#22252a]">
      {/* Image */}
      <div className="flex shrink-0 mr-2">
        <span className="w-fit h-fit inline-flex">
          <button className="w-9 h-9 shrink-0 inline-block">
            <span className="w-full h-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={message.user?.image}
                alt="profile-image"
                className="w-full h-full rounded-lg"
              />
            </span>
          </button>
        </span>
      </div>
      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="cursor-pointer text-[15px] leading-[1.46668] font-[900] text-white hover:underline">
            {message.user?.name}
          </span>
          <span className="pt-1 cursor-pointer text-xs leading-[1.46668] text-[#ABABAD] hover:underline">
            {createdAt}
          </span>
        </div>
        <div className="mb-1">
          <div className="w-full">
            <div className="flex flex-col max-w-[245px] sm:max-w-full">
              <MessageText
                renderText={(text, mentionedUsers) =>
                  renderText(text, mentionedUsers, {
                    customMarkDownRenderers: {
                      br: () => <span className="paragraph_break block h-2" />,
                    },
                  })
                }
              />
              <div
                className={clsx(
                  message.attachments && message.attachments.length > 0 ? 'flex' : 'hidden',
                  'mt-3 flex-col gap-2',
                )}
              >
                {message.attachments?.map((attachment) => (
                  <div
                    key={attachment.image_url || attachment.asset_url || attachment.asset_url}
                    className={clsx(
                      'group/attachment relative cursor-pointer flex items-center rounded-xl gap-3 border border-[#d6d6d621] bg-[#1A1D21]',
                      attachment?.image_url && !attachment.asset_url
                        ? 'max-w-[360px] p-0'
                        : 'max-w-[426px] p-3',
                    )}
                  >
                    {attachment.asset_url && (
                      <>
                        <Avatar
                          width={32}
                          borderRadius={8}
                          data={{
                            name: attachment!.title!,
                            image: attachment!.image_url!,
                          }}
                        />
                        <div className="flex flex-col gap-0.5">
                          <p className="text-sm text-[#D1D2D3] break-all whitespace-break-spaces line-clamp-1 mr-2">
                            {attachment.title || `attachment`}
                          </p>
                          <p className="text-[13px] text-[#ABABAD] break-all whitespace-break-spaces line-clamp-1">
                            {attachment.type}
                          </p>
                        </div>
                      </>
                    )}
                    {attachment.image_url && !attachment.asset_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={attachment.image_url}
                        alt="attachment"
                        className="w-full max-h-[358px] aspect-auto rounded-lg"
                      />
                    )}
                    {/* Message Actions */}
                    <div className="z-20 hidden group-hover/attachment:inline-flex absolute top-2 right-2">
                      <div className="flex p-0.5 rounded-md ml-2 bg-[#1A1D21] border border-[#797C814D]">
                        <button
                          onClick={() =>
                            downloadFile(attachment.asset_url! || attachment.image_url!)
                          }
                          className="group/button rounded flex w-8 h-8 items-center justify-center hover:bg-[#D1D2D30b]"
                        >
                          <Download className="fill-[#E8E8E8B3] group-hover/button:fill-channel-gray" />
                        </button>
                        <button className="group/button rounded flex w-8 h-8 items-center justify-center hover:bg-[#D1D2D30b]">
                          <Share className="fill-[#E8E8E8B3] group-hover/button:fill-channel-gray" />
                        </button>
                        <button className="group/button rounded flex w-8 h-8 items-center justify-center hover:bg-[#D1D2D30b]">
                          <MoreVert
                            size={18}
                            className="fill-[#E8E8E8B3] group-hover/button:fill-channel-gray"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {reactionCounts.length > 0 && (
                <div className="flex items-center gap-1 flex-wrap mt-2">
                  {reactionCounts.map(([reactionType, data], index) => (
                    <button
                      key={index}
                      onClick={() => handleReactionClick(reactionType, data.reacted)}
                      className={`px-2 mb-1 h-6 flex items-center gap-1 border text-white text-[11.8px] rounded-full transition-colors ${
                        data.reacted
                          ? 'bg-[#004D76] border-[#004D76]'
                          : 'bg-[#F8F8F80F] border-[#F8F8F80F]'
                      }`}
                    >
                      <span className="emoji text-[14.5px]">{getReactionEmoji(reactionType)}</span>{' '}
                      {data.count}
                    </button>
                  ))}
                  <EmojiPicker
                    ButtonIconComponent={AddReaction}
                    wrapperClassName="group/button relative mb-1 rounded-full bg-[#F8F8F80F] flex w-8 h-6 items-center justify-center hover:bg-[#D1D2D30b]"
                    buttonClassName="fill-[#E8E8E8B3] group-hover/button:fill-channel-gray"
                    onEmojiSelect={handleReaction}
                  />
                </div>
              )}
              {hasReplies && (
                <button
                  onClick={() => openThread(message)}
                  className="flex items-center gap-1 text-sm text-[#ABABAD] hover:underline mt-1"
                >
                  <Threads className="w-4 h-4 fill-[#ABABAD]" />
                  {message.reply_count} {message.reply_count === 1 ? 'reply' : 'replies'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Message Actions */}
      <MessageActionButtons
        handleReaction={(emoji: string) => handleReaction({ id: emoji })}
        openThread={openThread}
        message={message}
      />
    </div>
  );
};
