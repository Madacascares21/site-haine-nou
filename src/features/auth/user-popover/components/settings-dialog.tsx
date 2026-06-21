import { useState } from "react"
import { Menu } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"

import { SettingsSidebar } from "./settings-sidebar"
import type { SettingsTab, User } from "../types/types"
import { AccountInfoTab } from "./tabs/account-info-tab"
import { SecurityTab } from "./tabs/security-tab"


interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User
}

export function SettingsDialog({
  open,
  onOpenChange,
  user,
}: Props) {
  const [activeTab, setActiveTab] =
    useState<SettingsTab>("info")

  const [sheetOpen, setSheetOpen] =
    useState(false)

  const currentTitle =
    activeTab === "info"
      ? "Account Info"
      : "Security"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-2xl">
        <div className="flex h-125">
          {/* Desktop Sidebar */}
          <aside className="hidden w-56 border-r bg-muted/30 md:flex md:flex-col">
            <div className="border-b p-4">
              <h2 className="font-semibold">
                Account Settings
              </h2>

              <p className="text-xs text-muted-foreground">
                Manage your account
              </p>
            </div>

            <SettingsSidebar
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          </aside>

          {/* Main Content */}
          <div className="flex flex-1 flex-col">
            {/* MOBILE HEADER */}
            <div className="flex items-center gap-2 border-b p-4 md:hidden">
              <Sheet
                open={sheetOpen}
                onOpenChange={setSheetOpen}
              >
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="left"
                  className="w-64 p-0"
                >
                  <div className="border-b p-4">
                    <h2 className="font-semibold">
                      Account Settings
                    </h2>
                  </div>

                  <SettingsSidebar
                    activeTab={activeTab}
                    onChange={(tab) => {
                      setActiveTab(tab)
                      setSheetOpen(false)
                    }}
                  />
                </SheetContent>
              </Sheet>

              <h2 className="font-semibold">
                {currentTitle}
              </h2>
            </div>

            {/* DESKTOP HEADER */}
            <DialogHeader className="hidden p-6 pb-0 md:block">
              <DialogTitle>
                {currentTitle}
              </DialogTitle>
            </DialogHeader>

            {/* CONTENT */}
            <main className="flex-1 overflow-y-auto p-6">
              {activeTab === "info" ? (
                <AccountInfoTab
                  user={user}
                  onClose={() => onOpenChange(false)}
                />
              ) : (
                <SecurityTab
                />
              )}
            </main>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}