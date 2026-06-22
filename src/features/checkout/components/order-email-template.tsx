import * as React from "react";
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

// --- Types & Interfaces ---

export interface OrderItemType {
  id: string | number;
  name: string;
  sku: string;
  color: string;
  size: string;
  qty: number;
  price: number;
  imageUrl?: string;
  placeholderBg?: string;
}

export interface ShippingAddressType {
  name: string;
  line1: string;
  line2: string;
  country: string;
}

export interface PaymentType {
  method: string;
  last4: string;
}

export interface OrderConfirmationEmailProps {
  brandName?: string;
  brandTagline?: string;
  brandAddress?: string;
  orderNumber?: string;
  orderDate?: string;
  estimatedDelivery?: string;
  customerName?: string;
  currency?: string;
  subtotal?: number;
  shippingCost?: number;
  taxRate?: number;
  total?: number;
  items?: OrderItemType[];
  shippingAddress?: ShippingAddressType;
  payment?: PaymentType;
  trackingUrl?: string;
  supportUrl?: string;
  privacyUrl?: string;
  returnsUrl?: string;
  unsubscribeUrl?: string;
}

// --- Utilities & Child Components ---

const fmt = (currency: string, value: number): string =>
  `${currency}${Number(value).toFixed(2)}`;

interface ClothingPlaceholderProps {
  bg?: string;
}

const ClothingPlaceholder: React.FC<ClothingPlaceholderProps> = ({ bg = "#ECEAE6" }) => (
  <Section
    style={{
      width: 70,
      height: 78,
      backgroundColor: bg,
      borderRadius: 6,
      textAlign: "center",
    }}
  >
    <Text style={{ fontSize: 28, margin: 20 }}>◻</Text>
  </Section>
);

interface MetaCellProps {
  label: string;
  value: string;
}

const MetaCell: React.FC<MetaCellProps> = ({ label, value }) => (
  <Column style={{ padding: 12 }}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </Column>
);

interface OrderItemProps {
  item: OrderItemType;
  currency: string;
}

const OrderItem: React.FC<OrderItemProps> = ({ item, currency }) => (
  <Row style={{ padding: "16px 0" }}>
    <Column width="80">
      {item.imageUrl ? (
        <Img
          src={item.imageUrl}
          alt={item.name}
          width="70"
          height="78"
          style={{ borderRadius: 6, objectFit: "cover" }}
        />
      ) : (
        <ClothingPlaceholder bg={item.placeholderBg} />
      )}
    </Column>

    <Column>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.muted}>SKU: {item.sku}</Text>
      <Text style={styles.muted}>
        {item.color} · Size {item.size} · Qty {item.qty}
      </Text>
    </Column>

    <Column align="right">
      <Text style={styles.value}>
        {fmt(currency, item.price * item.qty)}
      </Text>
    </Column>
  </Row>
);

// --- Default Mock Data ---

const DEFAULT_ITEMS: OrderItemType[] = [
  {
    id: 1,
    name: "Merino wool oversized blazer",
    sku: "MW-BLZ-CHR-L",
    color: "Charcoal",
    size: "L / EU 52",
    qty: 1,
    price: 289,
  },
  {
    id: 2,
    name: "Relaxed linen trousers",
    sku: "LN-TRS-IVR-M",
    color: "Ivory",
    size: "M / EU 48",
    qty: 1,
    price: 149,
  },
];

// --- Main Email Component ---

