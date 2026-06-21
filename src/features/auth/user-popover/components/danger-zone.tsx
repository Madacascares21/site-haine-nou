import { useState } from "react"
import { useForm } from "@tanstack/react-form"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"
import { deleteUser } from "@/lib/auth-client"
import { AlertTriangle, Trash2 } from "lucide-react"
import { toast } from "sonner"

export function DangerZone() {
  const [open, setOpen] = useState(false)

  const form = useForm({
    defaultValues: {},

    onSubmit: async () => {
      await deleteUser({
        callbackURL: "/goodbye",
      })

      toast.warning(
        "Check your email to delete your account!"
      )

      // close AFTER submit succeeds
      setOpen(false)
    },
  })

  return (
    <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
      <div className="flex gap-3">
        <AlertTriangle className="h-5 w-5 text-destructive" />

        <div className="space-y-2">
          <h4 className="font-medium text-destructive">
            Danger Zone
          </h4>

          <p className="text-sm text-muted-foreground">
            This action cannot be undone.
          </p>

          <AlertDialog
            open={open}
            onOpenChange={setOpen}
          >
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  Your account will be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>
                  Cancel
                </AlertDialogCancel>

                <form.Subscribe
                  selector={(state) => [
                    state.isSubmitting,
                  ]}
                  children={([isSubmitting]) => (
                    <AlertDialogAction
                      onClick={(e) => {
                        e.preventDefault()
                        form.handleSubmit()
                      }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? "Deleting..."
                        : "Delete"}
                    </AlertDialogAction>
                  )}
                />
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
}