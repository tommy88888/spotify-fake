import { Song } from '@/types';

import useAuthModal from './use-auth-modal';
import usePlayer from './use-player';
import { useUser } from './useUser';
import useSubscribeModal from './use-subscribe-modal';

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const subscribeModal = useSubscribeModal();
  const { user, subscription } = useUser();

  const onPlay = (id: string) => {
    if (!user) return authModal.onOpen();

    if (!subscription) return subscribeModal.onOpen();

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };

  return onPlay;
};

export default useOnPlay;
