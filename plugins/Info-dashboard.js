let handler = async (m, { conn }) => {
  let stats = Object.entries(db.data.stats).map(([key, val]) => {
    let name = Array.isArray(plugins[key]?.help) ? plugins[key]?.help?.join(' & ') : plugins[key]?.help || key 
    if (/exec/.test(name)) return
    return { name, ...val }
  })
  stats = stats.sort((a, b) => b.total - a.total)
  let txt = stats.slice(0, 10).map(({ name, total, last }, idx) => {
    if (name.includes('-') && name.endsWith('.js')) name = name.split('-')[1].replace('.js', '')
    return `(${idx + 1})\n📚 • *_Comando:_* *${name}*\n🗂 • *_Uso:_* *${total}x*\n⛾ • *_Ultimo Uso:_* *${getTime(last)}*`
  }).join`\n\n`
  m.reply(`Dashboard *${conn.user.name}*\n\n${txt}`)
}
handler.help = ['dashboard']
handler.tags = ['info']
handler.command = /^dashboard$/i
handler.register = true

export default handler
	
export function parseMs(ms) {
  if (typeof ms !== 'number') throw 'Parameter must be filled with number'
  return {
    days: Math.trunc(ms / 86400000),
    hours: Math.trunc(ms / 3600000) % 24,
    minutes: Math.trunc(ms / 60000) % 60,
    seconds: Math.trunc(ms / 1000) % 60,
    milliseconds: Math.trunc(ms) % 1000,
    microseconds: Math.trunc(ms * 1000) % 1000,
    nanoseconds: Math.trunc(ms * 1e6) % 1000
  }
}

export function getTime(ms) {
  let now = parseMs(+new Date() - ms)
  if (now.days) return `${now.days} giorni`
  else if (now.hours) return `${now.hours} ore`
  else if (now.minutes) return `${now.minutes} minuti`
  else return `qualche secondo fa`
}
