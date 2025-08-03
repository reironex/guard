const axios = require("axios");

module.exports = async function activateGuard(appstate) {
  const cookies = appstate.map(c => `${c.key}=${c.value}`).join("; ");
  const c_user = appstate.find(c => c.key === "c_user")?.value;
  const xs = appstate.find(c => c.key === "xs")?.value;

  if (!c_user || !xs) throw new Error("Missing required cookies: c_user or xs");

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": "Mozilla/5.0 (Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
    "Cookie": cookies
  };

  const data = new URLSearchParams({
    variables: JSON.stringify({
      is_shielded: true,
      session_id: "1234567890", // random session id
      actor_id: c_user,
      client_mutation_id: Math.floor(Math.random() * 1e10).toString()
    }),
    doc_id: "1477043292367183" // ito ang doc_id ng Profile Guard mutation
  });

  const response = await axios.post("https://www.facebook.com/api/graphql/", data, { headers });

  if (response.data?.errors) {
    throw new Error("FB Error: " + response.data.errors[0]?.message);
  }

  return "Profile Guard successfully activate
    d!";
};
