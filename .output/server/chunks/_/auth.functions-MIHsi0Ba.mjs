import { c as createServerFn, g as getRequestHeaders } from '../virtual/entry.mjs';
import { a as auth } from './kysely-adapter-2JZcyMF-.mjs';
import { c as createServerRpc } from './createServerRpc-TRTdhlJ7.mjs';
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
import '@tanstack/react-router';
import 'react/jsx-runtime';
import '@tanstack/react-router/ssr/server';
import 'node:async_hooks';
import 'node:stream';
import './nodemailer-D4bWEl0n.mjs';
import 'class-variance-authority';
import 'nodemailer';
import 'zod';
import 'node:fs/promises';
import 'node:os';

var getSession_createServerFn_handler = createServerRpc({
  id: "753fb13391a5b0328ea3344426a11caf1f07e6f28fcdc91937757498d31af961",
  name: "getSession",
  filename: "src/lib/auth.functions.ts"
}, (opts) => getSession.__executeServer(opts));
var getSession = createServerFn({ method: "GET" }).handler(getSession_createServerFn_handler, async () => {
  const headers = getRequestHeaders();
  return await auth.api.getSession({ headers });
});
var ensureSession_createServerFn_handler = createServerRpc({
  id: "320b20df46a897fdac7b4c0604c8114f427784a2e4bb7478c59ae0d8a3d9d1b3",
  name: "ensureSession",
  filename: "src/lib/auth.functions.ts"
}, (opts) => ensureSession.__executeServer(opts));
var ensureSession = createServerFn({ method: "GET" }).handler(ensureSession_createServerFn_handler, async () => {
  const headers = getRequestHeaders();
  const session = await auth.api.getSession({ headers });
  if (!session) throw new Error("Unauthorized");
  return session;
});

export { ensureSession_createServerFn_handler, getSession_createServerFn_handler };
//# sourceMappingURL=auth.functions-MIHsi0Ba.mjs.map
