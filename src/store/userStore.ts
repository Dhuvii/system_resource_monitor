import { create } from "zustand";
import { SysInfo } from "../../types";

interface UserState {
  isLoading: boolean;
  user: SysInfo["user"] | null;

  update: (user: SysInfo["user"]) => void;
}

const useUserStore = create<UserState>()((set) => ({
  isLoading: true,
  user: null,

  update: (user) => {
    set((state) => ({
      isLoading: false,
      user: user,
    }));
  },
}));

export default useUserStore;
