import { cn } from "#/lib/utils"
import type { ReactNode } from "react"

interface ContainerProps {
    children?: ReactNode
    className?: string
}

const Container = ({ children, className }: ContainerProps) => {
    return (
        <div className={cn("container mx-auto px-8 py-8", className)}>{children}</div>
    )
}

export default Container