import Container from '#/components/container'
import { Button } from '#/components/ui/button'
import { Card, CardContent, CardHeader } from '#/components/ui/card'
import { Separator } from '#/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '#/components/ui/tooltip'
import { formatPrice, getStrapiMedia } from '#/lib/utils'
import { getRouteApi } from '@tanstack/react-router'
import { FileText, Info, Target } from 'lucide-react'

export default function OrderDetails() {
  const data = getRouteApi('/order/$id').useLoaderData()
  const order = data

  return (
    <main className='flex-1 min-h-screen'>
    <TooltipProvider>
      <Container >
        <Card
          className="
                    p-8
                "

        >

          {/* HEADER */}
          <CardHeader className="px-0 pt-0 pb-6">

            <div className="text-xs text-muted-foreground mb-3 tracking-wide">
              Home &gt; Orders &gt;{" "}
              <span className="text-foreground font-medium">
                ID {order.id}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Order ID: {order.id}
              </h1>

              <div className="flex gap-2.5">

                <Button
                  variant="outline"
                  className="h-10 gap-2"
                >
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  Invoice
                </Button>

                <Button
                  className="h-10 gap-2"
                >
                  Track order
                  <Target className="w-4 h-4" />
                </Button>

              </div>

            </div>

            <div className="flex gap-6 mt-4 text-sm text-muted-foreground">

              <span>
                Order date:{' '}
                <strong className="text-foreground font-medium">
                  {order.createdAt.toLocaleDateString('ro-RO')}
                </strong>
              </span>

              <span className="flex items-center gap-1.5 text-primary font-medium">

                <span className="inline-block transform -rotate-45">
                  ✈
                </span>

                Estimated delivery: "nush coaie"

              </span>

            </div>

          </CardHeader>

          <Separator className="border-border" />

          {/* PRODUCTS */}
          <CardContent className="px-0 py-6 flex flex-col gap-6">

            {order.products.map((product) => (

              <div
                key={product.product.documentId}
                className="flex gap-5 items-center"
              >

                <div className="w-16 h-16 bg-muted border border-border rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">

                  <img
                    className="w-full h-full object-cover"
                    src={getStrapiMedia(product.variant.media[0].url)}
                    alt={product.product.name}
                  />

                </div>

                <div className="flex justify-between items-center w-full">

                  <div>

                    <h2 className="text-base font-medium text-foreground">
                      {product.product.name}
                    </h2>

                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">

                      <span
                        className="inline-block h-3 w-3 rounded-full border border-border"
                        style={{
                          backgroundColor:
                            product.variant.color.color_code,
                        }}
                      />

                      <span className="capitalize">
                        {product.variant.color.name}
                      </span>

                      <span>·</span>

                      <span>
                        Mărime {product.variant.size.name}
                      </span>

                    </div>

                  </div>

                  <div className="text-right">

                    <span className="block text-base font-semibold text-foreground">
                      {formatPrice(
                        product.product.pricing.final_price
                      )}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      Qty: {product.quantity}
                    </span>

                  </div>

                </div>

              </div>

            ))}

          </CardContent>

          <Separator className="border-border" />

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 pt-8">

            {/* LEFT */}
            <div className="md:col-span-7 flex flex-col justify-between gap-10">

              <div className="grid grid-cols-2 gap-6">

                <div>

                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Payment
                  </h3>

                  <div className="text-sm text-muted-foreground">
                    {order.paymentMethod}
                  </div>

                </div>

                <div>

                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Delivery
                  </h3>

                  <address className="not-italic text-sm text-muted-foreground leading-relaxed space-y-0.5">

                    {order.address}
                    <br />
                    {order.city}
                    <br />
                    {order.phone}

                  </address>

                  <div className="mt-4">

                    <span className="text-xs text-muted-foreground">
                      Delivery method
                    </span>

                    <p className="text-sm text-foreground mt-0.5">
                      {order.shippingMethod}
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT */}
            <div className="md:col-span-5">

              <h3 className="text-sm font-semibold text-foreground mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 text-sm text-muted-foreground">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-foreground font-medium">
                    {formatPrice(Number(order.total))}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1">
                    Delivery
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Standard shipping calculation
                      </TooltipContent>
                    </Tooltip>
                  </span>

                  <span className="text-foreground font-medium">
                    $0
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1">
                    Tax
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Calculated VAT/Sales Tax
                      </TooltipContent>
                    </Tooltip>
                  </span>

                  <span className="text-foreground font-medium">
                    +$0
                  </span>
                </div>

              </div>

              <Separator className="border-border my-4 border-dashed" />

              <div className="flex justify-between items-center">

                <span className="text-base font-medium text-foreground">
                  Total
                </span>

                <span className="text-2xl font-bold tracking-tight text-foreground">
                  {formatPrice(Number(order.total))}
                </span>

              </div>

            </div>

          </div>

        </Card>
      </Container>

    </TooltipProvider></main>
  )
}