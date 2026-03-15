import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    // Increase inline limit so tiny assets get inlined instead of fetched
    assetsInlineLimit: 8192,

    // Emit source maps only in dev
    sourcemap: false,

    // Split vendor chunks so the browser can cache them separately
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor':   ['react', 'react-dom', 'react-router-dom'],
          'motion':         ['framer-motion'],
          'ui-icons':       ['react-icons'],
          'form':           ['react-hook-form', '@hookform/resolvers', 'zod'],
          'date':           ['date-fns', 'react-day-picker'],
          'helmet':         ['react-helmet-async'],
        },
      },
    },
  },

  // Faster dev server: pre-bundle heavy deps
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'react-icons',
      'date-fns',
    ],
  },
})
