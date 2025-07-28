import { DisplayStatus, NovelStatus } from "@/types/novel";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const delay = async (ms: number) => await new Promise(resolve => setTimeout(resolve, ms));

export const statusMap: Record<NovelStatus, DisplayStatus> = {
  COMPLETED: 'Completed',
  ON_GOING: "On Going"
};