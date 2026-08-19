# AX Website

Landing site for Asimetrix (AX), built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4.

## Requirements

- Node.js ≥ 20.9 (Next.js 16 requirement) — use Node 22 LTS; a `.nvmrc` is provided
- npm ≥ 9

## Setup

```bash
npm install
```

## Scripts

| Script          | What it does                                         |
| --------------- | ---------------------------------------------------- |
| `npm run dev`   | Start the dev server with HMR at http://localhost:3000 |
| `npm run build` | Production build                                     |
| `npm run start` | Serve the production build                           |
| `npm run lint`  | Run ESLint (`eslint-config-next`)                    |
| `npm run deploy`| Deploy to AWS (`sst deploy --stage production`)      |

If port 3000 is taken, Next will pick another free port automatically, or run `npm run dev -- -p 4000` to force one.

## Structure

```
src/
├── app/                    App Router entry
│   ├── layout.tsx          Root layout
│   ├── page.tsx            Home page
│   ├── globals.css         Global styles (Tailwind)
│   ├── insylo/             /insylo
│   ├── nodos/              /nodos
│   ├── pigvision/          /pigvision
│   └── poder-del-saber/    /poder-del-saber
└── components/             Shared and per-product components
public/images/              Static assets
```

The `@/*` path alias maps to `src/*` (see `tsconfig.json`).

## Deployment

