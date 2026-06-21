import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { signOut } from "@/lib/auth-client"
import { useState } from "react"
import { useRouter } from "@tanstack/react-router"
import { LogOut } from "lucide-react"

const LogOutButton = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const handleClick = async () => {
        setLoading(true)
        await signOut()
        setLoading(false)
        await router.invalidate()

    }
    return (
        <Button variant={"ghost"} className="w-full justify-start gap-2 text-destructive" onClick={handleClick} disabled={loading}>
            {loading ? <Spinner /> : <><LogOut className="h-4 w-4" />
                Logout</>}
        </Button>
    )
}

export default LogOutButton

