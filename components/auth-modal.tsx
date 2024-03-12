'use client';

import {
  useSessionContext,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';
import Modal from './modal';

import { Auth } from '@supabase/auth-ui-react';
import { useRouter } from 'next/navigation';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import useAuthModal from '@/hooks/use-auth-modal';
import { useEffect } from 'react';

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const { onClose, isOpen } = useAuthModal();
  const router = useRouter();
  const { session } = useSessionContext();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    if (!open) onClose();
  };
  return (
    <Modal
      title='Welcome Back'
      description='Login to Your Account'
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        theme='dark'
        magicLink
        providers={['github']}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e',
              },
            },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
