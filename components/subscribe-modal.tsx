'use client';

import { Price, ProductWithPrice } from '@/types';
import Modal from './modal';
import Btn from './ui/btn';
import { useState } from 'react';
import { useUser } from '@/hooks/useUser';
import toast from 'react-hot-toast';
import { postData } from '@/libs/helpers';
import { getStripe } from '@/libs/stripeClient';
import useSubscribeModal from '@/hooks/use-subscribe-modal';

type SubscribeModalProps = {
  products: ProductWithPrice[];
};

const SubscribeModal = ({ products }: SubscribeModalProps) => {
  const subscribeModal = useSubscribeModal();
  const { user, isLoading, subscription } = useUser();
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const onChange = (open: boolean) => {
    if (!open) {
      subscribeModal.onClose();
    }
  };

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return toast.error('Must be logged in');
    }
    if (subscription) {
      setPriceIdLoading(undefined);
      return toast('Already subscribed');
    }
    try {
      const { sessionId } = await postData({
        url: '/api/create-checkout-session',
        data: { price },
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (err) {
      toast.error((err as Error)?.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };
  let content = <div>No products available</div>;

  const formatPrice = (price: Price) => {
    const priceString = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: price.currency,
      minimumFractionDigits: 0,
    }).format((price?.unit_amount || 0) / 100);

    return priceString;
  };

  if (products.length) {
    content = (
      <div>
        {products.map((prod) => {
          if (!prod.prices?.length) {
            return <div key={prod.id}>No Prices Available</div>;
          }
          return prod.prices.map((price) => (
            <Btn
              key={price.id}
              onClick={() => handleCheckout(price)}
              disabled={isLoading || price.id === priceIdLoading}
              className='mb-4 '
            >{`Subscribe for ${formatPrice(price)} a ${price.interval} `}</Btn>
          ));
        })}
      </div>
    );
  }
  if (subscription)
    content = <div className='text-center '>Already Subscribed</div>;

  return (
    <Modal
      title='Only for Premium users'
      description='Listen to Music & Podcast'
      isOpen={subscribeModal.isOpen}
      onChange={onChange}
    >
      {content}
    </Modal>
  );
};

export default SubscribeModal;
