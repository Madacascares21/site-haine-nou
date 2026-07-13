import { c as createServerFn } from '../virtual/entry.mjs';
import { g as getBaseURL, d as createFetch, e as defu, f as capitalizeFirstLetter, i as isSafeUrlScheme, t as toKebabCase, P as PACKAGE_VERSION, a as auth } from './kysely-adapter-2JZcyMF-.mjs';
import { c as createSsrRpc, g as getSession, r as requireAuth } from './auth.functions-CXVcUiC-.mjs';
import { c as cn, s as slugToTitle, b as batchProductsServerFn, h as getProductBySlug, g as getStrapiMedia, f as formatPrice } from './utils-D6pEwd0q.mjs';
import { g as generatedData, a as site, n as navigation, b as navigationMenuTriggerStyle$1 } from './nodemailer-D4bWEl0n.mjs';
import { o as orderIdSchema } from './schema-DNbTVeE0.mjs';
import { useRef, useCallback, useSyncExternalStore, useMemo, useEffect, useState } from 'react';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { Loader2Icon, XIcon, OctagonXIcon, TriangleAlertIcon, InfoIcon, CircleCheckIcon, Facebook, Instagram, Youtube, Menu, ChevronDown, User, ShoppingCart, Loader2, ImageOff, AlertCircle, Minus, Plus, Trash2, ChevronDownIcon, Settings, MessageCircleHeart, LogOut, Shield, AlertTriangle } from 'lucide-react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { cva } from 'class-variance-authority';
import { Slot, Separator, Dialog, Label, NavigationMenu, Collapsible, Popover, ScrollArea, Avatar, AlertDialog } from 'radix-ui';
import { c as GET_PRODUCTS } from './product.query-BBHo8rfv.mjs';
import { s as sortByOptionArray } from './constants-BaiN9-he.mjs';
import { createFileRoute, lazyRouteComponent, createRouter, createRootRouteWithContext, HeadContent, Scripts, redirect, notFound, Link, useRouter } from '@tanstack/react-router';
import { GraphQLClient } from 'graphql-request';
import z$2__default, { z } from 'zod';
import { useQuery, QueryClient } from '@tanstack/react-query';
import { useTheme } from 'next-themes';
import { Toaster, toast } from 'sonner';
import { useForm } from '@tanstack/react-form';
import { UTApi, createUploadthing } from 'uploadthing/server';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';

var PROTO_POLLUTION_PATTERNS = {
  proto: /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
  constructor: /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
  protoShort: /"__proto__"\s*:/,
  constructorShort: /"constructor"\s*:/
};
var JSON_SIGNATURE = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
var SPECIAL_VALUES = {
  true: true,
  false: false,
  null: null,
  undefined: void 0,
  nan: NaN,
  infinity: Number.POSITIVE_INFINITY,
  "-infinity": Number.NEGATIVE_INFINITY
};
var ISO_DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,7}))?(?:Z|([+-])(\d{2}):(\d{2}))$/;
function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime());
}
function parseISODate(value) {
  const match = ISO_DATE_REGEX.exec(value);
  if (!match) return null;
  const [, year, month, day, hour, minute, second, ms, offsetSign, offsetHour, offsetMinute] = match;
  const date = new Date(Date.UTC(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10), parseInt(hour, 10), parseInt(minute, 10), parseInt(second, 10), ms ? parseInt(ms.padEnd(3, "0"), 10) : 0));
  if (offsetSign) {
    const offset = (parseInt(offsetHour, 10) * 60 + parseInt(offsetMinute, 10)) * (offsetSign === "+" ? -1 : 1);
    date.setUTCMinutes(date.getUTCMinutes() + offset);
  }
  return isValidDate(date) ? date : null;
}
function betterJSONParse(value, options = {}) {
  const { strict = false, warnings = false, reviver, parseDates = true } = options;
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  const lowerValue = trimmed.toLowerCase();
  if (lowerValue.length <= 9 && lowerValue in SPECIAL_VALUES) return SPECIAL_VALUES[lowerValue];
  if (!JSON_SIGNATURE.test(trimmed)) {
    if (strict) throw new SyntaxError("[better-json] Invalid JSON");
    return value;
  }
  if (Object.entries(PROTO_POLLUTION_PATTERNS).some(([key, pattern]) => {
    const matches = pattern.test(trimmed);
    if (matches && warnings) console.warn(`[better-json] Detected potential prototype pollution attempt using ${key} pattern`);
    return matches;
  }) && strict) throw new Error("[better-json] Potential prototype pollution attempt detected");
  try {
    const secureReviver = (key, value2) => {
      if (key === "__proto__" || key === "constructor" && value2 && typeof value2 === "object" && "prototype" in value2) {
        if (warnings) console.warn(`[better-json] Dropping "${key}" key to prevent prototype pollution`);
        return;
      }
      if (parseDates && typeof value2 === "string") {
        const date = parseISODate(value2);
        if (date) return date;
      }
      return reviver ? reviver(key, value2) : value2;
    };
    return JSON.parse(trimmed, secureReviver);
  } catch (error) {
    if (strict) throw error;
    return value;
  }
}
function parseJSON(value, options = { strict: true }) {
  return betterJSONParse(value, options);
}
var redirectPlugin = {
  id: "redirect",
  name: "Redirect",
  hooks: { onSuccess(context) {
    if (context.data?.url && context.data?.redirect && isSafeUrlScheme(context.data.url)) ;
  } }
};
var listenerQueue = [];
var lqIndex = 0;
var QUEUE_ITEMS_PER_LISTENER = 4;
var nanostoresGlobal = globalThis.nanostoresGlobal ||= { epoch: 0 };
var atom = /* @__NO_SIDE_EFFECTS__ */ (initialValue) => {
  let listeners = [];
  let $atom = {
    get() {
      if (!$atom.lc) $atom.listen(() => {
      })();
      return $atom.value;
    },
    init: initialValue,
    lc: 0,
    listen(listener) {
      $atom.lc = listeners.push(listener);
      return () => {
        for (let i = lqIndex + QUEUE_ITEMS_PER_LISTENER; i < listenerQueue.length; ) if (listenerQueue[i] === listener) listenerQueue.splice(i, QUEUE_ITEMS_PER_LISTENER);
        else i += QUEUE_ITEMS_PER_LISTENER;
        let index = listeners.indexOf(listener);
        if (~index) {
          listeners.splice(index, 1);
          if (!--$atom.lc) $atom.off();
        }
      };
    },
    notify(oldValue, changedKey) {
      nanostoresGlobal.epoch++;
      let runListenerQueue = !listenerQueue.length;
      for (let listener of listeners) listenerQueue.push(listener, $atom.value, oldValue, changedKey);
      if (runListenerQueue) {
        for (lqIndex = 0; lqIndex < listenerQueue.length; lqIndex += QUEUE_ITEMS_PER_LISTENER) listenerQueue[lqIndex](listenerQueue[lqIndex + 1], listenerQueue[lqIndex + 2], listenerQueue[lqIndex + 3]);
        listenerQueue.length = 0;
      }
    },
    off() {
    },
    set(newValue) {
      let oldValue = $atom.value;
      if (oldValue !== newValue) {
        $atom.value = newValue;
        $atom.notify(oldValue);
      }
    },
    subscribe(listener) {
      let unbind = $atom.listen(listener);
      listener($atom.value);
      return unbind;
    },
    value: initialValue
  };
  return $atom;
};
var SET = 2;
var MOUNT = 5;
var UNMOUNT = 6;
var REVERT_MUTATION = 10;
var on = (object, listener, eventKey, mutateStore) => {
  object.events = object.events || {};
  if (!object.events[eventKey + REVERT_MUTATION]) object.events[eventKey + REVERT_MUTATION] = mutateStore((eventProps) => {
    object.events[eventKey].reduceRight((event, l) => (l(event), event), {
      shared: {},
      ...eventProps
    });
  });
  object.events[eventKey] = object.events[eventKey] || [];
  object.events[eventKey].push(listener);
  return () => {
    let currentListeners = object.events[eventKey];
    let index = currentListeners.indexOf(listener);
    currentListeners.splice(index, 1);
    if (!currentListeners.length) {
      delete object.events[eventKey];
      object.events[eventKey + REVERT_MUTATION]();
      delete object.events[eventKey + REVERT_MUTATION];
    }
  };
};
var onSet = ($store, listener) => on($store, listener, SET, (runListeners) => {
  let originSet = $store.set;
  let originSetKey = $store.setKey;
  if ($store.setKey) $store.setKey = (changed, changedValue) => {
    let isAborted;
    let abort = () => {
      isAborted = true;
    };
    runListeners({
      abort,
      changed,
      newValue: {
        ...$store.value,
        [changed]: changedValue
      }
    });
    if (!isAborted) return originSetKey(changed, changedValue);
  };
  $store.set = (newValue) => {
    let isAborted;
    let abort = () => {
      isAborted = true;
    };
    runListeners({
      abort,
      newValue
    });
    if (!isAborted) return originSet(newValue);
  };
  return () => {
    $store.set = originSet;
    $store.setKey = originSetKey;
  };
});
var STORE_UNMOUNT_DELAY = 1e3;
var onMount = ($store, initialize) => {
  let listener = (payload) => {
    let destroy = initialize(payload);
    if (destroy) $store.events[UNMOUNT].push(destroy);
  };
  return on($store, listener, MOUNT, (runListeners) => {
    let originListen = $store.listen;
    $store.listen = (...args) => {
      if (!$store.lc && !$store.active) {
        $store.active = true;
        runListeners();
      }
      return originListen(...args);
    };
    let originOff = $store.off;
    $store.events[UNMOUNT] = [];
    $store.off = () => {
      originOff();
      setTimeout(() => {
        if ($store.active && !$store.lc) {
          $store.active = false;
          for (let destroy of $store.events[UNMOUNT]) destroy();
          $store.events[UNMOUNT] = [];
        }
      }, STORE_UNMOUNT_DELAY);
    };
    return () => {
      $store.listen = originListen;
      $store.off = originOff;
    };
  });
};
function listenKeys($store, keys, listener) {
  let keysSet = new Set(keys).add(void 0);
  return $store.listen((value, oldValue, changed) => {
    if (keysSet.has(changed)) listener(value, oldValue, changed);
  });
}
function isPlainObject(value) {
  if (typeof value !== "object" || value === null) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}
