'use client';

import SongItem from '@/components/song-item';
import useOnPlay from '@/hooks/use-on-play';
import { Song } from '@/types';

type PageContentProps = {
  songs: Song[];
};

const PageContent = ({ songs }: PageContentProps) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return <div className='mt-4 text-neutral-400 '>No Songs available.</div>;
  }
  return (
    <div className='grid grid-cols-2 sm:gid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-8 mt-4'>
      {songs.map((song) => (
        <SongItem
          key={song.id}
          onClick={(id: string) => onPlay(id)}
          data={song}
        />
      ))}
    </div>
  );
};

export default PageContent;
