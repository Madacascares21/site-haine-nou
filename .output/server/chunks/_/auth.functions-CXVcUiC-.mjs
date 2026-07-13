import { c as createServerFn, T as TSS_SERVER_FUNCTION, b as getServerFnById } from '../virtual/entry.mjs';
import { redirect } from '@tanstack/react-router';

var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
var getSession = createServerFn({ method: "GET" }).handler(createSsrRpc("753fb13391a5b0328ea3344426a11caf1f07e6f28fcdc91937757498d31af961"));
async function requireAuth() {
  const session = await getSession();
  if (!session) throw redirect({ to: "/sign-in" });
  return session;
}
var ensureSession = createServerFn({ method: "GET" }).handler(createSsrRpc("320b20df46a897fdac7b4c0604c8114f427784a2e4bb7478c59ae0d8a3d9d1b3"));

export { createSsrRpc as c, ensureSession as e, getSession as g, requireAuth as r };
//# sourceMappingURL=auth.functions-CXVcUiC-.mjs.map