function isJsonEqual(a, b) {
  if (a === b) return true;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (!isJsonEqual(a[i], b[i])) return false;
    return true;
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (const key of keysA) if (!(key in b) || !isJsonEqual(a[key], b[key])) return false;
    return true;
  }
  return false;
}
function withEquality(store, isEqual) {
  return onSet(store, ({ newValue, abort }) => {
    if (isEqual(store.value, newValue)) abort();
  });
}
var kBroadcastChannel = /* @__PURE__ */ Symbol.for("better-auth:broadcast-channel");
var WindowBroadcastChannel = class {
  listeners = /* @__PURE__ */ new Set();
  name;
  constructor(name = "better-auth.message") {
    this.name = name;
  }
  subscribe(listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
  post(message) {
    return;
  }
  setup() {
    return () => {
    };
  }
};
function getGlobalBroadcastChannel(name = "better-auth.message") {
  if (!globalThis[kBroadcastChannel]) globalThis[kBroadcastChannel] = new WindowBroadcastChannel(name);
  return globalThis[kBroadcastChannel];
}
var kFocusManager = /* @__PURE__ */ Symbol.for("better-auth:focus-manager");
var WindowFocusManager = class {
  listeners = /* @__PURE__ */ new Set();
  subscribe(listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
  setFocused(focused) {
    this.listeners.forEach((listener) => listener(focused));
  }
  setup() {
    return () => {
    };
  }
};
function getGlobalFocusManager() {
  if (!globalThis[kFocusManager]) globalThis[kFocusManager] = new WindowFocusManager();
  return globalThis[kFocusManager];
}
var kOnlineManager = /* @__PURE__ */ Symbol.for("better-auth:online-manager");
var WindowOnlineManager = class {
  listeners = /* @__PURE__ */ new Set();
  isOnline = typeof navigator !== "undefined" ? navigator.onLine : true;
  subscribe(listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
  setOnline(online) {
    this.isOnline = online;
    this.listeners.forEach((listener) => listener(online));
  }
  setup() {
    return () => {
    };
  }
};
function getGlobalOnlineManager() {
  if (!globalThis[kOnlineManager]) globalThis[kOnlineManager] = new WindowOnlineManager();
  return globalThis[kOnlineManager];
}
var now = () => Math.floor(Date.now() / 1e3);
var FOCUS_REFETCH_RATE_LIMIT_SECONDS = 5;
function createSessionRefreshManager(opts) {
  const { fetchSession, shouldPollSession = () => true, sessionSignal, options = {} } = opts;
  const refetchInterval = options.sessionOptions?.refetchInterval ?? 0;
  const refetchOnWindowFocus = options.sessionOptions?.refetchOnWindowFocus ?? true;
  const refetchWhenOffline = options.sessionOptions?.refetchWhenOffline ?? false;
  const state = {
    isInitialized: false,
    lastSessionRequest: 0
  };
  const shouldRefetch = () => {
    return refetchWhenOffline || getGlobalOnlineManager().isOnline;
  };
  const triggerRefetch = (event) => {
    if (!shouldRefetch()) return;
    if (event?.event === "storage") {
      fetchSession();
      return;
    }
    if (event?.event === "poll") {
      state.lastSessionRequest = now();
      fetchSession();
      return;
    }
    if (event?.event === "visibilitychange") {
      if (now() - state.lastSessionRequest < FOCUS_REFETCH_RATE_LIMIT_SECONDS) return;
      state.lastSessionRequest = now();
      fetchSession();
      return;
    }
    fetchSession();
  };
  const broadcastSessionUpdate = (trigger) => {
    getGlobalBroadcastChannel().post({
      event: "session",
      data: { trigger },
      clientId: Math.random().toString(36).substring(7)
    });
  };
  const setupPolling = () => {
    if (refetchInterval && refetchInterval > 0) state.pollInterval = setInterval(() => {
      if (shouldPollSession()) triggerRefetch({ event: "poll" });
    }, refetchInterval * 1e3);
  };
  const setupBroadcast = () => {
    state.unsubscribeBroadcast = getGlobalBroadcastChannel().subscribe(() => {
      triggerRefetch({ event: "storage" });
    });
  };
  const setupFocusRefetch = () => {
    if (!refetchOnWindowFocus) return;
    state.unsubscribeFocus = getGlobalFocusManager().subscribe(() => {
      triggerRefetch({ event: "visibilitychange" });
    });
  };
  const setupOnlineRefetch = () => {
    state.unsubscribeOnline = getGlobalOnlineManager().subscribe((online) => {
      if (online) triggerRefetch({ event: "visibilitychange" });
    });
  };
  const setupSignalSubscription = () => {
    state.unsubscribeSignal = sessionSignal.listen(() => {
      fetchSession();
    });
  };
  const init = () => {
    if (state.isInitialized) return;
    state.isInitialized = true;
    setupPolling();
    setupBroadcast();
    setupFocusRefetch();
    setupOnlineRefetch();
    setupSignalSubscription();
    state.cleanupBroadcastSetup = getGlobalBroadcastChannel().setup();
    state.cleanupFocusSetup = getGlobalFocusManager().setup();
    state.cleanupOnlineSetup = getGlobalOnlineManager().setup();
  };
  const cleanup = () => {
    if (!state.isInitialized) return;
    if (state.pollInterval) {
      clearInterval(state.pollInterval);
      state.pollInterval = void 0;
    }
    if (state.unsubscribeBroadcast) {
      state.unsubscribeBroadcast();
      state.unsubscribeBroadcast = void 0;
    }
    if (state.unsubscribeFocus) {
      state.unsubscribeFocus();
      state.unsubscribeFocus = void 0;
    }
    if (state.unsubscribeOnline) {
      state.unsubscribeOnline();
      state.unsubscribeOnline = void 0;
    }
    if (state.unsubscribeSignal) {
      state.unsubscribeSignal();
      state.unsubscribeSignal = void 0;
    }
    if (state.cleanupBroadcastSetup) {
      state.cleanupBroadcastSetup();
      state.cleanupBroadcastSetup = void 0;
    }
    if (state.cleanupFocusSetup) {
      state.cleanupFocusSetup();
      state.cleanupFocusSetup = void 0;
    }
    if (state.cleanupOnlineSetup) {
      state.cleanupOnlineSetup();
      state.cleanupOnlineSetup = void 0;
    }
    state.isInitialized = false;
    state.lastSessionRequest = 0;
  };
  return {
    init,
    cleanup,
    triggerRefetch,
    broadcastSessionUpdate
  };
}
function normalizeSessionResponse(res) {
  if (typeof res === "object" && res !== null && "data" in res && "error" in res) return res;
  return {
    data: res,
    error: null
  };
}
function normalizeSessionData(data) {
  if (!data) return null;
  if (data.session === null && data.user === null) return null;
  return data;
}
function isSessionAtomEqual(a, b) {
  return isJsonEqual(a.data, b.data) && a.error === b.error && a.isPending === b.isPending && a.isRefetching === b.isRefetching && a.refetch === b.refetch;
}
function getSessionAtom($fetch, options) {
  const $signal = /* @__PURE__ */ atom(false);
  let abortController;
  const refetch = (queryParams) => fetchSession(queryParams);
  const session = /* @__PURE__ */ atom({
    data: null,
    error: null,
    isPending: true,
    isRefetching: false,
    refetch
  });
  withEquality(session, isSessionAtomEqual);
  const settleAbortedFetch = (controller) => {
    if (abortController !== controller) return;
    const current = session.get();
    abortController = void 0;
    if (!current.isPending && !current.isRefetching) return;
    session.set({
      ...current,
      isPending: false,
      isRefetching: false,
      refetch
    });
  };
  const fetchSession = async (queryParams) => {
    abortController?.abort();
    const controller = new AbortController();
    abortController = controller;
    const current = session.get();
    session.set({
      ...current,
      isPending: current.data === null,
      isRefetching: true,
      error: null,
      refetch
    });
    try {
      const res = await $fetch("/get-session", {
        method: "GET",
        query: queryParams?.query,
        signal: controller.signal
      });
      if (controller.signal.aborted) {
        settleAbortedFetch(controller);
        return;
      }
      let { data, error } = normalizeSessionResponse(res);
      if (data?.needsRefresh) try {
        const refreshRes = await $fetch("/get-session", {
          method: "POST",
          signal: controller.signal
        });
        if (controller.signal.aborted) {
          settleAbortedFetch(controller);
          return;
        }
        ({ data, error } = normalizeSessionResponse(refreshRes));
      } catch {
        if (controller.signal.aborted) {
          settleAbortedFetch(controller);
          return;
        }
      }
      if (error) {
        const latest = session.get();
        const isUnauthorized = error?.status === 401;
        session.set({
          data: isUnauthorized ? null : latest.data,
          error,
          isPending: false,
          isRefetching: false,
          refetch
        });
        return;
      }
      const sessionData = normalizeSessionData(data);
      const current2 = session.get();
      const stableData = current2.data != null && sessionData != null && isJsonEqual(current2.data, sessionData) ? current2.data : sessionData;
      session.set({
        data: stableData,
        error: null,
        isPending: false,
        isRefetching: false,
        refetch
      });
    } catch (fetchError) {
      if (controller.signal.aborted) {
        settleAbortedFetch(controller);
        return;
      }
      const latest = session.get();
      session.set({
        data: latest.data,
        error: fetchError,
        isPending: false,
        isRefetching: false,
        refetch
      });
    }
  };
  let broadcastSessionUpdate = () => {
  };
  onMount(session, () => {
    const refreshManager = createSessionRefreshManager({
      fetchSession,
      shouldPollSession: () => session.get().data != null,
      sessionSignal: $signal,
      options
    });
    refreshManager.init();
    broadcastSessionUpdate = refreshManager.broadcastSessionUpdate;
    return () => {
      const controller = abortController;
      controller?.abort();
      if (controller) settleAbortedFetch(controller);
      refreshManager.cleanup();
    };
  });
  return {
    session,
    $sessionSignal: $signal,
    broadcastSessionUpdate: (trigger) => broadcastSessionUpdate(trigger)
  };
}
var resolvePublicAuthUrl = (basePath) => {
  if (typeof process === "undefined") return void 0;
  const path = basePath ?? "/api/auth";
  if (process.env.NEXT_PUBLIC_AUTH_URL) return process.env.NEXT_PUBLIC_AUTH_URL;
  {
    if (process.env.NEXTAUTH_URL) try {
      return process.env.NEXTAUTH_URL;
    } catch {
    }
    if (process.env.VERCEL_URL) try {
      const protocol = process.env.VERCEL_URL.startsWith("http") ? "" : "https://";
      return `${new URL(`${protocol}${process.env.VERCEL_URL}`).origin}${path}`;
    } catch {
    }
  }
};
var getClientConfig = (options, loadEnv) => {
  const isCredentialsSupported = "credentials" in Request.prototype;
  const baseURL = getBaseURL(options?.baseURL, options?.basePath, void 0) ?? resolvePublicAuthUrl(options?.basePath) ?? "/api/auth";
  const pluginsFetchPlugins = options?.plugins?.flatMap((plugin) => plugin.fetchPlugins).filter((pl) => pl !== void 0) || [];
  const lifeCyclePlugin = {
    id: "lifecycle-hooks",
    name: "lifecycle-hooks",
    hooks: {
      onSuccess: options?.fetchOptions?.onSuccess,
      onError: options?.fetchOptions?.onError,
      onRequest: options?.fetchOptions?.onRequest,
      onResponse: options?.fetchOptions?.onResponse
    }
  };
  const { onSuccess: _onSuccess, onError: _onError, onRequest: _onRequest, onResponse: _onResponse, ...restOfFetchOptions } = options?.fetchOptions || {};
  const $fetch = createFetch({
    baseURL,
    ...isCredentialsSupported ? { credentials: "include" } : {},
    method: "GET",
    jsonParser(text) {
      if (!text) return null;
      return parseJSON(text, { strict: false });
    },
    customFetchImpl: fetch,
    ...restOfFetchOptions,
    plugins: [
      lifeCyclePlugin,
      ...restOfFetchOptions.plugins || [],
      ...options?.disableDefaultFetchPlugins ? [] : [redirectPlugin],
      ...pluginsFetchPlugins
    ]
  });
  const { $sessionSignal, session, broadcastSessionUpdate } = getSessionAtom($fetch, options);
  const plugins = options?.plugins || [];
  let pluginsActions = {};
  const pluginsAtoms = {
    $sessionSignal,
    session
  };
  const pluginPathMethods = {
    "/sign-out": "POST",
    "/revoke-sessions": "POST",
    "/revoke-other-sessions": "POST",
    "/delete-user": "POST"
  };
  const atomListeners = [{
    signal: "$sessionSignal",
    matcher(path) {
      return path === "/sign-out" || path === "/update-user" || path === "/update-session" || path === "/sign-up/email" || path === "/sign-in/email" || path === "/delete-user" || path === "/verify-email" || path === "/revoke-sessions" || path === "/revoke-session" || path === "/revoke-other-sessions" || path === "/change-email" || path === "/change-password";
    },
    callback(path) {
      if (path === "/sign-out") broadcastSessionUpdate("signout");
      else if (path === "/update-user" || path === "/update-session") broadcastSessionUpdate("updateUser");
    }
  }];
  for (const plugin of plugins) {
    if (plugin.getAtoms) Object.assign(pluginsAtoms, plugin.getAtoms?.($fetch));
    if (plugin.pathMethods) Object.assign(pluginPathMethods, plugin.pathMethods);
    if (plugin.atomListeners) atomListeners.push(...plugin.atomListeners);
  }
  const $store = {
    notify: (signal) => {
      pluginsAtoms[signal].set(!pluginsAtoms[signal].get());
    },
    listen: (signal, listener) => {
      pluginsAtoms[signal].subscribe(listener);
    },
    atoms: pluginsAtoms
  };
  for (const plugin of plugins) if (plugin.getActions) pluginsActions = defu(plugin.getActions?.($fetch, $store, options) ?? {}, pluginsActions);
  return {
    get baseURL() {
      return baseURL;
    },
    pluginsActions,
    pluginsAtoms,
    pluginPathMethods,
    atomListeners,
    $fetch,
    $store
  };
};
function isAtom(value) {
  return typeof value === "object" && value !== null && "get" in value && typeof value.get === "function" && "lc" in value && typeof value.lc === "number";
}
function getMethod(path, knownPathMethods, args) {
  const method = knownPathMethods[path];
  const { fetchOptions, query: _query, ...body } = args || {};
  if (method) return method;
  if (fetchOptions?.method) return fetchOptions.method;
  if (body && Object.keys(body).length > 0) return "POST";
  return "GET";
}
function createDynamicPathProxy(routes, client, knownPathMethods, atoms, atomListeners) {
  function createProxy(path = []) {
    return new Proxy(function() {
    }, {
      get(_, prop) {
        if (typeof prop !== "string") return;
        if (prop === "then" || prop === "catch" || prop === "finally") return;
        const fullPath = [...path, prop];
        let current = routes;
        for (const segment of fullPath) if (current && typeof current === "object" && segment in current) current = current[segment];
        else {
          current = void 0;
          break;
        }
        if (typeof current === "function") return current;
        if (isAtom(current)) return current;
        return createProxy(fullPath);
      },
      apply: async (_, __, args) => {
        const routePath = "/" + path.map(toKebabCase).join("/");
        const arg = args[0] || {};
        const fetchOptions = args[1] || {};
        const { query, fetchOptions: argFetchOptions, ...body } = arg;
        const options = {
          ...fetchOptions,
          ...argFetchOptions
        };
        const method = getMethod(routePath, knownPathMethods, arg);
        return await client(routePath, {
          ...options,
          body: method === "GET" ? void 0 : {
            ...body,
            ...options?.body || {}
          },
          query: query || options?.query,
          method,
          async onSuccess(context) {
            await options?.onSuccess?.(context);
            if (!atomListeners || options.disableSignal) return;
            const matches = atomListeners.filter((s) => s.matcher(routePath));
            if (!matches.length) return;
            const visited = /* @__PURE__ */ new Set();
            for (const match of matches) {
              const signal = atoms[match.signal];
              if (!signal) return;
              if (visited.has(match.signal)) continue;
              visited.add(match.signal);
              const val = signal.get();
              setTimeout(() => {
                signal.set(!val);
              }, 10);
              match.callback?.(routePath);
            }
          }
        });
      }
    });
  }
  return createProxy();
}
function useStore(store, options = {}) {
  const snapshotRef = useRef(store.get());
  const { keys, deps = [store, keys] } = options;
  const subscribe = useCallback((onChange) => {
    const emitChange = (value) => {
      if (snapshotRef.current === value) return;
      snapshotRef.current = value;
      onChange();
    };
    emitChange(store.value);
    if (keys?.length) return listenKeys(store, keys, emitChange);
    return store.listen(emitChange);
  }, deps);
  const get = () => snapshotRef.current;
  return useSyncExternalStore(subscribe, get, get);
}
function getAtomKey(str) {
  return `use${capitalizeFirstLetter(str)}`;
}
function createAuthClient(options) {
  const { pluginPathMethods, pluginsActions, pluginsAtoms, $fetch, $store, atomListeners } = getClientConfig(options);
  const resolvedHooks = {};
  for (const [key, value] of Object.entries(pluginsAtoms)) resolvedHooks[getAtomKey(key)] = () => useStore(value);
  return createDynamicPathProxy({
    ...pluginsActions,
    ...resolvedHooks,
    $fetch,
    $store
  }, $fetch, pluginPathMethods, pluginsAtoms, atomListeners);
}
var magicLinkClient = () => {
  return {
    id: "magic-link",
    version: PACKAGE_VERSION,
    $InferServerPlugin: {}
  };
};
var { signIn, signOut, updateUser, deleteUser, useSession } = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  plugins: [magicLinkClient()]
});
function Spinner({ className, ...props }) {
  return /* @__PURE__ */ jsx(Loader2Icon, {
    role: "status",
    "aria-label": "Loading",
    className: cn("size-4 animate-spin", className),
    ...props
  });
}

var getCartServerFn = createServerFn({ method: "GET" }).handler(createSsrRpc("8d4e25a98da381fff5f23fd7df60f25789349d7c76730c0fdc8589176baae0b6"));
var upsertCartItemServerFn = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("a31ecafd33dc539afd16b9a1d9afb86aaae0fdeecae0169f9dfde98b1f2409f3"));
var mergeCartServerFn = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("2c5a77111882588f192fc21714c67e9ca792182c9b01ab686bf0f8c086526f13"));
var clearCartServerFn = createServerFn({ method: "POST" }).handler(createSsrRpc("e5275775162291913974bc24d46af65250942d35e3ea58392f5641ce02a6bd5e"));
function applyAdd(items, productId, variantId, maxQty = Infinity) {
  const existing = items.find((i) => i.productId === productId && i.variantId === variantId);
  if (existing && existing.quantity >= maxQty) return items;
  if (existing) {
    const newQty = Math.min(existing.quantity + 1, maxQty);
    return items.map((i) => i.productId === productId && i.variantId === variantId ? {
      ...i,
      quantity: newQty
    } : i);
  }
  return [...items, {
    productId,
    variantId,
    quantity: Math.min(1, maxQty)
  }];
}
function applyReduce(items, productId, variantId) {
  return items.map((i) => i.productId === productId && i.variantId === variantId ? {
    ...i,
    quantity: i.quantity - 1
  } : i).filter((i) => i.quantity > 0);
}
function applyRemove(items, productId, variantId) {
  return items.filter((i) => !(i.productId === productId && i.variantId === variantId));
}
var useCartStore = create()(persist((set, get) => ({
  items: [],
  isAuthenticated: false,
  isOpen: false,
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  setAuthenticated: (auth, dbItems) => {
    set({
      isAuthenticated: auth,
      items: dbItems ?? (auth ? [] : get().items)
    });
  },
  addItem: (productId, variantId, maxQty) => {
    set((state) => ({ items: applyAdd(state.items, productId, variantId, maxQty) }));
    const { isAuthenticated, items } = get();
    if (isAuthenticated) {
      const item = items.find((i) => i.productId === productId && i.variantId === variantId);
      if (item) upsertCartItemServerFn({ data: item });
    }
  },
  reduceItem: (productId, variantId) => {
    const before = get().items.find((i) => i.productId === productId && i.variantId === variantId);
    set((state) => ({ items: applyReduce(state.items, productId, variantId) }));
    if (get().isAuthenticated && before) upsertCartItemServerFn({ data: {
      productId,
      variantId,
      quantity: before.quantity - 1
    } });
  },
  removeItem: (productId, variantId) => {
    set((state) => ({ items: applyRemove(state.items, productId, variantId) }));
    if (get().isAuthenticated) upsertCartItemServerFn({ data: {
      productId,
      variantId,
      quantity: 0
    } });
  },
  clear: () => {
    set({ items: [] });
    if (get().isAuthenticated) clearCartServerFn();
  }
}), {
  name: "shopping-cart-storage",
  partialize: (state) => state.isAuthenticated ? {} : {
    items: state.items,
    isOpen: state.isOpen
  }
}));

