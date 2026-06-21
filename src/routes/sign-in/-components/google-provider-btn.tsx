import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { signIn, signOut } from "@/lib/auth-client"

const GoogleProviderButton = ({ loading, setLoading }: { loading: boolean, setLoading: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const handleClick = async () => {
        setLoading(true)
        await signIn.social({
            provider: "google",
        });
        setLoading(false)
    }
    return (
        <Button variant={"secondary"} onClick={handleClick} disabled={loading}>
            {loading ? <Spinner /> : "Google"}
        </Button>
    )
}

export default GoogleProviderButton
