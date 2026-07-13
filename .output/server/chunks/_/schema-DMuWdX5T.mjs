import z$2__default, { number } from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input';

z$2__default.object({
  documentId: z$2__default.string(),
  image: z$2__default.string().max(255, { message: "Image path/URL cannot exceed 255 characters" }),
  name: z$2__default.string(),
  sku: z$2__default.string(),
  price: z$2__default.number(),
  quantity: z$2__default.number().int({ message: "Quantity must be a whole number" }).positive({ message: "Quantity must be at least 1" }).max(999, { message: "Quantity cannot exceed 999" }),
  variant_name: z$2__default.string().max(100, { message: "Variant name cannot exceed 100 characters" })
});
var formSchema = z$2__default.object({
  nume: z$2__default.string().min(1, "C\xE2mpul nume este obligatoriu").max(255, "Numele poate avea maximum 255 de caractere"),
  prenume: z$2__default.string().min(1, "C\xE2mpul prenume este obligatoriu").max(255, "Prenumele poate avea maximum 255 de caractere"),
  phoneNumber: z$2__default.string().refine((val) => isValidPhoneNumber(val, { defaultCountry: "RO" }), { message: "Num\u0103r de telefon invalid" }),
  message: z$2__default.string().max(255).optional(),
  zipCode: z$2__default.string().trim().regex(/^\d{6}$/, { message: "Codul po\u0219tal trebuie s\u0103 con\u021Bin\u0103 exact 6 cifre" }),
  judet: z$2__default.string().min(1, "Selectarea jude\u021Bului este obligatorie"),
  localitate: z$2__default.string().min(1, "Selectarea localit\u0103\u021Bii este obligatorie"),
  adresa_1: z$2__default.string().min(1, "Adresa este obligatorie"),
  adresa_2: z$2__default.string().optional(),
  payment: z$2__default.enum(["Card debit / credit", "ramburs"], { error: "Metoda de plat\u0103 este obligatorie" })
});
var stripeProductSchema = { products: z$2__default.object({
  productId: z$2__default.string(),
  variantId: z$2__default.string(),
  quantity: z$2__default.number().min(1, "Cantitatea trebuie s\u0103 fie cel pu\u021Bin 1")
}).array() };
var moreEmailProductSchema = {
  products: z$2__default.object({
    productId: z$2__default.string(),
    variantId: z$2__default.string(),
    quantity: z$2__default.number().min(1, "Cantitatea trebuie s\u0103 fie cel pu\u021Bin 1")
  }).array(),
  customerEmail: z$2__default.string().email(),
  orderNumber: z$2__default.string(),
  subtotal: z$2__default.number(),
  shipping: z$2__default.number(),
  tax: z$2__default.number(),
  total: z$2__default.number(),
  createdAt: z$2__default.string()
};
formSchema.extend(moreEmailProductSchema);
formSchema.extend(stripeProductSchema);
var checkoutSchema = z$2__default.object({
  firstName: z$2__default.string().min(2, "Prenumele este prea scurt"),
  lastName: z$2__default.string().min(2, "Numele este prea scurt"),
  phone: z$2__default.string().regex(/^(\+4)?07[0-9]{8}$/, "Num\u0103r de telefon invalid (ex: 07xxxxxxxx)"),
  address: z$2__default.string().min(5, "Adresa trebuie s\u0103 fie mai specific\u0103"),
  city: z$2__default.string().min(2, "Ora\u0219ul este obligatoriu"),
  zip: z$2__default.string().min(4, "Cod po\u0219tal invalid"),
  shippingMethod: z$2__default.enum(["standard", "free"]),
  payment: z$2__default.enum(["card", "ramburs"])
});
z$2__default.object({
  original_price: z$2__default.number(),
  discounted_price: z$2__default.number().optional(),
  final_price: z$2__default.number()
});
z$2__default.object({
  available: z$2__default.boolean(),
  documentId: z$2__default.string().optional(),
  name: z$2__default.string(),
  updatedAt: z$2__default.string(),
  media: z$2__default.array(z$2__default.object({ url: z$2__default.string() })),
  color: z$2__default.object({
    name: z$2__default.string(),
    color_code: z$2__default.string()
  }),
  size: z$2__default.object({ name: z$2__default.string() })
});
z$2__default.object({
  documentId: z$2__default.string().optional(),
  name: z$2__default.string(),
  slug: z$2__default.string(),
  description: z$2__default.string(),
  updatedAt: z$2__default.string(),
  price: number(),
  categories: z$2__default.array(z$2__default.object({ name: z$2__default.string() })),
  sub_categories: z$2__default.array(z$2__default.object({ name: z$2__default.string() }))
});
var CartItemSchema = z$2__default.object({
  productId: z$2__default.string(),
  variantId: z$2__default.string(),
  quantity: z$2__default.number()
});
var orderFieldsSchema = checkoutSchema.extend({ cartItems: CartItemSchema.array().min(1, "Trebuie s\u0103 adaugi cel pu\u021Bin un produs \xEEn co\u0219") });

export { checkoutSchema as c, orderFieldsSchema as o };
//# sourceMappingURL=schema-DMuWdX5T.mjs.map
