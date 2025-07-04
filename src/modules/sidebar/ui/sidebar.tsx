'use client';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { ChannelList } from 'stream-chat-react';
import clsx from 'clsx';

import { AppContext } from '@/app/client/layout';

import { ArrowDropdown, CaretDown, Compose, Plus, Refine, Send, Threads } from '@/components/icons';

import { IconButton } from '@/components/ui/icon-button';
import { SidebarButton } from '@/modules/sidebar/ui/sibebar-button';
import { ChannelPreview } from '@/modules/channels/ui/channel-preview';
import { AddChannelModal } from '@/modules/channels/ui/add-channel-modal';
import { EditWorkspaceModal } from '@/modules/workspace/ui/edit-workspace-modal';

const [minWidth, defaultWidth] = [215, 275];

type SidebarProps = {
  layoutWidth: number;
};

export const Sidebar = ({ layoutWidth }: SidebarProps) => {
  const { user } = useUser();
  const { loading, workspace } = useContext(AppContext);

  const [width, setWidth] = useState<number>(() => {
    const savedWidth =
      parseInt(window.localStorage.getItem('sidebarWidth') as string) || defaultWidth;
    window.localStorage.setItem('sidebarWidth', String(savedWidth));
    return savedWidth;
  });
  const maxWidth = useMemo(() => layoutWidth - 374, [layoutWidth]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const isDragged = useRef(false);

  useEffect(() => {
    if (!layoutWidth) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragged.current) {
        return;
      }
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';
      document.querySelectorAll('.sidebar-btn').forEach((el) => {
        el.setAttribute('style', 'cursor: col-resize');
      });
      setWidth((previousWidth) => {
        const newWidth = previousWidth + e.movementX / 1.3;
        if (newWidth < minWidth) {
          return minWidth;
        } else if (newWidth > maxWidth) {
          return maxWidth;
        }
        return newWidth;
      });
    };

    const onMouseUp = () => {
      document.body.style.userSelect = 'auto';
      document.body.style.cursor = 'auto';
      document.querySelectorAll('.sidebar-btn').forEach((el) => {
        el.removeAttribute('style');
      });
      isDragged.current = false;
    };

    window.removeEventListener('mousemove', onMouseMove);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', () => onMouseUp);
    };
  }, [layoutWidth, maxWidth]);

  useEffect(() => {
    if (!layoutWidth || layoutWidth < 0) return;

    if (width) {
      let newWidth = width;
      if (width > maxWidth) {
        newWidth = maxWidth;
      }
      setWidth(newWidth);
      localStorage.setItem('sidebarWidth', String(width));
    }
  }, [width, layoutWidth, maxWidth]);

  const openCreateChannelModal = () => {
    setIsModalOpen(true);
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const isWorkspaceOwner = workspace?.ownerId === user?.id;

  return (
    <div
      id="sidebar"
      style={{ width: `${width}px` }}
      className={clsx(
        'hidden relative px-2 sm:flex flex-col flex-shrink-0 gap-3 min-w-0 min-h-0 max-h-[calc(100svh-44px)] bg-[#10121499] border-r-[1px] border-solid',
        loading ? 'border-r-transparent' : 'border-r-[#797C814D]',
      )}
    >
      {!loading && (
        <>
          <div className="pl-1 w-full h-[49px] flex items-center justify-between">
            <div className="max-w-[calc(100%-80px)]">
              <button
                onClick={() => setEditing(true)}
                className="w-fit max-w-full rounded-md py-[3px] px-2 flex items-center text-white hover:bg-hover-gray"
              >
                <span className="truncate text-[18px] font-[900] leading-[1.33334]">
                  {workspace.name}
                </span>
                <div className="flex-shrink-0 ml-1">
                  <CaretDown size={18} color="var(--primary)" />
                </div>
              </button>
              {isWorkspaceOwner && (
                <EditWorkspaceModal open={editing} onClose={() => setEditing(false)} />
              )}
            </div>
            <div className="flex">
              <IconButton
                icon={<Refine className="fill-icon-gray group-hover:fill-white" />}
                className="w-9 h-9 hover:bg-hover-gray"
              />
              <IconButton
                icon={<Compose className="fill-icon-gray group-hover:fill-white" />}
                className="w-9 h-9 hover:bg-hover-gray"
              />
            </div>
          </div>
          <div className="w-full flex flex-col">
            <SidebarButton icon={Threads} iconSize="lg" title="Threads" />
            <SidebarButton icon={Send} iconSize="lg" title="Drafts & sent" />
          </div>
          <div className="w-full flex flex-col">
            <div className="h-7 -ml-1.5 flex items-center px-4 text-[15px] leading-7">
              <button className="hover:bg-hover-gray rounded-md">
                <ArrowDropdown color="var(--icon-gray)" />
              </button>
              <button className="flex px-[5px] max-w-full rounded-md text-sidebar-gray font-medium hover:bg-hover-gray">
                Channels
              </button>
            </div>
            <ChannelList
              filters={{ workspaceId: workspace.id }}
              Preview={ChannelPreview}
              sort={{
                created_at: 1,
              }}
              LoadingIndicator={() => null}
              lockChannelOrder
            />
            {isWorkspaceOwner && (
              <SidebarButton icon={Plus} title="Add a channel" onClick={openCreateChannelModal} />
            )}
          </div>
          {/* Handle */}
          <div
            className="absolute -right-1 w-2 h-full bg-transparent cursor-col-resize"
            onMouseDown={() => {
              isDragged.current = true;
            }}
          />
          <AddChannelModal open={isModalOpen} onClose={onModalClose} />
        </>
      )}
    </div>
  );
};
