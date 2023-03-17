import { defineConfig } from "vite";
import jsconfigPaths from "vite-jsconfig-paths";

export default defineConfig({
  plugins: [jsconfigPaths()],
  server: {
    port: 8000,
  },
});
