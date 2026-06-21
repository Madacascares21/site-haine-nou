import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

interface UserAvatarProps {
    name: string
    image?: string
    className?: string
}

export function UserAvatar({
    name,
    image,
    className,
}: UserAvatarProps) {
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()

    return (
        <Avatar className={className}>
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
    )
}