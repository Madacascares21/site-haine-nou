import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'

const LoginButton = () => {
    return (
        <Link className={cn(buttonVariants({ variant: "default" }))} to='/sign-in'>Get started</Link>
    )
}

export default LoginButton