Deploys to AWS (CloudFront + Lambda + S3) via [SST](https://sst.dev) + [OpenNext](https://open-next.js.org), region `us-east-1`.

- **Automatic**: GitHub Actions runs [.github/workflows/deploy.yml](.github/workflows/deploy.yml) on every push to `main`.
- **Stack definition**: [sst.config.ts](sst.config.ts).
- **App secrets** (`MAILCHIMP_*`): see [App secrets (Mailchimp)](#app-secrets-mailchimp) below.

### App secrets (Mailchimp)

The `POST /api/cotizar` handler ([src/app/api/cotizar/route.ts](src/app/api/cotizar/route.ts)) needs three secrets to talk to the Mailchimp Marketing API. They live in AWS SSM Parameter Store as encrypted SecureStrings — never in the repo, never in GitHub Secrets. SST fetches them at deploy time and injects them into the Lambda's environment.

| Secret | Purpose | Where to find it in Mailchimp | Required |
|---|---|---|---|
| `MAILCHIMP_API_KEY` | API key including the datacenter suffix, e.g. `abc123…-us21` | Profile → Extras → API keys → Create key | Yes |
| `MAILCHIMP_LIST_ID` | Audience ID | Audience → Settings → Audience name and defaults → "Audience ID" | Yes |
| `MAILCHIMP_TAGS` | Comma-separated static tags applied to every submission, e.g. `cotizacion,web` | Any string — no lookup needed | No (defaults to empty) |

**Set them (one time, before your first deploy):**

```bash
npx sst secret set MAILCHIMP_API_KEY 'abc123def456…-us21' --stage production
npx sst secret set MAILCHIMP_LIST_ID 'a1b2c3d4e5'         --stage production
npx sst secret set MAILCHIMP_TAGS    'cotizacion,web'     --stage production   # optional
```

Wrap the value in single quotes so your shell doesn't interpret `$`, `!`, or spaces.

**Verify what's set:**
```bash
npx sst secret list --stage production
```
(Values are masked; only names + fingerprints are shown.)

**Where they live in AWS:**

SST stores secrets in **AWS Systems Manager Parameter Store** as `SecureString` parameters (not AWS Secrets Manager — those are two different services). Region: `us-east-1` (matches [sst.config.ts](sst.config.ts)).

Path pattern: `/sst/<app>/<stage>/Secret/<NAME>/value`

For this project, the three parameter names are:

| Secret | Full SSM parameter name |
|---|---|
| `MAILCHIMP_API_KEY` | `/sst/ax-website/production/Secret/MAILCHIMP_API_KEY/value` |
| `MAILCHIMP_LIST_ID` | `/sst/ax-website/production/Secret/MAILCHIMP_LIST_ID/value` |
| `MAILCHIMP_TAGS` | `/sst/ax-website/production/Secret/MAILCHIMP_TAGS/value` |

**View them in the AWS Console:**
1. Sign in to the AWS Console → make sure region is **US East (N. Virginia) — us-east-1**.
2. Open **Systems Manager** → left sidebar → **Application Management** → **Parameter Store**.
3. Filter by name prefix `/sst/ax-website/production/Secret/`.
4. Click a parameter → **Show** to decrypt and view the value (requires `ssm:GetParameter` + KMS decrypt permissions on the default key).

**View or edit from the CLI:**
```bash
# List all secrets for this stack
aws ssm get-parameters-by-path \
  --region us-east-1 \
  --path /sst/ax-website/production/Secret/ \
  --recursive

# Read one value (decrypted)
aws ssm get-parameter \
  --region us-east-1 \
  --name /sst/ax-website/production/Secret/MAILCHIMP_API_KEY/value \
  --with-decryption \
  --query 'Parameter.Value' --output text
```

Prefer `npx sst secret set …` over editing the parameter directly in the AWS Console — it keeps SST's internal state consistent and applies the change on the next deploy.

**Rotate a value**: re-run the same `sst secret set` command with the new value, then redeploy — either `npm run deploy` locally, or GitHub → Actions → "Deploy to AWS" → **Run workflow**. The Lambda picks up the new value on next deploy.

**Notes:**
- Setting secrets uses the same AWS credentials as deploying — no extra IAM permissions required beyond what the deploy user already has.
- Secrets are stage-scoped. If a `staging` stage is added later, set its secrets separately with `--stage staging`.
- GitHub Actions **does not** need Mailchimp values in its repo secrets — it reads them from SSM via SST during deploy, using the AWS credentials it already has.

### Local AWS credentials (for manual deploys)

`sst deploy` uses the standard AWS SDK credential chain — the same one the `aws` CLI uses. If `aws sts get-caller-identity` works in your terminal, `npm run deploy` will work too.

**Required IAM permissions** for the user/role you deploy with: `PowerUserAccess` plus IAM role-management (`iam:CreateRole`, `iam:AttachRolePolicy`, `iam:PassRole`, `iam:TagRole`, and the delete/update counterparts). Ask an AWS admin for these if you don't have them.

**Step-by-step (first-time setup):**

1. **Install the AWS CLI** if you don't have it:
   ```bash
   # macOS
   brew install awscli
   # Linux
   sudo apt install awscli   # or: pipx install awscli
   # Windows
   winget install Amazon.AWSCLI
   ```

2. **Get your access keys** from an AWS admin (or from IAM → Users → *your user* → Security credentials → Create access key → "Command Line Interface").

3. **Configure a named profile** (recommended over the default profile — keeps this project isolated from other AWS accounts you may use):
   ```bash
   aws configure --profile ax-website
   # AWS Access Key ID:     AKIA…
   # AWS Secret Access Key: …
   # Default region name:   us-east-1
   # Default output format: json
   ```
   This writes to `~/.aws/credentials` and `~/.aws/config`.

4. **Verify** the credentials work:
   ```bash
   AWS_PROFILE=ax-website aws sts get-caller-identity
   # → { "Account": "…", "Arn": "arn:aws:iam::…:user/…" }
   ```

5. **Deploy:**
   ```bash
   nvm use                                     # picks up Node 22 from .nvmrc
   npm ci
   AWS_PROFILE=ax-website npm run deploy       # runs: sst deploy --stage production
   ```
   Tip: `export AWS_PROFILE=ax-website` once per shell session to skip the prefix.

**Alternative credential sources** (all supported, no config change needed):

- **Env vars**: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION` in your shell → SST picks them up automatically. Useful for one-off deploys or CI.
- **AWS SSO / IAM Identity Center**: `aws sso login --profile ax-website` (short-lived credentials, safer than static keys). Recommended if your AWS org supports it.
- **`aws-vault`**: `aws-vault exec ax-website -- npm run deploy` (stores keys in your OS keychain instead of `~/.aws/credentials`).

Do **not** commit access keys to the repo. `.env*` is gitignored, but even a local `.env` file with static keys is a leak risk — prefer `~/.aws/credentials` or SSO.

