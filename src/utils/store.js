import { create } from "zustand";

const navStore = create((set) => ({
  page: "home",
  setPage: (newPage) => set(() => ({ page: newPage })),
}));

export default navStore;
