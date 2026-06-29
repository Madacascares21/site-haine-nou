import { cn } from "#/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import LogOutButton from "@/routes/sign-in/-components/logout-btn"
import { Link } from "@tanstack/react-router"
import { MessageCircleHeart, Settings } from "lucide-react"
import type { User } from "../types/types"
import { UserAvatar } from "./user-avatar"

interface Props {
  user: User
  onSettings: () => void
}

export function UserMenuContent({
  user,
  onSettings,
}: Props) {
  return (
    <>
      <div className="flex items-center gap-3 p-4">
        <UserAvatar
          name={user.name}
          image={user.image}
          className="h-12 w-12"
        />

        <div className="overflow-hidden">
          <p className="truncate font-medium">
            {user.name}
          </p>

          <p className="truncate text-sm text-muted-foreground">
            {user.email}
          </p>
        </div>
      </div>

      <Separator />

      <div className="p-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={onSettings}
        >
          <Settings className="h-4 w-4" />
          Settings
        </Button>
        <Link
          to="/orders"
          className={cn(buttonVariants({

            variant: "ghost"
          }), "w-full justify-start gap-2")}
        >
          <MessageCircleHeart className="h-4 w-4" />
          Orders
        </Link>

        {/* <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-destructive"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button> */}
        <LogOutButton />
      </div>
    </>
  )
}