export interface User {
  name: string
  email: string
  image?: string
}

export type SettingsTab = "info" | "security"