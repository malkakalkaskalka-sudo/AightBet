const {onRequest} = require("firebase-functions/v2/https");
const {defineSecret} = require("firebase-functions/params");
const admin = require("firebase-admin");
const {getAuth} = require("firebase-admin/auth");
const bcrypt = require("bcryptjs");

admin.initializeApp();

const YOUR_UID = "ylzOEIC4a8VBLGcEjKdFjpgIQxe2";
const HER_UID = "CqSiAnYyK0U85r7xHFzotiGw1gw2";

const YOUR_PASSWORD_HASH = defineSecret("YOUR_PASSWORD_HASH");
const HER_PASSWORD_HASH = defineSecret("HER_PASSWORD_HASH");

exports.authenticate = onRequest(
    {
      region: "europe-west1",
      cors: true,
      invoker: "public",
      secrets: [
        YOUR_PASSWORD_HASH,
        HER_PASSWORD_HASH,
      ],
    },
    async (req, res) => {
      if (req.method !== "POST") {
        return res.status(405).json({
          error: "Method not allowed",
        });
      }

      const body = req.body || {};

      const password = typeof body.password === "string" ?
        body.password :
        "";

      if (!password || password.length > 200) {
        return res.status(401).json({
          error: "Invalid credentials",
        });
      }

      try {
        // Check your password first.
        const yourPasswordCorrect = await bcrypt.compare(
            password,
            YOUR_PASSWORD_HASH.value(),
        );

        let uid = null;

        if (yourPasswordCorrect) {
          uid = YOUR_UID;
        } else {
          // If it isn't yours, check her password.
          const herPasswordCorrect = await bcrypt.compare(
              password,
              HER_PASSWORD_HASH.value(),
          );

          if (herPasswordCorrect) {
            uid = HER_UID;
          }
        }

        // Neither password matched.
        if (!uid) {
          return res.status(401).json({
            error: "Invalid credentials",
          });
        }

        // Create a custom token for the matching existing Firebase user.
        const auth = getAuth();
        const token = await auth.createCustomToken(uid);

        return res.status(200).json({
          token: token,
        });
      } catch (error) {
        console.error("Authentication error:", error);

        return res.status(500).json({
          error: "Authentication unavailable",
        });
      }
    },
);