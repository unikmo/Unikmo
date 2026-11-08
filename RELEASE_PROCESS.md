# Release procedure (UNIKMO)

1. Work on a feature branch and open a PR to `main`.
2. Require the GitHub Actions **Quality gate / verify** check to pass. Do not bypass a failing or missing check.
3. Obtain independent QA approval for authentication, retail sale activation, duplicate scan, unsold legacy-key revocation, and Stripe checkout.
4. Reconcile any divergence from `main` and rerun the full gate on the resulting head commit.
5. Merge only after QA approval. Merging is **not** production deployment authorization.
6. Deploy production only after a separately recorded explicit authorization and a successful preview/staging smoke test.

## Repository settings to apply by an authorized administrator
- GitHub Settings > Branches / Rulesets > protect `main`.
- Require pull requests, at least one independent approval, and the `verify` status check from **Quality gate**.
- Require branches to be up to date before merging; disallow force pushes and bypasses.
- Configure Vercel to prevent automatic production deployment from `main` until explicit release approval; retain preview builds where quota permits.
- Ensure CI does not receive production database, payment, or email secrets.

## Verification
Run `npm ci && npm run qa:offline && npx tsc --noEmit && npm audit --omit=dev --audit-level=high && npm run build`.
This is static/offline QA, **not** a database-backed end-to-end test. Run integration and browser tests against a nonproduction database before release.
