import { cva } from "class-variance-authority";
import type { NavItem } from "./types"
import { generatedData } from "#/generated/constants";

export const site = {
    name: "AUXLOAD STORE"
}

export const navigationMenuTriggerStyle = cva(
    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-[color,box-shadow] outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/50 data-[state=open]:text-accent-foreground data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent"
)




const structuredData = {
    navLinks: generatedData.categories_connection.nodes.map((link) => {

        return {
            name: link.name,
            visible: link.visible,
            media: link.media?.url,
            sub_categories: link.sub_categories_connection.nodes.map((s) => {
                return {
                    name: s.name,
                    media: s.media?.url
                }
            })
        }
    }),
    colors: generatedData.colors_connection.nodes.map((c) => {
        return {
            name: c.name,
            color_code: c.color_code
        }
    }),
    sizes: generatedData.sizes_connection.nodes.map((s) => {
        return {
            name: s.name
        }
    })
}

export const navigation: NavItem[] = [
    {
        label: "Home",
        to: "/",
        visible: true
    }, ...structuredData.navLinks.map((link) => {
        if (link.sub_categories?.length === 0 || !link.sub_categories) {
            return {
                label: link.name,
                visible: link.visible,
                to: "/c/$category/{-$subCategory}" as const,
                image: link.media,

            }
        }
        return {
            label: link.name,
            to: "/c/$category/{-$subCategory}" as const,
            image: link.media,
            visible: link.visible,

            children: link.sub_categories.map((s) => {
                return {
                    label: s.name,
                    to: "/c/$category/{-$subCategory}" as const,
                    image: s.media
                }
            })
        }
    })
];