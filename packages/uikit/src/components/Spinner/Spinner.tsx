import React from "react";
import { Image, Box } from "@pancakeswap/uikit";
import { SpinnerProps } from "./types";

const Spinner: React.FC<React.PropsWithChildren<SpinnerProps>> = ({ size = 128 }) => {
  return (
    <Box width={size} height={size * 1.197} position="relative">
      <Image
        width={size}
        height={size * 1.197}
        src="https://gateway.pinata.cloud/ipfs/QmPMTFaeLxvCMru7jQ3Rmt8qDK5n3cdC8Nbt5oDbPCCnro"
        alt="freeswapp3d-Spinner"
      />
    </Box>
  );
};

export default Spinner;
