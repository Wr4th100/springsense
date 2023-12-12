import { toast } from "react-hot-toast";
import { create } from "zustand";

interface MapTypeStore {
  mapType: string;
  setMapType: (mapType: string) => void;
}

const useMapType = create<MapTypeStore>((set, get) => ({
  mapType: "boundaryOfHill",
  setMapType: (mapType: string) => {
    set({ mapType });
    toast.success(`${mapType} added to cart`);
  },
}));

export default useMapType;