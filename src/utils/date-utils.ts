import { format, formatDistanceToNowStrict } from "date-fns";
import { enUS, ptBR } from 'date-fns/locale';

// Example: 11 days ago
export const formatDate = (date: string) => formatDistanceToNowStrict(new Date(date).toString(), { locale: enUS, addSuffix: true });

// Example: July 22, 2025 at 11:52 AM
export const formatFullDate = (date: string) => format(new Date(date), "MMMM dd, yyyy 'at' hh':'mm a", { locale: enUS });

// Example: 11 de setembro de 2025 às 17:18
export const formatFullDateBR = (date: string) => format(new Date(date), "dd 'de' MMMM 'de' yyyy 'às' HH':'mm", { locale: ptBR });

// Example: Jul 2025
export const formatMonthYear = (date: string) => format(new Date(date), "MMM yyyy", { locale: enUS });
