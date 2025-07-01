import { ReactNode } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { ChevronDownIcon, SearchIcon } from 'lucide-react';

type NavbarProps = {
  action: () => void;
};

export const Navbar = ({ action }: NavbarProps) => {
  return (
    <header>
      <nav className="bg-slack h-20">
        <div className="flex justify-between h-full px-[4vw] mx-auto">
          <div className="flex items-center w-[125px] justify-start">
            <div className="flex items-center gap-1.5">
              <div className="size-[26px]">
                <Image
                  src={'/apple-touch-icon.png'}
                  width={26}
                  height={26}
                  alt="apple-touch-icon"
                />
              </div>
              <span className="text-[29px] font-outfit font-bold">slack</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center text-sm flex-1">
            <ul className="flex flex-1 leading-[1.555] -tracking-[.0012em]">
              <NavLink dropdown>Features</NavLink>
              <NavLink dropdown>Solutions</NavLink>
              <NavLink>Enterprise</NavLink>
              <NavLink dropdown>Resources</NavLink>
              <NavLink>Pricing</NavLink>
            </ul>
            <button className="hidden lg:flex mt-1 mr-6">
              <SearchIcon className="size-5 text-white" />
            </button>
            <form action={action}>
              <Button
                type="submit"
                variant="secondary"
                className="hidden lg:flex ml-2 py-0 w-[240px] h-[45px]"
              >
                <span>Create a new workspace</span>
              </Button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

type NavLinkProps = {
  dropdown?: boolean;
  children: ReactNode;
};

const NavLink = ({ dropdown = false, children }: NavLinkProps) => {
  return (
    <li className="p-[.25rem_.88rem]">
      <button className="text-[15.5px] font-semibold flex items-center gap-1 group">
        <span>{children}</span>
        {dropdown && (
          <ChevronDownIcon className="size-4 text-white transition-transform duration-200 ease-in-out group-hover:rotate-180" />
        )}
      </button>
    </li>
  );
};
