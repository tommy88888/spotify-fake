import { Playlist } from '@/types';

const playlist: Playlist = [
  {
    audioSrc: '/songs/track1.mp3',
    metadata: {
      title: 'Guitar I',
      artist: 'John Doe',
      coverArtSrc: '/images/1.jpg',
    },
  },
  {
    audioSrc: '/songs/track2.mp3',
    metadata: {
      title: 'Guitar II',
      artist: 'John Doe',
      coverArtSrc: '/images/2.jpg',
    },
  },
  {
    audioSrc: '/songs/track3.mp3',
    metadata: {
      title: 'Sunflower',
      artist: 'Jane Doe',
      coverArtSrc: '/images/3.jpg',
    },
  },
  {
    audioSrc: '/songs/track4.mp3',
    metadata: {
      title: 'Flowers',
      artist: 'Jane Doe',
      coverArtSrc: '/images/4.jpg',
    },
  },
];

export default playlist;
