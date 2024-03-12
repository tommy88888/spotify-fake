'use client';

import { Song } from '@/types';
import LikeButton from './like-button';
import MediaItem from './media-item';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import Slider from './slider';
import usePlayer from '@/hooks/use-player';
import { useEffect, useState } from 'react';
import { BsShuffle, BsRepeat } from 'react-icons/bs';
import useSound from 'use-sound';
import { cn } from '@/libs/utils';
import ProgressBar from './progress-bar';

type PlayerContentProps = {
  songUrl: string;
  song: Song;
};

const PlayerContent = ({ songUrl, song }: PlayerContentProps) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  // const Shuffle = isShuffle ? PiShuffleBold : PiShuffleDuotone;
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) return;

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) return player.setId(player.ids[0]);

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) return;

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const PreviousSong = player.ids[currentIndex - 1];

    if (!PreviousSong) return player.setId(player.ids[player.ids.length - 1]);

    player.setId(PreviousSong);
  };

  const [play, { pause, sound, duration }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),

    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ['mp3'],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound, duration]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  return (
    <div className='grid grid-cols-2 md:grid-cols-3  h-full '>
      <div className='flex w-full justify-start '>
        <div className='flex items-center gap-x-4 '>
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      {/* Play pause icon in mobile mode */}
      <div className='flex md:hidden col-auto justify-end items-center '>
        <div
          onClick={handlePlay}
          className='h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer '
        >
          <Icon size={30} className='text-slate-100 ' />
        </div>
      </div>

      {/* shuffle, play, pause, next, previous on desktop mode */}
      <div className='flex flex-col gap-y-1 overflow-hidden'>
        {/* progress bar with timer */}
        <ProgressBar />
        <div className=' hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6 '>
          <div
            onClick={() => setIsShuffle((prev) => !prev)}
            className='relative flex items-center justify-center h-7 w-7  rounded-full bg-black p-1 cursor-pointer'
          >
            <BsShuffle
              size={20}
              className={cn(
                'bg-black',
                isShuffle ? 'text-emerald-500' : 'text-white'
              )}
            />
            {isShuffle && (
              <span className='absolute block rounded-full bg-green-500  left-1/2 -translate-x-1/2 bottom-0 h-[2px] w-[2px] md:h-[2px] md:w-[2px] mb-1' />
            )}
          </div>
          <AiFillStepBackward
            onClick={onPlayPrevious}
            size={20}
            className='text-neutral-400 cursor-pointer hover:text-white transition '
          />
          <div
            onClick={handlePlay}
            className='flex items-center justify-center h-7 w-7  rounded-full bg-white p-1 cursor-pointer '
          >
            <Icon size={20} className='text-black   ' />
          </div>
          <AiFillStepForward
            onClick={onPlayNext}
            size={20}
            className='text-neutral-400 cursor-pointer hover:text-white transition '
          />
          <div
            onClick={() => setIsRepeat((prev) => !prev)}
            className='relative flex items-center justify-center h-7 w-7  rounded-full bg-black p-1 cursor-pointer'
          >
            <BsRepeat
              size={20}
              className={cn(
                'bg-black',
                isRepeat ? 'text-emerald-500' : 'text-white'
              )}
            />
            {isRepeat && (
              <span className='absolute block rounded-full bg-green-500  left-1/2 -translate-x-1/2 bottom-0 h-[2px] w-[2px] md:h-[2px] md:w-[2px] mb-1' />
            )}
          </div>
        </div>
      </div>

      <div className='hidden md:flex w-full justify-end pr-2 '>
        <div className='flex items-center gap-x-2 w-[120px] '>
          <VolumeIcon
            onClick={toggleMute}
            className='cursor-pointer '
            size={20}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
