import test from 'node:test'
import assert from 'node:assert/strict'
import { parseYoutubeFeed } from './youtube.js'

test('parseYoutubeFeed extracts video metadata from the YouTube Atom feed', () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <feed xmlns="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
      <entry>
        <title>Song One</title>
        <link rel="alternate" href="https://www.youtube.com/watch?v=abc123"/>
        <media:group>
          <media:title>Song One</media:title>
          <media:description>First worship song</media:description>
          <media:thumbnail url="https://i3.ytimg.com/vi/abc123/hqdefault.jpg"/>
        </media:group>
        <published>2026-08-01T10:00:00+00:00</published>
        <id>yt:video:abc123</id>
      </entry>
      <entry>
        <title>Song Two</title>
        <link rel="alternate" href="https://www.youtube.com/shorts/def456"/>
        <media:group>
          <media:title>Song Two</media:title>
          <media:description>Second worship song</media:description>
          <media:thumbnail url="https://i3.ytimg.com/vi/def456/hqdefault.jpg"/>
        </media:group>
        <published>2026-08-02T10:00:00+00:00</published>
        <id>yt:video:def456</id>
      </entry>
    </feed>`

  const tracks = parseYoutubeFeed(xml)

  assert.equal(tracks.length, 2)
  assert.equal(tracks[0].title, 'Song One')
  assert.equal(tracks[0].video, 'https://www.youtube.com/watch?v=abc123')
  assert.equal(tracks[0].thumbnail, 'https://i3.ytimg.com/vi/abc123/hqdefault.jpg')
  assert.equal(tracks[0].slug, 'abc123')
  assert.equal(tracks[1].video, 'https://www.youtube.com/shorts/def456')
})
