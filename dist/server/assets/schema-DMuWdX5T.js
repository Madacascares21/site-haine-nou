import z, { number } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";
z.object({
	documentId: z.string(),
	image: z.string().max(255, { message: "Image path/URL cannot exceed 255 characters" }),
	name: z.string(),
	sku: z.string(),
	price: z.number(),
	quantity: z.number().int({ message: "Quantity must be a whole number" }).positive({ message: "Quantity must be at least 1" }).max(999, { message: "Quantity cannot exceed 999" }),
	variant_name: z.string().max(100, { message: "Variant name cannot exceed 100 characters" })
});
var formSchema = z.object({
	nume: z.string().min(1, "Câmpul nume este obligatoriu").max(255, "Numele poate avea maximum 255 de caractere"),
	prenume: z.string().min(1, "Câmpul prenume este obligatoriu").max(255, "Prenumele poate avea maximum 255 de caractere"),
	phoneNumber: z.string().refine((val) => isValidPhoneNumber(val, { defaultCountry: "RO" }), { message: "Număr de telefon invalid" }),
	message: z.string().max(255).optional(),
	zipCode: z.string().trim().regex(/^\d{6}$/, { message: "Codul poștal trebuie să conțină exact 6 cifre" }),
	judet: z.string().min(1, "Selectarea județului este obligatorie"),
	localitate: z.string().min(1, "Selectarea localității este obligatorie"),
	adresa_1: z.string().min(1, "Adresa este obligatorie"),
	adresa_2: z.string().optional(),
	payment: z.enum(["Card debit / credit", "ramburs"], { error: "Metoda de plată este obligatorie" })
});
var stripeProductSchema = { products: z.object({
	productId: z.string(),
	variantId: z.string(),
	quantity: z.number().min(1, "Cantitatea trebuie să fie cel puțin 1")
}).array() };
var moreEmailProductSchema = {
	products: z.object({
		productId: z.string(),
		variantId: z.string(),
		quantity: z.number().min(1, "Cantitatea trebuie să fie cel puțin 1")
	}).array(),
	customerEmail: z.string().email(),
	orderNumber: z.string(),
	subtotal: z.number(),
	shipping: z.number(),
	tax: z.number(),
	total: z.number(),
	createdAt: z.string()
};
formSchema.extend(moreEmailProductSchema);
formSchema.extend(stripeProductSchema);
var checkoutSchema = z.object({
	firstName: z.string().min(2, "Prenumele este prea scurt"),
	lastName: z.string().min(2, "Numele este prea scurt"),
	phone: z.string().regex(/^(\+4)?07[0-9]{8}$/, "Număr de telefon invalid (ex: 07xxxxxxxx)"),
	address: z.string().min(5, "Adresa trebuie să fie mai specifică"),
	city: z.string().min(2, "Orașul este obligatoriu"),
	zip: z.string().min(4, "Cod poștal invalid"),
	shippingMethod: z.enum(["standard", "free"]),
	payment: z.enum(["card", "ramburs"])
});
z.object({
	original_price: z.number(),
	discounted_price: z.number().optional(),
	final_price: z.number()
});
z.object({
	available: z.boolean(),
	documentId: z.string().optional(),
	name: z.string(),
	updatedAt: z.string(),
	media: z.array(z.object({ url: z.string() })),
	color: z.object({
		name: z.string(),
		color_code: z.string()
	}),
	size: z.object({ name: z.string() })
});
z.object({
	documentId: z.string().optional(),
	name: z.string(),
	slug: z.string(),
	description: z.string(),
	updatedAt: z.string(),
	price: number(),
	categories: z.array(z.object({ name: z.string() })),
	sub_categories: z.array(z.object({ name: z.string() }))
});
var CartItemSchema = z.object({
	productId: z.string(),
	variantId: z.string(),
	quantity: z.number()
});
var orderFieldsSchema = checkoutSchema.extend({ cartItems: CartItemSchema.array().min(1, "Trebuie să adaugi cel puțin un produs în coș") });
//#endregion
export { orderFieldsSchema as n, checkoutSchema as t };
