import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "src", "popup", "index.html"),
        options: resolve(__dirname, "src", "options", "index.html"),
        background: resolve(__dirname, "src", "background", "background.js"),
      },
      output: {
        entryFileNames: keepJsEntryPointFolderStructureInDistFolder,
      },
    },
  },
});

function keepJsEntryPointFolderStructureInDistFolder(chunkInfo) {
  if (chunkInfo.name === "background") {
    // I have to do that because vite by default do not respect src folder structure of js file
    // But I need to conserve the src folder structure of certain js file entry point for the
    // chrome extension to match the entry point in the manifest file
    const modifiedDirName = __dirname.replaceAll("\\", "/");
    const outputFilePath = chunkInfo.facadeModuleId.replace(
      `${modifiedDirName}/`,
      "",
    );

    return outputFilePath; // Place background.js in background folder
  }
  return "[name]-[hash].js"; // Other entry points at the root of dist
}
