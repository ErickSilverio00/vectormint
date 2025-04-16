import { create } from "zustand";

interface LoadingStore {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));

export default useLoadingStore;