export default function OrderEmail({
  brandName = "ARKT",
  brandTagline = "STUDIO",
  brandAddress = "Calea Victoriei 22, București, Romania",
  orderNumber = "ORD-2026-88471",
  orderDate = "June 22, 2026",
  estimatedDelivery = "June 27–30, 2026",
  customerName = "Alex Ionescu",
  currency = "€",
  subtotal = 438,
  shippingCost = 0,
  taxRate = 0.2,
  total = 525.6,
  items = DEFAULT_ITEMS,
  shippingAddress = {
    name: "Alex Ionescu",
    line1: "Str. Independenței 14",
    line2: "Ploiești, Prahova 100001",
    country: "Romania",
  },
  payment = {
    method: "Visa",
    last4: "4291",
  },
  trackingUrl = "#",
  supportUrl = "#",
  privacyUrl = "#",
  returnsUrl = "#",
  unsubscribeUrl = "#",
}: OrderConfirmationEmailProps) {
  const firstName = customerName.split(" ")[0];
  const tax = subtotal * taxRate;

  return (
    <Html>
      <Head />

      <Preview>
        Your {brandName} order has been confirmed
      </Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>

          <Section style={styles.header}>
            <Text style={styles.logo}>{brandName}</Text>
            <Text style={styles.tagline}>{brandTagline}</Text>
          </Section>

          <Section style={styles.banner}>
            <Text style={styles.success}>✓ ORDER CONFIRMED</Text>
            <Text style={styles.title}>
              Thank you, {firstName}!
            </Text>
            <Text style={styles.subtitle}>
              Your order has been received and is being prepared.
            </Text>
          </Section>

          <Section style={styles.meta}>
            <Row>
              <MetaCell label="Order number" value={orderNumber} />
              <MetaCell label="Order date" value={orderDate} />
              <MetaCell label="Delivery" value={estimatedDelivery} />
            </Row>
          </Section>

          <Section style={styles.content}>
            <Text style={styles.label}>
              Your items
            </Text>

            {items.map(item => (
              <OrderItem
                key={item.id}
                item={item}
                currency={currency}
              />
            ))}

            <Hr />

            <Row>
              <Column>
                <Text>Subtotal</Text>
                <Text>Shipping</Text>
                <Text>VAT</Text>
                <Text style={styles.total}>Total</Text>
              </Column>

              <Column align="right">
                <Text>{fmt(currency, subtotal)}</Text>
                <Text>
                  {shippingCost ? fmt(currency, shippingCost) : "Free"}
                </Text>
                <Text>{fmt(currency, tax)}</Text>
                <Text style={styles.total}>
                  {fmt(currency, total)}
                </Text>
              </Column>
            </Row>

            <Hr />

            <Row>
              <Column>
                <Text style={styles.label}>
                  Shipping address
                </Text>
                <Text>
                  {shippingAddress.name}
                  <br />
                  {shippingAddress.line1}
                  <br />
                  {shippingAddress.line2}
                  <br />
                  {shippingAddress.country}
                </Text>
              </Column>

              <Column>
                <Text style={styles.label}>
                  Payment
                </Text>
                <Text>
                  {payment.method} ending in {payment.last4}
                </Text>
                <Text>
                  ✓ Payment verified
                </Text>
              </Column>
            </Row>

            <Section style={{ textAlign: "center", marginTop: 25 }}>
              <Button
                href={trackingUrl}
                style={styles.button}
              >
                Track your order
              </Button>

              <Text>
                Need help?{" "}
                <Link href={supportUrl}>
                  Contact support
                </Link>
              </Text>
            </Section>
          </Section>

          <Section style={styles.footer}>
            <Text style={styles.logo}>
              {brandName}
            </Text>

            <Text style={styles.muted}>
              {brandAddress}
            </Text>

            <Text>
              <Link href={privacyUrl}>Privacy</Link>
              {" · "}
              <Link href={returnsUrl}>Returns</Link>
              {" · "}
              <Link href={unsubscribeUrl}>Unsubscribe</Link>
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

// --- Stylesheet Engine Typings ---

const styles: Record<string, React.CSSProperties> = {
  body: {
    backgroundColor: "#F8F6F2",
    fontFamily: "Arial, sans-serif",
  },

  container: {
    maxWidth: "620px",
    margin: "0 auto",
    border: "1px solid #E0DDD7",
  },

  header: {
    backgroundColor: "#1A1A1A",
    padding: "30px",
    textAlign: "center",
  },

  logo: {
    color: "#fff",
    fontSize: "22px",
    letterSpacing: "0.25em",
  },

  tagline: {
    color: "#777",
    fontSize: "11px",
    letterSpacing: "0.3em",
  },

  banner: {
    backgroundColor: "#2D5A44",
    padding: "30px",
    textAlign: "center",
  },

  success: {
    color: "#7DB89A",
    fontSize: "12px",
  },

  title: {
    color: "#fff",
    fontSize: "24px",
  },

  subtitle: {
    color: "#7DB89A",
  },

  meta: {
    backgroundColor: "#EFECE6",
  },

  content: {
    padding: "40px",
  },

  label: {
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "#999",
  },

  value: {
    color: "#1A1A1A",
  },

  itemName: {
    fontWeight: 600,
  },

  muted: {
    color: "#777",
    fontSize: "13px",
  },

  total: {
    fontWeight: 700,
    fontSize: "16px",
  },

  button: {
    backgroundColor: "#1A1A1A",
    color: "#fff",
    padding: "14px 35px",
    textDecoration: "none",
  },

  footer: {
    backgroundColor: "#1A1A1A",
    padding: "30px",
    textAlign: "center",
  },
};