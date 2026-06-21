import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, ShoppingCart, ChevronDown, User, LogOut, Settings } from 'lucide-react'

// shadcn/ui component imports
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function HeaderNavigation() {
    const [isOpen, setIsOpen] = useState(false)

    // Standard TanStack active/inactive link styling configurations
    const activeProps = { className: "text-indigo-600 font-semibold text-sm px-4 py-2" }
    const inactiveProps = { className: "text-gray-600 hover:text-gray-900 font-medium text-sm transition px-4 py-2" }

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* Left: Brand & Desktop Nav */}
                    <div className="flex items-center space-x-6">
                        <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-indigo-600 tracking-tight">
                            <span className="bg-indigo-600 text-white p-1.5 rounded-lg">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </span>
                            <span>BrandName</span>
                        </Link>

                        {/* Desktop Navigation via shadcn NavigationMenu */}
                        <div className="hidden md:flex items-center">
                            <NavigationMenu>
                                <NavigationMenuList className="space-x-1">

                                    <NavigationMenuItem>
                                        <Link to="/dashboard" activeProps={activeProps} inactiveProps={inactiveProps}>
                                            Dashboard
                                        </Link>
                                    </NavigationMenuItem>

                                    {/* Features Dropdown */}
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger className="text-gray-600 font-medium text-sm bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
                                            Features
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-1">
                                                <li>
                                                    <NavigationMenuLink asChild>
                                                        <Link to="/features/analytics" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                                            <div className="text-sm font-medium leading-none">Analytics</div>
                                                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">Track app metrics and visitor conversions in real-time.</p>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                                <li>
                                                    <NavigationMenuLink asChild>
                                                        <Link to="/features/automation" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                                            <div className="text-sm font-medium leading-none">Automation</div>
                                                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">Build conditional logic flows to trigger system tasks automatically.</p>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem>
                                        <Link to="/pricing" activeProps={activeProps} inactiveProps={inactiveProps}>
                                            Pricing
                                        </Link>
                                    </NavigationMenuItem>

                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    </div>

                    {/* Right: Cart, User Popover, Mobile Hamburger */}
                    <div className="flex items-center space-x-2">

                        {/* Cart Button */}
                        <Button variant="ghost" size="icon" asChild className="relative rounded-full text-gray-600 hover:text-gray-900">
                            <Link to="/cart">
                                <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                                    3
                                </span>
                                <ShoppingCart className="w-5 h-5" />
                            </Link>
                        </Button>

                        {/* User Profile Popover */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full bg-gray-100 p-0 overflow-hidden focus-visible:ring-2 focus-visible:ring-indigo-500">
                                    <img
                                        className="h-full w-full object-cover"
                                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                                        alt="User avatar"
                                    />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-56 mt-2 rounded-xl" align="end">
                                <div className="flex flex-col space-y-1 border-b pb-2 mb-2">
                                    <p className="text-sm font-medium text-gray-900 leading-none">Sarah Jenkins</p>
                                    <p className="text-xs text-muted-foreground leading-none">sarah.j@example.com</p>
                                </div>
                                <div className="space-y-1">
                                    <Button variant="ghost" size="sm" className="w-full justify-start font-normal" asChild>
                                        <Link to="/profile"><User className="mr-2 h-4 w-4" /> Your Profile</Link>
                                    </Button>
                                    <Button variant="ghost" size="sm" className="w-full justify-start font-normal" asChild>
                                        <Link to="/settings"><Settings className="mr-2 h-4 w-4" /> Settings</Link>
                                    </Button>
                                    <div className="border-t my-1" />
                                    <Button variant="ghost" size="sm" className="w-full justify-start font-medium text-red-600 hover:bg-red-50 hover:text-red-600">
                                        <LogOut className="mr-2 h-4 w-4" /> Sign out
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>

                        {/* Mobile Sheet (Drawer Menu) */}
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden text-gray-600">
                                    <Menu className="w-6 h-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] sm:w-[350px] pt-12">
                                <SheetHeader className="sr-only">
                                    <SheetTitle>Navigation Menu</SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col space-y-4">
                                    <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-700 hover:text-gray-900 border-b pb-2">
                                        Dashboard
                                    </Link>

                                    {/* Collapsible Section for Mobile Dropdown Menu items */}
                                    <div className="flex flex-col space-y-2">
                                        <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">Features</p>
                                        <Link to="/features/analytics" onClick={() => setIsOpen(false)} className="pl-4 py-1 text-base text-gray-600 hover:text-gray-900">
                                            Analytics
                                        </Link>
                                        <Link to="/features/automation" onClick={() => setIsOpen(false)} className="pl-4 py-1 text-base text-gray-600 hover:text-gray-900">
                                            Automation
                                        </Link>
                                    </div>

                                    <Link to="/pricing" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-700 hover:text-gray-900 border-t pt-2">
                                        Pricing
                                    </Link>
                                </div>
                            </SheetContent>
                        </Sheet>

                    </div>
                </div>
            </div>
        </nav>
    )
}