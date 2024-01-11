import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <img style={{width:'6%',marginRight:'10px',marginLeft:'60px' , display:'none'}} src="https://gateway.pinata.cloud/ipfs/QmPaTzPQQqt6UiL9pKYiFNry3Joxk2iVZtgdA4LqeJ88wT"/>
  );
};

export default Icon;
