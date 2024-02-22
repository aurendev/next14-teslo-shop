import { create } from 'zustand'

interface uiSidebarState {
  isSidemenuOpen: boolean;
  closeSideMenu: () => void;
  openSideMenu: () => void;
}

export const useSidebarStore = create<uiSidebarState>()((set) => ({
  isSidemenuOpen: false ,
  closeSideMenu: () => set((state) => ({ isSidemenuOpen: false })),
  openSideMenu: () => set((state) => ({ isSidemenuOpen: true })),
}))