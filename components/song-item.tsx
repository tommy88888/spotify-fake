'use client';

import { Song } from '@/types';
import useLoadImage from '@/hooks/use-load-image';
import Image from 'next/image';
import PlayButton from './play-button';

type SongItemProps = {
  onClick: (id: string) => void;
  data: Song;
};

const SongItem = ({ onClick, data }: SongItemProps) => {
  const imagePath = useLoadImage(data);

  return (
    <div
      onClick={() => onClick(data.id)}
      className='relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 hover:bg-neutral-400/10 cursor-pointer transition p-3 '
    >
      <div className='relative aspect-square h-full w-full rounded-md overflow-hidden '>
        <Image
          src={imagePath || '/images/liked.png'}
          fill
          alt='image'
          priority
          sizes='(max-width: 120px) 50vw, 100vw'
          className='object-cover '
        />
      </div>
      <div className='flex flex-col items-start w-full pt-4 gap-y-1 '>
        <p className='font-semibold truncate w-full '>{data.title}</p>
        <p className='text-neutral-400 text-sm pb-4  w-full truncate '>
          By {data.author}
        </p>
      </div>
      <div className='absolute bottom-24 right-5'>
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
