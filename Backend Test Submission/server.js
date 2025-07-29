const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const shortid=require('shortid'); 
const log=require('../Logging Middleware/logger'); 
const app=express();
const PORT=5000;
app.use(cors());
app.use(bodyParser.json());
const urlStorage=new Map();
app.post('/shorturls', (req, res) => {
    const { url,validity=30,shortcode } = req.body;
    if (!url || typeof url !== 'string') {
        log('backend','error','input-validation','URL is missing or not a string');
        return res.status(400).json({ error: 'A valid URL is required.' });
    }
    const finalCode=shortcode||shortid.generate();
    if (urlStorage.has(finalCode)) {
        log('backend', 'warn', 'duplicate', `Shortcode "${finalCode}" is already taken`);
        return res.status(409).json({ error: 'Shortcode already exists. Please choose another.' });
    }
    const expiryTime=new Date(Date.now() + validity * 60 * 1000); // validity in minutes
    urlStorage.set(finalCode, {
        originalUrl:url,
        createdAt:new Date(),
        expiry:expiryTime,
        clicks: []
    });
    const finalShortLink=`http://localhost:${PORT}/${finalCode}`;
    log('backend', 'info', 'shorten', `Short URL created: ${finalShortLink}`);
    return res.status(201).json({
        shortLink: finalShortLink,
        expiry: expiryTime.toISOString()
    });
});
app.listen(PORT,() => {
    console.log(`Server is live on http://localhost:${PORT}`);
    log('backend', 'info', 'startup', 'Express server is up and running');
});
