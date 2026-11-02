import { createStore } from 'zustand/vanilla';

export type GlobalLoginState = {
  open: boolean;
};

export type GlobalLoginActions = {
  handleOpen: () => void;
  close: () => void;
};

export type GlobalLoginStore = GlobalLoginActions & GlobalLoginState;

export const defaultInitState: GlobalLoginState = {
  open: false,
};

export const createGlobalLoginStore = (initState: GlobalLoginState = defaultInitState) => {
  return createStore<GlobalLoginStore>()((set) => ({
    ...initState,
    handleOpen: () => set((state) => ({ open: !state.open })),
    close: () => set(() => ({ open: false })),
  }));
};