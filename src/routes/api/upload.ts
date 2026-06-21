// // routes/api/upload.ts
// import { utapi } from "@/lib/upload-thing"
// import { createFileRoute } from "@tanstack/react-router"

// export const Route = createFileRoute("/api/upload")({
//     server: {
//         handlers: {
//             POST: async ({ request }) => {
//                 try {
//                     const formData = await request.formData()
//                     const file = formData.get("file") as File

//                     if (!file) {
//                         return new Response("No file provided", { status: 400 })
//                     }

//                     // 1. Send the native File binary straight to UploadThing
//                     const uploadResult = await utapi.uploadFiles(file)

//                     // 2. Handle potential upload array wrapper failures
//                     if (uploadResult.error) {
//                         return Response.json(
//                             { error: uploadResult.error.message },
//                             { status: 500 }
//                         )
//                     }

//                     // 3. Extract the clean production URL CDN delivery target
//                     return Response.json({
//                         url: uploadResult.data.ufsUrl,
//                     })
//                 } catch (error) {
//                     return Response.json(
//                         { error: "Internal Server Error during upload" },
//                         { status: 500 }
//                     )
//                 }
//             },
//         },
//     },
// })
// routes/api/upload.ts
import { utapi } from "@/lib/upload-thing"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/api/upload")({
    server: {
        handlers: {
            POST: async ({ request }) => {
                try {
                    const formData = await request.formData()
                    const file = formData.get("file") as File

                    if (!file) {
                        return new Response("No file provided", { status: 400 })
                    }

                    // CORECorectură: Pune fișierul într-o matrice [file]
                    const uploadResult = await utapi.uploadFiles([file])
                    const uploadedFile = uploadResult[0]

                    // Verifică structura de eroare nativă UploadThing
                    if (!uploadedFile || uploadedFile.error) {
                        return Response.json(
                            { error: uploadedFile?.error?.message || "Upload failed" },
                            { status: 500 }
                        )
                    }

                    // Returnează URL-ul extras corect (acoperă ambele versiuni de SDK)
                    return Response.json({
                        url: uploadedFile.data.ufsUrl,
                    })
                } catch (error) {
                    return Response.json(
                        { error: "Internal Server Error during upload" },
                        { status: 500 }
                    )
                }
            },
        },
    },
})