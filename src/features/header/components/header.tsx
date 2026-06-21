import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { navigation, navigationMenuTriggerStyle } from "../constant"
import type { DropdownLinkItemType, LinkItemType } from "../types"
import BrandLink from "./brand-link"

import Container from "#/components/container"
import { UserPopover } from "#/features/auth/user-popover/components/user-popover"
import CartSheet from "#/features/cart/components/cart-sheet"
import { cn, getStrapiMedia } from "#/lib/utils"
import { Link } from "@tanstack/react-router"
import { MobileNavigation } from "./mobile-navigation"

const Header = () => {
    return (
        <header className="z-20 border-b bg-background">
            <div className="h-8 bg-primary flex items-center justify-center text-primary-foreground text-xs">
                <span>Transport gratuit la comenzi de peste 500 de lei</span>
            </div>
            <Container className="flex py-2 items-center justify-between">
                <BrandLink />
                <Navigation />
                <div className="flex">
                    <CTA />
                    <MobileNavigation />
                </div>
            </Container>
        </header>
    );
};

const CTA = () => {
    return (
        <div className="flex items-center">
            <UserPopover />
            <CartSheet />
        </div>
    );
};

const Navigation = () => {
    return (
        <NavigationMenu className="hidden md:block">
            <NavigationMenuList>
                {navigation.map((navItem) => {

                    if (!navItem.visible) {
                        return 
                    }

                    if (!navItem.children || navItem.children.length === 0) {
                        return (
                            <NavigationMenuItem key={navItem.label}>
                                <LinkItem label={navItem.label} to={navItem.to} />
                            </NavigationMenuItem>
                        );
                    }
                    return <DropdownLinkItem key={navItem.label} children={navItem.children} label={navItem.label} />;
                })}
            </NavigationMenuList>
        </NavigationMenu>
    );
};

const DropdownLinkItem = ({ children, label }: DropdownLinkItemType) => {
    return (
        <NavigationMenuItem>
            <NavigationMenuTrigger>{label.charAt(0).toUpperCase() + label.slice(1)}</NavigationMenuTrigger>
            <NavigationMenuContent>
                {/* Structural setup matching the list layout */}
                <ul className="grid w-[400px] gap-1 p-3">
                    {children.map((child) => (
                        <li key={child.label}>
                            <NavigationMenuLink asChild className="flex-row">
                                <Link
                                    to={child.to}
                                    params={{ category: label, subCategory: child.label }}
                                    className="flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-accent hover:text-accent-foreground group text-left"
                                >
                                    {/* Thumbnail Image Container */}
                                    {child.image && (
                                        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md border border-border flex items-center justify-center bg-muted">
                                            <img
                                                src={getStrapiMedia(child.image)}
                                                alt={child.label}
                                                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
                                            />
                                        </div>
                                    )}

                                    {/* Text Layout */}
                                    <div className="flex-1 space-y-0.5">
                                        <div className="text-sm font-semibold tracking-wide">
                                            {child.label}
                                        </div>
                                        {child.description && (
                                            <p className="text-xs text-muted-foreground font-light leading-relaxed line-clamp-2">
                                                {child.description}
                                            </p>
                                        )}
                                    </div>

                                    {/* Right chevron indicator */}
                                    <ChevronRightIcon className="h-4 w-4 opacity-50 transition-transform group-hover:translate-x-0.5" />
                                </Link>
                            </NavigationMenuLink>
                        </li>
                    ))}
                </ul>
            </NavigationMenuContent>
        </NavigationMenuItem>
    );
};

const LinkItem = ({ label, to, className }: LinkItemType) => {
    return (
        <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), className)}>
            <Link to={to}>{label.charAt(0).toUpperCase() + label.slice(1)}</Link>
        </NavigationMenuLink>
    );
};

const ChevronRightIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);

export default Header;