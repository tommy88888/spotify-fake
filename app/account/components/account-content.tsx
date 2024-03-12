'use client';

import Btn from '@/components/ui/btn';
import useSubscribeModal from '@/hooks/use-subscribe-modal';
import { useUser } from '@/hooks/useUser';
import { postData } from '@/libs/helpers';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type AccountContentProps = {};

const AccountContent = () => {
  const router = useRouter();
  const subscribeModal = useSubscribeModal();
  const { isLoading, subscription, user } = useUser();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) router.replace('/');
  }, [isLoading, user, router]);

  const redirectToCustomerPortal = async () => {
    setLoading(true);

    try {
      const { url, error } = await postData({
        url: '/api/create-portal-link',
      });
      window.location.assign(url);

      console.log(
        '🚀 ~ redirectToCustomerPortal ~ window.location.assign(url):',
        window.location.assign(url)
      );
    } catch (error) {
      if (error) toast.error((error as Error).message);
    }

    setLoading(false);
  };

  return (
    <div className='mb-7 px-6 '>
      {!subscription && (
        <div className='flex flex-col gap-y-4'>
          <p>No Active Plan</p>
          <Btn onClick={subscribeModal.onOpen} className='w-[300px] '>
            Subscribe
          </Btn>
        </div>
      )}
      {subscription && (
        <div className='flex flex-col gap-y-4'>
          <p>
            You are currently on the{' '}
            <b>{subscription?.prices?.products?.name}</b> plan.
          </p>
          <Btn
            onClick={redirectToCustomerPortal}
            disabled={isLoading || loading}
            className='w-[300px] '
          >
            Open customer portal
          </Btn>
        </div>
      )}
    </div>
  );
};

export default AccountContent;
