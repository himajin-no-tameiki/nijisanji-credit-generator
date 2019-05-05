/*eslint no-console: off */

const axios = require('axios')
const fs = require('fs')

const url = 'https://api.itsukaralink.jp/app/livers.json'
const outPath = './src/assets/livers.json'

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
  fs.writeFile(outPath, JSON.stringify(liverDetails), err => {
    if (err) {
      console.log(`Failed to write to ${outPath}`)
      return
    }
    console.log('Successfully fetched livers.json')
  })
})()
