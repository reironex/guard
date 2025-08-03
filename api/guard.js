const login = require("facebook-chat-api");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed." });
  }

  const { appState } = req.body;

  if (!appState) {
    return res.status(400).json({ message: "Walang AppState na nareceive." });
  }

  try {
    login({ appState }, (err, api) => {
      if (err) {
        return res.status(401).json({ message: "Login failed.", error: err });
      }

      api.setOptions({ listenEvents: true });

      // Optional: Update Bio as proof of access
      api.changeBio("Guard On activated via Web", (bioErr) => {});

      // Optional: Change avatar as test (pwede mong tanggalin)
      api.changeAvatarProfileCoverPhoto("https://i.imgur.com/qP82X6j.jpg", (err) => {
        if (err) {
          return res.status(500).json({ message: "Failed to activate guard.", error: err });
        }
        return res.json({ message: "✅ Profile Guard Activated Successfully!" });
      });
    });
  } catch (e) {
    return res.status(500).json({ message: "Server error", error: e });
  }
}
