import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contact/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/contact/"!</div>
}
import { Mail, MapPin, Phone } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ContactForm } from './-components/form'

const details = [
    {
        icon: Mail,
        label: "Email",
        value: "contact@auxload-store.ro",
    },
    {
        icon: Phone,
        label: "Phone",
        value: "+1 (555) 000-1234",
    },
    {
        icon: MapPin,
        label: "Office",
        value: "500 Market St, San Francisco",
    },
]

export default function Page() {
    return (
        <main className="min-h-screen bg-background px-4 py-12 md:py-20">
            <div className="mx-auto grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
                <section className="flex flex-col justify-center gap-8">
                    <header className="space-y-3">
                        <p className="text-sm font-medium text-muted-foreground">Get in touch</p>
                        <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
                            Doresti sa ne contactezi?
                        </h1>
                        <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
                            Completează formularul de contact și echipa noastră te va răspunde în cel mai scurt timp posibil. Suntem aici să te ajutăm cu orice întrebări sau nelămuriri ai avea.
                        </p>
                    </header>

                    <ul className="flex flex-col gap-4">
                        {details.map(({ icon: Icon, label, value }) => (
                            <li key={label} className="flex items-center gap-4">
                                <span className="flex size-11 items-center justify-center rounded-lg border bg-card">
                                    <Icon className="size-5 text-foreground" aria-hidden="true" />
                                </span>
                                <span className="flex flex-col">
                                    <span className="text-xs uppercase tracking-wide text-muted-foreground">
                                        {label}
                                    </span>
                                    <span className="text-sm font-medium">{value}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>

                <Card className="border-border/60 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl">Trimite-ne un mesaj</CardTitle>
                        <CardDescription>Ne vom asigura că detaliile tale nu vor fi partajate cu nimeni altcineva.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ContactForm />
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