var Container = ({ children, className }) => {
  return /* @__PURE__ */ jsx("div", {
    className: cn("container mx-auto px-8 py-16", className),
    children
  });
};

var buttonVariants = cva("inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
      outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
      link: "text-primary underline-offset-4 hover:underline"
    },
    size: {
      default: "h-9 px-4 py-2 has-[>svg]:px-3",
      xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
      sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
      lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
      icon: "size-9",
      "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
      "icon-sm": "size-8",
      "icon-lg": "size-10"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
function Button({ className, variant = "default", size = "default", asChild = false, ...props }) {
  return /* @__PURE__ */ jsx(asChild ? Slot.Root : "button", {
    "data-slot": "button",
    "data-variant": variant,
    "data-size": size,
    className: cn(buttonVariants({
      variant,
      size,
      className
    })),
    ...props
  });
}

function Separator$1({ className, orientation = "horizontal", decorative = true, ...props }) {
  return /* @__PURE__ */ jsx(Separator.Root, {
    "data-slot": "separator",
    decorative,
    orientation,
    className: cn("shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px", className),
    ...props
  });
}

function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", {
    "data-slot": "skeleton",
    className: cn("animate-pulse rounded-md bg-accent", className),
    ...props
  });
}

function Sheet({ ...props }) {
  return /* @__PURE__ */ jsx(Dialog.Root, {
    "data-slot": "sheet",
    ...props
  });
}
function SheetTrigger({ ...props }) {
  return /* @__PURE__ */ jsx(Dialog.Trigger, {
    "data-slot": "sheet-trigger",
    ...props
  });
}
function SheetPortal({ ...props }) {
  return /* @__PURE__ */ jsx(Dialog.Portal, {
    "data-slot": "sheet-portal",
    ...props
  });
}
function SheetOverlay({ className, ...props }) {
  return /* @__PURE__ */ jsx(Dialog.Overlay, {
    "data-slot": "sheet-overlay",
    className: cn("fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0", className),
    ...props
  });
}
function SheetContent({ className, children, side = "right", showCloseButton = true, ...props }) {
  return /* @__PURE__ */ jsxs(SheetPortal, { children: [/* @__PURE__ */ jsx(SheetOverlay, {}), /* @__PURE__ */ jsxs(Dialog.Content, {
    "data-slot": "sheet-content",
    className: cn("fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:animate-in data-[state=open]:duration-500", side === "right" && "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm", side === "left" && "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm", side === "top" && "inset-x-0 top-0 h-auto border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top", side === "bottom" && "inset-x-0 bottom-0 h-auto border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom", className),
    ...props,
    children: [children, showCloseButton && /* @__PURE__ */ jsxs(Dialog.Close, {
      className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-secondary",
      children: [/* @__PURE__ */ jsx(XIcon, { className: "size-4" }), /* @__PURE__ */ jsx("span", {
        className: "sr-only",
        children: "Close"
      })]
    })]
  })] });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", {
    "data-slot": "sheet-header",
    className: cn("flex flex-col gap-1.5 p-4", className),
    ...props
  });
}
function SheetFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", {
    "data-slot": "sheet-footer",
    className: cn("mt-auto flex flex-col gap-2 p-4", className),
    ...props
  });
}
function SheetTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(Dialog.Title, {
    "data-slot": "sheet-title",
    className: cn("font-semibold text-foreground", className),
    ...props
  });
}
function seo({ title, description, image, keywords, canonical, robots = "index,follow", type = "website" }) {
  return {
    meta: [
      { title },
      {
        name: "description",
        content: description
      },
      {
        name: "robots",
        content: robots
      },
      ...keywords ? [{
        name: "keywords",
        content: keywords
      }] : [],
      {
        property: "og:title",
        content: title
      },
      {
        property: "og:description",
        content: description
      },
      {
        property: "og:type",
        content: type
      },
      {
        property: "og:site_name",
        content: site.name
      },
      ...canonical ? [{
        property: "og:url",
        content: canonical
      }] : [],
      ...image ? [{
        property: "og:image",
        content: image
      }] : [],
      {
        name: "twitter:card",
        content: image ? "summary_large_image" : "summary"
      },
      {
        name: "twitter:title",
        content: title
      },
      {
        name: "twitter:description",
        content: description
      },
      ...image ? [{
        name: "twitter:image",
        content: image
      }] : []
    ],
    links: canonical ? [{
      rel: "canonical",
      href: canonical
    }] : []
  };
}
var filterSearchParamsSchema = z$2__default.object({
  page: z$2__default.coerce.number().catch(1),
  pageSize: z$2__default.coerce.number().catch(12),
  sortBy: z$2__default.enum([
    "alphabetical-asc",
    "alphabetical-desc",
    "price-asc",
    "price-desc",
    "new-products"
  ]).catch("alphabetical-asc"),
  minPrice: z$2__default.number().min(0).catch(0),
  maxPrice: z$2__default.number().min(0).catch(1e4),
  materials: z$2__default.array(z$2__default.string()).optional(),
  colors: z$2__default.array(z$2__default.string()).optional(),
  sizes: z$2__default.array(z$2__default.string()).optional(),
  category: z$2__default.string().optional(),
  subCategory: z$2__default.string().optional()
});
var productVariantSearchParamsSchema = z$2__default.object({ variant_name: z$2__default.string().optional() });
var strapi = new GraphQLClient("https://orderly-wonder-8bfec8c76b.strapiapp.com/graphql", { headers: { Authorization: `Bearer 6592dd8962e9ce555c8e87696a21f33f2b16d26d9298bfe34bf6c6f43d2eabf1c8264432825ea39a79bdad41573dff0eb37979cf5075a5f6b30f633ee22029ba3702e0b226afdf5ef007e93886ef624a84562260daa3b316d20d5b4593d184d42cb0fbe47b8057a3d3cc25e1d33a7211ac5d8e1d08a18bf25ecd28ffda1108f9` } });
function reduceEmptyKeys(obj) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== "" && value !== void 0 && value !== null) acc[key] = value;
    return acc;
  }, {});
}
var getProducts = async (filters) => {
  const variables = {
    page: filters.page,
    pageSize: filters.pageSize,
    sortBy: sortByOptionArray.find((option) => option.name === filters.sortBy)?.value ?? ["name:asc"],
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    colors: filters.colors,
    sizes: filters.sizes,
    category: filters.category === "produse-noi" ? "" : filters.category,
    subCategory: filters.subCategory
  };
  return await strapi.request(GET_PRODUCTS, reduceEmptyKeys(variables));
};
var $$splitComponentImporter$6 = () => import('./_category._-_subCategory_-CqX8rAoC.mjs');
var Route$a = createFileRoute("/c/$category/{-$subCategory}")({
  pendingComponent: () => /* @__PURE__ */ jsx(CategorySkeleton, {}),
  component: lazyRouteComponent($$splitComponentImporter$6, "component"),
  validateSearch: filterSearchParamsSchema,
  loaderDeps: ({ search: filters }) => filters,
  loader: async ({ params, deps: { ...filters } }) => {
    return (await getProducts({
      ...filters,
      category: params.category,
      subCategory: params.subCategory
    })).products_connection;
  },
  staleTime: 1e4 * 6 * 5,
  head: ({ loaderData, params }) => {
    let description = "";
    let media = "";
    let categoryName = "";
    const category = generatedData.links.categories_connection.nodes.find((c) => params.category === c.name);
    const canonical = `http://localhost:3000/product/${params.category}${params.subCategory ? `/${params.subCategory}` : ""}`;
    if (!category) {
      description = "";
      media = "";
      categoryName = params.subCategory ? slugToTitle(params.subCategory) : slugToTitle(params.category);
    } else if (params.subCategory === void 0) {
      description = category.seo?.description ?? "";
      media = category.seo?.media.url ?? "";
      categoryName = slugToTitle(category.name);
    } else {
      const subCategory = category.sub_categories_connection.nodes?.find((c2) => c2.name === params.subCategory);
      description = subCategory?.seo?.description ?? "";
      media = subCategory?.seo?.media.url ?? "";
      categoryName = subCategory ? slugToTitle(subCategory.name) : slugToTitle(params.subCategory);
    }
    const seoTags = seo({
      title: `${categoryName} | ${site.name}`,
      description,
      image: media,
      canonical
    });
    if (!loaderData || !loaderData.nodes) return { ...seoTags };
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: categoryName,
      description,
      url: canonical,
      itemListElement: loaderData.nodes.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.name,
          url: `http://localhost:3000/product/${product.slug}`,
          image: product.variants[0].media[0].url,
          offers: {
            "@type": "Offer",
            priceCurrency: "RON",
            price: product.pricing.final_price
          }
        }
      }))
    };
    return {
      ...seoTags,
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify(jsonLd)
      }]
    };
  }
});
var CategorySkeleton = () => {
  return /* @__PURE__ */ jsxs(Container, {
    className: "w-full flex flex-col gap-6",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex justify-between items-center",
      children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-32" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-24" })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex gap-8",
      children: [/* @__PURE__ */ jsx("div", {
        className: "w-56 flex flex-col gap-6",
        children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col gap-3",
          children: [
            /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-20" }),
            /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-40" }),
            /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-36" })
          ]
        }, i))
      }), /* @__PURE__ */ jsx("div", {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 flex-1",
        children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col gap-3",
          children: [
            /* @__PURE__ */ jsx(Skeleton, { className: "w-full h-64 rounded-xl" }),
            /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-32" }),
            /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-20" })
          ]
        }, i))
      })]
    })]
  });
};

