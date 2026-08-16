function extractTextByTag(xml, tagNames) {
  for (const tagName of tagNames) {
    const matcher = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i')
    const match = xml.match(matcher)
    if (match) {
      return match[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
    }
  }

  return ''
}

function extractAttributeValue(xml, tagPattern, attributeName) {
  const match = xml.match(new RegExp(tagPattern, 'i'))
  return match ? match[1] : ''
}

export function parseYoutubeFeed(xmlString) {
  if (!xmlString || typeof xmlString !== 'string') return []

  if (typeof DOMParser !== 'undefined') {
    const parser = new DOMParser()
    const xml = parser.parseFromString(xmlString, 'application/xml')
    const entries = Array.from(xml.querySelectorAll('entry'))

    return entries.map((entry, index) => {
      const title = entry.querySelector('title')?.textContent?.trim() || `Video ${index + 1}`
      const link = entry.querySelector('link[rel="alternate"]')?.getAttribute('href') || ''
      const id = entry.querySelector('id')?.textContent?.trim() || ''
      const videoId = (id.match(/(?:video:)([\w-]+)/) || [])[1] ||
        (link.match(/[?&]v=([^&#]+)/) || link.match(/\/shorts\/([^?&#]+)/) || [])[1] || ''
      const thumbnail = entry.querySelector('thumbnail')?.getAttribute('url') ||
        (videoId ? `https://i3.ytimg.com/vi/${videoId}/hqdefault.jpg` : '')
      const published = entry.querySelector('published')?.textContent?.trim() || ''

      return {
        id: `${videoId || title}-${index}`,
        slug: videoId || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `track-${index + 1}`,
        title,
        description: entry.querySelector('description')?.textContent?.trim() || '',
        video: link,
        cover: thumbnail,
        thumbnail,
        releaseDate: published,
        album: 'YouTube channel',
        youtubeId: videoId,
      }
    })
  }

  const entryMatches = [...xmlString.matchAll(/<entry\b[^>]*>([\s\S]*?)<\/entry>/gi)]

  return entryMatches.map((match, index) => {
    const entryXml = match[1]
    const title = extractTextByTag(entryXml, ['title']) || `Video ${index + 1}`
    const link = extractAttributeValue(entryXml, /<link[^>]*rel=["']alternate["'][^>]*href=["']([^"']+)["'][^>]*>/i, 'href')
    const id = extractTextByTag(entryXml, ['id'])
    const videoId = (id.match(/(?:video:)([\w-]+)/) || [])[1] ||
      (link.match(/[?&]v=([^&#]+)/) || link.match(/\/shorts\/([^?&#]+)/) || [])[1] || ''
    const thumbnail = extractAttributeValue(entryXml, /<(?:media:)?thumbnail[^>]*\surl=["']([^"']+)["'][^>]*>/i, 'url') ||
      (videoId ? `https://i3.ytimg.com/vi/${videoId}/hqdefault.jpg` : '')
    const published = extractTextByTag(entryXml, ['published'])
    const description = extractTextByTag(entryXml, ['media:description', 'description'])

    return {
      id: `${videoId || title}-${index}`,
      slug: videoId || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `track-${index + 1}`,
      title,
      description,
      video: link,
      cover: thumbnail,
      thumbnail,
      releaseDate: published,
      album: 'YouTube channel',
      youtubeId: videoId,
    }
  })
}

export const YOUTUBE_CHANNEL_ID = 'UCK24-0xtBHn6DMPCvuvoZ6w'
export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/channel/UCK24-0xtBHn6DMPCvuvoZ6w'
export const YOUTUBE_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`
const isDevEnvironment = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV
export const YOUTUBE_FEED_PROXY_URL = isDevEnvironment ? '/youtube-feed' : '/api/youtube'
