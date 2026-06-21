interface OrderItem {
    id: string
    name: string
    size: string
    color: string
    quantity: number
    price: number
    image: string
}

export interface OrderEmailProps {
    phone: string
    orderNumber: string
    orderDate: string
    customerName: string
    customerEmail: string
    shippingAddress: {
        street: string
        city: string
        state: string
        zipCode: string
        country: string
    }
    items: OrderItem[]
    subtotal: number
    shipping: number
    tax: number
    total: number
    estimatedDelivery: string
    trackingUrl?: string
}

export function OrderEmail({ customerEmail,phone, customerName, estimatedDelivery, items, orderDate, orderNumber, shipping, shippingAddress, subtotal, tax, total, trackingUrl }: OrderEmailProps) {
    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>
            <body style={{ margin: 0, padding: 0, backgroundColor: "#f5f5f5", fontFamily: "Arial, sans-serif" }}>
                <table width="100%" cellPadding="0" cellSpacing="0" style={{ backgroundColor: "#f5f5f5" }}>
                    <tbody>
                        <tr>
                            <td align="center" style={{ padding: "40px 20px" }}>
                                <table
                                    width="600"
                                    cellPadding="0"
                                    cellSpacing="0"
                                    style={{ backgroundColor: "#ffffff", borderRadius: "8px", overflow: "hidden" }}
                                >
                                    <tbody>
                                        {/* Header */}
                                        <tr>
                                            <td style={{ padding: "16px", textAlign: "center" }}>
                                                <div style={{
                                                    margin: 0,
                                                    color: "#8815ab",
                                                    fontSize: "16px",
                                                    fontWeight: "bold",
                                                    letterSpacing: "2px",
                                                }}>
                                                    <img src="https://scontent.fotp3-2.fna.fbcdn.net/v/t39.30808-6/222674248_688370248693878_6184844316352903106_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=dgQTgf6pE-AQ7kNvwGwKoAL&_nc_oc=AdkEvTQLd0yiWtflRSnlD4U7LUcVqiSQZymXz9OH4JPy8OXF-q8hnvHtKH5ODKMgDIQ&_nc_zt=23&_nc_ht=scontent.fotp3-2.fna&_nc_gid=H3L01N7c3kzc4I7-AsrB5g&oh=00_AfqtisakQF-8L_H8thGh5avTeDcxbv_zNbjA9vokxwlLbQ&oe=69629E1A" style={{ width: "120px", height: "120px" }} />
                                                    <h1
                                                    >
                                                        Traditie si Culoare
                                                    </h1>
                                                </div>
                                            </td>
                                        </tr>

                                        {/* Order Confirmation Message */}
                                        <tr>
                                            <td style={{ padding: "40px 30px 20px" }}>
                                                <h2 style={{ margin: 0, color: "#000000", fontSize: "24px", fontWeight: "bold" }}>
                                                    Multumim pentru comanda ta!
                                                </h2>
                                                <p style={{ margin: "15px 0 0", color: "#666666", fontSize: "16px", lineHeight: "1.5" }}>
                                                    Buna {customerName}, am primit comanda ta si iti vom trimite o confirmare de expediere imediat ce
                                                    produsele tale sunt pe drum.
                                                </p>
                                            </td>
                                        </tr>

                                        {/* Order Details */}
                                        <tr>
                                            <td style={{ padding: "0 30px" }}>
                                                <table
                                                    width="100%"
                                                    cellPadding="0"
                                                    cellSpacing="0"
                                                    style={{ backgroundColor: "#f9f9f9", borderRadius: "6px", padding: "20px" }}
                                                >
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ paddingBottom: "10px" }}>
                                                                <strong style={{ color: "#000000", fontSize: "14px" }}>Order Number:</strong>
                                                                <span style={{ color: "#666666", fontSize: "14px", marginLeft: "10px" }}>
                                                                    {orderNumber}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <strong style={{ color: "#000000", fontSize: "14px" }}>Order Date:</strong>
                                                                <span style={{ color: "#666666", fontSize: "14px", marginLeft: "10px" }}>
                                                                    {orderDate}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>

                                        {/* Order Items */}
                                        <tr>
                                            <td style={{ padding: "30px" }}>
                                                <h3 style={{ margin: "0 0 20px", color: "#000000", fontSize: "18px", fontWeight: "bold" }}>
                                                    Produse
                                                </h3>

                                                {items.map((item) => (
                                                    <table
                                                        key={item.id}
                                                        width="100%"
                                                        cellPadding="0"
                                                        cellSpacing="0"
                                                        style={{ marginBottom: "20px", paddingBottom: "20px", borderBottom: "1px solid #e5e5e5" }}
                                                    >
                                                        <tbody>
                                                            <tr>
                                                                <td width="100" style={{ paddingRight: "15px" }}>
                                                                    <img
                                                                        src={item.image || "/placeholder.svg"}
                                                                        alt={item.name}
                                                                        width="100"
                                                                        height="100"
                                                                        style={{ borderRadius: "6px", display: "block" }}
                                                                    />
                                                                </td>
                                                                <td style={{ verticalAlign: "top" }}>
                                                                    <p
                                                                        style={{
                                                                            margin: "0 0 5px",
                                                                            color: "#000000",
                                                                            fontSize: "16px",
                                                                            fontWeight: "bold",
                                                                        }}
                                                                    >
                                                                        {item.name}
                                                                    </p>
                                                                    <p style={{ margin: "0 0 5px", color: "#666666", fontSize: "14px" }}>
                                                                        Size: {item.size} | Color: <span style={{ backgroundColor: item.color, width: "12px", height: "12px", display: "inline-block" }}></span>
                                                                    </p>
                                                                    <p style={{ margin: 0, color: "#666666", fontSize: "14px" }}>
                                                                        Quantity: {item.quantity}
                                                                    </p>
                                                                </td>
                                                                <td style={{ textAlign: "right", verticalAlign: "top", whiteSpace: "nowrap" }}>
                                                                    <p style={{ margin: 0, color: "#000000", fontSize: "16px", fontWeight: "bold" }}>
                                                                        ${(item.price * item.quantity).toFixed(2)}
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                ))}
                                            </td>
                                        </tr>

                                        {/* Order Summary */}
                                        <tr>
                                            <td style={{ padding: "0 30px 30px" }}>
                                                <table width="100%" cellPadding="0" cellSpacing="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ padding: "8px 0", fontSize: "14px", color: "#666666" }}>Subtotal:</td>
                                                            <td style={{ padding: "8px 0", fontSize: "14px", color: "#666666", textAlign: "right" }}>
                                                                ${subtotal.toFixed(2)}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ padding: "8px 0", fontSize: "14px", color: "#666666" }}>Shipping:</td>
                                                            <td style={{ padding: "8px 0", fontSize: "14px", color: "#666666", textAlign: "right" }}>
                                                                ${shipping.toFixed(2)}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td
                                                                style={{
                                                                    padding: "8px 0",
                                                                    fontSize: "14px",
                                                                    color: "#666666",
                                                                    borderBottom: "1px solid #e5e5e5",
                                                                }}
                                                            >
                                                                Tax:
                                                            </td>
                                                            <td
                                                                style={{
                                                                    padding: "8px 0",
                                                                    fontSize: "14px",
                                                                    color: "#666666",
                                                                    textAlign: "right",
                                                                    borderBottom: "1px solid #e5e5e5",
                                                                }}
                                                            >
                                                                ${tax.toFixed(2)}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td
                                                                style={{ padding: "15px 0 0", fontSize: "18px", color: "#000000", fontWeight: "bold" }}
                                                            >
                                                                Total:
                                                            </td>
                                                            <td
                                                                style={{
                                                                    padding: "15px 0 0",
                                                                    fontSize: "18px",
                                                                    color: "#000000",
                                                                    fontWeight: "bold",
                                                                    textAlign: "right",
                                                                }}
                                                            >
                                                                ${total.toFixed(2)}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>

                                        {/* Shipping Information */}
                                        <tr>
                                            <td style={{ padding: "0 30px 30px" }}>
                                                <table width="100%" cellPadding="0" cellSpacing="0">
                                                    <tbody>
                                                        <tr>
                                                            <td width="50%" style={{ verticalAlign: "top", paddingRight: "15px" }}>
                                                                <h3
                                                                    style={{ margin: "0 0 15px", color: "#000000", fontSize: "16px", fontWeight: "bold" }}
                                                                >
                                                                    Shipping Address
                                                                </h3>
                                                                <p style={{ margin: 0, color: "#666666", fontSize: "14px", lineHeight: "1.6" }}>
                                                                    {customerName}
                                                                    <br />
                                                                    {phone}
                                                                    <br />
                                                                    {shippingAddress.street}
                                                                    <br />
                                                                    {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
                                                                    <br />
                                                                    {shippingAddress.country}
                                                                </p>
                                                            </td>
                                                            <td width="50%" style={{ verticalAlign: "top", paddingLeft: "15px" }}>
                                                                <h3
                                                                    style={{ margin: "0 0 15px", color: "#000000", fontSize: "16px", fontWeight: "bold" }}
                                                                >
                                                                    Delivery Estimate
                                                                </h3>
                                                                <p style={{ margin: 0, color: "#666666", fontSize: "14px", lineHeight: "1.6" }}>
                                                                    {estimatedDelivery}
                                                                </p>
                                                                <p
                                                                    style={{ margin: "10px 0 0", color: "#666666", fontSize: "14px", lineHeight: "1.6" }}
                                                                >
                                                                    <strong>Email:</strong> {customerEmail}
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>

                                        {/* Track Order Button */}
                                        {trackingUrl && (
                                            <tr>
                                                <td style={{ padding: "0 30px 30px", textAlign: "center" }}>
                                                    <a
                                                        href={trackingUrl}
                                                        style={{
                                                            display: "inline-block",
                                                            padding: "15px 40px",
                                                            backgroundColor: "#000000",
                                                            color: "#ffffff",
                                                            textDecoration: "none",
                                                            borderRadius: "4px",
                                                            fontSize: "16px",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        Track Your Order
                                                    </a>
                                                </td>
                                            </tr>
                                        )}

                                        {/* Customer Support */}
                                        <tr>
                                            <td style={{ padding: "30px", backgroundColor: "#f9f9f9", borderTop: "1px solid #e5e5e5" }}>
                                                <p
                                                    style={{
                                                        margin: "0 0 10px",
                                                        color: "#000000",
                                                        fontSize: "14px",
                                                        fontWeight: "bold",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    Need Help?
                                                </p>
                                                <p
                                                    style={{
                                                        margin: 0,
                                                        color: "#666666",
                                                        fontSize: "14px",
                                                        textAlign: "center",
                                                        lineHeight: "1.6",
                                                    }}
                                                >
                                                    If you have any questions about your order, please contact our customer support team at{" "}
                                                    <a
                                                        href="mailto:support@fashionstore.com"
                                                        style={{ color: "#000000", textDecoration: "underline" }}
                                                    >
                                                        support@fashionstore.com
                                                    </a>
                                                </p>
                                            </td>
                                        </tr>

                                        {/* Footer */}
                                        <tr>
                                            <td style={{ padding: "30px", textAlign: "center", backgroundColor: "#000000" }}>
                                                <p style={{ margin: "0 0 10px", color: "#ffffff", fontSize: "12px" }}>
                                                    © 2026 Fashion Store. All rights reserved.
                                                </p>
                                                <p style={{ margin: 0, color: "#999999", fontSize: "12px" }}>
                                                    123 Fashion Avenue, New York, NY 10001
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </body>
        </html>
    )
}

export function AdminEmail({ customerEmail,phone, customerName, estimatedDelivery, items, orderDate, orderNumber, shipping, shippingAddress, subtotal, tax, total, trackingUrl }: OrderEmailProps) {
    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>
            <body style={{ margin: 0, padding: 0, backgroundColor: "#f5f5f5", fontFamily: "Arial, sans-serif" }}>
                <table width="100%" cellPadding="0" cellSpacing="0" style={{ backgroundColor: "#f5f5f5" }}>
                    <tbody>
                        <tr>
                            <td align="center" style={{ padding: "40px 20px" }}>
                                <table
                                    width="600"
                                    cellPadding="0"
                                    cellSpacing="0"
                                    style={{ backgroundColor: "#ffffff", borderRadius: "8px", overflow: "hidden" }}
                                >
                                    <tbody>
                                        {/* Header */}
                                        <tr>
                                            <td style={{ padding: "16px", textAlign: "center" }}>
                                                <div style={{
                                                    margin: 0,
                                                    color: "#8815ab",
                                                    fontSize: "16px",
                                                    fontWeight: "bold",
                                                    letterSpacing: "2px",
                                                }}>
                                                    <img src="https://scontent.fotp3-2.fna.fbcdn.net/v/t39.30808-6/222674248_688370248693878_6184844316352903106_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=dgQTgf6pE-AQ7kNvwGwKoAL&_nc_oc=AdkEvTQLd0yiWtflRSnlD4U7LUcVqiSQZymXz9OH4JPy8OXF-q8hnvHtKH5ODKMgDIQ&_nc_zt=23&_nc_ht=scontent.fotp3-2.fna&_nc_gid=H3L01N7c3kzc4I7-AsrB5g&oh=00_AfqtisakQF-8L_H8thGh5avTeDcxbv_zNbjA9vokxwlLbQ&oe=69629E1A" style={{ width: "120px", height: "120px" }} />
                                                    <h1
                                                    >
                                                        Traditie si Culoare
                                                    </h1>
                                                </div>
                                            </td>
                                        </tr>

                                        {/* Order Confirmation Message */}
                                        <tr>
                                            <td style={{ padding: "40px 30px 20px" }}>
                                                <h2 style={{ margin: 0, color: "#000000", fontSize: "24px", fontWeight: "bold" }}>
                                                    O noua comanda a fost plasata!
                                                </h2>
                                                <p style={{ margin: "15px 0 0", color: "#666666", fontSize: "16px", lineHeight: "1.5" }}>
                                                    {customerName}, a primit comanda. Detaliile comenzii sunt prezentate mai jos.
                                                </p>
                                            </td>
                                        </tr>

                                        {/* Order Details */}
                                        <tr>
                                            <td style={{ padding: "0 30px" }}>
                                                <table
                                                    width="100%"
                                                    cellPadding="0"
                                                    cellSpacing="0"
                                                    style={{ backgroundColor: "#f9f9f9", borderRadius: "6px", padding: "20px" }}
                                                >
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ paddingBottom: "10px" }}>
                                                                <strong style={{ color: "#000000", fontSize: "14px" }}>Order Number:</strong>
                                                                <span style={{ color: "#666666", fontSize: "14px", marginLeft: "10px" }}>
                                                                    {orderNumber}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <strong style={{ color: "#000000", fontSize: "14px" }}>Order Date:</strong>
                                                                <span style={{ color: "#666666", fontSize: "14px", marginLeft: "10px" }}>
                                                                    {orderDate}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>

                                        {/* Order Items */}
                                        <tr>
                                            <td style={{ padding: "30px" }}>
                                                <h3 style={{ margin: "0 0 20px", color: "#000000", fontSize: "18px", fontWeight: "bold" }}>
                                                    Produse
                                                </h3>

                                                {items.map((item) => (
                                                    <table
                                                        key={item.id}
                                                        width="100%"
                                                        cellPadding="0"
                                                        cellSpacing="0"
                                                        style={{ marginBottom: "20px", paddingBottom: "20px", borderBottom: "1px solid #e5e5e5" }}
                                                    >
                                                        <tbody>
                                                            <tr>
                                                                <td width="100" style={{ paddingRight: "15px" }}>
                                                                    <img
                                                                        src={item.image || "/placeholder.svg"}
                                                                        alt={item.name}
                                                                        width="100"
                                                                        height="100"
                                                                        style={{ borderRadius: "6px", display: "block" }}
                                                                    />
                                                                </td>
                                                                <td style={{ verticalAlign: "top" }}>
                                                                    <p
                                                                        style={{
                                                                            margin: "0 0 5px",
                                                                            color: "#000000",
                                                                            fontSize: "16px",
                                                                            fontWeight: "bold",
                                                                        }}
                                                                    >
                                                                        {item.name}
                                                                    </p>
                                                                    <p style={{ margin: "0 0 5px", color: "#666666", fontSize: "14px" }}>
                                                                        Size: {item.size} | Color: <span style={{ backgroundColor: item.color, width: "12px", height: "12px", display: "inline-block" }}></span>
                                                                    </p>
                                                                    <p style={{ margin: 0, color: "#666666", fontSize: "14px" }}>
                                                                        Quantity: {item.quantity}
                                                                    </p>
                                                                </td>
                                                                <td style={{ textAlign: "right", verticalAlign: "top", whiteSpace: "nowrap" }}>
                                                                    <p style={{ margin: 0, color: "#000000", fontSize: "16px", fontWeight: "bold" }}>
                                                                        ${(item.price * item.quantity).toFixed(2)}
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                ))}
                                            </td>
                                        </tr>

                                        {/* Order Summary */}
                                        <tr>
                                            <td style={{ padding: "0 30px 30px" }}>
                                                <table width="100%" cellPadding="0" cellSpacing="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ padding: "8px 0", fontSize: "14px", color: "#666666" }}>Subtotal:</td>
                                                            <td style={{ padding: "8px 0", fontSize: "14px", color: "#666666", textAlign: "right" }}>
                                                                ${subtotal.toFixed(2)}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ padding: "8px 0", fontSize: "14px", color: "#666666" }}>Shipping:</td>
                                                            <td style={{ padding: "8px 0", fontSize: "14px", color: "#666666", textAlign: "right" }}>
                                                                ${shipping.toFixed(2)}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td
                                                                style={{
                                                                    padding: "8px 0",
                                                                    fontSize: "14px",
                                                                    color: "#666666",
                                                                    borderBottom: "1px solid #e5e5e5",
                                                                }}
                                                            >
                                                                Tax:
                                                            </td>
                                                            <td
                                                                style={{
                                                                    padding: "8px 0",
                                                                    fontSize: "14px",
                                                                    color: "#666666",
                                                                    textAlign: "right",
                                                                    borderBottom: "1px solid #e5e5e5",
                                                                }}
                                                            >
                                                                ${tax.toFixed(2)}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td
                                                                style={{ padding: "15px 0 0", fontSize: "18px", color: "#000000", fontWeight: "bold" }}
                                                            >
                                                                Total:
                                                            </td>
                                                            <td
                                                                style={{
                                                                    padding: "15px 0 0",
                                                                    fontSize: "18px",
                                                                    color: "#000000",
                                                                    fontWeight: "bold",
                                                                    textAlign: "right",
                                                                }}
                                                            >
                                                                ${total.toFixed(2)}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>

                                        {/* Shipping Information */}
                                        <tr>
                                            <td style={{ padding: "0 30px 30px" }}>
                                                <table width="100%" cellPadding="0" cellSpacing="0">
                                                    <tbody>
                                                        <tr>
                                                            <td width="50%" style={{ verticalAlign: "top", paddingRight: "15px" }}>
                                                                <h3
                                                                    style={{ margin: "0 0 15px", color: "#000000", fontSize: "16px", fontWeight: "bold" }}
                                                                >
                                                                    Shipping Address
                                                                </h3>
                                                                <p style={{ margin: 0, color: "#666666", fontSize: "14px", lineHeight: "1.6" }}>
                                                                    {customerName}
                                                                    <br />
                                                                    {phone}
                                                                    <br />
                                                                    {shippingAddress.street}
                                                                    <br />
                                                                    {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
                                                                    <br />
                                                                    {shippingAddress.country}
                                                                </p>
                                                            </td>
                                                            <td width="50%" style={{ verticalAlign: "top", paddingLeft: "15px" }}>
                                                                <h3
                                                                    style={{ margin: "0 0 15px", color: "#000000", fontSize: "16px", fontWeight: "bold" }}
                                                                >
                                                                    Delivery Estimate
                                                                </h3>
                                                                <p style={{ margin: 0, color: "#666666", fontSize: "14px", lineHeight: "1.6" }}>
                                                                    {estimatedDelivery}
                                                                </p>
                                                                <p
                                                                    style={{ margin: "10px 0 0", color: "#666666", fontSize: "14px", lineHeight: "1.6" }}
                                                                >
                                                                    <strong>Email:</strong> {customerEmail}
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>

                                        {/* Track Order Button */}
                                        {trackingUrl && (
                                            <tr>
                                                <td style={{ padding: "0 30px 30px", textAlign: "center" }}>
                                                    <a
                                                        href={trackingUrl}
                                                        style={{
                                                            display: "inline-block",
                                                            padding: "15px 40px",
                                                            backgroundColor: "#000000",
                                                            color: "#ffffff",
                                                            textDecoration: "none",
                                                            borderRadius: "4px",
                                                            fontSize: "16px",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        Track Your Order
                                                    </a>
                                                </td>
                                            </tr>
                                        )}

                                        {/* Customer Support */}
                                        <tr>
                                            <td style={{ padding: "30px", backgroundColor: "#f9f9f9", borderTop: "1px solid #e5e5e5" }}>
                                                <p
                                                    style={{
                                                        margin: "0 0 10px",
                                                        color: "#000000",
                                                        fontSize: "14px",
                                                        fontWeight: "bold",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    Need Help?
                                                </p>
                                                <p
                                                    style={{
                                                        margin: 0,
                                                        color: "#666666",
                                                        fontSize: "14px",
                                                        textAlign: "center",
                                                        lineHeight: "1.6",
                                                    }}
                                                >
                                                    If you have any questions about your order, please contact our customer support team at{" "}
                                                    <a
                                                        href="mailto:support@fashionstore.com"
                                                        style={{ color: "#000000", textDecoration: "underline" }}
                                                    >
                                                        support@fashionstore.com
                                                    </a>
                                                </p>
                                            </td>
                                        </tr>

                                        {/* Footer */}
                                        <tr>
                                            <td style={{ padding: "30px", textAlign: "center", backgroundColor: "#000000" }}>
                                                <p style={{ margin: "0 0 10px", color: "#ffffff", fontSize: "12px" }}>
                                                    © 2026 Fashion Store. All rights reserved.
                                                </p>
                                                <p style={{ margin: 0, color: "#999999", fontSize: "12px" }}>
                                                    123 Fashion Avenue, New York, NY 10001
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </body>
        </html>
    )
}