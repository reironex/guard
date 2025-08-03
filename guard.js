const axios = require("axios");

module.exports = async function (appstate) {
  const cookies = appstate.map(c => `${c.key}=${c.value}`).join("; ");
  const c_user = appstate.find(c => c.key === "c_user")?.value;
  const xs = appstate.find(c => c.key === "xs")?.value;
  if (!c_user || !xs) throw new Error("Missing required cookies: c_user or xs");

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": "Mozilla/5.0",
    "Cookie": cookies
  };

  const res = await axios.post("https://graph.facebook.com/v17.0/me/profile_guard", "enable=true", { headers });

  if (res.data && res.data.success) {
    return "Profile Guard Activated!";
  } else {
    throw new Error("Failed to activate guard");
  }
};
