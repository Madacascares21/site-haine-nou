import { useForm } from "@tanstack/react-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserAvatar } from "../user-avatar"

import { updateUser } from "@/lib/auth-client"
import { useEffect, useState } from "react"
import type { User } from "../../types/types"
import { FieldError } from "@/components/ui/field"

interface Props {
    user: User
    onClose: () => void
}

interface FormValues {
    name: string
    imageFile: File | null
}

export const accountInfoSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters.")
        .max(50, "Name must be less than 50 characters.")
        .trim(),

    imageFile: z
        .instanceof(File)
        .nullable()
        .refine(
            (file) => !file || file.size <= MAX_FILE_SIZE,
            "Max image size is 4MB."
        )
        .refine(
            (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
            "Only .jpg, .png, .webp and .gif formats are supported."
        ),
})

const MAX_FILE_SIZE = 4 * 1024 * 1024 // 4MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"]

export function AccountInfoTab({
    user,
    onClose,
}: Props) {
    const [preview, setPreview] = useState<string | null>(null)

    const form = useForm({
        validators: {
            onSubmit: accountInfoSchema,
            onChange: accountInfoSchema
        },
        defaultValues: {
            name: user.name,
            imageFile: null,
        } as FormValues,

        onSubmit: async ({ value }) => {
            let imageUrl = user.image

            if (value.imageFile) {
                const formData = new FormData()
                formData.append("file", value.imageFile)

                const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                })

                const data = await res.json()
                imageUrl = data.url
            }

            await updateUser({
                name: value.name,
                image: imageUrl,
            })

            // onClose()
        },
    })

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview)
        }
    }, [preview])

    return (
        <form
            className="space-y-6"
            onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
            }}
        >
            {/* 1. File Upload Field Ecosystem */}
            <form.Field
                name="imageFile"
                validators={{
                    onChange: z.instanceof(File)
                        .nullable()
                        .refine((file) => !file || file.size <= MAX_FILE_SIZE, "Max image size is 4MB.")
                        .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), "Only .jpg, .png, .webp and .gif formats are supported.")
                }}
                children={(field) => (
                    <div className="space-y-2">
                        <div className="flex items-center gap-4">
                            <UserAvatar
                                name={user.name}
                                image={preview || user.image}
                                className="h-16 w-16"
                            />

                            <div>
                                <input
                                    id={field.name}
                                    name={field.name}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onBlur={field.handleBlur}
                                    onChange={(e) => {
                                        const file = e.target.files?.[0] || null
                                        field.handleChange(file)

                                        if (file) {
                                            // Curăță preview-ul vechi dacă exista deja unul activ
                                            if (preview) URL.revokeObjectURL(preview)

                                            setPreview(URL.createObjectURL(file))
                                        } else {
                                            if (preview) URL.revokeObjectURL(preview)
                                            setPreview(null)
                                        }
                                    }}
                                />

                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        document
                                            .getElementById(field.name)
                                            ?.click()
                                    }}
                                >
                                    Change photo
                                </Button>
                            </div>
                        </div>

                        {/* Render image file validation errors if present */}
                        {field.state.meta.errors.length > 0 && (
                            <FieldError errors={field.state.meta.errors} />
                        )}
                    </div>
                )}
            />

            <div className="space-y-4">
                {/* 2. Text Input Name Field */}
                <form.Field
                    name="name"
                    validators={{
                        onChange: z.string()
                            .min(2, "Name must be at least 2 characters.")
                            .max(50, "Name must be less than 50 characters.")
                            .trim()
                    }}
                    children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

                        return (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>
                                    Name
                                </Label>

                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />

                                {/* Render text configuration validation errors if present */}
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </div>
                        )
                    }}
                />

                <div className="space-y-2">
                    <Label>Email</Label>
                    <Input disabled={true} defaultValue={user.email} />
                </div>
            </div>

            <div className="flex justify-end gap-2">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                >
                    Cancel
                </Button>

                <form.Subscribe
                    selector={(state) => [
                        state.canSubmit,
                        state.isSubmitting,
                        state.isDirty, // Subscribed to look for form changes
                    ]}
                    children={([canSubmit, isSubmitting, isDirty]) => (
                        <Button
                            type="submit"
                            disabled={!canSubmit || isSubmitting || !isDirty}
                        >
                            {isSubmitting ? "Saving..." : "Save changes"}
                        </Button>
                    )}
                />
            </div>
        </form>
    )
}