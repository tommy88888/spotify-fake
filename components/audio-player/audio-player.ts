'use client';

import { Playlist } from '@/types';

type createAudioPlayerProps = {};

const createAudioPlayer = (playlist: Playlist) => {
  let currentTrackIndex = 0;
  const audioElement: HTMLAudioElement = new Audio();

  function loadTrack(index: number) {
    audioElement.src = playlist[index].audioSrc;
    audioElement.load();
    currentTrackIndex = index;
  }

  function init() {
    loadTrack(0);
  }
  function togglePlayPause() {
    if (audioElement.paused) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }
  init();
  return togglePlayPause;
};

export default createAudioPlayer;
