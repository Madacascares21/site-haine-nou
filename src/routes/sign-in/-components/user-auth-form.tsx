// import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { signIn } from "@/lib/auth-client"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import { formSchema } from "../-schemas/form-schema"
import { useState } from "react"
import GoogleProviderButton from "./google-provider-btn"

export function UserAuthForm({ }) {
  const [googleLoading, setGoogleLoading] = useState(false)
  const previousUrl = window.location.pathname 

  const form = useForm({
    defaultValues: {
      email: ""
    },
    validators: {
      onSubmit: formSchema,
      onChange: formSchema
    },
    onSubmit: async ({ value }) => {
      const { data, error } = await signIn.magicLink({
        email: value.email,
        callbackURL: `/checkout`,
        errorCallbackURL: "/error",
      })

      if (!data?.status) {
        toast.error(error?.message)
      }

      toast.success("Verifică emailul tău 😁👍!")
    },
  })

  return (
    <div className={"grid gap-6"}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup>

          <form.Field
            name="email"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    className="sr-only"
                    htmlFor={field.name}
                  >
                    Email
                  </FieldLabel>

                  <Input
                    type="email"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="nume@exemplu.com"
                    autoComplete="email"
                    autoCorrect="off"
                    autoCapitalize="none"
                  />

                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )
            }}
          />

          <form.Subscribe
            selector={(state) => [
              state.canSubmit,
              state.isSubmitting,
              state.isSubmitted,
            ]}
            children={([canSubmit, isSubmitting, isSubmitted]) => (
              <Button
                type="submit"
                disabled={!canSubmit || googleLoading || isSubmitted}
              >
                {isSubmitting ? (
                  <Spinner />
                ) : isSubmitted ? (
                  "Email trimis"
                ) : (
                  "Continuă cu email"
                )}
              </Button>
            )}
          />

        </FieldGroup>
      </form>

      <FieldSeparator>
        Sau continuă cu
      </FieldSeparator>

      <GoogleProviderButton
        loading={googleLoading}
        setLoading={setGoogleLoading}
      />
    </div>
  )
}