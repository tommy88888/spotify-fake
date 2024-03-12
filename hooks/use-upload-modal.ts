'use client';

import { create } from 'zustand';

type UploadModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useUploadModal = create<UploadModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useUploadModal;
