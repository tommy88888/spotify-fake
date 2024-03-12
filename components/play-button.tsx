'use client';

import { FaPlay } from 'react-icons/fa';
import Btn from './ui/btn';

const PlayButton = () => {
  return (
    <Btn className='transition opacity-0 rounded-full flex items-center bg-green-500 p-4 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110'>
      <FaPlay />
    </Btn>
  );
};

export default PlayButton;
