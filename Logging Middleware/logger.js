// logger.js
const axios = require("axios");

// Your latest access token from Auth API
// This token has an 'exp' (expiration) of 1753772713,
// which is Tuesday, July 29, 2025 1:05:13 PM GMT+05:30.
// If it expires during your work, you will need to get a new one.
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJpc3dhcnlha2FtYWtzaGlAZ21haWwuY29tIiwiZXhwIjoxNzUzNzcyNzEzLCJpYXQiOjE3NTM3NzE4MTMsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJlZDMzNTNjYS0xODlmLTRjZTMtYTdmYy05NzFhYjlhMjA3ZGYiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJjaGlsbGFrdXJ1IGthbWFrc2hpIGlzd2FyeWEiLCJzdWIiOiI0YjYwNzhhOWMtOThmNS00NWRlLThlOWUtYWNlOWRlZWM3OTczIn0sImVtYWlsIjoiaXN3YXJ5YWthbWFrc2hpQGdtYWlsLmNvbSIsIm5hbWUiOiJjaGlsbGFrdXJ1IGthbWFrc2hpIGlzd2FyeWEiLCJyb2xsTm8iOiIyMmJmYTA1MDM5IiwiYWNjZXNzQ29kZSI6IlByalllUUYiLCJjbGllbnRJRCI6IjRiNjA3OGE5LTk4ZjUtNDVkZS04ZTllLWFjZTlkZWVjNzk3MyIsImNsaWVudFNlY3JldCI6ImFleWpKd0p3YUp0QlVGUndIn0.AtoO8RiNZZtXixuqqrlDrcgucXeLu1Q5ZQtmLSNE9uw';

// Custom logging function for both frontend and backend as per instructions
function logData(stack, level, packageName, message) {
  const logDetails = {
    stack: stack,             // "backend" or "frontend"
    level: level,             // "debug", "info", "warn", "error", "fatal"
    package: packageName,     // e.g., "handler", "db", "component", "hook", "api"
    message: message,         // Descriptive log message
  };

  axios
    .post("http://20.244.56.144/evaluation-service/logs", logDetails, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
    })
    .then(() => {
      console.log(`✅ [Log Sent] Stack: ${stack}, Level: ${level}, Package: ${packageName}: ${message}`);
    })
    .catch((err) => {
      console.error(
        "❌ Failed to send log to central service:",
        err.response ? err.response.data : err.message
      );
    });
}
module.exports = logData;