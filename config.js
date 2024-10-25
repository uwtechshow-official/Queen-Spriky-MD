const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    SESSION_ID: process.env.SESSION_ID || '7iJWlJQQ#LjnjSKFlJmudP7MLUm-HTTM6qHf3tP7ShEDkGhxc6yE', // Enter Your Session ID
    MONGODB: process.env.MONGODB || 'mongodb+srv://mdprabath518:1234@cluster0.swetgsg.mongodb.net/',// Enter Your MongoDB URL
    Owner: process.env.OwnerNumber || '94758900210',    // Enter Your Owner Number
};
