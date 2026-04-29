/**
 * Verify a Turnstile token server-side by calling Cloudflare's siteverify API.
 * Returns true if the token is valid, false otherwise.
 *
 * Fail-closed: if the API call errors or the token is missing, this returns false.
 * Healthcare context — better to reject a real submission occasionally than to
 * skip captcha entirely during a Cloudflare outage.
 */
export async function verifyTurnstileToken(
  token: string | null | undefined,
  remoteIp?: string
): Promise<boolean> {
  if (!token) return false;

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("[turnstile] TURNSTILE_SECRET_KEY missing — failing closed");
    return false;
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secret);
    formData.append("response", token);
    if (remoteIp) formData.append("remoteip", remoteIp);

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    if (!response.ok) {
      console.error("[turnstile] siteverify HTTP error:", response.status);
      return false;
    }

    const data = (await response.json()) as {
      success: boolean;
      "error-codes"?: string[];
    };

    if (!data.success) {
      console.warn("[turnstile] verification failed:", data["error-codes"]);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[turnstile] siteverify request failed:", err);
    return false;
  }
}
