import { isValidPhoneNumber } from "react-phone-number-input";
import z, { custom, number } from "zod";
// import { CartItemSchema } from "../cart/schema";

// export const orderFormSchema = z.object({
//     name: z
//         .string({
//             error: "Numele este obligatoriu",
//         })
//         .min(2, { message: "Numele trebuie să aibă cel puțin 2 caractere" })
//         .max(50, { message: "Numele trebuie să aibă maximum 50 de caractere" }),

//     lastName: z
//         .string({
//             error: "Prenumele este obligatoriu",
//         })
//         .min(2, { message: "Prenumele trebuie să aibă cel puțin 2 caractere" })
//         .max(50, { message: "Prenumele trebuie să aibă maximum 50 de caractere" }),

//     email: z
//         .email({ message: "Adresă de email invalidă" })
//         .max(100, { message: "Emailul trebuie să aibă maximum 100 de caractere" }),

//     phone: z
//         .string({
//             error: "Numărul de telefon este obligatoriu",
//         })
//     // .regex(/^07\d{8}$/, {
//     //     message: "Număr de telefon invalid (format corect: 07xxxxxxxx)",
//     // }),
//     ,
//     message: z
//         .string()
//         .max(500, {
//             message: "Mesajul trebuie să aibă maximum 500 de caractere",
//         })
//         .optional(),
// });

export const orderProductSchema = z.object(
    {
        documentId: z.string(),
        image: z.string().max(255, { message: 'Image path/URL cannot exceed 255 characters' }),
        name: z.string(),
        sku: z.string(),
        price: z.number(),
        quantity: z.number().int({ message: 'Quantity must be a whole number' })
            .positive({ message: 'Quantity must be at least 1' })
            .max(999, { message: 'Quantity cannot exceed 999' }),
        variant_name: z.string().max(100, { message: 'Variant name cannot exceed 100 characters' })
    }
)
// export const sendOrderEmailSchema = orderFormSchema.extend({
//     total: z.number(),
//     products: z.array(orderProductSchema).optional()
// })
// export type SendOrderEmailSchema = z.infer<typeof sendOrderEmailSchema>
// export type OrderFormchema = z.infer<typeof orderFormSchema>
export const formSchema = z.object({
    nume: z
        .string()
        .min(1, "Câmpul nume este obligatoriu")
        .max(255, "Numele poate avea maximum 255 de caractere"),

    prenume: z
        .string()
        .min(1, "Câmpul prenume este obligatoriu")
        .max(255, "Prenumele poate avea maximum 255 de caractere"),

    phoneNumber: z
        .string()
        .refine(
            (val) => isValidPhoneNumber(val as string, { defaultCountry: "RO" }),
            { message: "Număr de telefon invalid" }
        ),

    message: z.string().max(255).optional(),

    zipCode: z
        .string()
        .trim()
        .regex(/^\d{6}$/, {
            message: "Codul poștal trebuie să conțină exact 6 cifre",
        }),

    judet: z
        .string()
        .min(1, "Selectarea județului este obligatorie"),

    localitate: z
        .string()
        .min(1, "Selectarea localității este obligatorie"),

    adresa_1: z
        .string()
        .min(1, "Adresa este obligatorie"),

    adresa_2: z.string().optional(),

    payment: z.enum(
        ["Card debit / credit", "ramburs"],
        { error: "Metoda de plată este obligatorie" }
    ),
});



export const stripeProductSchema = {
    products:
        z.object({
            productId: z.string(),
            variantId: z.string(),
            quantity: z.number().min(1, "Cantitatea trebuie să fie cel puțin 1"),
        }).array()

}

export const moreEmailProductSchema = {
    products:
        z.object({
            productId: z.string(),
            variantId: z.string(),
            quantity: z.number().min(1, "Cantitatea trebuie să fie cel puțin 1"),
        }).array(),
    customerEmail: z.string().email(),
    orderNumber: z.string(),
    subtotal: z.number(),
    shipping: z.number(),
    tax: z.number(),
    total: z.number(),
    createdAt: z.string(),
}


export const emailFormSchema = formSchema.extend(moreEmailProductSchema);

export type StripeProductSchema = z.infer<typeof stripeProductSchema.products>;
export const serverOrderFormSchema = formSchema.extend(stripeProductSchema);
export type ServerOrderFormSchema = z.infer<typeof serverOrderFormSchema>;






export const checkoutSchema = z
    .object({
        firstName: z.string().min(2, "Prenumele este prea scurt"),
        lastName: z.string().min(2, "Numele este prea scurt"),
        phone: z.string().regex(/^(\+4)?07[0-9]{8}$/, "Număr de telefon invalid (ex: 07xxxxxxxx)"),
        address: z.string().min(5, "Adresa trebuie să fie mai specifică"),
        city: z.string().min(2, "Orașul este obligatoriu"),
        zip: z.string().min(4, "Cod poștal invalid"),
        shippingMethod: z.enum(["standard", "free"]),
        payment: z.enum(["card", "ramburs"]),

    })
export type CheckoutSchema = z.infer<typeof checkoutSchema>








// ProductPrice
export const ProductPriceSchema = z.object({
    original_price: z.number(),
    discounted_price: z.number().optional(),
    final_price: z.number(),
});

// ProductVariant
export const ProductVariantSchema = z.object({
    available: z.boolean(),
    documentId: z.string().optional(),
    name: z.string(),
    updatedAt: z.string(),
    media: z.array(
        z.object({
            url: z.string(),
        })
    ),
    color: z.object({
        name: z.string(),
        color_code: z.string(),
    }),
    size: z.object({
        name: z.string(),
    }),
});

// Product
export const ProductSchema = z.object({
    documentId: z.string().optional(),
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    updatedAt: z.string(),

    price: number(),

    categories: z.array(
        z.object({
            name: z.string(),
        })
    ),

    sub_categories: z.array(
        z.object({
            name: z.string(),
        })
    ),

    //   variants: z.array(ProductVariantSchema),
});


const CartItemSchema = z.object({
    productId: z.string(),
    variantId: z.string(),
    quantity: z.number()
})




export const orderFieldsSchema = checkoutSchema.extend({
    cartItems: CartItemSchema.array().min(1, "Trebuie să adaugi cel puțin un produs în coș")
})

