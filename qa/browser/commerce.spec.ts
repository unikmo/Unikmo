import { test, expect } from '@playwright/test';

test('admin pages and APIs deny anonymous access', async ({ page, request }) => {
  const response = await request.get('/api/admin/orders', {maxRedirects:0});
  expect(response.status()).toBe(401);
  await page.goto('/admin/dashboard');
  await expect(page).toHaveURL(/\/admin\/login/);
});

test('missing key is rejected without modifying a record', async ({ request }) => {
  const response = await request.get('/api/media/validate-code');
  expect(response.status()).toBe(400);
});

for (const status of [200, 502]) {
  test('contact UI handles mocked delivery status ' + status, async ({page}) => {
    // Intercept every submission. Never send an actual production email.
    let submitted = false;
    await page.route('**/api/contact', async route => {
      expect(route.request().method()).toBe('POST');
      submitted = true;
      await route.fulfill({status, json:status === 200 ? {success:true} : {error:'Message could not be delivered. Please try again later.'}});
    });
    await page.goto('/contact');
    await page.getByPlaceholder('you@example.com').fill('qa@example.invalid');
    await page.getByPlaceholder('How can we help?').fill('Synthetic UI test only.');
    await page.getByRole('button',{name:'Send message'}).click();
    await expect(page.getByText(status === 200 ? 'Message sent' : 'Message could not be delivered. Please try again later.',{exact:true})).toBeVisible();
    expect(submitted).toBe(true);
  });
}

for (const reason of ['invalid','revoked','claimed','valid']) {
  test('upload UI handles mocked key state ' + reason, async ({page}) => {
    await page.route('**/api/media/validate-code?**', route => route.fulfill({json:reason === 'valid' ? {valid:true} : {valid:false,reason,error:'Key unavailable: '+reason,message:'Key unavailable: '+reason}}));
    await page.route('**/api/media/list?**', route => route.fulfill({json:{media:[]}}));
    // Block all real media write requests, including presigning and deletion.
    await page.route('**/api/media/**', route => {
      if (route.request().method() !== 'GET') return route.abort();
      return route.fallback();
    });
    await page.goto('/upload');
    await page.getByPlaceholder('UNIKMO-XXXX-XXXX-XXX').fill('UNIKMO-QATEST-0000');
    if (reason === 'valid') await expect(page.locator('input[type=file]')).toBeAttached();
    else await expect(page.getByText('Key unavailable: '+reason,{exact:false}).first()).toBeVisible();
  });
}
