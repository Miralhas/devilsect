'use client'

import { motion, useAnimation } from "motion/react";
import { useEffect } from "react";

type MenuButtonProps = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const MenuButton = ({ isMenuOpen, toggleMenu }: MenuButtonProps) => {
  const path1Controls = useAnimation();
  const path2Controls = useAnimation();

  const path1Variants = {
    open: { d: "M3.06061 2.99999L21.0606 21" },
    closed: { d: "M0 8.5L24 8.5" },
  };

  const path2Variants = {
    open: { d: "M3.00006 21.0607L21 3.06064" },
    closed: { d: "M0 15.5L24 15.5" },
  };

  useEffect(() => {
    if (isMenuOpen) {
      path1Controls.start(path1Variants.open);
      path2Controls.start(path2Variants.open);
      document.body.classList.add("overflow-hidden");
      return;
    }

    path1Controls.start(path1Variants.closed)
    path2Controls.start(path2Variants.closed)
    document.body.classList.remove("overflow-hidden");
  }, [isMenuOpen]);

  return (
    <div
      onClick={toggleMenu}
      className="relative justify-self-center flex flex-col gap-2 cursor-pointer stroke-2 z-50 stroke-zinc-200"
    >
      <svg width={24} height={24} viewBox="0 0 24 24">
        <motion.path {...path1Variants.closed} animate={path1Controls} transition={{ duration: 0.2 }} />
        <motion.path {...path2Variants.closed} animate={path2Controls} transition={{ duration: 0.2 }} />
      </svg>
    </div>
  )
}


export default MenuButton;
