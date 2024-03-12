'use client';

import { create } from 'zustand';

type AuthModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useAuthModal = create<AuthModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAuthModal;
