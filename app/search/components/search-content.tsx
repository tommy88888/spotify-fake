'use client';

import LikeButton from '@/components/like-button';
import MediaItem from '@/components/media-item';
import useOnPlay from '@/hooks/use-on-play';
import { Song } from '@/types';

type SearchContentProps = {
  songs: Song[];
};

const SearchContent = ({ songs }: SearchContentProps) => {
  const onPlay = useOnPlay(songs);
  if (songs.length === 0) {
    return (
      <div className='flex flex-col gap-y-2 w-full px-6 text-neutral-400 '>
        No songs founds!
      </div>
    );
  }
  return (
    <div className='flex flex-col gap-y-2 w-full px-6 '>
      {songs.map((song) => (
        <div key={song.id} className='flex items-center gap-x-4 w-full '>
          <div className='flex-1 '>
            <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
            {song.title}
          </div>

          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
