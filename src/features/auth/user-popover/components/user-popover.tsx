import { useState } from "react"
import { User } from "lucide-react"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from "@/components/ui/button"
import { useSession } from "@/lib/auth-client"
import { Spinner } from "@/components/ui/spinner"

import { UserAvatar } from "./user-avatar"
import { UserMenuContent } from "./user-menu-content"
import { SettingsDialog } from "./settings-dialog"
import LoginButton from "@/routes/sign-in/-components/login-btn"

export function UserPopover() {
    const [popoverOpen, setPopoverOpen] = useState(false)
    const [settingsOpen, setSettingsOpen] = useState(false)

    const { isPending, data } = useSession()

    if (isPending) {
        return <Spinner />
    }

    // Not logged in
    if (!data) {
        return (
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full"
                        aria-label="Open login menu"
                    >
                        <User className="size-5" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent align="end" className="w-64">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium">Welcome</h4>
                            <p className="text-sm text-muted-foreground">
                                Log in to get started and access your account.
                            </p>
                        </div>

                        <LoginButton />
                    </div>
                </PopoverContent>
            </Popover>
        )
    }

    const user = {
        email: data.user.email || "",
        name: data.user.name || "",
        image: data.user.image || "",
    }

    return (
        <>
            <Popover
                open={popoverOpen}
                onOpenChange={setPopoverOpen}
            >
                <PopoverTrigger asChild>
                    <Button
                        variant="ghost"
                        className="h-10 w-10 rounded-full p-0"
                        aria-label="Open user menu"
                    >
                        <UserAvatar
                            name={user.name}
                            image={user.image}
                            className="size-8"
                        />
                    </Button>
                </PopoverTrigger>

                <PopoverContent
                    align="end"
                    className="w-64 p-0"
                >
                    <UserMenuContent
                        user={user}
                        onSettings={() => {
                            setPopoverOpen(false)
                            setSettingsOpen(true)
                        }}
                    />
                </PopoverContent>
            </Popover>

            <SettingsDialog
                open={settingsOpen}
                onOpenChange={setSettingsOpen}
                user={user}
            />
        </>
    )
}