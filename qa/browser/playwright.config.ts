import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: '.', testMatch: '*.spec.ts', timeout: 90000, retries: 0, workers: 2,
  reporter: [['list'], ['html',{open:'never'}]],
  outputDir: '../../qa-results', snapshotPathTemplate: '{testDir}/baselines/{projectName}/{arg}{ext}',
  use: {baseURL: process.env.QA_BASE_URL || 'https://unikmo.com', trace:'retain-on-failure', screenshot:'only-on-failure'},
  projects: [
    {name:'chromium-320',use:{...devices['Desktop Chrome'],viewport:{width:320,height:800}}},
    {name:'chromium-375',use:{...devices['iPhone SE'],browserName:'chromium'}},
    {name:'chromium-768',use:{...devices['Desktop Chrome'],viewport:{width:768,height:1024}}},
    {name:'chromium-1024',use:{...devices['Desktop Chrome'],viewport:{width:1024,height:900}}},
    {name:'chromium-1440',use:{...devices['Desktop Chrome'],viewport:{width:1440,height:900}}},
    {name:'chromium-1920',use:{...devices['Desktop Chrome'],viewport:{width:1920,height:1080}}},
    {name:'firefox-desktop',use:{...devices['Desktop Firefox']}},
    {name:'webkit-desktop',use:{...devices['Desktop Safari']}},
    {name:'webkit-iphone',use:{...devices['iPhone 13']}},
  ],
});
