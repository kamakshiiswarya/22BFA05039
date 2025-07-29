const axios=require('axios');
const logger=async(req,res,next)=>{
  const logData={
    method:req.method,
    url:req.originalUrl,
    timestamp:new Date().toISOString()
  };
  try{
    await axios.post(
      'http://20.244.56.144/evaluation-service/log',
      logData,
      {
        headers: {
          Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJpc3dhcnlha2FtYWtzaGlAZ21haWwuY29tIiwiZXhwIjoxNzUzNzcwNjc4LCJpYXQiOjE3NTM3Njk3NzgsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJiMjlhMDA3YS1jMmE4LTRhYjYtYmUzNy1lNjA2NTliZjQzYWIiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJjaGlsbGFrdXJ1IGthbWFrc2hpIGlzd2FyeWEiLCJzdWIiOiI0YjYwNzhhOS05OGY1LTQ1ZGUtOGU5ZS1hY2U5ZGVlYzc5NzMifSwiZW1haWwiOiJpc3dhcnlha2FtYWtzaGlAZ21haWwuY29tIiwibmFtZSI6ImNoaWxsYWt1cnUga2FtYWtzaGkgaXN3YXJ5YSIsInJvbGxObyI6IjIyYmZhMDUwMzkiLCJhY2Nlc3NDb2RlIjoiUHJqeVFGIiwiY2xpZW50SUQiOiI0YjYwNzhhOS05OGY1LTQ1ZGUtOGU5ZS1hY2U5ZGVlYzc5NzMiLCJjbGllbnRTZWNyZXQiOiJhZXlqSndKd2FKdEJVRlJ3In0.t6tAABDRuNetZoi69b6EKQgvfEd-u16azsrKYVybH8g'
        }
      }
    );
    console.log('✅ Log sent successfully!');
  }catch (error){
    console.error('❌ Failed to send log:',error.message);
  }
  next(); 
};
module.exports = logger;
