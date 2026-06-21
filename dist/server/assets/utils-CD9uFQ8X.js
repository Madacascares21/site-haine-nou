import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
//#region src/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var formatPrice = (value) => new Intl.NumberFormat("ro-RO", {
	style: "currency",
	currency: "LEI"
}).format(value);
function slugToTitle(text) {
	return text.replace(/-/g, " ").split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
}
function getStrapiMedia(url) {
	if (!url) return "";
	if (url.startsWith("http://") || url.startsWith("https://")) return url;
	return url;
}
//#endregion
export { slugToTitle as i, formatPrice as n, getStrapiMedia as r, cn as t };
