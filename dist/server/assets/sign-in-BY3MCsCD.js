import { r as signIn, t as Spinner } from "./spinner-BCrpBkQY.js";
import { t as Button } from "./button-wioQ1hvF.js";
import { a as FieldLabel, i as FieldGroup, n as FieldDescription, o as FieldSeparator, r as FieldError, s as Input, t as Field } from "./field-BTpxeqXh.js";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import * as z$2 from "zod";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
//#region src/routes/sign-in/-schemas/form-schema.ts
var formSchema = z$2.object({ email: z$2.email() });
//#endregion
//#region src/routes/sign-in/-components/google-provider-btn.tsx
var GoogleProviderButton = ({ loading, setLoading }) => {
	const handleClick = async () => {
		setLoading(true);
		await signIn.social({ provider: "google" });
		setLoading(false);
	};
	return /* @__PURE__ */ jsx(Button, {
		variant: "secondary",
		onClick: handleClick,
		disabled: loading,
		children: loading ? /* @__PURE__ */ jsx(Spinner, {}) : "Google"
	});
};
//#endregion
//#region src/routes/sign-in/-components/user-auth-form.tsx
function UserAuthForm({}) {
	const [googleLoading, setGoogleLoading] = useState(false);
	const form = useForm({
		defaultValues: { email: "" },
		validators: {
			onSubmit: formSchema,
			onChange: formSchema
		},
		onSubmit: async ({ value }) => {
			const { data, error } = await signIn.magicLink({
				email: value.email,
				callbackURL: "/dashboard",
				newUserCallbackURL: "/welcome",
				errorCallbackURL: "/error",
				metadata: { inviteId: "123" }
			});
			if (!data?.status) toast.error(error?.message);
			toast.success("Check your email 😁👍!");
		}
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-6",
		children: [
			/* @__PURE__ */ jsx("form", {
				onSubmit: (e) => {
					e.preventDefault();
					form.handleSubmit();
				},
				children: /* @__PURE__ */ jsxs(FieldGroup, { children: [/* @__PURE__ */ jsx(form.Field, {
					name: "email",
					children: (field) => {
						const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
						return /* @__PURE__ */ jsxs(Field, {
							"data-invalid": isInvalid,
							children: [
								/* @__PURE__ */ jsx(FieldLabel, {
									className: "sr-only",
									htmlFor: field.name,
									children: "Email"
								}),
								/* @__PURE__ */ jsx(Input, {
									type: "email",
									id: field.name,
									name: field.name,
									value: field.state.value,
									onBlur: field.handleBlur,
									onChange: (e) => field.handleChange(e.target.value),
									"aria-invalid": isInvalid,
									placeholder: "name@example.com",
									autoComplete: "email",
									autoCorrect: "off",
									autoCapitalize: "none"
								}),
								isInvalid && /* @__PURE__ */ jsx(FieldError, { errors: field.state.meta.errors })
							]
						});
					}
				}), /* @__PURE__ */ jsx(form.Subscribe, {
					selector: (state) => [
						state.canSubmit,
						state.isSubmitting,
						state.isSubmitted
					],
					children: ([canSubmit, isSubmitting, isSubmitted]) => /* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: !canSubmit || googleLoading || isSubmitted,
						children: isSubmitting ? /* @__PURE__ */ jsx(Spinner, {}) : isSubmitted ? "Email Sent" : "Continue with Email"
					})
				})] })
			}),
			/* @__PURE__ */ jsx(FieldSeparator, { children: "Or continue with" }),
			/* @__PURE__ */ jsx(GoogleProviderButton, {
				loading: googleLoading,
				setLoading: setGoogleLoading
			})
		]
	});
}
//#endregion
//#region src/routes/sign-in/-components/login-page.tsx
function AuthenticationPage() {
	return /* @__PURE__ */ jsxs("div", {
		className: " px-12 sm:px-4 py-8 flex-1  flex h-full",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex-1  relative hidden  h-full flex-col p-10 text-primary lg:flex dark:border-r ",
			children: [
				/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-primary/5" }),
				/* @__PURE__ */ jsxs("div", {
					className: "relative z-20 flex items-center text-lg font-medium",
					children: [/* @__PURE__ */ jsx("svg", {
						xmlns: "http://www.w3.org/2000/svg",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						className: "mr-2 h-6 w-6",
						children: /* @__PURE__ */ jsx("path", { d: "M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" })
					}), "Acme Inc"]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "relative z-20 mt-auto",
					children: /* @__PURE__ */ jsx("blockquote", {
						className: "leading-normal text-balance",
						children: "“This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster than ever before.” - Sofia Davis"
					})
				})
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "flex flex-1 items-center justify-center  lg:p-8",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto flex w-full flex-col justify-center gap-6 sm:w-[350px]",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-2 text-center",
						children: [/* @__PURE__ */ jsx("h1", {
							className: "text-2xl font-semibold tracking-tight",
							children: "Welcome"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm text-muted-foreground",
							children: "Use your email or Google account to continue."
						})]
					}),
					/* @__PURE__ */ jsx(UserAuthForm, {}),
					/* @__PURE__ */ jsxs(FieldDescription, {
						className: "px-6 text-center",
						children: [
							"By clicking continue, you agree to our",
							" ",
							/* @__PURE__ */ jsx(Link, {
								to: "/",
								children: "Terms of Service"
							}),
							" and",
							" ",
							/* @__PURE__ */ jsx(Link, {
								to: "/",
								children: "Privacy Policy"
							}),
							"."
						]
					})
				]
			})
		})]
	});
}
//#endregion
//#region src/routes/sign-in/index.tsx?tsr-split=component
var SplitComponent = AuthenticationPage;
//#endregion
export { SplitComponent as component };
