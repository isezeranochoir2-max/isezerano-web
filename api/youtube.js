export default async function handler(req, res) {
  const youtubeFeedUrl = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCK24-0xtBHn6DMPCvuvoZ6w'

  try {
    const response = await fetch(youtubeFeedUrl)

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Unable to fetch YouTube channel feed',
      })
    }

    const xml = await response.text()

    res.setHeader('Content-Type', 'application/xml; charset=utf-8')
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
    return res.status(200).send(xml)
  } catch (error) {
    console.error('YouTube proxy failure:', error)
    return res.status(500).json({
      error: 'YouTube proxy failed',
    })
  }
}
