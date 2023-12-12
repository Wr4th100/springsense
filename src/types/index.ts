export type Feature = {
  type: string;
  properties: {
    name: string;
    styleHash: string;
    styleMapHash: {
      highlight: string;
      normal: string;
      fill?: string;
      "fill-opacity"?: string;
      stroke?: string;
      "stroke-opacity"?: string;
      "stroke-width"?: string;
    };
    styleUrl: string;
  };
  geometry: {
    type: string;
    coordinates: number[] | number[][] | number[][][];
  };
};

export type KmlJSON = {
  type: string;
  features: Feature[];
};
