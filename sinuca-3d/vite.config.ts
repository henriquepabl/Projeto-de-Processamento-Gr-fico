import { defineConfig } from "vite";
import glsl from 'vite-plugin-glsl'

export default defineConfig({
  root: ".",
  publicDir: "public",
  server: {
    open: true,
    host: true,
    allowedHosts: true,
  },
  plugins: [glsl()],
});