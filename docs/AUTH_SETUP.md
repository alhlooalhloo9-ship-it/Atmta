# Authentication setup — الحلو شات

## Safety and project isolation
- Use Firebase project `Alhloo1100` exclusively for الحلو شات.
- Keep Firebase on the no-cost Spark plan. Do not enable billing or buy SMS credit without explicit approval.
- Never commit Firebase service-account JSON or SMS tokens to Git.

## Sign-in methods
1. Google OAuth through Firebase Authentication (the only social sign-in provider currently planned).
2. Phone OTP remains disabled until a genuinely free and tested SMS route is available for Syria and international numbers.

## Google provider setup
- Enable Google in Firebase Authentication > Sign-in method.
- Add `alhloo-chat.vercel.app` and the Firebase auth domain to authorized domains.
- Configure only public Firebase web settings as environment variables. Never expose service-account credentials.

## Phone OTP: cost and Syria constraints
Firebase phone authentication SMS must not be enabled for this no-card setup because SMS can incur charges and requires an eligible billing plan.
Do not launch phone verification until a genuinely free provider confirms delivery to intended Syrian and international networks. Never claim a phone number is verified without server-side OTP validation.

## Vercel environment variables
- `FIREBASE_PROJECT_ID`
- `FIREBASE_WEB_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_APP_ID`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_STORAGE_BUCKET`
- `AUTH_GOOGLE_ENABLED=true` only after the Google provider and app integration are completed and tested.

## Current implementation state
The current UI is a preview. Firebase project settings alone do not implement Google sign-in. Real sign-in, token verification, persistent profiles, unique usernames, contact discovery, and messaging still require application integration and tests.
