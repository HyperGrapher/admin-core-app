import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDateFromDatabaseWithHour = (date: Date | null | undefined): string => {
	if (!date) return "";

	const formattedDate = new Date(date).toLocaleDateString("tr-TR", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
	});

	return formattedDate;
};

export const numberWithCommas = (x: string | number | undefined) => {
	if (x === undefined) return "0";
	return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};