// cart/CartAuthSync.tsx
import { useEffect, useRef } from "react";
import { useCartStore } from "./store";
import { mergeCartServerFn, getCartServerFn } from "./functions/cart.function";
import { useSession } from "#/lib/auth-client";

export function CartAuthSync() {
    const { data: session } = useSession();
    const { items, setAuthenticated, clear } = useCartStore();
    const prevAuthRef = useRef<boolean | null>(null);

    useEffect(() => {
        const isAuthed = !!session?.user;
        const wasAuthed = prevAuthRef.current;
        prevAuthRef.current = isAuthed;

        if (isAuthed && wasAuthed === false) {
            // Just logged in — merge guest cart into DB, then load DB state
            (async () => {
                const guestItems = items; // capture before clearing
                if (guestItems.length > 0) {
                    await mergeCartServerFn({ data: { items: guestItems } });
                }
                const dbItems = await getCartServerFn();
                setAuthenticated(true, dbItems);
                // Wipe localStorage guest cart
                useCartStore.persist.clearStorage();
            })();
        } else if (!isAuthed && wasAuthed === true) {
            // Just logged out — drop to empty guest cart
            setAuthenticated(false, []);
        } else if (isAuthed && wasAuthed === null) {
            // Initial load — hydrate from DB
            (async () => {
                const dbItems = await getCartServerFn();
                setAuthenticated(true, dbItems);
            })();
        } else if (!isAuthed && wasAuthed === null) {
            setAuthenticated(false);
        }
    }, [!!session?.user]);

    return null;
}