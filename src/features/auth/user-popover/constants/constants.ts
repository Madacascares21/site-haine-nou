import { Shield, User } from "lucide-react"
import type { SettingsTab } from "../types/types"

export const SETTINGS_TABS: {
    id: SettingsTab
    label: string
    icon: any
}[] = [
        {
            id: "info",
            label: "Account Info",
            icon: User,
        },
        {
            id: "security",
            label: "Security",
            icon: Shield,
        },
        
    ]