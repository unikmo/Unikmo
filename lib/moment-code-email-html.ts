/**
 * Compact transactional Moment Keys email.
 * Rendered with email-safe tables and inline styles for Outlook and mobile clients.
 * No external QR service or absolute-position overlays are required.
 */
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

export function buildMomentCodesEmailHtml({ codes, orderId, baseUrl, deliveryType }: BuildArgs): { html: string } {
  const origin = (baseUrl || 'https://unikmo.com').replace(/\/$/, '');
  const uploadUrl = `${origin}/upload`;
  const safeOrder = escapeHtml(orderId);
  const count = codes.length;
  const rows = codes.map((code, index) => {
    const safeCode = escapeHtml(code);
    const personalizedUrl = `${uploadUrl}?code=${encodeURIComponent(code)}`;
    return `<tr><td style="padding:14px 16px;border-bottom:1px solid #e8e1d7;font:12px Arial,sans-serif;color:#857969;vertical-align:middle"> ${String(index + 1).padStart(2, '0')} </td>
      <td style="padding:14px 8px;border-bottom:1px solid #e8e1d7;font:600 14px 'Courier New',monospace;letter-spacing:.4px;color:#23313a;word-break:break-word">${safeCode}</td>
      <td style="padding:14px 14px;border-bottom:1px solid #e8e1d7;text-align:right"><a href="${escapeHtml(personalizedUrl)}" style="font:12px Arial,sans-serif;color:#23313a;text-decoration:underline">Personalize</a></td></tr>`;
  }).join('');
  const fulfillment = deliveryType === 'physical' || deliveryType === 'split'
    ? 'Your Moment Keys are available now. Any physical cards included in your order will be handled separately.'
    : 'Your Moment Keys are available now for digital gifting.';
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:24px 12px;background:#f3eee7;color:#23313a;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:580px;margin:0 auto;background:#fffdf9;border:1px solid #e7dfd5;border-radius:12px">
<tr><td style="padding:32px 28px 22px;text-align:center;border-bottom:1px solid #e8e1d7">
<div style="font:normal 30px Georgia,serif;letter-spacing:2px">UNIKMO</div><div style="font:10px Arial,sans-serif;letter-spacing:2.4px;color:#927b60;margin-top:9px">A MOMENT WORTH KEEPING</div></td></tr>
<tr><td style="padding:28px 28px 12px">
<h1 style="font:normal 27px Georgia,serif;line-height:1.25;margin:0 0 12px">Your moments begin here.</h1>
<p style="font:14px/1.7 Arial,sans-serif;color:#555b5b;margin:0 0 18px">Your ${count} unique Moment Key${count === 1 ? ' is' : 's are'} ready. Personalize each moment, then share its key with someone special.</p>
<p style="font:11px Arial,sans-serif;color:#897e70;margin:0 0 18px">ORDER #${safeOrder}</p>
<img src="${origin}/card-back.png" alt="UNIKMO keepsake card design" width="520" style="display:block;width:100%;max-width:520px;height:auto;border:0;border-radius:8px">
<p style="font:11px Arial,sans-serif;letter-spacing:1.7px;color:#927b60;margin:25px 0 8px">YOUR MOMENT KEYS</p>
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-top:1px solid #e8e1d7">${rows}</table>
<p style="font:12px/1.7 Arial,sans-serif;color:#726a61;margin:16px 0 22px">Tip: Print this list and cross out each key after gifting it to keep track of your moments.</p>
<table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" style="padding:4px 0 22px"><a href="${uploadUrl}" style="display:inline-block;background:#23313a;color:#ffffff;text-decoration:none;padding:15px 24px;border-radius:5px;font:600 12px Arial,sans-serif;letter-spacing:1px">PERSONALIZE YOUR MOMENTS</a></td></tr></table>
<p style="font:13px/1.7 Arial,sans-serif;color:#555b5b;margin:0 0 10px"><strong>Create.</strong> Add your photos, videos or message using the Personalize link next to the chosen key.<br><strong>Share.</strong> Give the recipient that key to unlock their moment at <a href="${origin}/unlock" style="color:#23313a">unikmo.com/unlock</a>.<br><strong>Remember.</strong> Keep any unused keys private.</p>
<p style="font:12px/1.7 Arial,sans-serif;color:#77716b;margin:16px 0 0">${fulfillment}</p>
</td></tr><tr><td style="padding:22px 28px 28px;text-align:center;border-top:1px solid #e8e1d7;font:12px/1.7 Arial,sans-serif;color:#81766a">Made for meaningful moments.<br>UNIKMO · <a href="${origin}" style="color:#23313a">unikmo.com</a></td></tr></table></body></html>`;
  return { html };
}
