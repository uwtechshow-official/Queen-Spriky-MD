const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    SESSION_ID: process.env.SESSION_ID || 'rqBx2SYa#qJrXTZnv09CzTnAsdyLneVR6aG54OxAa5yucrOLipGE', // Enter Your Session ID
    MONGODB: process.env.MONGODB || '',// Enter Your MongoDB URL
    OWNER_NUMBER: process.env.OWNER_NUMBER || '923091619697',    // Enter Your Owner Number
};
