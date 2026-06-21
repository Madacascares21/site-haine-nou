import { createAuthClient } from "better-auth/react"
import { magicLinkClient } from "better-auth/client/plugins";

export const { signIn, signOut, updateUser, deleteUser, useSession } = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    // baseURL: "http://localhost:3000"
    plugins: [
        magicLinkClient()
    ]
})
