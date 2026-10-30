import type { DeliveryType } from './code-generator';

type BuildArgs = {
  codes: string[];
  orderId: string;
  baseUrl?: string;
  deliveryType?: DeliveryType;
};

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

/** Minimal transactional email: the key and its direct creation link. */
export function buildMomentCodesEmailHtml({ codes, orderId, baseUrl, deliveryType }: BuildArgs): { html: string } {
  const origin = (baseUrl || 'https://unikmo.com').replace(/\/$/, '');
  const linkFor = (code: string) => escapeHtml(`${origin}/upload?code=${encodeURIComponent(code)}`);
  const single = codes.length === 1;
  const title = single ? 'Your Moment Key is ready.' : 'Your Moment Keys are ready.';
  const introduction = single
    ? 'Create a memory, then share your key with someone special.'
    : 'Create a memory for each key, then share it with someone special.';
  const keys = single
    ? `<div style="margin:28px 0 24px;padding:22px 16px;background:#f8f5f0;text-align:center;font:600 24px 'Courier New',monospace;letter-spacing:2px;color:#22323a">${escapeHtml(codes[0])}</div>
       <table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center"><a href="${linkFor(codes[0])}" style="display:inline-block;padding:15px 26px;background:#22323a;border-radius:4px;color:#ffffff;font:600 14px Arial,sans-serif;text-decoration:none">Create your moment</a></td></tr></table>`
    : `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:24px 0 0;border-collapse:collapse">${codes.map(code => `<tr><td style="padding:18px 0;border-bottom:1px solid #e8e1d7;font:600 18px 'Courier New',monospace;letter-spacing:1px;color:#22323a">${escapeHtml(code)}</td><td style="padding:18px 0;border-bottom:1px solid #e8e1d7;text-align:right"><a href="${linkFor(code)}" style="font:14px Arial,sans-serif;color:#22323a;text-decoration:underline">Create moment</a></td></tr>`).join('')}</table>`;
  const delivery = deliveryType === 'physical' || deliveryType === 'split'
    ? '<p style="margin:26px 0 0;font:13px/1.7 Arial,sans-serif;color:#77716b;text-align:center">Your key is ready to use. Your physical card will be delivered separately.</p>'
    : '';
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:40px 16px;background:#ffffff;color:#22323a;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:480px;margin:0 auto">
<tr><td style="padding:0 16px 34px;text-align:center;font:normal 24px Georgia,serif;letter-spacing:1px">UNIKMO</td></tr>
<tr><td style="padding:0 16px">
<h1 style="margin:0 0 14px;font:normal 29px/1.3 Georgia,serif;text-align:center">${title}</h1>
<p style="margin:0;font:14px/1.8 Arial,sans-serif;color:#686762;text-align:center">${introduction}</p>
${keys}${delivery}
<p style="margin:38px 0 0;padding-top:20px;border-top:1px solid #eee9e2;font:11px Arial,sans-serif;color:#938a7e;text-align:center">Order ${escapeHtml(orderId.slice(-8).toUpperCase())}</p>
</td></tr></table></body></html>`;
  return { html };
}
