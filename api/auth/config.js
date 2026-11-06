const has = (name) => Boolean(process.env[name] && String(process.env[name]).trim());
export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  const firebaseReady = has("FIREBASE_PROJECT_ID") && has("FIREBASE_WEB_API_KEY") && has("FIREBASE_AUTH_DOMAIN");
  const googleReady = firebaseReady && process.env.AUTH_GOOGLE_ENABLED === "true";
  const phoneReady = has("PHONE_OTP_SYRIA_ENABLED") || has("PHONE_OTP_GLOBAL_ENABLED");
  return res.status(200).json({
    app: "alhloo-chat",
    providers: {
      google: { configured: googleReady, enabled: googleReady },
      phone: {
        configured: phoneReady,
        syria: process.env.PHONE_OTP_SYRIA_ENABLED === "true",
        international: process.env.PHONE_OTP_GLOBAL_ENABLED === "true"
      }
    },
    backendReady: firebaseReady,
    note: "Readiness only. This endpoint never exposes credentials or activates an account."
  });
}