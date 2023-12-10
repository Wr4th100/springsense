import { toast } from "react-hot-toast";
import { shared } from "use-broadcast-ts";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SpringStore {
  springName: string;
  x: number;
  y: number;
  addSpring: (springName: string, x: number, y: number) => void;
  removeSpring: (springName: string) => void;
}

const useSpring = create<SpringStore>()((set, get) => ({
  springName: "",
  x: 0,
  y: 0,
  addSpring: (springName: string, x: number, y: number) => {
    set({ springName, x, y });
    toast.success(`${springName} added to cart`);
  },
  removeSpring: (springName: string) => {
    set({ springName });
    toast.error(`${springName} removed from cart`);
  },
}));

export default useSpring;
