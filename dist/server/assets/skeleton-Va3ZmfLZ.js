import { t as cn } from "./utils-CD9uFQ8X.js";
import { jsx } from "react/jsx-runtime";
//#region src/components/container.tsx
var Container = ({ children, className }) => {
	return /* @__PURE__ */ jsx("div", {
		className: cn("container mx-auto px-8 py-8", className),
		children
	});
};
//#endregion
//#region src/components/ui/skeleton.tsx
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "skeleton",
		className: cn("animate-pulse rounded-md bg-accent", className),
		...props
	});
}
//#endregion
export { Container as n, Skeleton as t };
