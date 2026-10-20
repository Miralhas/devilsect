'use client'

import { motion } from "motion/react";
import { useEffect } from "react";

type MenuButtonProps = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const path1Variants = {
  open: { d: "M3.06061 2.99999L21.0606 21" },
  closed: { d: "M0 8.5L24 8.5" },
};

const path2Variants = {
  open: { d: "M3.00006 21.0607L21 3.06064" },
  closed: { d: "M0 15.5L24 15.5" },
};

const MenuButton = ({ isMenuOpen, toggleMenu }: MenuButtonProps) => {
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isMenuOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMenuOpen]);

  const state = isMenuOpen ? "open" : "closed";

  return (
    <div
      onClick={toggleMenu}
      className="relative justify-self-center flex flex-col gap-2 cursor-pointer stroke-2 z-50 stroke-zinc-200"
    >
      <svg width={24} height={24} viewBox="0 0 24 24">
        <motion.path
          variants={path1Variants}
          initial="closed"
          animate={state}
          transition={{ duration: 0.2 }}
        />
        <motion.path
          variants={path2Variants}
          initial="closed"
          animate={state}
          transition={{ duration: 0.2 }}
        />
      </svg>
    </div>
  )
}

export default MenuButton;