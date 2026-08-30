import tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import { nitroV2Plugin } from '@tanstack/nitro-v2-vite-plugin'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [devtools(),

  tailwindcss(), tanstackStart(
    {
      sitemap: {
        enabled: true,
        host: "https://auxload-store.ro",
      }
    }
  ), nitroV2Plugin({
    preset: "node-server"
  }), viteReact()],
})

export default config
