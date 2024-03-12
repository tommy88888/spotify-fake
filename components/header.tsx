'use client';

import { cn } from '@/libs/utils';
import { useRouter } from 'next/navigation';
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import Btn from './ui/btn';
import useAuthModal from '@/hooks/use-auth-modal';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/hooks/useUser';
import { FaUserAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import usePlayer from '@/hooks/use-player';

type HeaderProps = {
  children: React.ReactNode;
  className?: string;
};

const Header = ({ children, className }: HeaderProps) => {
  const player = usePlayer();
  const router = useRouter();

  const authModal = useAuthModal();

  const supabaseClient = useSupabaseClient();

  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    player.reset();

    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged out!');
    }
  };

  return (
    <div
      className={cn('h-fit bg-gradient-to-b from-emerald-800 p-6 ', className)}
    >
      <div className='w-full mb-4 flex items-center justify-between '>
        <div className='hidden md:flex gap-x-2 items-center'>
          <button
            onClick={() => router.back()}
            className='rounded-full bg-black flex items-center  justify-center hover:opacity-75 transition '
          >
            <RxCaretLeft size={35} className='text-white ' />
          </button>
          <button
            onClick={() => router.forward()}
            className='rounded-full bg-black flex items-center  justify-center hover:opacity-75 transition '
          >
            <RxCaretRight size={35} className='text-white ' />
          </button>
        </div>
        <div className='flex md:hidden gap-x-2 items-center '>
          <button className='rounded-full p-2 bg-white flex items-center  justify-center hover:opacity-75 transition '>
            <HiHome className='text-black' size={20} />
          </button>
          <button className='rounded-full p-2 bg-white flex items-center  justify-center hover:opacity-75 transition '>
            <BiSearch className='text-black' size={20} />
          </button>
        </div>
        <div className='flex justify-between items-center gap-x-4 '>
          {user ? (
            <div className='flex gap-x-4 items-center '>
              <Btn onClick={handleLogout} className='bg-white px-6 py-2 '>
                Logout
              </Btn>
              <Btn
                onClick={() => router.push('/account')}
                className='bg-white '
              >
                <FaUserAlt />
              </Btn>
            </div>
          ) : (
            <>
              <div>
                <Btn
                  onClick={authModal.onOpen}
                  className='bg-transparent text-neutral-300 font-medium '
                >
                  Sign up
                </Btn>
              </div>
              <div>
                <Btn onClick={authModal.onOpen} className='bg-white px-6 py-2 '>
                  Log in
                </Btn>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
