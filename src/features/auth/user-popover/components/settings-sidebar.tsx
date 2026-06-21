import { Button } from "@/components/ui/button"
import type { SettingsTab } from "../types/types"
import { SETTINGS_TABS } from "../constants/constants"

interface Props {
    activeTab: SettingsTab
    onChange: (tab: SettingsTab) => void
}

export function SettingsSidebar({
    activeTab,
    onChange,
}: Props) {
    return (
        <nav className="space-y-1 p-2">
            {SETTINGS_TABS.map((tab) => {
                const Icon = tab.icon

                return (
                    <Button
                        key={tab.id}
                        variant={
                            activeTab === tab.id
                                ? "secondary"
                                : "ghost"
                        }
                        className="w-full justify-start gap-2"
                        onClick={() => onChange(tab.id)}
                    >
                        <Icon className="h-4 w-4" />
                        {tab.label}
                    </Button>
                )
            })}
        </nav>
    )
}