import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import pkg from './package.json';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
  },
  build: {
    outDir: "../www",
    cssCodeSplit: true,
    emptyOutDir: false,
    lib: {
      entry: "src/widget.ts",
      name: "WidgetIntentDiscovery",
      fileName: () => `widget-intent-discovery@${pkg.version}.iife.js`,
      formats: ["iife"],
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        assetFileNames: "widget-intent-discovery.[ext]",
      },
    },
    minify: true,
    sourcemap: false
  }
});
