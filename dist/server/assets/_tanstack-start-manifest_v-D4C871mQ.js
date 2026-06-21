//#region \0tanstack-start-manifest:v
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/home/auxload/Documents/site-haine/src/routes/__root.tsx",
		children: [
			"/",
			"/api/upload",
			"/order/$id",
			"/product/$slug",
			"/checkout/",
			"/order/",
			"/sign-in/",
			"/api/auth/$",
			"/c/$category/{-$subCategory}"
		],
		preloads: [
			"/assets/index-guZ7lXnX.js",
			"/assets/jsx-runtime-DUAcabCT.js",
			"/assets/dist-_7tXAXpE.js",
			"/assets/button-BO2Qu5pF.js",
			"/assets/link-Cx5lF_Dy.js",
			"/assets/redirect-DCb_aIiF.js"
		],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-guZ7lXnX.js"
		} }]
	},
	"/": {
		filePath: "/home/auxload/Documents/site-haine/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-DDDeLVH4.js",
			"/assets/dist-DtH2zdxj.js",
			"/assets/product-carousel-layout-uVSIt9Mp.js"
		]
	},
	"/order/$id": {
		filePath: "/home/auxload/Documents/site-haine/src/routes/order/$id.tsx",
		children: void 0,
		preloads: ["/assets/_id-C2qlW29B.js", "/assets/card-Deqd4QpC.js"]
	},
	"/product/$slug": {
		filePath: "/home/auxload/Documents/site-haine/src/routes/product/$slug.tsx",
		children: void 0,
		preloads: [
			"/assets/_slug-CUnr3qWY.js",
			"/assets/_slug-VFIJzLJB.js",
			"/assets/accordion-BN41sXvk.js",
			"/assets/product-carousel-layout-uVSIt9Mp.js",
			"/assets/product-card-BYgYgPgI.js"
		]
	},
	"/checkout/": {
		filePath: "/home/auxload/Documents/site-haine/src/routes/checkout/index.tsx",
		children: void 0,
		preloads: [
			"/assets/checkout-akJ3QV9V.js",
			"/assets/dist-DtH2zdxj.js",
			"/assets/truck-DVVQlg79.js"
		]
	},
	"/order/": {
		filePath: "/home/auxload/Documents/site-haine/src/routes/order/index.tsx",
		children: void 0,
		preloads: [
			"/assets/order-DdLB-UVu.js",
			"/assets/truck-DVVQlg79.js",
			"/assets/card-Deqd4QpC.js"
		]
	},
	"/sign-in/": {
		filePath: "/home/auxload/Documents/site-haine/src/routes/sign-in/index.tsx",
		children: void 0,
		preloads: ["/assets/sign-in-8lMXbXxU.js"]
	},
	"/c/$category/{-$subCategory}": {
		filePath: "/home/auxload/Documents/site-haine/src/routes/c/$category.{-$subCategory}.tsx",
		children: void 0,
		preloads: [
			"/assets/_category._-_subCategory_-BlOojzg1.js",
			"/assets/accordion-BN41sXvk.js",
			"/assets/product-card-BYgYgPgI.js"
		]
	}
} });
//#endregion
export { tsrStartManifest };
