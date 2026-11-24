import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { existsSync } from 'node:fs';

const routes = ['/', '/contact', '/how-unikmo-works', '/curated', '/hotels', '/faq', '/privacy', '/cookies', '/terms', '/imprint', '/thoughtful-gifts', '/sentimental-gifts', '/personalized-birthday-gifts', '/personalized-anniversary-gifts', '/long-distance-gifts', '/personalized-video-message', '/qr-code-gift', '/unlock'];
for (const route of routes) {
  test('public layout ' + route, async ({ page }, info) => {
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);
    await expect(page.locator('body')).toBeVisible();
    await page.evaluate(async () => {
      await document.fonts.ready;
      document.querySelectorAll('video').forEach(v => v.pause());
      for (const img of document.images) img.loading = 'eager';
    });
    await page.evaluate(async () => {
      await Promise.race([Promise.all(Array.from(document.images).map(img => img.decode().catch(() => {}))), new Promise(resolve => setTimeout(resolve, 10000))]);
    });
    const findings = await page.evaluate(() => {
      const failures: string[] = [];
      const width = document.documentElement.clientWidth;
      if (document.documentElement.scrollWidth > width + 2) failures.push('Horizontal page overflow');
      const images = Array.from(document.images).filter(i => i.getClientRects().length && i.complete && !i.naturalWidth);
      for (const img of images) failures.push('Broken image: ' + img.getAttribute('src'));
      const sections = Array.from(document.querySelectorAll<HTMLElement>('main > section')).filter(e => e.getClientRects().length);
      // Major content sections use 56–80px per side in the current design.
      // Compact footer/utility strips and the first hero are intentionally exempt.
      const major = sections.slice(1).filter(e => e.querySelector('h2') && e.getBoundingClientRect().height > 160);
      const expected = width >= 1024 ? 80 : 64;
      for (const el of major) {
        const css = getComputedStyle(el);
        for (const side of ['paddingTop','paddingBottom'] as const) {
          const value = parseFloat(css[side]);
          if (Math.abs(value - expected) > 12) failures.push('Section ' + (el.id || el.querySelector('h2')?.textContent?.slice(0,60)) + ': ' + side + ' ' + value + 'px; expected ' + expected + ' ±12px');
        }
      }
      for (let i=1; i<major.length; i++) {
        const a=major[i-1], b=major[i];
        if (a.nextElementSibling !== b) continue;
        const gap=b.getBoundingClientRect().top-a.getBoundingClientRect().bottom+parseFloat(getComputedStyle(a).paddingBottom)+parseFloat(getComputedStyle(b).paddingTop);
        if (gap > expected*2+24) failures.push('Excessive combined section gap: ' + Math.round(gap) + 'px');
      }
      return failures;
    });
    const name = (route === '/' ? 'home' : route.slice(1)) + '.png';
    const options = { fullPage:true, animations:'disabled' as const, caret:'hide' as const, mask:[page.locator('video')], maxDiffPixelRatio:0.005 };
    if (process.env.VISUAL_BASELINES_APPROVED !== '1') {
      const path = info.outputPath(name);
      await page.screenshot({...options,path});
      await info.attach('baseline-candidate',{path,contentType:'image/png'});
    } else {
      expect(existsSync(info.snapshotPath(name)), 'Missing reviewed screenshot').toBe(true);
      await expect(page).toHaveScreenshot(name,options);
    }
    const axe = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
    const severe = axe.violations.filter(v => v.impact === 'serious' || v.impact === 'critical');
    await info.attach('accessibility',{body:JSON.stringify(axe.violations,null,2),contentType:'application/json'});
    expect([...errors,...findings,...severe.flatMap(v=>v.nodes.map(n=>v.id+': '+n.target.join(' ')+' — '+(n.failureSummary||v.help)))].join('\n')).toBe('');
  });
}
