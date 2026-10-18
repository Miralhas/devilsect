import { ApiError } from "@/service/api-error";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const delay = async (ms: number) => await new Promise(resolve => setTimeout(resolve, ms));

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isApiError = (err: Error | null) => err instanceof ApiError;

export const is404 = (err: Error | null) => isApiError(err) && err.status === 404;