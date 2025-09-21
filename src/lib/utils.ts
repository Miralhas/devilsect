import { Role, RoleStatus, User } from "@/types/authentication";
import { DisplayStatus, NovelStatus } from "@/types/novel";
import { clsx, type ClassValue } from "clsx";
import { format, formatDistanceToNowStrict } from "date-fns";
import { enUS, ptBR } from 'date-fns/locale';
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const delay = async (ms: number) => await new Promise(resolve => setTimeout(resolve, ms));

export const statusMap: Record<NovelStatus, DisplayStatus> = {
  COMPLETED: 'Completed',
  ON_GOING: "Ongoing"
};

export const roleMap: Record<Role, RoleStatus> = {
  ADMIN: "Admin",
  USER: "Member",
}

export const mapRoles = (roles: Role[]) => {
  if (roles.some(r => Role.ADMIN === r)) {
    return roleMap["ADMIN"]
  }

  return roleMap["USER"]
}

// https://stackoverflow.com/a/64777515/30371438
export function arrayChunker<T>(arr: T[], size: number): T[][] {
  return [...Array(Math.ceil(arr.length / size))].map((_, i) =>
    arr.slice(size * i, size + size * i)
  );
};

export const buildQueryString = <T extends Record<string, string | number | boolean | undefined>>(
  params: T
): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "" && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

export const leadingZero = (num: number, places: number) => (num).toString().padStart(places, "0");

export const formatDate = (date: string) => formatDistanceToNowStrict(new Date(date).toString(), { locale: enUS, addSuffix: true });
export const formatFullDate = (date: string) => format(new Date(date), "MMMM dd, yyyy 'at' hh':'mm a", { locale: enUS });
export const formatFullDateBR = (date: string) => format(new Date(date), "dd 'de' MMMM 'de' yyyy 'às' HH':'mm", { locale: ptBR });
export const formatMonthYear = (date: string) => format(new Date(date), "MMM yyyy", { locale: enUS });

export const capitalize = (val: string) => {
  return val.split(" ").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
}

export const isAdminCheck = (user?: User) => user?.roles.some(r => r === Role.ADMIN);

export const formatViews = (views: number) => {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
  return views.toString()
}