function Label$1({ className, ...props }) {
  return /* @__PURE__ */ jsx(Label.Root, {
    "data-slot": "label",
    className: cn("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
    ...props
  });
}

function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx("input", {
    type,
    "data-slot": "input",
    className: cn("h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30", "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50", "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40", className),
    ...props
  });
}
function FieldGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", {
    "data-slot": "field-group",
    className: cn("group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4", className),
    ...props
  });
}
var fieldVariants = cva("group/field flex w-full gap-3 data-[invalid=true]:text-destructive", {
  variants: { orientation: {
    vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
    horizontal: [
      "flex-row items-center",
      "[&>[data-slot=field-label]]:flex-auto",
      "has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
    ],
    responsive: [
      "flex-col @md/field-group:flex-row @md/field-group:items-center [&>*]:w-full @md/field-group:[&>*]:w-auto [&>.sr-only]:w-auto",
      "@md/field-group:[&>[data-slot=field-label]]:flex-auto",
      "@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
    ]
  } },
  defaultVariants: { orientation: "vertical" }
});
function Field({ className, orientation = "vertical", ...props }) {
  return /* @__PURE__ */ jsx("div", {
    role: "group",
    "data-slot": "field",
    "data-orientation": orientation,
    className: cn(fieldVariants({ orientation }), className),
    ...props
  });
}
function FieldLabel({ className, ...props }) {
  return /* @__PURE__ */ jsx(Label$1, {
    "data-slot": "field-label",
    className: cn("group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50", "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4", "has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 dark:has-data-[state=checked]:bg-primary/10", className),
    ...props
  });
}
function FieldDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx("p", {
    "data-slot": "field-description",
    className: cn("text-sm leading-normal font-normal text-muted-foreground group-has-[[data-orientation=horizontal]]/field:text-balance", "last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5", "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary", className),
    ...props
  });
}
function FieldSeparator({ children, className, ...props }) {
  return /* @__PURE__ */ jsxs("div", {
    "data-slot": "field-separator",
    "data-content": !!children,
    className: cn("relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2", className),
    ...props,
    children: [/* @__PURE__ */ jsx(Separator$1, { className: "absolute inset-0 top-1/2" }), children && /* @__PURE__ */ jsx("span", {
      className: "relative mx-auto block w-fit bg-background px-2 text-muted-foreground",
      "data-slot": "field-separator-content",
      children
    })]
  });
}
function FieldError({ className, children, errors, ...props }) {
  const content = useMemo(() => {
    if (children) return children;
    if (!errors?.length) return null;
    const uniqueErrors = [...new Map(errors.map((error) => [error?.message, error])).values()];
    if (uniqueErrors?.length == 1) return uniqueErrors[0]?.message;
    return /* @__PURE__ */ jsx("ul", {
      className: "ml-4 flex list-disc flex-col gap-1",
      children: uniqueErrors.map((error, index) => error?.message && /* @__PURE__ */ jsx("li", { children: error.message }, index))
    });
  }, [children, errors]);
  if (!content) return null;
  return /* @__PURE__ */ jsx("div", {
    role: "alert",
    "data-slot": "field-error",
    className: cn("text-sm font-normal text-destructive", className),
    ...props,
    children: content
  });
}

function useCartProducts() {
  const { items, addItem, reduceItem, removeItem, clear } = useCartStore();
  const queryResult = useQuery({
    queryKey: ["cart-products", items.map((item) => `${item.productId}-${item.variantId || "none"}`)],
    queryFn: async () => {
      return await batchProductsServerFn({ data: { items: items.map((item) => ({
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity
      })) } });
    },
    enabled: items.length > 0,
    staleTime: 1e3 * 60 * 5
  });
  const strapiNodes = queryResult.data?.products_connection?.nodes || [];
  return {
    items,
    addItem,
    reduceItem,
    removeItem,
    clear,
    products: items.map((cartItem) => {
      const foundProductNode = strapiNodes.find((node) => node.documentId === cartItem.productId);
      if (!foundProductNode) return null;
      return {
        ...cartItem,
        product: foundProductNode
      };
    }).filter((item) => item !== null),
    isLoading: queryResult.isLoading,
    isFetching: queryResult.isFetching,
    hasError: queryResult.isError,
    errors: queryResult.error ? [queryResult.error] : [],
    queryResult
  };
}

