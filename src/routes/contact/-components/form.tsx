"use client"

import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { CheckCircle2, Loader2, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { z } from "zod";
import { contactUsServerFn } from "../-server/contact.function"

export const contactFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Please enter a valid email address"),
    subject: z.string().min(1, "Subject is required"),
    message: z.string().min(1, "Message is required"),
});

export type ContactForm = z.infer<typeof contactFormSchema>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type FieldError = string | { message?: string } | undefined

type FieldErrorsProps = {
    errors: Array<FieldError>
}

function FieldErrors({ errors }: FieldErrorsProps) {
    const visible = errors
        .map((error) => {
            if (!error) return undefined
            if (typeof error === "string") return error
            if (typeof error === "object" && "message" in error) return String(error.message)
            return String(error)
        })
        .filter(Boolean) as string[]

    if (visible.length === 0) return null
    return (
        <p className="text-sm text-destructive" role="alert">
            {visible[0]}
        </p>
    )
}

export function ContactForm() {
    const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null)

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
        validators: {
            onSubmit: contactFormSchema,
            onChange: contactFormSchema
        }
        ,
        onSubmit: async ({ value, formApi }) => {
            const result = await contactUsServerFn({ data: value })
            setStatus(result)
            if (result.ok) {
                formApi.reset()
            }
        },
    })

    if (status?.ok) {
        return (
            <div className="flex flex-col items-center gap-4 py-10 text-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="size-7 text-primary" aria-hidden="true" />
                </div>
                <div className="space-y-1">
                    <h3 className="text-lg font-semibold">Mesaj trimis</h3>
                    <p className="text-sm text-muted-foreground text-pretty">{status.message}</p>
                </div>
                <Button variant="outline" onClick={() => setStatus(null)}>
                    Trimite un alt mesaj
                </Button>
            </div>
        )
    }

    return (
        <form
            noValidate
            onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                void form.handleSubmit()
            }}
            className="flex flex-col gap-5"
        >
            <form.Field
                name="name"
                validators={{
                    onChange: ({ value }) =>
                        !value.trim()
                            ? "Name is required"
                            : value.trim().length < 2
                                ? "Name must be at least 2 characters"
                                : undefined,
                }}
            >
                {(field) => (
                    <div className="flex flex-col gap-2">
                        <Label htmlFor={field.name}>Name</Label>
                        <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Jane Doe"
                            autoComplete="name"
                            aria-invalid={field.state.meta.errors.length > 0}
                        />
                        <FieldErrors errors={field.state.meta.errors} />
                    </div>
                )}
            </form.Field>

            <form.Field
                name="email"
                validators={{
                    onChange: ({ value }) =>
                        !value.trim()
                            ? "Email is required"
                            : !emailRegex.test(value.trim())
                                ? "Enter a valid email address"
                                : undefined,
                }}
            >
                {(field) => (
                    <div className="flex flex-col gap-2">
                        <Label htmlFor={field.name}>Email</Label>
                        <Input
                            id={field.name}
                            name={field.name}
                            type="email"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="jane@example.com"
                            autoComplete="email"
                            aria-invalid={field.state.meta.errors.length > 0}
                        />
                        <FieldErrors errors={field.state.meta.errors} />
                    </div>
                )}
            </form.Field>

            <form.Field
                name="subject"
                validators={{
                    onChange: ({ value }) =>
                        !value.trim()
                            ? "Subject is required"
                            : value.trim().length < 3
                                ? "Subject must be at least 3 characters"
                                : undefined,
                }}
            >
                {(field) => (
                    <div className="flex flex-col gap-2">
                        <Label htmlFor={field.name}>Subject</Label>
                        <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="How can we help?"
                            aria-invalid={field.state.meta.errors.length > 0}
                        />
                        <FieldErrors errors={field.state.meta.errors} />
                    </div>
                )}
            </form.Field>

            <form.Field
                name="message"
                validators={{
                    onChange: ({ value }) =>
                        !value.trim()
                            ? "Message is required"
                            : value.trim().length < 10
                                ? "Message must be at least 10 characters"
                                : undefined,
                }}
            >
                {(field) => (
                    <div className="flex flex-col gap-2">
                        <Label htmlFor={field.name}>Message</Label>
                        <Textarea
                            id={field.name}
                            name={field.name}
                            rows={5}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Tell us a bit more about what you need..."
                            aria-invalid={field.state.meta.errors.length > 0}
                            className="resize-none"
                        />
                        <FieldErrors errors={field.state.meta.errors} />
                    </div>
                )}
            </form.Field>

            {status && !status.ok ? (
                <p className="text-sm text-destructive" role="alert">
                    {status.message}
                </p>
            ) : null}

            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                    <Button type="submit" disabled={!canSubmit || isSubmitting} className="mt-1 w-full">
                        {isSubmitting ? (
                            <>
                                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                                Trimitere...
                            </>
                        ) : (
                            <>
                                <Send className="size-4" aria-hidden="true" />
                                Trimiti mesajul
                            </>
                        )}
                    </Button>
                )}
            </form.Subscribe>
        </form>
    )
}
