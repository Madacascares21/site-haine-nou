// lib/uploadthing.ts or server/uploadthing.ts
import { createUploadthing, UTApi, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
    avatarUploader: f({ image: { maxFileSize: "4MB" } })
        .onUploadComplete(async ({ metadata, file }) => {
            return { url: file.ufsUrl };
        }),
} satisfies FileRouter; 

export type OurFileRouter = typeof ourFileRouter;

// Export the server API instance to use in API routes manually
export const utapi = new UTApi();