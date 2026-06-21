import type { LinkProps } from '@tanstack/react-router'

type RouteTo = LinkProps['to']


export type NavItem = {
    visible?: boolean
    label: string
    to: RouteTo
    image?: string
    description?: string
    children?: NavItem[]

}

export interface DropdownLinkItemType extends Required<Pick<NavItem, "children">>, Partial<Pick<NavItem, "to">>, Pick<NavItem, "label"> { }

export interface LinkItemType extends Pick<NavItem, "label" | "to"> {
    className?: string
}