import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        launchOptions.args.push('--use-fake-ui-for-media-stream');
        launchOptions.args.push('--use-fake-device-for-media-stream');
        // TODO Replace with a couple frames of topo QR
        launchOptions.args.push(
          '--use-file-for-fake-video-capture=cypress/fixtures/fix.y4m'
        )

        return launchOptions;
      });
    },
  },
});
