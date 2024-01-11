import React from "react";
import { width } from "styled-system";
import Svg from "../Svg";


import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
   <img style={{width:'8%', display:'none'}} src="https://ariettachain.com/wp-content/uploads/2023/05/cropped-coin-logo-A-01.png"/>
  );
};

export default Icon;
