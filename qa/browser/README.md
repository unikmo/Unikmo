# UNIKMO QA release gate

Public browser checks use a read-only production target by default. Set QA_BASE_URL to a verified preview to test a candidate before release. The contact and upload UI tests intercept API responses; they do not verify provider delivery or real database state.

Visual candidate screenshots are retained as CI artifacts. Review each against intended design before committing it under baselines/<projectName>/<route>.png. Set repository variable VISUAL_BASELINES_APPROVED=1 only after all references exist. Never regenerate baselines to make a failure disappear.

Lighthouse tests five representative routes with a score target of 90 for each applicable category.

Commerce integration release requirements (not satisfied by UI mocks): confirm the actual production Git revision and Stripe checkout implementation; use an isolated deployment with Stripe test-mode keys, separate database and storage, and a mail sink. Test successful and declined payment, duplicate webhook idempotency, correct key quantities, invalid/revoked/claimed keys, upload and replacement for each media type, size and type rejection, recipient delivery, and unauthorized access. Never use production credentials, real keys or customer email addresses. Keep sandbox evidence separate from live smoke tests.
