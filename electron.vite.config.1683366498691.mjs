// electron.vite.config.ts
import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import vue from "@vitejs/plugin-vue";
var __electron_vite_injected_dirname = "D:\\lolHelper\\lol_helper";
var electron_vite_config_default = defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        "@main": resolve(__electron_vite_injected_dirname, "src/main"),
        "@preload": resolve(__electron_vite_injected_dirname, "src/preload")
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        "@main": resolve(__electron_vite_injected_dirname, "src/main"),
        "@preload": resolve(__electron_vite_injected_dirname, "src/preload")
      }
    }
  },
  renderer: {
    resolve: {
      alias: {
        "@renderer": resolve(__electron_vite_injected_dirname, "src/renderer"),
        "@main": resolve(__electron_vite_injected_dirname, "src/main"),
        "@preload": resolve(__electron_vite_injected_dirname, "src/preload")
      }
    },
    plugins: [vue()]
  }
});
export {
  electron_vite_config_default as default
};
