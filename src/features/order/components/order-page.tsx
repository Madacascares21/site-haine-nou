import { Button } from '#/components/ui/button'
import { Card, CardContent, CardHeader } from '#/components/ui/card'
import { Separator } from '#/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '#/components/ui/tooltip'
import { formatPrice, getStrapiMedia } from '#/lib/utils'
import { getRouteApi } from '@tanstack/react-router'
import { FileText, Info, Target } from 'lucide-react'






export default function OrderDetails() {

  const data = getRouteApi("/order/$id").useLoaderData()


  const order = data
  // const discountAmount = order.summary.subtotal * order.summary.discountRate
  // const total = order.summary.subtotal - discountAmount + order.summary.deliveryFee + order.summary.tax

  return (
    <TooltipProvider>
      <Card className="w-full max-w-4xl mx-auto border-none shadow-none md:p-4 font-sans text-slate-800 bg-white">

        {/* Header Section */}
        <CardHeader className="px-0 pt-0 pb-6">
          <div className="text-xs text-slate-400 mb-3 tracking-wide">
            Home &gt; Orders &gt; <span className="text-slate-600 font-medium">ID {order.id}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Order ID: {order.id}</h1>
            <div className="flex gap-2.5">
              <Button variant="outline" className="h-10 bg-slate-50/50 border-slate-200 text-slate-700 font-medium gap-2">
                <FileText className="w-4 h-4 text-slate-400" />
                Invoice
              </Button>
              <Button className="h-10 bg-[#0087ff] hover:bg-[#0070d2] text-white font-medium gap-2 shadow-sm">
                Track order
                <Target className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-6 mt-4 text-sm text-slate-500">
            <span>Order date: <strong className="text-slate-700 font-medium">{order.createdAt.toLocaleDateString("ro-Ro")}</strong></span>
            <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
              <span className="inline-block transform -rotate-45">✈</span>
              Estimated delivery: "nush coaie"
            </span>
          </div>
        </CardHeader>

        <Separator className="bg-slate-100" />

        {/* Product List */}
        <CardContent className="px-0 py-6 flex flex-col gap-6">
          {order.products.map((product) => (
            <div key={product.product.documentId} className="flex gap-5 items-center">
              <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">
                <img src={getStrapiMedia(product.variant.media[0].url)} alt={product.product.name} />
              </div>

              <div className="flex justify-between items-center w-full">
                <div>
                  <h2 className="text-base font-medium text-slate-900">{product.product.name}</h2>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                    {/* {product.specs.map((spec, idx) => (
                      <span key={spec} className="flex items-center gap-1.5">
                        {idx > 0 && <span className="text-slate-200">|</span>}
                        {spec}
                      </span>
                    ))} */}

                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <span
                        className="inline-block h-3 w-3 rounded-full border border-border"
                        style={{ backgroundColor: product.variant.color.color_code }}
                        aria-hidden="true"
                      />
                      <span className="capitalize">{product.variant.color.name}</span>
                      <span aria-hidden="true">·</span>
                      <span>Mărime {product.variant.size.name}</span>
                    </div>

                  </p>
                </div>
                <div className="text-right">
                  <span className="block text-base font-semibold text-slate-900">{formatPrice(product.product.pricing.final_price)}</span>
                  <span className="text-xs text-slate-400">Qty: {product.quantity}</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>

        <Separator className="bg-slate-100" />

        {/* Grid Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 pt-8">

          {/* Left Column: Logistics & Support */}
          <div className="md:col-span-7 flex flex-col justify-between gap-10">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Payment</h3>
                <div className="text-sm text-slate-600 flex items-center gap-2">
                  {order.paymentMethod}
                  {/* <Badge variant="secondary" className="text-[10px] font-bold text-blue-700 bg-blue-50/80 border border-blue-100 px-1.5 py-0.5 rounded tracking-wide uppercase shadow-none">
                    {order.paymentMethod}
                  </Badge> */}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Delivery</h3>
                <address className="not-italic text-sm text-slate-600 space-y-0.5 leading-relaxed">
                  {order.address}<br />
                  {order.city}<br />
                  {order.phone}
                </address>
                <div className="mt-4">
                  <span className="text-[11px] text-slate-400 block">Delivery method</span>
                  <p className="text-sm text-slate-600 mt-0.5">{order.shippingMethod}</p>
                </div>
              </div>
            </div>

            {/* <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Need help?</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors">
                    <HelpCircle className="w-4 h-4 text-slate-400" /> Order Issues <span className="text-slate-300 text-xs">↗</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors">
                    <Truck className="w-4 h-4 text-slate-400" /> Delivery Info <span className="text-slate-300 text-xs">↗</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors">
                    <RefreshCw className="w-4 h-4 text-slate-400" /> Returns <span className="text-slate-300 text-xs">↗</span>
                  </a>
                </li>
              </ul>
            </div> */}
          </div>

          {/* Right Column: Calculations Breakdown */}
          <div className="md:col-span-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Order Summary</h3>

            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-slate-900 font-medium">{order.total}</span>
              </div>

              {/* <div className="flex justify-between text-slate-400">
                <span>Discount <span className="text-xs">({order.summary.discountRate * 100}%)</span></span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div> */}

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  Delivery
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-3.5 h-3.5 text-slate-300 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>Standard shipping calculation</TooltipContent>
                  </Tooltip>
                </span>
                <span className="text-slate-900 font-medium">$0</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  Tax
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-3.5 h-3.5 text-slate-300 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>Calculated VAT/Sales Tax</TooltipContent>
                  </Tooltip>
                </span>
                <span className="text-slate-900 font-medium">+$0</span>
              </div>
            </div>

            {/* The crisp dashed border line above total */}
            <Separator className="bg-transparent border-t border-dashed border-slate-200 my-4" />

            <div className="flex justify-between items-center">
              <span className="text-base font-medium text-slate-900">Total</span>
              <span className="text-2xl font-bold tracking-tight text-slate-900">{formatPrice(Number(order.total))}</span>
            </div>
          </div>

        </div>
      </Card>
    </TooltipProvider>
  )
}