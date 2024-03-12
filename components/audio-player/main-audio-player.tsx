'use client';

import { useRef } from 'react';
// import Controls from '../controls';
import playlist from '../playlist/playlist';
import ProgressBar from '../progress-bar';
import SongInfo from '../songs/song-info';
import createAudioPlayer from './audio-player';

type MainAudioPlayerProps = {};

const MainAudioPlayer = () => {
  const togglePlayPauseRef = useRef(createAudioPlayer(playlist));

  return (
    <div className='flex flex-col items-center '>
      <SongInfo />
      <ProgressBar />
      {/* <Controls onPlayClick={togglePlayPauseRef.current} /> */}
    </div>
  );
};

export default MainAudioPlayer;
