const login = require("facebook-chat-api");

module.exports.enableGuard = function(appstate) {
  return new Promise((resolve, reject) => {
    login({ appState: appstate }, (err, api) => {
      if (err) return reject(err);

      const form = {
        variables: JSON.stringify({
          is_shielded: true,
          session_id: "1"
        }),
        doc_id: "1477043292367183"
      };

      api.httpPost(
        "https://www.facebook.com/api/graphql/",
        form,
        (err, res) => {
          if (err) return reject("Guard activation failed.");
          resolve("✅ Profile Guard Activated Successfully!");
        }
      );
    });
  });
  
};
