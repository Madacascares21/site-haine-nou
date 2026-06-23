import { Link } from '@tanstack/react-router'
import { UserAuthForm } from './user-auth-form'
import { FieldDescription } from '@/components/ui/field'



export function AuthenticationPage() {
    return (
        <div className=" px-12 sm:px-4 py-8 flex-1  flex  min-h-screen">
            {/* <Link
        to="/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute top-4 right-4 md:top-8 md:right-8"
        )}
      >
        Login
      </Link> */}
            <div className="flex-1  relative hidden  h-full flex-col p-10 text-primary lg:flex dark:border-r ">
                <div className="absolute inset-0 bg-primary/5" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-6 w-6"
                    >
                        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                    </svg>
                    Acme Inc
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="leading-normal text-balance">
                        &ldquo;This library has saved me countless hours of work and
                        helped me deliver stunning designs to my clients faster than ever
                        before.&rdquo; - Sofia Davis
                    </blockquote>
                </div>
            </div>
            <div className="flex flex-1 items-center justify-center  lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center gap-6 sm:w-[350px]">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Welcome
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Use your email or Google account to continue.
                        </p>
                    </div>
                    <UserAuthForm />
                    <FieldDescription className="px-6 text-center">
                        By clicking continue, you agree to our{" "}
                        <Link to="/">Terms of Service</Link> and{" "}
                        <Link to="/">Privacy Policy</Link>.
                    </FieldDescription>
                </div>
            </div>
        </div>
    )
}
