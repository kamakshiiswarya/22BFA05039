const axios=require('axios');
const ACCESS_TOKEN='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // 👈 Paste your full token
function logger(req, res, next) {
  const logData = {
    method: req.method,
    url: req.originalUrl,
    timestamp: new Date().toISOString()
  };
  axios.post(
    'http://20.244.56.144/evaluation-service/log',
    logData,
    {
      headers: {
        Authorization: ACCESS_TOKEN,
        'Content-Type': 'application/json'
      }
    }
  ).then(() => {
    console.log('✅ Log sent successfully!');
  }).catch((error) => {
    console.error('❌ Failed to send log:', error.message);
  });
  next(); 
}
module.exports = logger;
