// export default config;
import { PlaywrightTestConfig, defineConfig } from '@playwright/test';


export const baseURLTui= process.env.URL || 'https://www.tui.co.uk';

const baseConfig: PlaywrightTestConfig = {
  timeout: 120000, // TODO: we need to work this back down...
  retries: 0,
  outputDir: `./test-results/${Date.now()}/`,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true, // we may want to consider flipping this
    trace: 'retain-on-failure',
    launchOptions: { slowMo: 1000 },
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    // proxy: {
    //   server: 'http://your-uk-proxy:port',
    //   username: 'user',
    //   password: 'pass'
    // }
  }

};

const projects = [
  // fullyParallel: true runs tests in parallel regardless of file
  // fullyParallel: false (default) parallelizes by test file
  { ...baseConfig, name: 'setup', testMatch: /global-setup/, fullyParallel: true },
  // fullParallel: true causes more tests to be flaky nullifying any potential speed gains
  {
    ...baseConfig,
    name: 'tuiTests',
    testMatch: '/tui/test/*.spec.ts',
    use: { ...baseConfig.use, baseURL: baseURLTui },
    dependencies: ['setup'],
    fullyParallel: false,
  },
];

export default defineConfig({
  reporter: [
    ['list'],
  ],
  workers: 1,
  projects,
});
