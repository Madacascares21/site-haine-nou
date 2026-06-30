import { Link } from '@tanstack/react-router'
import { UserAuthForm } from './user-auth-form'
import { FieldDescription } from '@/components/ui/field'
import Container from '#/components/container'

export function AuthenticationPage() {
    return (
        <main className='  min-h-screen flex-1 flex'>
            <Container className='flex'>
          

            <div className="flex flex-1 items-center justify-center lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center gap-6 sm:w-[350px]">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Bun venit
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Folosește adresa de email sau contul Google pentru a continua.
                        </p>
                    </div>

                    <UserAuthForm />

                    <FieldDescription className="px-6 text-center">
                        Continuând, ești de acord cu{" "}
                        <Link to="/">Termenii și condițiile</Link>{" "}
                        și{" "}
                        <Link to="/">Politica de confidențialitate</Link>.
                    </FieldDescription>
                </div>
            </div>
            </Container>
        </main>
    )
}