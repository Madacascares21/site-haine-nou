import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

const STORAGE_KEY = "cookie-notice-dismissed"

export function CookieNotice() {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (typeof window === "undefined") return

        const dismissed = localStorage.getItem(STORAGE_KEY)
        if (dismissed) return

        const timer = setTimeout(() => {
            setOpen(true)
        }, 3000)

        return () => clearTimeout(timer)
    }, [])

    function handleDismiss() {
        localStorage.setItem(STORAGE_KEY, "true")
        setOpen(false)
    }

    if (!open) return null

    return (
        <div className="fixed bottom-4 right-4 z-50 w-[360px] rounded-lg border bg-background p-4 shadow-lg animate-in fade-in-0 zoom-in-95">
            <h3 className="font-semibold mb-2">
                Cookie-uri esențiale
            </h3>

            <p className="text-sm text-muted-foreground">
                Acest site utilizează exclusiv cookie-uri esențiale pentru
                autentificare și păstrarea coșului de cumpărături. Nu folosim
                cookie-uri de analiză, marketing sau profilare.
            </p>

            <div className="mt-4 flex justify-end">
                <Button onClick={handleDismiss}>
                    Am înțeles
                </Button>
            </div>
        </div>
    )
}