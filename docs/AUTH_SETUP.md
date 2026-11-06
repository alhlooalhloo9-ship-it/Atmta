# Authentication setup — الحلو شات

## Safety and project isolation
- Create a **new Firebase project exclusively for الحلو شات**. Do not reuse `alhlooapp`, `alhloo-store`, or any Firebase project used by another app.
- Keep Firebase on the no-cost Spark plan initially. Do not enable billing or buy SMS credit without explicit approval.
- Never commit OAuth secrets, Firebase service-account JSON, or SMS tokens to Git.

## Sign-in methods
1. Google OAuth through Firebase Authentication.
2. Facebook OAuth through Firebase Authentication.
3. Phone OTP through a provider adapter. Route `+963` to a Syria-capable provider; route other E.164 numbers to an international provider. Keep the providers replaceable.

Google and Facebook provider setup:
- Register the web app in the dedicated Firebase project.
- Enable Google in Authentication > Sign-in method.
- Create a Facebook Login app, enable Facebook in Firebase, and configure the Firebase OAuth handler URL in the Facebook app.
- Add `alhloo-chat.vercel.app` and the Firebase auth domain to authorized domains.
- Configure only public Firebase web settings as environment variables; keep Facebook App Secret and Firebase Admin service-account credentials server-side.

## Phone OTP: important billing and Syria constraints
Firebase's current pricing documentation marks phone authentication SMS as unavailable on Spark and billed per SMS on Blaze. Therefore Firebase phone OTP must not be switched on for this no-card setup.
Use a dedicated SMS adapter instead:
- Syria (+963): a provider that confirms real delivery to Syrian mobile networks. Do not assume Twilio or Vonage works for Syria.
- International: a separate global SMS provider.
- Do not mark a phone verified until the provider confirms the OTP and the server validates it.
- Do not launch public registration until a real +963 test succeeds. Verify Syriatel, MTN and any other intended network separately.
- Never store OTPs in browser storage or plaintext logs. Store only a short-lived hash server-side, rate-limit requests, and make codes single-use.

## Vercel environment variable names
Public Firebase web config:
- `FIREBASE_PROJECT_ID`
- `FIREBASE_WEB_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `AUTH_GOOGLE_ENABLED=true` only after Google provider configuration is completed.
- `AUTH_FACEBOOK_ENABLED=true` only after Facebook provider configuration is completed.
- `FACEBOOK_APP_ID` (public app ID only; App Secret stays server-side).

Phone routing flags:
- `PHONE_OTP_SYRIA_ENABLED=true` only after a successful live +963 test.
- `PHONE_OTP_GLOBAL_ENABLED=true` only after international delivery tests.
- Provider credentials must be separate server-only variables and must never use a `NEXT_PUBLIC_` or browser-exposed prefix.

The current project has no configured environment variables. Do not set readiness flags until each provider is configured and tested.

## Current implementation state
`/api/auth/config` reports readiness flags only and never returns secrets. It does not authenticate users. Real sign-in, token verification, persistent profiles, unique usernames, contact discovery, and messaging still require the dedicated Firebase project, server-side verification, database rules, and provider credentials.
