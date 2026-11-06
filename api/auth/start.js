export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });
  const { provider } = req.body || {};
  if (!["google", "phone"].includes(provider)) {
    return res.status(400).json({ error: "unsupported_provider" });
  }
  return res.status(503).json({
    error: "authentication_not_configured",
    provider,
    message: "تسجيل الدخول الحقيقي غير مفعّل بعد. لم يتم إنشاء حساب أو قبول بيانات غير متحققة."
  });
}