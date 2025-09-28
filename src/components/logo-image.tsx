'use client'

import Image from "next/image";
import { createWsrvLoader, WsrvParams } from "./wsrvLoader";

type Props = {
  className?: string;
  fill?: boolean;
  width: number;
  height: number;
  quality?: number;
  sizes?: string;
  priority?: boolean;
  unoptimized?: boolean;
} & { wsrv?: WsrvParams };

const LogoImage = (props: Props) => {
  const { wsrv, ...rest } = props;
  return (
    <Image
      {...rest}
      loader={createWsrvLoader(wsrv)}
      src="https://static.devilsect.com/devilsect-logo.png"
      alt="Website logo"
    />
  )
}

export default LogoImage;
