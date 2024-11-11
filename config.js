const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    SESSION_ID: process.env.SESSION_ID || '', // Enter Your Session ID
    MONGODB: process.env.MONGODB || '94743660613',// Enter Your MongoDB URL
    Owner: process.env.OwnerNumber || '94743660613',    // Enter Your Owner Number
};
