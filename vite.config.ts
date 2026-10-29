import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

function game404Plugin(): Plugin {
  return {
    name: 'game-404-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url) {
          const cleanUrl = req.url.split('?')[0].replace(/^\/cms-unblcked\.github\.io/, '')
          if (cleanUrl.startsWith('/game/')) {
            const filePath = path.join(process.cwd(), 'public', cleanUrl)
            if (!fs.existsSync(filePath)) {
              res.statusCode = 404
              res.end('Not Found')
              return
            }
          }
        }
        next()
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [game404Plugin(), react(), tailwindcss()],
  base: '/cms-unblcked.github.io/',
})
