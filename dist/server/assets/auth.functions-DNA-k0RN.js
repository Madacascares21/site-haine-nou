import { i as getServerFnById, n as createServerFn, r as TSS_SERVER_FUNCTION } from "../server.js";
//#region node_modules/.pnpm/@tanstack+start-server-core@1.169.15/node_modules/@tanstack/start-server-core/dist/esm/createSsrRpc.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region src/lib/auth.functions.ts
var getSession = createServerFn({ method: "GET" }).handler(createSsrRpc("753fb13391a5b0328ea3344426a11caf1f07e6f28fcdc91937757498d31af961"));
var isAuthenticated = createServerFn({ method: "GET" }).handler(createSsrRpc("ff97c6e799fe68b8dab7f0e6196d187434557ae5120fabaa10139476d38a4185"));
var ensureSession = createServerFn({ method: "GET" }).handler(createSsrRpc("320b20df46a897fdac7b4c0604c8114f427784a2e4bb7478c59ae0d8a3d9d1b3"));
//#endregion
export { createSsrRpc as i, getSession as n, isAuthenticated as r, ensureSession as t };
