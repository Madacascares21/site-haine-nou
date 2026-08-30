import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import netlify from '@netlify/vite-plugin-tanstack-start'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitroV2Plugin } from '@tanstack/nitro-v2-vite-plugin'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { generateSitemap } from 'tanstack-router-sitemap'
import { getSitemap } from '#/lib/sitemap'

const config = defineConfig({
  resolve: { tsconfigPaths: true },

  plugins: [devtools(),

  tailwindcss(), tanstackStart({
    sitemap: {
      enabled: true,
      host: import.meta.env.VITE_SITE_URL,
    }
  }), nitroV2Plugin({
    preset: "node-server"
  }), viteReact()],
})

export default config
