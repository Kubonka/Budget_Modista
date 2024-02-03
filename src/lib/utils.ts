import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
	if (typeof str === "string")
		return str.charAt(0).toUpperCase() + str.slice(1);
	return "";
}
export function parseDate(isoString: string): string {
	//2023-12-19T02:09:33.687Z
	// const [datePart] = isoString.split("T");
	// const [year, month, day] = datePart
	// 	.split("-")
	// 	.map((part) => part.padStart(2, "0"));
	// return `${day}/${month}/${year}`;
	//1/3/2024, 10:39:54 PM
	console.log(isoString);
	const [datePart] = isoString.split(",");
	const objDate = toStringObjectDate(datePart);
	return `${objDate.day}/${objDate.month}/${objDate.year}`;
}
export function getLocalDate() {
	const date = new Date().toLocaleString("en-US", {
		timeZone: "America/Argentina/Buenos_Aires",
	});
	return parseDate(date);
}
export function getObjectDate(date: string): TObjectDate {
	//25/12/2023 <- date
	const objDate = toStringObjectDate(date);
	return {
		year: parseInt(objDate.year),
		month: parseInt(objDate.month),
		day: parseInt(objDate.day),
	};
}
function toStringObjectDate(date: string) {
	console.log(date);
	const [day, month, year] = date
		.split("/")
		.map((part) => part.padStart(2, "0"));
	return { year, month, day };
}
