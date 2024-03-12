'use client';

import { cn } from '@/libs/utils';
import { Slider } from '@radix-ui/react-slider';
import Image from 'next/image';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { BsPauseFill, BsPlayFill, BsRepeat, BsShuffle } from 'react-icons/bs';
import LikeButton from './like-button';
import MediaItem from './media-item';
import ProgressBar from './progress-bar';
import usePlayer from '@/hooks/use-player';
import { useState } from 'react';
import { HiSpeakerXMark, HiSpeakerWave } from 'react-icons/hi2';
import { Song } from '@/types';

type ControlsProps = {
  onPlayClick: () => void;
  songUrl: string;
  song: Song;
};

const Controls = ({ onPlayClick, songUrl, song }: ControlsProps) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(true);
  const [isRepeat, setIsRepeat] = useState(true);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;
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
          // onClick={handlePlay}
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
            onClick={onPlayClick}
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
            // onClick={onPlayPrevious}
            size={20}
            className='text-neutral-400 cursor-pointer hover:text-white transition '
          />
          <div
            onClick={onPlayClick}
            className='flex items-center justify-center h-7 w-7  rounded-full bg-white p-1 cursor-pointer '
          >
            <Icon size={20} className='text-black   ' />
          </div>
          <AiFillStepForward
            // onClick={onPlayNext}
            size={20}
            className='text-neutral-400 cursor-pointer hover:text-white transition '
          />
          <div
            onClick={onPlayClick}
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
            // onClick={toggleMute}
            className='cursor-pointer '
            size={20}
          />
          {/* <Slider value={volume} onChange={(value) => setVolume(value)} /> */}
        </div>
      </div>
    </div>
  );
};

export default Controls;

type ImageButtonProps = {
  src: string;
  onclick: () => void;
  className?: string;
};

const ImageButton = ({ src, onclick, className }: ImageButtonProps) => {
  return (
    <button onClick={onclick}>
      <Image
        src={src}
        fill
        alt='image button'
        priority
        sizes='(max-width: 65px) 50vw, 100vw'
      />
    </button>
  );
};
