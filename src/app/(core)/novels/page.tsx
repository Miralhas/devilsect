'use client'
import PageHeader from "@/components/page-header";
import BlurCenter from "@/components/ui/blur-center";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Book, ChevronUp } from "lucide-react";
import { useState } from "react";
const NovelPage = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <section className="grid grid-rows-[min-content_max-content] w-full max-w-[1280px] mx-auto relative p-4 md:pt-12 space-y-10 min-h-screen mb-10">
      <BlurCenter opacity="low" />
      <PageHeader description="Discover new novels and mastepieces" icon={Book} title="Novels" />
      
    </section>
  )
}

export default NovelPage;
