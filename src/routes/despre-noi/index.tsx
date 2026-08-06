import { BrandStorySection } from '#/components/about-us'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/despre-noi/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div><BrandStorySection /></div>
}
