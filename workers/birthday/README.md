# Rebecca birthday recordings — Worker

This Cloudflare Worker stores the recordings made at `jlzych.com/for-rebecca/` in a private R2 bucket. It also serves them to the gallery at `jlzych.com/for-rebecca/gallery/`.

## One-time setup

Run these from this directory (`workers/birthday/`):

```bash
npx wrangler login
npx wrangler r2 bucket create rebecca-birthday
npx wrangler secret put UPLOAD_TOKEN   # a random string, used in the invite link as ?k=
npx wrangler secret put ADMIN_TOKEN    # a different random string, used in the gallery link as #
npx wrangler deploy
```

To generate a random token, run `openssl rand -hex 16`.

`wrangler deploy` prints a URL like `https://rebecca-birthday.<you>.workers.dev`. Paste it into `WORKER_URL` in `source/javascripts/for-rebecca/config.js`, then build and deploy the site.

## Links

- **Friends:** `https://jlzych.com/for-rebecca/?k=<UPLOAD_TOKEN>`
- **Gallery (for Rebecca):** `https://jlzych.com/for-rebecca/gallery/#<ADMIN_TOKEN>`

## Local development

Create a `.dev.vars` file in this directory. It is gitignored.

```
UPLOAD_TOKEN=dev-upload
ADMIN_TOKEN=dev-admin
```

Then run `npx wrangler dev`. This serves the Worker on http://localhost:8787 with a simulated local R2 bucket. When the site runs on `localhost`, `config.js` points at this URL automatically.

Locally, the Worker only knows the keys in `.dev.vars`, not the secrets you set with `wrangler secret put`. So test with `http://localhost:4567/for-rebecca/?k=dev-upload` and `http://localhost:4567/for-rebecca/gallery/#dev-admin`.

## Handy commands

```bash
# See what's been uploaded
curl -H "Authorization: Bearer $ADMIN_TOKEN" https://rebecca-birthday.<you>.workers.dev/list

# Delete a test recording
curl -X DELETE -H "Authorization: Bearer $ADMIN_TOKEN" \
  https://rebecca-birthday.<you>.workers.dev/file/recordings/<session>/<met|memory>.<ext>
```

## Limits

The Cloudflare free tier allows 10GB of R2 storage and 100k Worker requests per day. At about 15MB per minute of video, 10GB holds more than 10 hours of recordings.
