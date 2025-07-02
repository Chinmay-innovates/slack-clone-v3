'use client';

import { ReactNode, useState } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { ChevronDownIcon, SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

type NavbarProps = {
  action: () => void;
};

export const Navbar = ({ action }: NavbarProps) => {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/search?q=${encodeURIComponent(search)}`);
  };
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
            <form onSubmit={handleSearch} className="hidden lg:flex items-center mr-4">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent border-b border-white text-white placeholder-white text-sm px-2 py-1 outline-none"
                placeholder="Search..."
              />
              <button type="submit">
                <SearchIcon className="size-5 text-white ml-2" />
              </button>
            </form>
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
