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


// Simple one-player vs bot tic-tac-toe using text board and moves like 1-9
const boards = {}; // chatId -> board state

function renderBoard(b) {
  return `\n${b.slice(0,3).join(' ')}\n${b.slice(3,6).join(' ')}\n${b.slice(6,9).join(' ')}\n`;
}

function checkWin(b, p) {
  const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  return wins.some(ws => ws.every(i=>b[i]===p));
}

async function handler(msg, args) {
  const chat = msg.key ? msg.key.remoteJid : (msg.remoteJid||'private');
  if (!boards[chat]) boards[chat] = Array.from({length:9}, (_,i)=>(i+1).toString());
  const arg = (args||'').trim();
  if (!arg) return safeReply(msg, 'Usage: .tictactoe <1-9> to make a move, or .tictactoe reset');
  if (arg==='reset') { delete boards[chat]; return safeReply(msg,'Board reset.'); }
  const move = parseInt(arg);
  if (isNaN(move) || move<1 || move>9) return safeReply(msg,'Invalid move. Choose 1-9.');
  const b = boards[chat];
  if (b[move-1] === 'X' || b[move-1] === 'O') return safeReply(msg,'Cell already taken.');
  b[move-1] = 'X'; // player
  if (checkWin(b, 'X')) { safeReply(msg, 'You win!' + renderBoard(b)); delete boards[chat]; return; }
  // bot move: choose random empty
  const empties = b.map((v,i)=> (v!=='X' && v!=='O')?i:null).filter(v=>v!==null);
  if (empties.length===0) { safeReply(msg, 'Draw!' + renderBoard(b)); delete boards[chat]; return; }
  const botIdx = empties[Math.floor(Math.random()*empties.length)];
  b[botIdx] = 'O';
  if (checkWin(b,'O')) { safeReply(msg, 'Bot wins!' + renderBoard(b)); delete boards[chat]; return; }
  await safeReply(msg, 'Board:' + renderBoard(b));
}

if (!autoRegister('.tictactoe', 'Tic Tac Toe', handler)) {
  module.exports = (client) => registerWithClient(client, '.tictactoe', 'Tic Tac Toe', handler);
}
