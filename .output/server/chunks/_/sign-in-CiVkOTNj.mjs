import { C as Container, F as FieldDescription, s as signIn, a as FieldGroup, c as Field, d as FieldLabel, I as Input, e as FieldError, B as Button, S as Spinner, f as FieldSeparator } from './router-DVmJmQLB.mjs';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as z$2 from 'zod';
import { toast } from 'sonner';
import { useForm } from '@tanstack/react-form';
import '../virtual/entry.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'drizzle-orm';
import 'drizzle-orm/pg-core';
import 'drizzle-orm/node-postgres';
import '@tanstack/react-router/ssr/server';
import 'node:async_hooks';
import 'node:stream';
import './kysely-adapter-2JZcyMF-.mjs';
import './nodemailer-D4bWEl0n.mjs';
import 'class-variance-authority';
import 'nodemailer';
import 'node:fs/promises';
import 'node:os';
import './auth.functions-CXVcUiC-.mjs';
import './utils-D6pEwd0q.mjs';
import './product.query-BBHo8rfv.mjs';
import 'graphql-request';
import 'clsx';
import 'tailwind-merge';
import './schema-DNbTVeE0.mjs';
import 'lucide-react';
import 'zustand';
import 'zustand/middleware';
import 'radix-ui';
import './constants-BaiN9-he.mjs';
import '@tanstack/react-query';
import 'next-themes';
import 'uploadthing/server';
import '@tanstack/react-router-ssr-query';

var formSchema = z$2.object({ email: z$2.email() });
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
        callbackURL: `/checkout`,
        errorCallbackURL: "/error"
      });
      if (!data?.status) toast.error(error?.message);
      toast.success("Verific\u0103 emailul t\u0103u \u{1F601}\u{1F44D}!");
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
                  placeholder: "nume@exemplu.com",
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
            children: isSubmitting ? /* @__PURE__ */ jsx(Spinner, {}) : isSubmitted ? "Email trimis" : "Continu\u0103 cu email"
          })
        })] })
      }),
      /* @__PURE__ */ jsx(FieldSeparator, { children: "Sau continu\u0103 cu" }),
      /* @__PURE__ */ jsx(GoogleProviderButton, {
        loading: googleLoading,
        setLoading: setGoogleLoading
      })
    ]
  });
}
function AuthenticationPage() {
  return /* @__PURE__ */ jsx("main", {
    className: "  min-h-screen flex-1 flex",
    children: /* @__PURE__ */ jsx(Container, {
      className: "flex",
      children: /* @__PURE__ */ jsx("div", {
        className: "flex flex-1 items-center justify-center lg:p-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "mx-auto flex w-full flex-col justify-center gap-6 sm:w-[350px]",
          children: [
            /* @__PURE__ */ jsxs("div", {
              className: "flex flex-col gap-2 text-center",
              children: [/* @__PURE__ */ jsx("h1", {
                className: "text-2xl font-semibold tracking-tight",
                children: "Bun venit"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-sm text-muted-foreground",
                children: "Folose\u0219te adresa de email sau contul Google pentru a continua."
              })]
            }),
            /* @__PURE__ */ jsx(UserAuthForm, {}),
            /* @__PURE__ */ jsxs(FieldDescription, {
              className: "px-6 text-center",
              children: [
                "Continu\xE2nd, e\u0219ti de acord cu",
                " ",
                /* @__PURE__ */ jsx(Link, {
                  to: "/",
                  children: "Termenii \u0219i condi\u021Biile"
                }),
                " ",
                "\u0219i",
                " ",
                /* @__PURE__ */ jsx(Link, {
                  to: "/",
                  children: "Politica de confiden\u021Bialitate"
                }),
                "."
              ]
            })
          ]
        })
      })
    })
  });
}
var SplitComponent = AuthenticationPage;

export { SplitComponent as component };
//# sourceMappingURL=sign-in-CiVkOTNj.mjs.map
