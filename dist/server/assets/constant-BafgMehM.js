import { cva } from "class-variance-authority";
//#region src/generated/constants.ts
var generatedData = {
	"categories_connection": { "nodes": [
		{
			"name": "barbati",
			"visible": true,
			"seo": {
				"name": "dfhafdh",
				"description": "adfhsdhf",
				"media": { "url": "/uploads/049_FM_09_M_052_1_1266460_6fe2037daf.avif" }
			},
			"media": { "url": "/uploads/KEY_1183_d267f44605.webp" },
			"sub_categories_connection": { "nodes": [{
				"name": "tricouri",
				"seo": {
					"name": "adadsa",
					"description": "gsahb",
					"media": { "url": "/uploads/a2183884_2832_4f4c_90d6_8e7f547a86ba_83be8e757a.png" }
				},
				"media": { "url": "/uploads/a2183884_2832_4f4c_90d6_8e7f547a86ba_323cd19db4.png" }
			}] }
		},
		{
			"name": "colectii",
			"visible": false,
			"seo": {
				"name": "fdb",
				"description": "reaherah",
				"media": { "url": "/uploads/2b8a1981aafd4b949ebc4d0af3b989f6_4ed10c66e0.webp" }
			},
			"media": { "url": "/uploads/049_FM_09_M_052_1_1266460_6fe2037daf.avif" },
			"sub_categories_connection": { "nodes": [{
				"name": "promotii",
				"seo": {
					"name": "fdgj",
					"description": "sfj",
					"media": { "url": "/uploads/049_FM_09_M_051_1_1266460_e32d9511f4.avif" }
				},
				"media": { "url": "/uploads/049_FM_09_M_052_1_1266460_6fe2037daf.avif" }
			}, {
				"name": "featured",
				"seo": {
					"name": "jyjhj",
					"description": "adfhbafd",
					"media": { "url": "/uploads/049_FM_09_M_051_1_1266460_e32d9511f4.avif" }
				},
				"media": { "url": "/uploads/b1e8b59575c84141b24544cd3de4182b_1a2ee573e5.webp" }
			}] }
		},
		{
			"name": "femei",
			"visible": true,
			"seo": {
				"name": "dBfdfb",
				"description": "dFB",
				"media": { "url": "/uploads/57a85e2ce4c04b92b1ca7f8b735589f2_e45f342dd5.webp" }
			},
			"media": { "url": "/uploads/2b8a1981aafd4b949ebc4d0af3b989f6_4ed10c66e0.webp" },
			"sub_categories_connection": { "nodes": [{
				"name": "tricouri",
				"seo": {
					"name": "9ik",
					"description": "adg",
					"media": { "url": "/uploads/a2183884_2832_4f4c_90d6_8e7f547a86ba_83be8e757a.png" }
				},
				"media": { "url": "/uploads/2b8a1981aafd4b949ebc4d0af3b989f6_4ed10c66e0.webp" }
			}] }
		}
	] },
	"colors_connection": { "nodes": [
		{
			"color_code": "#898989",
			"name": "gri"
		},
		{
			"color_code": "#000000",
			"name": "negru"
		},
		{
			"color_code": "#ffffff",
			"name": "alb"
		}
	] },
	"sizes_connection": { "nodes": [{ "name": "XS" }, { "name": "S" }] }
};
//#endregion
//#region src/features/header/constant.ts
var site = { name: "AUXLOAD STORE" };
var navigationMenuTriggerStyle = cva("group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-[color,box-shadow] outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/50 data-[state=open]:text-accent-foreground data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent");
var navigation = [{
	label: "Home",
	to: "/",
	visible: true
}, ...{
	navLinks: generatedData.categories_connection.nodes.map((link) => {
		return {
			name: link.name,
			visible: link.visible,
			media: link.media?.url,
			sub_categories: link.sub_categories_connection.nodes.map((s) => {
				return {
					name: s.name,
					media: s.media?.url
				};
			})
		};
	}),
	colors: generatedData.colors_connection.nodes.map((c) => {
		return {
			name: c.name,
			color_code: c.color_code
		};
	}),
	sizes: generatedData.sizes_connection.nodes.map((s) => {
		return { name: s.name };
	})
}.navLinks.map((link) => {
	if (link.sub_categories?.length === 0 || !link.sub_categories) return {
		label: link.name,
		visible: link.visible,
		to: "/c/$category/{-$subCategory}",
		image: link.media
	};
	return {
		label: link.name,
		to: "/c/$category/{-$subCategory}",
		image: link.media,
		visible: link.visible,
		children: link.sub_categories.map((s) => {
			return {
				label: s.name,
				to: "/c/$category/{-$subCategory}",
				image: s.media
			};
		})
	};
})];
//#endregion
export { generatedData as i, navigationMenuTriggerStyle as n, site as r, navigation as t };
