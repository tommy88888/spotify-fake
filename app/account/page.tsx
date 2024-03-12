'use client';

import Header from '@/components/header';
// import dynamic from 'next/dynamic';
import AccountContent from './components/account-content';

// const DynamicAccountContent = dynamic(
//   () => import('./components/account-content'),
//   { ssr: false }
// );

type AccountPageProps = {};

const AccountPage = () => {
  return (
    <div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto '>
      <Header className='from-bg-neutral-900 '>
        <div className='mb-2 flex flex-col gap-y-600 '>
          <h1 className='text-white text-3xl font-semibold '>
            Account Settings
          </h1>
        </div>
      </Header>

      <AccountContent />
    </div>
  );
};

export default AccountPage;
