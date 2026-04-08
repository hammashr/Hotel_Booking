import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    // Don't inline images — serve them as separate hashed files so the
    // browser can cache them independently of the JS bundle
    assetsInlineLimit: 0,

    // Emit source maps only in dev
    sourcemap: false,

    // Strip all console.* calls and debugger statements from production bundles
    minify: 'esbuild',

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

  // Drop console.* and debugger from production builds
  esbuild: {
    drop: ['console', 'debugger'],
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
