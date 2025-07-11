import { Workspace } from '@/generated/prisma';
import { Button } from '@/components/ui/button';

interface WorkspaceListProps {
  action: (formData: FormData) => void;
  actionText: string;
  buttonVariant?: 'primary' | 'secondary';
  title: string;
  workspaces: (Omit<Workspace, 'ownerId'> & {
    memberCount: number;
    token?: string;
    firstChannelId?: string;
  })[];
}

const placeholderImage = 'https://a.slack-edge.com/80588/img/avatars-teams/ava_0014-88.png';

export const WorkspaceList = ({
  action,
  actionText,
  buttonVariant = 'primary',
  title,
  workspaces,
}: WorkspaceListProps) => {
  return (
    <div className="rounded-[9px] mb-12 border-[#FFF3] border-4">
      <div className="flex items-center bg-[#ECDEEC] text-black p-4 text-lg rounded-t-[5px] min-h-[calc(50px+2rem)]">
        {title}
      </div>
      <div className="flex flex-col rounded-b-[5px] bg-[#FFF] [&>:not(:first-child)]:border [&>:not(:first-child)]:border-t-[#ebeaeb]">
        {workspaces.map((workspace) => (
          <form action={action} key={workspace.id} className="p-4">
            <input type="hidden" name="channelId" value={workspace?.firstChannelId} />
            <input type="hidden" name="token" value={workspace?.token} />
            <input type="hidden" name="workspaceId" value={workspace.id} />
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0">
              <div className="flex items-center">
                <img
                  src={workspace.image || placeholderImage}
                  alt="workspace-image"
                  className="rounded-[5px] mr-4 size-[75px] object-cover"
                />
                <div className="flex flex-col my-auto text-black">
                  <span className="text-lg font-bold mb-2">{workspace.name}</span>
                  <div className="flex h-5">
                    <span className="text-[#696969] text-[14.5px]">
                      {workspace.memberCount} member
                      {workspace.memberCount !== 1 && 's'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="sm:ml-auto w-full sm:w-auto flex sm:block">
                <Button type="submit" variant={buttonVariant} className="grow shrink-0">
                  <span>{actionText}</span>
                </Button>
              </div>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
};
