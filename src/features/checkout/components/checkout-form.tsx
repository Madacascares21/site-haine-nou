
import { FieldError } from "#/components/ui/field"
import { useCartStore } from "#/features/cart/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useForm } from "@tanstack/react-form"
import { useNavigate } from "@tanstack/react-router"
import { CreditCard, Truck } from "lucide-react"
import { toast } from "sonner"
import { checkoutSchema } from "../schema"
import { createOrderServerFn } from "../server/checkout"
import type { CheckoutFormValues } from "../type"



const shippingOptions = [
    { id: "standard", label: "Livrare standard", description: "2-4 zile lucrătoare", price: 19.99 },
    { id: "free", label: "Ridicare personala", description: "Disponibil azi", price: 0 },
]

// 1. Define the Zod schema with conditional validation for card info


export function CheckoutForm() {
    const navigate = useNavigate()
    const { items } = useCartStore()
    const form = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            phone: "",
            address: "",
            city: "",
            zip: "",
            shippingMethod: "standard",
            payment: "ramburs",

        } as CheckoutFormValues,

        validators: {
            onSubmit: checkoutSchema,
        },

        onSubmit: async ({ value }) => {


            if (items.length === 0) {
                return  toast.error("Trebuie sa ai cel putin un produs in cos!")
            }

            const response = await createOrderServerFn({ data: { ...value, cartItems: items } })
            if (response.success) {
                toast.success(response.message)
                navigate({
                    to: '/orders',
                    reloadDocument: true
                });
            } else {

                toast.error(response.message)
                throw new Error(response.message)
            }

        },



    })

    return (
        <form.Subscribe selector={(state) => state.isSubmitted}>


            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
                className="flex flex-col gap-8"
            >
                {/* Contact Section */}
                <section className="rounded-xl border border-border bg-card p-6">
                    <h2 className="text-lg font-semibold text-card-foreground">
                        Contact
                    </h2>

                    <div className="mt-4 grid gap-4">
                        <div className="grid gap-2 sm:grid-cols-2">
                            <form.Field name="firstName">
                                {(field) => (
                                    <div className="grid gap-2">
                                        <Label htmlFor={field.name}>Prenume</Label>

                                        <Input
                                            id={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(e.target.value)
                                            }
                                        />

                                        {field.state.meta.errors.length > 0 && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </div>
                                )}
                            </form.Field>

                            <form.Field name="lastName">
                                {(field) => (
                                    <div className="grid gap-2">
                                        <Label htmlFor={field.name}>Nume</Label>

                                        <Input
                                            id={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(e.target.value)
                                            }
                                        />

                                        {field.state.meta.errors.length > 0 && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </div>
                                )}
                            </form.Field>
                        </div>

                        <form.Field name="phone">
                            {(field) => (
                                <div className="grid gap-2">
                                    <Label htmlFor={field.name}>Telefon</Label>

                                    <Input
                                        id={field.name}
                                        type="tel"
                                        placeholder="07xx xxx xxx"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) =>
                                            field.handleChange(e.target.value)
                                        }
                                    />

                                    {field.state.meta.errors.length > 0 && (
                                        <FieldError errors={field.state.meta.errors} />
                                    )}
                                </div>
                            )}
                        </form.Field>
                    </div>
                </section>

                {/* Shipping Address */}
                <section className="rounded-xl border border-border bg-card p-6">
                    <h2 className="text-lg font-semibold text-card-foreground">
                        Adresă de livrare
                    </h2>

                    <div className="mt-4 grid gap-4">
                        <form.Field name="address">
                            {(field) => (
                                <div className="grid gap-2">
                                    <Label htmlFor={field.name}>Adresă</Label>

                                    <Input
                                        id={field.name}
                                        placeholder="Stradă, număr"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) =>
                                            field.handleChange(e.target.value)
                                        }
                                    />

                                    {field.state.meta.errors.length > 0 && (
                                        <FieldError errors={field.state.meta.errors} />
                                    )}
                                </div>
                            )}
                        </form.Field>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <form.Field name="city">
                                {(field) => (
                                    <div className="grid gap-2 sm:col-span-2">
                                        <Label htmlFor={field.name}>Oraș</Label>

                                        <Input
                                            id={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(e.target.value)
                                            }
                                        />

                                        {field.state.meta.errors.length > 0 && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </div>
                                )}
                            </form.Field>

                            <form.Field name="zip">
                                {(field) => (
                                    <div className="grid gap-2">
                                        <Label htmlFor={field.name}>Cod poștal</Label>

                                        <Input
                                            id={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(e.target.value)
                                            }
                                        />

                                        {field.state.meta.errors.length > 0 && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </div>
                                )}
                            </form.Field>
                        </div>
                    </div>
                </section>

                {/* Shipping Method */}
                <section className="rounded-xl border border-border bg-card p-6">
                    <div className="flex items-center gap-2">
                        <Truck className="h-5 w-5 text-muted-foreground" />
                        <h2 className="text-lg font-semibold text-card-foreground">
                            Metodă de livrare
                        </h2>
                    </div>

                    <form.Field name="shippingMethod">
                        {(field) => (
                            <RadioGroup
                                value={field.state.value}
                                onValueChange={(value) =>
                                    field.handleChange(
                                        value as CheckoutFormValues["shippingMethod"]
                                    )
                                }
                                className="mt-4 grid gap-3"
                            >
                                {shippingOptions.map((option) => (
                                    <Label
                                        key={option.id}
                                        htmlFor={`ship-${option.id}`}
                                        className="flex cursor-pointer items-center justify-between rounded-lg border border-border p-4 transition-colors has-checked:border-primary has-checked:bg-accent"
                                    >
                                        <div className="flex items-center gap-3">
                                            <RadioGroupItem
                                                id={`ship-${option.id}`}
                                                value={option.id}
                                            />

                                            <div>
                                                <p className="text-sm font-medium text-card-foreground">
                                                    {option.label}
                                                </p>

                                                <p className="text-xs text-muted-foreground">
                                                    {option.description}
                                                </p>
                                            </div>
                                        </div>

                                        <span className="text-sm font-semibold text-card-foreground">
                                            {option.price === 0
                                                ? "Gratuit"
                                                : `${option.price.toFixed(2)} RON`}
                                        </span>
                                    </Label>
                                ))}
                            </RadioGroup>
                        )}
                    </form.Field>
                </section>

                {/* Payment */}
                <section className="rounded-xl border border-border bg-card p-6">
                    <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <h2 className="text-lg font-semibold text-card-foreground">
                            Plată
                        </h2>
                    </div>

                    <form.Field name="payment">
                        {(field) => (
                            <RadioGroup
                                value={field.state.value}
                                onValueChange={(value) =>
                                    field.handleChange(
                                        value as CheckoutFormValues["payment"]
                                    )
                                }
                                className="mt-4 grid gap-3"
                            >
                                <Label
                                    htmlFor="pay-ramburs"
                                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4 transition-colors has-checked:border-primary has-checked:bg-accent"
                                >
                                    <RadioGroupItem
                                        id="pay-ramburs"
                                        value="ramburs"
                                    />

                                    <span className="text-sm font-medium text-card-foreground">
                                        Ramburs la livrare
                                    </span>
                                </Label>
                            </RadioGroup>
                        )}
                    </form.Field>
                </section>

                <form.Subscribe
                    selector={(state) => [
                        state.canSubmit,
                        state.isSubmitting,
                    ]}
                >
                    {([canSubmit, isSubmitting]) => (
                        <Button
                            type="submit"
                            size="lg"
                            className="w-full"
                            disabled={!canSubmit || isSubmitting}
                        >
                            {isSubmitting
                                ? "Se trimite..."
                                : "Plasează comanda"}
                        </Button>
                    )}
                </form.Subscribe>
            </form>


        </form.Subscribe>
    )
}