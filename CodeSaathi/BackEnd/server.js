require('dotenv').config({ path: './BackEnd/.env' });

console.log("Loaded API key in server.js:", JSON.stringify(process.env.GOOGLE_GEMINI_KEY));

console.log("Loaded API key length in server.js:", process.env.GOOGLE_GEMINI_KEY ? process.env.GOOGLE_GEMINI_KEY.length : "undefined");
console.log("Loaded API key preview in server.js:", process.env.GOOGLE_GEMINI_KEY ? process.env.GOOGLE_GEMINI_KEY.substring(0, 4) + "..." + process.env.GOOGLE_GEMINI_KEY.slice(-4) : "undefined");

const app = require('./src/app')



app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})
