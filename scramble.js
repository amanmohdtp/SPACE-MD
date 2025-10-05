/**
 * Portable SPACE-MD game plugin header
 * - Attempts to register via: client.addCommand / client.register / client.on('message')
 * - If provided a client instance via module.exports(client), it will attach to that client.
 * - If global.client or global.conn (Baileys) exists, it will try to auto-register.
 */

const PREFIX = process.env.CMD_PREFIX || '.'; // default prefix; change via env if needed

function safeReply(messageObj, text) {
  try {
    if (!messageObj) return;
    if (typeof messageObj.reply === 'function') return messageObj.reply(text);
    if (typeof messageObj.sendMessage === 'function') return messageObj.sendMessage(text);
    if (messageObj.key && messageObj.key.remoteJid && global.conn && typeof global.conn.sendMessage === 'function') {
      return global.conn.sendMessage(messageObj.key.remoteJid, { text });
    }
  } catch (e) {
    console.error('safeReply error', e);
  }
}

function registerWithClient(client, cmd, desc, handler) {
  try {
    // Common APIs
    if (!client) return false;
    if (typeof client.addCommand === 'function') {
      client.addCommand({ pattern: cmd.replace(/^\./, ''), desc }, handler);
      return true;
    }
    if (typeof client.register === 'function') {
      client.register({ pattern: cmd.replace(/^\./, ''), desc }, handler);
      return true;
    }
    // Baileys-style: listen to messages and match prefix
    if (client.ev && typeof client.ev.on === 'function') {
      client.ev.on('messages.upsert', async (m) => {
        try {
          const messages = m.messages || (Array.isArray(m) ? m : []);
          for (const mm of messages) {
            if (!mm.message || !mm.key) continue;
            const text = (mm.message.conversation || mm.message?.extendedTextMessage?.text || '').trim();
            if (!text) continue;
            if (text.startsWith(cmd)) {
              // create a simple message object with reply/send helpers
              const msgObj = {
                key: mm.key,
                message: mm.message,
                remoteJid: mm.key.remoteJid,
                reply: async (t) => client.sendMessage(mm.key.remoteJid, { text: t }),
                sendMessage: async (t) => client.sendMessage(mm.key.remoteJid, { text: t })
              };
              await handler(msgObj, text.slice(cmd.length).trim());
            }
          }
        } catch(e){ console.error('handler messages.upsert error', e) }
      });
      return true;
    }
    return false;
  } catch (e) {
    console.error('registerWithClient error', e);
    return false;
  }
}

// autoRegister tries to attach to common globals
function autoRegister(cmd, desc, handler) {
  const candidates = [global.client, global.conn, global.bot, global.Zaid, global.Bot];
  for (const c of candidates) {
    if (registerWithClient(c, cmd, desc, handler)) return true;
  }
  return false;
}


function scrambleWord(w){ return w.split('').sort(()=>Math.random()-0.5).join(''); }
const words = ['planet','scramble','whatsapp','bot'];
const games = {};

async function handler(msg, args) {
  const chat = msg.key ? msg.key.remoteJid : (msg.remoteJid||'private');
  if (!games[chat]) { const w = words[Math.floor(Math.random()*words.length)]; games[chat]=w; return safeReply(msg,'Unscramble: ' + scrambleWord(w) + '\nAnswer with .scramble <word>'); }
  if ((args||'').trim().toLowerCase()===games[chat]) { delete games[chat]; return safeReply(msg,'Correct!'); }
  return safeReply(msg,'Wrong. Try again.');
}

if (!autoRegister('.scramble', 'Word scramble', handler)) {
  module.exports = (client) => registerWithClient(client, '.scramble', 'Word scramble', handler);
}