var styles_default = "/assets/styles-RmWDYCJM.css";
var footerConfig = {
  help: {
    title: "Ai nevoie de ajutor?",
    links: [{
      label: "Serviciul Clien\u021Bi",
      to: "/contact"
    }, {
      label: "Formular de contact",
      to: "/contact/form"
    }],
    phone: {
      label: "+40 316301973",
      href: "tel:+40316301973"
    },
    hours: "luni - vineri 9:00 - 16:00",
    email: {
      label: "info.ro@gate.shop",
      href: "mailto:info.ro@gate.shop"
    }
  },
  conditions: {
    title: "Condi\u021Bii",
    links: [
      {
        label: "Politica de confiden\u021Bialitate",
        to: "/privacy"
      },
      {
        label: "Cookies",
        to: "/cookies"
      },
      {
        label: "Termeni \u0219i condi\u021Bii",
        to: "/terms"
      }
    ]
  },
  social: {
    title: "Social media",
    links: [
      {
        label: "Facebook",
        href: "https://facebook.com",
        icon: Facebook
      },
      {
        label: "Instagram",
        href: "https://instagram.com",
        icon: Instagram
      },
      {
        label: "YouTube",
        href: "https://youtube.com",
        icon: Youtube
      }
    ]
  }
};
function Footer() {
  return /* @__PURE__ */ jsxs("footer", {
    className: "bg-foreground text-black",
    children: [/* @__PURE__ */ jsx("div", {
      className: "mx-auto max-w-7xl px-6 py-16",
      children: /* @__PURE__ */ jsxs("div", {
        className: "grid grid-cols-1 gap-10 md:grid-cols-3",
        children: [
          /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
            className: "mb-8 text-lg font-semibold",
            children: footerConfig.help.title
          }), /* @__PURE__ */ jsxs("ul", {
            className: "space-y-5 text-sm",
            children: [
              footerConfig.help.links.map((item) => "to" in item ? /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
                to: item.to,
                className: "hover:underline",
                children: item.label
              }) }, item.label) : null),
              /* @__PURE__ */ jsx("li", {
                className: "pt-4 text-base font-bold",
                children: /* @__PURE__ */ jsx("a", {
                  href: footerConfig.help.phone.href,
                  children: footerConfig.help.phone.label
                })
              }),
              /* @__PURE__ */ jsx("li", {
                className: "text-xs",
                children: footerConfig.help.hours
              }),
              /* @__PURE__ */ jsx("li", {
                className: "font-semibold",
                children: /* @__PURE__ */ jsx("a", {
                  href: footerConfig.help.email.href,
                  children: footerConfig.help.email.label
                })
              })
            ]
          })] }),
          /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
            className: "mb-8 text-lg font-semibold",
            children: footerConfig.conditions.title
          }), /* @__PURE__ */ jsx("ul", {
            className: "space-y-4 text-sm",
            children: footerConfig.conditions.links.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
              to: item.to,
              className: "hover:underline",
              children: item.label
            }) }, item.label))
          })] }),
          /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
            className: "mb-8 text-lg font-semibold",
            children: footerConfig.social.title
          }), /* @__PURE__ */ jsx("ul", {
            className: "space-y-5 text-sm",
            children: footerConfig.social.links.map(({ label, href, icon: Icon }) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", {
              href,
              target: "_blank",
              rel: "noreferrer",
              className: "flex items-center gap-3 hover:underline",
              children: [/* @__PURE__ */ jsx(Icon, { size: 15 }), label]
            }) }, label))
          })] })
        ]
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "border-t border-gray-300",
      children: /* @__PURE__ */ jsx("div", {
        className: "py-10 flex flex-col items-center gap-10",
        children: /* @__PURE__ */ jsx("div", {
          className: "text-2xl tracking-[0.35em]",
          children: site.name
        })
      })
    })]
  });
}
var Toaster$1 = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(Toaster, {
    theme,
    className: "toaster group",
    icons: {
      success: /* @__PURE__ */ jsx(CircleCheckIcon, { className: "size-4" }),
      info: /* @__PURE__ */ jsx(InfoIcon, { className: "size-4" }),
      warning: /* @__PURE__ */ jsx(TriangleAlertIcon, { className: "size-4" }),
      error: /* @__PURE__ */ jsx(OctagonXIcon, { className: "size-4" }),
      loading: /* @__PURE__ */ jsx(Loader2Icon, { className: "size-4 animate-spin" })
    },
    style: {
      "--normal-bg": "var(--popover)",
      "--normal-text": "var(--popover-foreground)",
      "--normal-border": "var(--border)",
      "--border-radius": "var(--radius)"
    },
    ...props
  });
};
function CartAuthSync() {
  const { data: session } = useSession();
  const { items, setAuthenticated, clear } = useCartStore();
  const prevAuthRef = useRef(null);
  useEffect(() => {
    const isAuthed = !!session?.user;
    const wasAuthed = prevAuthRef.current;
    prevAuthRef.current = isAuthed;
    if (isAuthed && wasAuthed === false) (async () => {
      const guestItems = items;
      if (guestItems.length > 0) await mergeCartServerFn({ data: { items: guestItems } });
      setAuthenticated(true, await getCartServerFn());
      useCartStore.persist.clearStorage();
    })();
    else if (!isAuthed && wasAuthed === true) setAuthenticated(false, []);
    else if (isAuthed && wasAuthed === null) (async () => {
      setAuthenticated(true, await getCartServerFn());
    })();
    else if (!isAuthed && wasAuthed === null) setAuthenticated(false);
  }, [!!session?.user]);
  return null;
}
function NavigationMenu$1({ className, children, viewport = true, ...props }) {
  return /* @__PURE__ */ jsxs(NavigationMenu.Root, {
    "data-slot": "navigation-menu",
    "data-viewport": viewport,
    className: cn("group/navigation-menu relative flex max-w-max flex-1 items-center justify-center", className),
    ...props,
    children: [children, viewport && /* @__PURE__ */ jsx(NavigationMenuViewport, {})]
  });
}
function NavigationMenuList({ className, ...props }) {
  return /* @__PURE__ */ jsx(NavigationMenu.List, {
    "data-slot": "navigation-menu-list",
    className: cn("group flex flex-1 list-none items-center justify-center gap-1", className),
    ...props
  });
}
function NavigationMenuItem({ className, ...props }) {
  return /* @__PURE__ */ jsx(NavigationMenu.Item, {
    "data-slot": "navigation-menu-item",
    className: cn("relative", className),
    ...props
  });
}
var navigationMenuTriggerStyle = cva("group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-[color,box-shadow] outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/50 data-[state=open]:text-accent-foreground data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent");
function NavigationMenuTrigger({ className, children, ...props }) {
  return /* @__PURE__ */ jsxs(NavigationMenu.Trigger, {
    "data-slot": "navigation-menu-trigger",
    className: cn(navigationMenuTriggerStyle(), "group", className),
    ...props,
    children: [
      children,
      " ",
      /* @__PURE__ */ jsx(ChevronDownIcon, {
        className: "relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180",
        "aria-hidden": "true"
      })
    ]
  });
}
function NavigationMenuContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(NavigationMenu.Content, {
    "data-slot": "navigation-menu-content",
    className: cn("top-0 left-0 w-full p-2 pr-2.5 data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out md:absolute md:w-auto", "group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95", className),
    ...props
  });
}
function NavigationMenuViewport({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", {
    className: cn("absolute top-full left-0 isolate z-50 flex justify-center"),
    children: /* @__PURE__ */ jsx(NavigationMenu.Viewport, {
      "data-slot": "navigation-menu-viewport",
      className: cn("origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]", className),
      ...props
    })
  });
}
function NavigationMenuLink({ className, ...props }) {
  return /* @__PURE__ */ jsx(NavigationMenu.Link, {
    "data-slot": "navigation-menu-link",
    className: cn("flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground data-[active=true]:hover:bg-accent data-[active=true]:focus:bg-accent [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground", className),
    ...props
  });
}
var BrandLink = () => {
  return /* @__PURE__ */ jsx(Link, {
    to: "/",
    children: /* @__PURE__ */ jsx("img", {
      className: "fill-accent text-red-200 ",
      width: "100",
      alt: site.name,
      src: "/logo-favicon.svg"
    })
  });
};
function Popover$1({ ...props }) {
  return /* @__PURE__ */ jsx(Popover.Root, {
    "data-slot": "popover",
    ...props
  });
}
function PopoverTrigger({ ...props }) {
  return /* @__PURE__ */ jsx(Popover.Trigger, {
    "data-slot": "popover-trigger",
    ...props
  });
}
function PopoverContent({ className, align = "center", sideOffset = 4, ...props }) {
  return /* @__PURE__ */ jsx(Popover.Portal, { children: /* @__PURE__ */ jsx(Popover.Content, {
    "data-slot": "popover-content",
    align,
    sideOffset,
    className: cn("z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95", className),
    ...props
  }) });
}
function Avatar$1({ className, size = "default", ...props }) {
  return /* @__PURE__ */ jsx(Avatar.Root, {
    "data-slot": "avatar",
    "data-size": size,
    className: cn("group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6", className),
    ...props
  });
}
function AvatarImage({ className, ...props }) {
  return /* @__PURE__ */ jsx(Avatar.Image, {
    "data-slot": "avatar-image",
    className: cn("aspect-square size-full", className),
    ...props
  });
}
function AvatarFallback({ className, ...props }) {
  return /* @__PURE__ */ jsx(Avatar.Fallback, {
    "data-slot": "avatar-fallback",
    className: cn("flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs", className),
    ...props
  });
}
function UserAvatar({ name, image, className }) {
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase();
  return /* @__PURE__ */ jsxs(Avatar$1, {
    className,
    children: [/* @__PURE__ */ jsx(AvatarImage, {
      src: image,
      alt: name
    }), /* @__PURE__ */ jsx(AvatarFallback, { children: initials })]
  });
}
var LogOutButton = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleClick = async () => {
    setLoading(true);
    await signOut();
    setLoading(false);
    await router.invalidate();
  };
  return /* @__PURE__ */ jsx(Button, {
    variant: "ghost",
    className: "w-full justify-start gap-2 text-destructive",
    onClick: handleClick,
    disabled: loading,
    children: loading ? /* @__PURE__ */ jsx(Spinner, {}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }), "Logout"] })
  });
};
function UserMenuContent({ user, onSettings }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", {
      className: "flex items-center gap-3 p-4",
      children: [/* @__PURE__ */ jsx(UserAvatar, {
        name: user.name,
        image: user.image,
        className: "h-12 w-12"
      }), /* @__PURE__ */ jsxs("div", {
        className: "overflow-hidden",
        children: [/* @__PURE__ */ jsx("p", {
          className: "truncate font-medium",
          children: user.name
        }), /* @__PURE__ */ jsx("p", {
          className: "truncate text-sm text-muted-foreground",
          children: user.email
        })]
      })]
    }),
    /* @__PURE__ */ jsx(Separator$1, {}),
    /* @__PURE__ */ jsxs("div", {
      className: "p-2",
      children: [
        /* @__PURE__ */ jsxs(Button, {
          variant: "ghost",
          className: "w-full justify-start gap-2",
          onClick: onSettings,
          children: [/* @__PURE__ */ jsx(Settings, { className: "h-4 w-4" }), "Settings"]
        }),
        /* @__PURE__ */ jsxs(Link, {
          to: "/orders",
          className: cn(buttonVariants({ variant: "ghost" }), "w-full justify-start gap-2"),
          children: [/* @__PURE__ */ jsx(MessageCircleHeart, { className: "h-4 w-4" }), "Orders"]
        }),
        /* @__PURE__ */ jsx(LogOutButton, {})
      ]
    })
  ] });
}
function Dialog$1({ ...props }) {
  return /* @__PURE__ */ jsx(Dialog.Root, {
    "data-slot": "dialog",
    ...props
  });
}
function DialogPortal({ ...props }) {
  return /* @__PURE__ */ jsx(Dialog.Portal, {
    "data-slot": "dialog-portal",
    ...props
  });
}
function DialogOverlay({ className, ...props }) {
  return /* @__PURE__ */ jsx(Dialog.Overlay, {
    "data-slot": "dialog-overlay",
    className: cn("fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0", className),
    ...props
  });
}
function DialogContent({ className, children, showCloseButton = true, ...props }) {
  return /* @__PURE__ */ jsxs(DialogPortal, {
    "data-slot": "dialog-portal",
    children: [/* @__PURE__ */ jsx(DialogOverlay, {}), /* @__PURE__ */ jsxs(Dialog.Content, {
      "data-slot": "dialog-content",
      className: cn("fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-lg", className),
      ...props,
      children: [children, showCloseButton && /* @__PURE__ */ jsxs(Dialog.Close, {
        "data-slot": "dialog-close",
        className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        children: [/* @__PURE__ */ jsx(XIcon, {}), /* @__PURE__ */ jsx("span", {
          className: "sr-only",
          children: "Close"
        })]
      })]
    })]
  });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", {
    "data-slot": "dialog-header",
    className: cn("flex flex-col gap-2 text-center sm:text-left", className),
    ...props
  });
}
function DialogTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(Dialog.Title, {
    "data-slot": "dialog-title",
    className: cn("text-lg leading-none font-semibold", className),
    ...props
  });
}
var SETTINGS_TABS = [{
  id: "info",
  label: "Account Info",
  icon: User
}, {
  id: "security",
  label: "Security",
  icon: Shield
}];
function SettingsSidebar({ activeTab, onChange }) {
  return /* @__PURE__ */ jsx("nav", {
    className: "space-y-1 p-2",
    children: SETTINGS_TABS.map((tab) => {
      const Icon = tab.icon;
      return /* @__PURE__ */ jsxs(Button, {
        variant: activeTab === tab.id ? "secondary" : "ghost",
        className: "w-full justify-start gap-2",
        onClick: () => onChange(tab.id),
        children: [/* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" }), tab.label]
      }, tab.id);
    })
  });
}
var accountInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(50, "Name must be less than 50 characters.").trim(),
  imageFile: z.instanceof(File).nullable().refine((file) => !file || file.size <= MAX_FILE_SIZE, "Max image size is 4MB.").refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), "Only .jpg, .png, .webp and .gif formats are supported.")
});
var MAX_FILE_SIZE = 4 * 1024 * 1024;
var ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif"
];
function AccountInfoTab({ user, onClose }) {
  const [preview, setPreview] = useState(null);
  const form = useForm({
    validators: {
      onSubmit: accountInfoSchema,
      onChange: accountInfoSchema
    },
    defaultValues: {
      name: user.name,
      imageFile: null
    },
    onSubmit: async ({ value }) => {
      let imageUrl = user.image;
      if (value.imageFile) {
        const formData = new FormData();
        formData.append("file", value.imageFile);
        imageUrl = (await (await fetch("/api/upload", {
          method: "POST",
          body: formData
        })).json()).url;
      }
      await updateUser({
        name: value.name,
        image: imageUrl
      });
    }
  });
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);
  return /* @__PURE__ */ jsxs("form", {
    className: "space-y-6",
    onSubmit: (e) => {
      e.preventDefault();
      e.stopPropagation();
      form.handleSubmit();
    },
    children: [
      /* @__PURE__ */ jsx(form.Field, {
        name: "imageFile",
        validators: { onChange: z.instanceof(File).nullable().refine((file) => !file || file.size <= MAX_FILE_SIZE, "Max image size is 4MB.").refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), "Only .jpg, .png, .webp and .gif formats are supported.") },
        children: (field) => /* @__PURE__ */ jsxs("div", {
          className: "space-y-2",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-4",
            children: [/* @__PURE__ */ jsx(UserAvatar, {
              name: user.name,
              image: preview || user.image,
              className: "h-16 w-16"
            }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("input", {
              id: field.name,
              name: field.name,
              type: "file",
              accept: "image/*",
              className: "hidden",
              onBlur: field.handleBlur,
              onChange: (e) => {
                const file = e.target.files?.[0] || null;
                field.handleChange(file);
                if (file) {
                  if (preview) URL.revokeObjectURL(preview);
                  setPreview(URL.createObjectURL(file));
                } else {
                  if (preview) URL.revokeObjectURL(preview);
                  setPreview(null);
                }
              }
            }), /* @__PURE__ */ jsx(Button, {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: () => {
                document.getElementById(field.name)?.click();
              },
              children: "Change photo"
            })] })]
          }), field.state.meta.errors.length > 0 && /* @__PURE__ */ jsx(FieldError, { errors: field.state.meta.errors })]
        })
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "space-y-4",
        children: [/* @__PURE__ */ jsx(form.Field, {
          name: "name",
          validators: { onChange: z.string().min(2, "Name must be at least 2 characters.").max(50, "Name must be less than 50 characters.").trim() },
          children: (field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [
                /* @__PURE__ */ jsx(Label$1, {
                  htmlFor: field.name,
                  children: "Name"
                }),
                /* @__PURE__ */ jsx(Input, {
                  id: field.name,
                  name: field.name,
                  value: field.state.value,
                  onBlur: field.handleBlur,
                  onChange: (e) => field.handleChange(e.target.value)
                }),
                isInvalid && /* @__PURE__ */ jsx(FieldError, { errors: field.state.meta.errors })
              ]
            });
          }
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-2",
          children: [/* @__PURE__ */ jsx(Label$1, { children: "Email" }), /* @__PURE__ */ jsx(Input, {
            disabled: true,
            defaultValue: user.email
          })]
        })]
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "flex justify-end gap-2",
        children: [/* @__PURE__ */ jsx(Button, {
          type: "button",
          variant: "outline",
          onClick: onClose,
          children: "Cancel"
        }), /* @__PURE__ */ jsx(form.Subscribe, {
          selector: (state) => [
            state.canSubmit,
            state.isSubmitting,
            state.isDirty
          ],
          children: ([canSubmit, isSubmitting, isDirty]) => /* @__PURE__ */ jsx(Button, {
            type: "submit",
            disabled: !canSubmit || isSubmitting || !isDirty,
            children: isSubmitting ? "Saving..." : "Save changes"
          })
        })]
      })
    ]
  });
}
function AlertDialog$1({ ...props }) {
  return /* @__PURE__ */ jsx(AlertDialog.Root, {
    "data-slot": "alert-dialog",
    ...props
  });
}
function AlertDialogTrigger({ ...props }) {
  return /* @__PURE__ */ jsx(AlertDialog.Trigger, {
    "data-slot": "alert-dialog-trigger",
    ...props
  });
}
function AlertDialogPortal({ ...props }) {
  return /* @__PURE__ */ jsx(AlertDialog.Portal, {
    "data-slot": "alert-dialog-portal",
    ...props
  });
}
function AlertDialogOverlay({ className, ...props }) {
  return /* @__PURE__ */ jsx(AlertDialog.Overlay, {
    "data-slot": "alert-dialog-overlay",
    className: cn("fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0", className),
    ...props
  });
}
function AlertDialogContent({ className, size = "default", ...props }) {
  return /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [/* @__PURE__ */ jsx(AlertDialogOverlay, {}), /* @__PURE__ */ jsx(AlertDialog.Content, {
    "data-slot": "alert-dialog-content",
    "data-size": size,
    className: cn("group/alert-dialog-content fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[size=sm]:max-w-xs data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[size=default]:sm:max-w-lg", className),
    ...props
  })] });
}
function AlertDialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", {
    "data-slot": "alert-dialog-header",
    className: cn("grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]", className),
    ...props
  });
}
function AlertDialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", {
    "data-slot": "alert-dialog-footer",
    className: cn("flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end", className),
    ...props
  });
}
function AlertDialogTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(AlertDialog.Title, {
    "data-slot": "alert-dialog-title",
    className: cn("text-lg font-semibold sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2", className),
    ...props
  });
}
function AlertDialogDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx(AlertDialog.Description, {
    "data-slot": "alert-dialog-description",
    className: cn("text-sm text-muted-foreground", className),
    ...props
  });
}
function AlertDialogAction({ className, variant = "default", size = "default", ...props }) {
  return /* @__PURE__ */ jsx(Button, {
    variant,
    size,
    asChild: true,
    children: /* @__PURE__ */ jsx(AlertDialog.Action, {
      "data-slot": "alert-dialog-action",
      className: cn(className),
      ...props
    })
  });
}
function AlertDialogCancel({ className, variant = "outline", size = "default", ...props }) {
  return /* @__PURE__ */ jsx(Button, {
    variant,
    size,
    asChild: true,
    children: /* @__PURE__ */ jsx(AlertDialog.Cancel, {
      "data-slot": "alert-dialog-cancel",
      className: cn(className),
      ...props
    })
  });
}
function DangerZone() {
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {},
    onSubmit: async () => {
      await deleteUser({ callbackURL: "/goodbye" });
      toast.warning("Check your email to delete your account!");
      setOpen(false);
    }
  });
  return /* @__PURE__ */ jsx("div", {
    className: "rounded-lg border border-destructive/20 bg-destructive/5 p-4",
    children: /* @__PURE__ */ jsxs("div", {
      className: "flex gap-3",
      children: [/* @__PURE__ */ jsx(AlertTriangle, { className: "h-5 w-5 text-destructive" }), /* @__PURE__ */ jsxs("div", {
        className: "space-y-2",
        children: [
          /* @__PURE__ */ jsx("h4", {
            className: "font-medium text-destructive",
            children: "Danger Zone"
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-sm text-muted-foreground",
            children: "This action cannot be undone."
          }),
          /* @__PURE__ */ jsxs(AlertDialog$1, {
            open,
            onOpenChange: setOpen,
            children: [/* @__PURE__ */ jsx(AlertDialogTrigger, {
              asChild: true,
              children: /* @__PURE__ */ jsxs(Button, {
                variant: "destructive",
                size: "sm",
                children: [/* @__PURE__ */ jsx(Trash2, { className: "mr-2 h-4 w-4" }), "Delete Account"]
              })
            }), /* @__PURE__ */ jsxs(AlertDialogContent, { children: [/* @__PURE__ */ jsxs(AlertDialogHeader, { children: [/* @__PURE__ */ jsx(AlertDialogTitle, { children: "Are you sure?" }), /* @__PURE__ */ jsx(AlertDialogDescription, { children: "Your account will be permanently deleted." })] }), /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [/* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ jsx(form.Subscribe, {
              selector: (state) => [state.isSubmitting],
              children: ([isSubmitting]) => /* @__PURE__ */ jsx(AlertDialogAction, {
                onClick: (e) => {
                  e.preventDefault();
                  form.handleSubmit();
                },
                disabled: isSubmitting,
                children: isSubmitting ? "Deleting..." : "Delete"
              })
            })] })] })]
          })
        ]
      })]
    })
  });
}
function SecurityTab() {
  return /* @__PURE__ */ jsx("div", {
    className: "space-y-6",
    children: /* @__PURE__ */ jsx(DangerZone, {})
  });
}
function SettingsDialog({ open, onOpenChange, user }) {
  const [activeTab, setActiveTab] = useState("info");
  const [sheetOpen, setSheetOpen] = useState(false);
  const currentTitle = activeTab === "info" ? "Account Info" : "Security";
  return /* @__PURE__ */ jsx(Dialog$1, {
    open,
    onOpenChange,
    children: /* @__PURE__ */ jsx(DialogContent, {
      className: "overflow-hidden p-0 sm:max-w-2xl",
      children: /* @__PURE__ */ jsxs("div", {
        className: "flex h-125",
        children: [/* @__PURE__ */ jsxs("aside", {
          className: "hidden w-56 border-r bg-muted/30 md:flex md:flex-col",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "border-b p-4",
            children: [/* @__PURE__ */ jsx("h2", {
              className: "font-semibold",
              children: "Account Settings"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xs text-muted-foreground",
              children: "Manage your account"
            })]
          }), /* @__PURE__ */ jsx(SettingsSidebar, {
            activeTab,
            onChange: setActiveTab
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex flex-1 flex-col",
          children: [
            /* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-2 border-b p-4 md:hidden",
              children: [/* @__PURE__ */ jsxs(Sheet, {
                open: sheetOpen,
                onOpenChange: setSheetOpen,
                children: [/* @__PURE__ */ jsx(SheetTrigger, {
                  asChild: true,
                  children: /* @__PURE__ */ jsx(Button, {
                    variant: "ghost",
                    size: "icon",
                    children: /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" })
                  })
                }), /* @__PURE__ */ jsxs(SheetContent, {
                  side: "left",
                  className: "w-64 p-0",
                  children: [/* @__PURE__ */ jsx("div", {
                    className: "border-b p-4",
                    children: /* @__PURE__ */ jsx("h2", {
                      className: "font-semibold",
                      children: "Account Settings"
                    })
                  }), /* @__PURE__ */ jsx(SettingsSidebar, {
                    activeTab,
                    onChange: (tab) => {
                      setActiveTab(tab);
                      setSheetOpen(false);
                    }
                  })]
                })]
              }), /* @__PURE__ */ jsx("h2", {
                className: "font-semibold",
                children: currentTitle
              })]
            }),
            /* @__PURE__ */ jsx(DialogHeader, {
              className: "hidden p-6 pb-0 md:block",
              children: /* @__PURE__ */ jsx(DialogTitle, { children: currentTitle })
            }),
            /* @__PURE__ */ jsx("main", {
              className: "flex-1 overflow-y-auto p-6",
              children: activeTab === "info" ? /* @__PURE__ */ jsx(AccountInfoTab, {
                user,
                onClose: () => onOpenChange(false)
              }) : /* @__PURE__ */ jsx(SecurityTab, {})
            })
          ]
        })]
      })
    })
  });
}
var LoginButton = () => {
  return /* @__PURE__ */ jsx(Link, {
    className: cn(buttonVariants({ variant: "default" })),
    to: "/sign-in",
    children: "Get started"
  });
};
function UserPopover() {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { isPending, data } = useSession();
  if (isPending) return /* @__PURE__ */ jsx(Spinner, {});
  if (!data) return /* @__PURE__ */ jsxs(Popover$1, {
    open: popoverOpen,
    onOpenChange: setPopoverOpen,
    children: [/* @__PURE__ */ jsx(PopoverTrigger, {
      asChild: true,
      children: /* @__PURE__ */ jsx(Button, {
        variant: "ghost",
        size: "icon",
        className: "h-10 w-10 rounded-full",
        "aria-label": "Open login menu",
        children: /* @__PURE__ */ jsx(User, { className: "size-5" })
      })
    }), /* @__PURE__ */ jsx(PopoverContent, {
      align: "end",
      className: "w-64",
      children: /* @__PURE__ */ jsxs("div", {
        className: "space-y-4",
        children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
          className: "font-medium",
          children: "Welcome"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-sm text-muted-foreground",
          children: "Log in to get started and access your account."
        })] }), /* @__PURE__ */ jsx(LoginButton, {})]
      })
    })]
  });
  const user = {
    email: data.user.email || "",
    name: data.user.name || "",
    image: data.user.image || ""
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Popover$1, {
    open: popoverOpen,
    onOpenChange: setPopoverOpen,
    children: [/* @__PURE__ */ jsx(PopoverTrigger, {
      asChild: true,
      children: /* @__PURE__ */ jsx(Button, {
        variant: "ghost",
        className: "h-10 w-10 rounded-full p-0",
        "aria-label": "Open user menu",
        children: /* @__PURE__ */ jsx(UserAvatar, {
          name: user.name,
          image: user.image,
          className: "size-8"
        })
      })
    }), /* @__PURE__ */ jsx(PopoverContent, {
      align: "end",
      className: "w-64 p-0",
      children: /* @__PURE__ */ jsx(UserMenuContent, {
        user,
        onSettings: () => {
          setPopoverOpen(false);
          setSettingsOpen(true);
        }
      })
    })]
  }), /* @__PURE__ */ jsx(SettingsDialog, {
    open: settingsOpen,
    onOpenChange: setSettingsOpen,
    user
  })] });
}
function ScrollArea$1({ className, children, ...props }) {
  return /* @__PURE__ */ jsxs(ScrollArea.Root, {
    "data-slot": "scroll-area",
    className: cn("relative", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx(ScrollArea.Viewport, {
        "data-slot": "scroll-area-viewport",
        className: "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1",
        children
      }),
      /* @__PURE__ */ jsx(ScrollBar, {}),
      /* @__PURE__ */ jsx(ScrollArea.Corner, {})
    ]
  });
}
function ScrollBar({ className, orientation = "vertical", ...props }) {
  return /* @__PURE__ */ jsx(ScrollArea.ScrollAreaScrollbar, {
    "data-slot": "scroll-area-scrollbar",
    orientation,
    className: cn("flex touch-none p-px transition-colors select-none", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent", className),
    ...props,
    children: /* @__PURE__ */ jsx(ScrollArea.ScrollAreaThumb, {
      "data-slot": "scroll-area-thumb",
      className: "relative flex-1 rounded-full bg-border"
    })
  });
}
function CartSheet() {
  const { items, addItem, reduceItem, removeItem, clear, products, queryResult } = useCartProducts();
  const { isOpen, openCart, closeCart } = useCartStore();
  const isVariantAvailable = (variant) => {
    const stockQty = variant?.qty ?? 0;
    return (variant?.available ?? true) && stockQty > 0;
  };
  const totalQuantity = products.reduce((sum, item) => {
    const variant = item.product?.variants_connection?.nodes?.find((v) => v.documentId === item.variantId);
    if (!isVariantAvailable(variant)) return sum;
    return sum + item.quantity;
  }, 0);
  const isAnyLoading = queryResult.isLoading || queryResult.isFetching;
  const subtotal = products.reduce((sum, item) => {
    const product = item.product;
    const variant = product?.variants_connection?.nodes?.find((v) => v.documentId === item.variantId);
    if (!isVariantAvailable(variant)) return sum;
    return sum + (product?.pricing?.final_price ?? 0) * item.quantity;
  }, 0);
  const totalCost = subtotal + 0 + 0;
  return /* @__PURE__ */ jsxs(Sheet, {
    open: isOpen,
    onOpenChange: (open) => open ? openCart() : closeCart(),
    children: [/* @__PURE__ */ jsx(SheetTrigger, {
      asChild: true,
      children: /* @__PURE__ */ jsxs(Button, {
        "aria-label": "Cart Button",
        variant: "ghost",
        className: "relative gap-2",
        children: [/* @__PURE__ */ jsx(ShoppingCart, { className: "h-4 w-4" }), totalQuantity > 0 && /* @__PURE__ */ jsx("span", {
          className: "absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-background",
          children: totalQuantity
        })]
      })
    }), /* @__PURE__ */ jsxs(SheetContent, {
      className: "flex flex-col w-full sm:max-w-md p-6",
      children: [
        /* @__PURE__ */ jsx(SheetHeader, {
          className: "pb-4 border-b",
          children: /* @__PURE__ */ jsxs(SheetTitle, {
            className: "flex items-center gap-2",
            children: [
              "Produse Ad\u0103ugate \xEEn co\u0219 (",
              items.length,
              " ",
              items.length === 1 ? "item" : "items",
              ")",
              isAnyLoading && /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin text-muted-foreground" })
            ]
          })
        }),
        /* @__PURE__ */ jsx(ScrollArea$1, {
          className: "flex-1 my-4 pr-3",
          children: items.length === 0 ? /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col items-center justify-center h-48 text-muted-foreground gap-2",
            children: [/* @__PURE__ */ jsx(ShoppingCart, { className: "h-8 w-8 stroke-1" }), /* @__PURE__ */ jsx("p", {
              className: "text-sm",
              children: "Your cart is empty."
            })]
          }) : /* @__PURE__ */ jsx("div", {
            className: "space-y-4",
            children: products.map((item) => {
              const product = item.product;
              const variant = product?.variants_connection?.nodes?.find((v) => v.documentId === item.variantId);
              const stockQty = variant?.qty ?? 0;
              const isAvailable = isVariantAvailable(variant);
              const productName = product?.name || "Loading product...";
              const imageUrl = variant?.media?.[0]?.url;
              const productPrice = product?.pricing?.final_price;
              return /* @__PURE__ */ jsxs("div", {
                className: `flex gap-4 p-4 rounded-xl border bg-card text-card-foreground shadow-sm relative overflow-hidden transition-all ${!isAvailable ? "opacity-60 grayscale-[35%] bg-muted/40 border-dashed" : ""}`,
                children: [
                  isAnyLoading && /* @__PURE__ */ jsx("div", {
                    className: "absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-10",
                    children: /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin text-primary" })
                  }),
                  /* @__PURE__ */ jsx("div", {
                    className: "h-20 w-20 rounded-lg border bg-muted flex items-center justify-center overflow-hidden shrink-0",
                    children: imageUrl ? /* @__PURE__ */ jsx("img", {
                      src: getStrapiMedia(imageUrl),
                      alt: productName,
                      className: "h-full w-full object-cover"
                    }) : /* @__PURE__ */ jsx(ImageOff, { className: "h-5 w-5 text-muted-foreground/60" })
                  }),
                  /* @__PURE__ */ jsxs("div", {
                    className: "flex flex-col justify-between flex-1 min-w-0",
                    children: [/* @__PURE__ */ jsxs("div", {
                      className: "space-y-0.5",
                      children: [
                        /* @__PURE__ */ jsxs("div", {
                          className: "flex items-start justify-between gap-1",
                          children: [/* @__PURE__ */ jsx("h4", {
                            className: "font-semibold text-sm truncate max-w-[250px]",
                            children: productName
                          }), !isAvailable && /* @__PURE__ */ jsxs("span", {
                            className: "inline-flex items-center gap-1 shrink-0 rounded-md bg-destructive/10 px-1.5 py-0.5 text-[10px] font-medium text-destructive",
                            children: [/* @__PURE__ */ jsx(AlertCircle, { className: "h-2.5 w-2.5" }), "Unavailable"]
                          })]
                        }),
                        productPrice && /* @__PURE__ */ jsxs("p", {
                          className: `text-sm font-medium ${!isAvailable ? "line-through text-muted-foreground/70" : "text-muted-foreground"}`,
                          children: ["$", productPrice.toFixed(2)]
                        }),
                        /* @__PURE__ */ jsxs("div", {
                          className: "mt-1 flex items-center gap-2 text-xs text-muted-foreground",
                          children: [/* @__PURE__ */ jsx("span", {
                            className: "inline-block h-3 w-3 rounded-full border",
                            style: { backgroundColor: variant?.color?.color_code }
                          }), /* @__PURE__ */ jsx("span", { children: variant?.size?.name })]
                        })
                      ]
                    }), /* @__PURE__ */ jsxs("div", {
                      className: "flex items-center justify-between mt-2",
                      children: [/* @__PURE__ */ jsxs("div", {
                        className: `flex items-center border rounded-lg bg-background p-0.5 shadow-sm ${!isAvailable ? "opacity-50" : ""}`,
                        children: [
                          /* @__PURE__ */ jsx("button", {
                            className: "p-1 rounded-md hover:bg-muted",
                            onClick: () => reduceItem(item.productId, item.variantId),
                            children: /* @__PURE__ */ jsx(Minus, { className: "h-3 w-3" })
                          }),
                          /* @__PURE__ */ jsx("span", {
                            className: "w-6 text-center text-xs font-medium",
                            children: item.quantity
                          }),
                          /* @__PURE__ */ jsx("button", {
                            className: "p-1 rounded-md hover:bg-muted",
                            onClick: () => {
                              addItem(item.productId, item.variantId, stockQty);
                            },
                            disabled: !isAvailable || item.quantity >= stockQty,
                            children: /* @__PURE__ */ jsx(Plus, { className: "h-3 w-3" })
                          })
                        ]
                      }), /* @__PURE__ */ jsx(Button, {
                        variant: "ghost",
                        size: "icon",
                        className: "h-7 w-7 text-destructive hover:bg-destructive/10",
                        onClick: () => removeItem(item.productId, item.variantId),
                        children: /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" })
                      })]
                    })]
                  })
                ]
              }, `${item.productId}-${item.variantId}`);
            })
          })
        }),
        items.length > 0 && /* @__PURE__ */ jsxs(SheetFooter, {
          className: "pt-4 border-t flex-col gap-4",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "space-y-1.5 text-sm",
            children: [
              /* @__PURE__ */ jsxs("div", {
                className: "flex justify-between",
                children: [/* @__PURE__ */ jsx("span", {
                  className: "text-muted-foreground",
                  children: "Subtotal"
                }), /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: formatPrice(subtotal)
                })]
              }),
              /* @__PURE__ */ jsxs("div", {
                className: "flex justify-between",
                children: [/* @__PURE__ */ jsx("span", {
                  className: "text-muted-foreground",
                  children: "Transport"
                }), /* @__PURE__ */ jsx("span", {
                  className: "font-medium",
                  children: "Free"
                })]
              }),
              /* @__PURE__ */ jsxs("div", {
                className: "flex justify-between border-t pt-2 mt-1 text-base font-semibold",
                children: [/* @__PURE__ */ jsx("span", { children: "Total" }), /* @__PURE__ */ jsx("span", { children: formatPrice(totalCost) })]
              })
            ]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex gap-2 w-full",
            children: [/* @__PURE__ */ jsx(Button, {
              variant: "outline",
              onClick: clear,
              className: "flex-1",
              children: "Sterge"
            }), /* @__PURE__ */ jsx(Link, {
              to: "/checkout",
              onClick: closeCart,
              className: cn(buttonVariants({ variant: "default" }), "flex-1"),
              disabled: subtotal === 0,
              children: "Checkout"
            })]
          })]
        })
      ]
    })]
  });
}
function Collapsible$1({ ...props }) {
  return /* @__PURE__ */ jsx(Collapsible.Root, {
    "data-slot": "collapsible",
    ...props
  });
}
function CollapsibleTrigger({ ...props }) {
  return /* @__PURE__ */ jsx(Collapsible.CollapsibleTrigger, {
    "data-slot": "collapsible-trigger",
    ...props
  });
}
function CollapsibleContent({ ...props }) {
  return /* @__PURE__ */ jsx(Collapsible.CollapsibleContent, {
    "data-slot": "collapsible-content",
    ...props
  });
}
var MobileNavigation = () => {
  return /* @__PURE__ */ jsxs(Sheet, { children: [/* @__PURE__ */ jsx(SheetTrigger, {
    asChild: true,
    children: /* @__PURE__ */ jsx(Button, {
      variant: "ghost",
      size: "icon",
      className: "md:hidden",
      "aria-label": "Open Menu",
      children: /* @__PURE__ */ jsx(Menu, { className: "size-5" })
    })
  }), /* @__PURE__ */ jsxs(SheetContent, {
    side: "right",
    className: "w-75 p-6 flex flex-col justify-between",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex flex-col h-full",
      children: [/* @__PURE__ */ jsx(SheetHeader, {
        className: "text-left pb-4 border-b",
        children: /* @__PURE__ */ jsx(SheetTitle, {
          asChild: true,
          children: /* @__PURE__ */ jsx(BrandLink, {})
        })
      }), /* @__PURE__ */ jsx("nav", {
        className: "mt-4 flex flex-col gap-1 overflow-y-auto pr-1",
        children: navigation.map((item) => {
          const hasChildren = item.children?.length;
          if (!item.visible) return;
          if (!hasChildren) return /* @__PURE__ */ jsx(Link, {
            to: item.to,
            params: { category: item.label },
            className: "rounded-md px-3 py-2.5 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
            children: item.label
          }, item.label);
          return /* @__PURE__ */ jsxs(Collapsible$1, {
            className: "w-full",
            children: [/* @__PURE__ */ jsxs(CollapsibleTrigger, {
              className: "flex w-full items-center justify-between rounded-md px-3 py-2.5 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground [&[data-state=open]>svg]:rotate-180",
              children: [item.label, /* @__PURE__ */ jsx(ChevronDown, { className: "size-4 transition-transform duration-200" })]
            }), /* @__PURE__ */ jsx(CollapsibleContent, {
              className: "ml-2 mt-1 border-l pl-2 flex flex-col gap-0.5",
              children: (item.children ?? []).map((child) => /* @__PURE__ */ jsx(Link, {
                to: item.to,
                params: {
                  category: item.label,
                  subCategory: child.label
                },
                className: "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                children: child.label
              }, child.label))
            })]
          }, item.label);
        })
      })]
    }), /* @__PURE__ */ jsx("div", { className: "mt-auto border-t pt-4" })]
  })] });
};
var Header = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
    className: "py-2  w-full bg-primary flex items-center justify-center text-primary-foreground text-xs",
    children: /* @__PURE__ */ jsx("span", { children: "Transport gratuit la comenzi de peste 500 de lei" })
  }), /* @__PURE__ */ jsx("header", {
    className: "z-20 border-b bg-background/90  sticky top-0",
    children: /* @__PURE__ */ jsxs(Container, {
      className: "flex py-2 items-center justify-between",
      children: [
        /* @__PURE__ */ jsx(BrandLink, {}),
        /* @__PURE__ */ jsx(Navigation, {}),
        /* @__PURE__ */ jsxs("div", {
          className: "flex",
          children: [/* @__PURE__ */ jsx(CTA, {}), /* @__PURE__ */ jsx(MobileNavigation, {})]
        })
      ]
    })
  })] });
};
var CTA = () => {
  return /* @__PURE__ */ jsxs("div", {
    className: "flex items-center",
    children: [/* @__PURE__ */ jsx(UserPopover, {}), /* @__PURE__ */ jsx(CartSheet, {})]
  });
};
var Navigation = () => {
  return /* @__PURE__ */ jsx(NavigationMenu$1, {
    className: "hidden md:block",
    children: /* @__PURE__ */ jsx(NavigationMenuList, { children: navigation.map((navItem) => {
      if (!navItem.visible) return;
      if (!navItem.children || navItem.children.length === 0) return /* @__PURE__ */ jsx(NavigationMenuItem, { children: /* @__PURE__ */ jsx(LinkItem, {
        label: navItem.label,
        to: navItem.to
      }) }, navItem.label);
      return /* @__PURE__ */ jsx(DropdownLinkItem, {
        children: navItem.children,
        label: navItem.label
      }, navItem.label);
    }) })
  });
};
var DropdownLinkItem = ({ children, label }) => {
  return /* @__PURE__ */ jsxs(NavigationMenuItem, { children: [/* @__PURE__ */ jsx(NavigationMenuTrigger, { children: label.charAt(0).toUpperCase() + label.slice(1) }), /* @__PURE__ */ jsx(NavigationMenuContent, { children: /* @__PURE__ */ jsx("ul", {
    className: "grid w-[400px] gap-1 p-3",
    children: children.map((child) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(NavigationMenuLink, {
      asChild: true,
      className: "flex-row",
      children: /* @__PURE__ */ jsxs(Link, {
        to: child.to,
        params: {
          category: label,
          subCategory: child.label
        },
        className: "flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-accent hover:text-accent-foreground group text-left",
        children: [
          child.image && /* @__PURE__ */ jsx("div", {
            className: "h-14 w-14 shrink-0 overflow-hidden rounded-md border border-border flex items-center justify-center bg-muted",
            children: /* @__PURE__ */ jsx("img", {
              src: getStrapiMedia(child.image),
              alt: child.label,
              className: "h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
            })
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "flex-1 space-y-0.5",
            children: [/* @__PURE__ */ jsx("div", {
              className: "text-sm font-semibold tracking-wide",
              children: child.label
            }), child.description && /* @__PURE__ */ jsx("p", {
              className: "text-xs text-muted-foreground font-light leading-relaxed line-clamp-2",
              children: child.description
            })]
          }),
          /* @__PURE__ */ jsx(ChevronRightIcon$1, { className: "h-4 w-4 opacity-50 transition-transform group-hover:translate-x-0.5" })
        ]
      })
    }) }, child.label))
  }) })] });
};
var LinkItem = ({ label, to, className }) => {
  return /* @__PURE__ */ jsx(NavigationMenuLink, {
    asChild: true,
    className: cn(navigationMenuTriggerStyle$1(), className),
    children: /* @__PURE__ */ jsx(Link, {
      to,
      children: label.charAt(0).toUpperCase() + label.slice(1)
    })
  });
};
var ChevronRightIcon$1 = ({ className }) => /* @__PURE__ */ jsx("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  strokeWidth: 2,
  stroke: "currentColor",
  className,
  children: /* @__PURE__ */ jsx("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M8.25 4.5l7.5 7.5-7.5 7.5"
  })
});
var Route$9 = createRootRouteWithContext()({
  head: () => {
    const seoData = seo({
      title: `Acasa | ${site.name}`,
      description: "Auxload Store \u2013 haine Gen Z cu imprimeuri trendy \u0219i stil modern. Livrare gratuit\u0103 \xEEn Breaza.",
      type: "website"
    });
    return {
      meta: [
        { charSet: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1"
        },
        ...seoData.meta
      ],
      links: [
        {
          rel: "stylesheet",
          href: styles_default
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png"
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png"
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png"
        },
        {
          rel: "manifest",
          href: "/site.webmanifest",
          color: "#fffff"
        },
        {
          rel: "icon",
          href: "/favicon.ico"
        },
        ...seoData.links ?? []
      ]
    };
  },
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "ro",
    children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", {
      className: "w-full  min-h-screen  flex flex-col",
      children: [
        /* @__PURE__ */ jsx(Header, {}),
        /* @__PURE__ */ jsx(Toaster$1, {}),
        /* @__PURE__ */ jsx(CartAuthSync, {}),
        children,
        /* @__PURE__ */ jsx(Footer, {}),
        /* @__PURE__ */ jsx(Scripts, {})
      ]
    })]
  });
}
var Route$8 = createFileRoute("/robots.txt")({ server: { handlers: { GET: async () => {
  const siteUrl = "http://localhost:3000";
  return new Response(`# robots.txt for ${siteUrl}

User-agent: *

# Allow public pages
Allow: /

# Block private ecommerce areas
Disallow: /sign-in/
Disallow: /checkout/
Disallow: /orders/


# Allow assets needed for rendering
Allow: /images/
Allow: /assets/
Allow: /css/
Allow: /js/

# Sitemap
Sitemap: ${siteUrl}/sitemap.xml
`, { headers: {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "public, max-age=86400"
  } });
} } } });
var $$splitComponentImporter$5 = () => import('./routes-DDlEwcMQ.mjs');
var Route$7 = createFileRoute("/")({
  head: () => {
    return seo({
      title: `Acasa | ${site.name}`,
      description: "Auxload Store \u2013 haine Gen Z cu imprimeuri trendy \u0219i stil modern. Livrare gratuit\u0103 \xEEn Breaza.",
      canonical: `http://localhost:3000`,
      type: "website"
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import('./sign-in-CiVkOTNj.mjs');
var Route$6 = createFileRoute("/sign-in/")({
  beforeLoad: async () => {
    if (await getSession()) throw redirect({ to: "/" });
  },
  component: lazyRouteComponent($$splitComponentImporter$4, "component"),
  pendingComponent: () => /* @__PURE__ */ jsx("div", {
    "aria-label": "Pagina se incarca...",
    className: "text-center py-20 flex-1 min-h-screen w-full ",
    children: "Loading..."
  }),
  head: () => {
    return seo({
      title: `Sign-in | ${site.name}`,
      description: "Aici comanda produsele aflate in cosul de cumparaturi",
      canonical: `http://localhost:3000/sign-in`,
      type: "website"
    });
  }
});
var getOrderListServerFn = createServerFn().handler(createSsrRpc("c671e96b1f14cdb8d686a520ba822d1b8a905b8a88e4d5d0dd594c1b18dd85ee"));
var getOrderServerFn = createServerFn().validator(orderIdSchema).handler(createSsrRpc("e7c5210c088e840540d2b74578ae3e8758867c0247b7bbf69e2cc141950e85b2"));
var $$splitComponentImporter$3 = () => import('./orders--ghhodbf.mjs');
var Route$5 = createFileRoute("/orders/")({
  beforeLoad: async () => await requireAuth(),
  component: lazyRouteComponent($$splitComponentImporter$3, "component"),
  pendingComponent: () => /* @__PURE__ */ jsx("main", {
    className: "flex-1 w-full h-full min-h-screen ",
    children: /* @__PURE__ */ jsx("span", { children: "Loading..." })
  }),
  loader: async () => {
    return await getOrderListServerFn();
  },
  head: () => {
    return seo({
      title: `Checkout | ${site.name}`,
      description: "Aici poti vedea comenzile tale!",
      canonical: `http://localhost:3000/order`,
      type: "website"
    });
  },
  pendingMs: 0
});
var $$splitComponentImporter$2 = () => import('./checkout-B15ky_HR.mjs');
var Route$4 = createFileRoute("/checkout/")({
  beforeLoad: async () => await requireAuth(),
  component: lazyRouteComponent($$splitComponentImporter$2, "component"),
  pendingComponent: () => /* @__PURE__ */ jsx(CheckoutSkeleton, {}),
  head: () => {
    return seo({
      title: `Checkout | ${site.name}`,
      description: "Aici comanda produsele aflate in cosul de cumparaturi",
      canonical: `http://localhost:3000/checkout`,
      type: "website"
    });
  }
});
function CheckoutSkeleton() {
  return /* @__PURE__ */ jsx("div", {
    className: "w-full flex-1 max-w-6xl mx-auto p-6 bg-[#121212] text-white min-h-screen",
    children: /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "lg:col-span-2 space-y-6",
        children: [
          /* @__PURE__ */ jsxs("div", {
            className: "p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-4",
            children: [
              /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-24 bg-zinc-800" }),
              " ",
              /* @__PURE__ */ jsxs("div", {
                className: "grid grid-cols-2 gap-4",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "space-y-2",
                  children: [
                    /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-16 bg-zinc-800" }),
                    " ",
                    /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full rounded-md bg-zinc-800" }),
                    " "
                  ]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "space-y-2",
                  children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-12 bg-zinc-800" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full rounded-md bg-zinc-800" })]
                })]
              }),
              /* @__PURE__ */ jsxs("div", {
                className: "space-y-2",
                children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-14 bg-zinc-800" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full rounded-md bg-zinc-800" })]
              })
            ]
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-4",
            children: [
              /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-36 bg-zinc-800" }),
              /* @__PURE__ */ jsxs("div", {
                className: "space-y-2",
                children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-14 bg-zinc-800" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full rounded-md bg-zinc-800" })]
              }),
              /* @__PURE__ */ jsxs("div", {
                className: "grid grid-cols-3 gap-4",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "col-span-2 space-y-2",
                  children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-10 bg-zinc-800" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full rounded-md bg-zinc-800" })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "space-y-2",
                  children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-16 bg-zinc-800" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full rounded-md bg-zinc-800" })]
                })]
              })
            ]
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-4",
            children: [
              /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-40 bg-zinc-800" }),
              /* @__PURE__ */ jsxs("div", {
                className: "p-4 rounded-lg border border-blue-900/50 bg-blue-950/20 flex justify-between items-center",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "flex items-center space-x-3",
                  children: [
                    /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-4 rounded-full bg-blue-800" }),
                    " ",
                    /* @__PURE__ */ jsxs("div", {
                      className: "space-y-2",
                      children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-28 bg-zinc-800" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-20 bg-zinc-800" })]
                    })
                  ]
                }), /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-16 bg-zinc-800" })]
              }),
              /* @__PURE__ */ jsxs("div", {
                className: "p-4 rounded-lg border border-zinc-800 bg-zinc-900/20 flex justify-between items-center",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "flex items-center space-x-3",
                  children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-4 rounded-full bg-zinc-800" }), /* @__PURE__ */ jsxs("div", {
                    className: "space-y-2",
                    children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-32 bg-zinc-800" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-24 bg-zinc-800" })]
                  })]
                }), /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-12 bg-zinc-800" })]
              })
            ]
          })
        ]
      }), /* @__PURE__ */ jsx("div", {
        className: "lg:col-span-1",
        children: /* @__PURE__ */ jsxs("div", {
          className: "p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-6 sticky top-6",
          children: [
            /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [
                /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-28 bg-zinc-800" }),
                " ",
                /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-16 bg-zinc-800" }),
                "  "
              ]
            }),
            /* @__PURE__ */ jsx("div", {
              className: "space-y-4",
              children: [1, 2].map((item) => /* @__PURE__ */ jsxs("div", {
                className: "flex space-x-3 items-start justify-between py-2",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "flex space-x-3",
                  children: [
                    /* @__PURE__ */ jsx(Skeleton, { className: "h-16 w-12 rounded-md bg-zinc-800 flex-shrink-0" }),
                    " ",
                    /* @__PURE__ */ jsxs("div", {
                      className: "space-y-2",
                      children: [
                        /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-36 bg-zinc-800" }),
                        " ",
                        /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-24 bg-zinc-800" }),
                        " ",
                        /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-8 rounded bg-zinc-800 mt-1" }),
                        "   "
                      ]
                    })
                  ]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "text-right space-y-1",
                  children: [
                    /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-12 bg-zinc-800/60 ml-auto" }),
                    " ",
                    /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-16 bg-zinc-800 ml-auto" }),
                    "    "
                  ]
                })]
              }, item))
            }),
            /* @__PURE__ */ jsx("hr", { className: "border-zinc-800" }),
            /* @__PURE__ */ jsxs("div", {
              className: "space-y-3",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex justify-between",
                children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-16 bg-zinc-800" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-16 bg-zinc-800" })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex justify-between",
                children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-14 bg-zinc-800" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-16 bg-zinc-800" })]
              })]
            }),
            /* @__PURE__ */ jsx("hr", { className: "border-zinc-800" }),
            /* @__PURE__ */ jsxs("div", {
              className: "flex justify-between items-center pt-2",
              children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-12 bg-zinc-800" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-7 w-24 bg-zinc-800" })]
            })
          ]
        })
      })]
    })
  });
}
var $$splitNotFoundComponentImporter = () => import('./_slug-Cfhb_78R.mjs');
var $$splitComponentImporter$1 = () => import('./_slug-DNnQ83JE.mjs');
var Route$3 = createFileRoute("/product/$slug")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
  validateSearch: productVariantSearchParamsSchema,
  loaderDeps: ({ search: { variant_name } }) => ({ variant_name }),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  loader: async ({ params }) => {
    const res = await getProductBySlug(params.slug);
    if (res.products_connection.nodes.length === 0) throw notFound();
    return res.products_connection.nodes[0];
  },
  pendingComponent: () => /* @__PURE__ */ jsx("div", {
    "aria-label": "Pagina se incarca...",
    className: "text-center py-20 flex-1 min-h-screen w-full ",
    children: "Loading..."
  }),
  head: ({ loaderData, params }) => {
    const canonical = `http://localhost:3000/product/${params.slug}`;
    const standardSeo = seo({
      title: `${loaderData?.name} | ${site.name}`,
      description: loaderData?.seo?.description ?? `${loaderData?.name}. ${loaderData?.description?.slice(0, 150)}`,
      image: loaderData?.seo?.media?.url,
      canonical,
      type: "product"
    });
    if (!loaderData) return standardSeo;
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: loaderData.name,
      image: loaderData.seo?.media?.url,
      description: loaderData.seo?.description || loaderData.description,
      sku: loaderData.variants[0].name,
      offers: {
        "@type": "Offer",
        url: canonical,
        priceCurrency: "RON",
        price: loaderData.pricing.final_price,
        itemCondition: "https://schema.org",
        availability: loaderData.variants[0].available ? "https://schema.org" : "https://schema.org"
      }
    };
    const meta = Array.isArray(standardSeo) ? standardSeo : standardSeo.meta || [];
    const links = Array.isArray(standardSeo) ? [] : standardSeo.links || [];
    return {
      meta: [...meta, {
        tagName: "script",
        type: "application/ld+json",
        innerHTML: JSON.stringify(jsonLd)
      }],
      links
    };
  },
  staleTime: 1e4 * 6 * 5
});
var $$splitComponentImporter = () => import('./_id-xmaJ6xan.mjs');
var Route$2 = createFileRoute("/orders/$id")({
  pendingComponent: () => /* @__PURE__ */ jsx("main", {
    className: "flex-1 w-full h-full min-h-screen ",
    children: /* @__PURE__ */ jsx("span", { children: "Se \xEEncarc\u0103..." })
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  beforeLoad: async () => await requireAuth(),
  loader: async ({ params }) => {
    const id = Number(params.id);
    if (Number.isNaN(id)) throw notFound();
    return await getOrderServerFn({ data: { orderId: id } });
  },
  head: ({ params }) => {
    const canonical = `http://localhost:3000/order/${params.id}`;
    return seo({
      title: `Num\u0103rul comenzii: ${params.id} | ${site.name}`,
      description: `Comanda num\u0103rul ${params.id} de pe site!`,
      canonical,
      type: "website"
    });
  },
  pendingMs: 0
});
createUploadthing()({ image: { maxFileSize: "4MB" } }).onUploadComplete(async ({ metadata, file }) => {
  return { url: file.ufsUrl };
});
var utapi = new UTApi();
var Route$1 = createFileRoute("/api/upload")({ server: { handlers: { POST: async ({ request }) => {
  try {
    const file = (await request.formData()).get("file");
    if (!file) return new Response("No file provided", { status: 400 });
    const uploadedFile = (await utapi.uploadFiles([file]))[0];
    if (!uploadedFile || uploadedFile.error) return Response.json({ error: uploadedFile?.error?.message || "Upload failed" }, { status: 500 });
    return Response.json({ url: uploadedFile.data.ufsUrl });
  } catch (error) {
    return Response.json({ error: "Internal Server Error during upload" }, { status: 500 });
  }
} } } });
var Route = createFileRoute("/api/auth/$")({ server: { handlers: {
  GET: ({ request }) => auth.handler(request),
  POST: ({ request }) => auth.handler(request)
} } });
var RobotsDottxtRoute = Route$8.update({
  id: "/robots.txt",
  path: "/robots.txt",
  getParentRoute: () => Route$9
});
var IndexRoute = Route$7.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$9
});
var SignInIndexRoute = Route$6.update({
  id: "/sign-in/",
  path: "/sign-in/",
  getParentRoute: () => Route$9
});
var OrdersIndexRoute = Route$5.update({
  id: "/orders/",
  path: "/orders/",
  getParentRoute: () => Route$9
});
var CheckoutIndexRoute = Route$4.update({
  id: "/checkout/",
  path: "/checkout/",
  getParentRoute: () => Route$9
});
var ProductSlugRoute = Route$3.update({
  id: "/product/$slug",
  path: "/product/$slug",
  getParentRoute: () => Route$9
});
var OrdersIdRoute = Route$2.update({
  id: "/orders/$id",
  path: "/orders/$id",
  getParentRoute: () => Route$9
});
var ApiUploadRoute = Route$1.update({
  id: "/api/upload",
  path: "/api/upload",
  getParentRoute: () => Route$9
});
var CCategoryChar123SubCategoryChar125Route = Route$a.update({
  id: "/c/$category/{-$subCategory}",
  path: "/c/$category/{-$subCategory}",
  getParentRoute: () => Route$9
});
var rootRouteChildren = {
  IndexRoute,
  RobotsDottxtRoute,
  ApiUploadRoute,
  OrdersIdRoute,
  ProductSlugRoute,
  CheckoutIndexRoute,
  OrdersIndexRoute,
  SignInIndexRoute,
  ApiAuthSplatRoute: Route.update({
    id: "/api/auth/$",
    path: "/api/auth/$",
    getParentRoute: () => Route$9
  }),
  CCategoryChar123SubCategoryChar125Route
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
function getContext() {
  return { queryClient: new QueryClient() };
}
function getRouter() {
  const context = getContext();
  const router = createRouter({
    routeTree,
    context,
    scrollRestoration: true,
    defaultPreload: false,
    defaultPreloadStaleTime: 0
  });
  setupRouterSsrQueryIntegration({
    router,
    queryClient: context.queryClient
  });
  return router;
}

const routerDVmJmQLB = /*#__PURE__*/Object.freeze({
	__proto__: null,
	getRouter: getRouter
});

export { Button as B, Container as C, FieldDescription as F, Input as I, Label$1 as L, Route$a as R, Spinner as S, FieldGroup as a, buttonVariants as b, Field as c, FieldLabel as d, FieldError as e, FieldSeparator as f, Skeleton as g, useCartProducts as h, Separator$1 as i, Sheet as j, SheetTrigger as k, SheetContent as l, SheetHeader as m, SheetTitle as n, routerDVmJmQLB as r, signIn as s, useCartStore as u };
//# sourceMappingURL=router-DVmJmQLB.mjs.map
