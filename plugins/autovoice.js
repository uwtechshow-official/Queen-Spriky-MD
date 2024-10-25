const fs = require('fs');
const path = require('path');
const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')

//auto_voice
cmd({
  on: "body"
},    
async (conn, mek, m, { from, body, isOwner }) => {
    const filePath = path.join(__dirname, '../database/autovoice.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    for (const text in data) {
        if (body.toLowerCase() === text.toLowerCase()) {
            const config = await readEnv();
            if (config.AUTO_VOICE === 'true') {     
                await conn.sendPresenceUpdate('recording', from);
                await conn.sendMessage(from, { audio: { url: data[text] }, mimetype: 'audio/mpeg', ptt: true }, { quoted: mek });
            }
        }
    }                
});