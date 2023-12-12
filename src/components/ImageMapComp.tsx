import Image from "next/image";
import React from "react";

const ImageMapComp = ({ image }: { image: string }) => {
  return (
    <Image
      src={image}
      alt="Contour Map"
      width={500}
      height={500}
      className="h-[400px] w-full rounded-md md:h-[700px]"
    />
  );
};

export default ImageMapComp;
