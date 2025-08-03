const axios = require("axios");

module.exports = async function activateGuard(appstateRaw) {
  try {
    let cookies = [];

    // Support both raw string and JSON array
    if (typeof appstateRaw === "string") {
      try {
        cookies = JSON.parse(appstateRaw);
      } catch {
        // Try parsing cookie string like "c_user=123; xs=abc"
        cookies = appstateRaw.split(";").map(part => {
          const [key, val] = part.trim().split("=");
          return { key, value: val, domain: ".facebook.com" };
        });
      }
    } else if (Array.isArray(appstateRaw)) {
      cookies = appstateRaw;
    }

    const c_user = cookies.find(c => c.key === "c_user")?.value;
    const xs = cookies.find(c => c.key === "xs")?.value;
    if (!c_user || !xs) throw new Error("Missing required cookies");

    const jar = cookies.map(c => `${c.key}=${c.value}`).join("; ");
    const headers = {
      cookie: jar,
      "user-agent":
        "Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
    };

    const res = await axios.post(
      `https://graph.facebook.com/v17.0/me/profile_guard`,
      `enable=true`,
      { headers }
    );

    return {
      success: true,
      message: "Profile Guard activated!",
      data: res.data,
    };
  } catch (e) {
    return {
      success: false,
      message: e.message || "Unknown error.",
    };
  }
};
