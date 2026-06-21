import { a as getRequestHeaders, n as createServerFn } from "../server.js";
import { t as auth } from "./auth-B0EeAnYu.js";
import { t as createServerRpc } from "./createServerRpc-BSuLXgU0.js";
import { redirect } from "@tanstack/react-router";
//#region src/lib/auth.functions.ts?tss-serverfn-split
var getSession_createServerFn_handler = createServerRpc({
	id: "753fb13391a5b0328ea3344426a11caf1f07e6f28fcdc91937757498d31af961",
	name: "getSession",
	filename: "src/lib/auth.functions.ts"
}, (opts) => getSession.__executeServer(opts));
var getSession = createServerFn({ method: "GET" }).handler(getSession_createServerFn_handler, async () => {
	const headers = getRequestHeaders();
	return await auth.api.getSession({ headers });
});
var isAuthenticated_createServerFn_handler = createServerRpc({
	id: "ff97c6e799fe68b8dab7f0e6196d187434557ae5120fabaa10139476d38a4185",
	name: "isAuthenticated",
	filename: "src/lib/auth.functions.ts"
}, (opts) => isAuthenticated.__executeServer(opts));
var isAuthenticated = createServerFn({ method: "GET" }).handler(isAuthenticated_createServerFn_handler, async () => {
	const session = getSession();
	if (!session) throw redirect({ to: "/sign-in" });
	return session;
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
//#endregion
export { ensureSession_createServerFn_handler, getSession_createServerFn_handler, isAuthenticated_createServerFn_handler };
