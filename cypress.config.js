import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        launchOptions.args.push('--use-fake-ui-for-media-stream')
        launchOptions.args.push('--use-fake-device-for-media-stream')
        launchOptions.args.push('--use-file-for-fake-video-capture=cypress/fixtures/topo-qr.mjpeg')
        return launchOptions;
      });
    },
  },
});
