/*eslint no-console: off */

const axios = require('axios')
const fs = require('fs')
const fsPromises = fs.promises

const url = 'https://api.itsukaralink.jp/app/livers.json'
const outPath = './src/assets/'
const outFilename = 'livers.json'

!(async () => {
  const res = await axios(url, {
    method: 'GET',
    responseType: 'json',
  })
  const json = res.data
  const livers = json.data.liver_relationships

  const liverDetails = []
  for (const entry of livers) {
    const detail = {
      id: entry.liver.id,
      name: entry.liver.name,
      furigana: entry.liver.furigana,
      avatarURL: entry.liver.avatar,
      twitter: entry.liver_twitter_account.screen_name,
      youtube: entry.liver_youtube_channel.channel
    }
    liverDetails.push(detail)
  }

  await fsPromises.mkdir(outPath, { recursive: true })
    .catch(err => {
      if (err.code !== 'EEXIST') {
        throw err
      } 
    })

  await fsPromises.writeFile(outPath + outFilename, JSON.stringify(liverDetails))
    .then(() => console.log('Done generating json'))
    .catch(err => console.error(`Failed to write file: ${err}`))
})()
