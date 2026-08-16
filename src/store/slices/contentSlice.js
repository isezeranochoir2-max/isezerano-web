import { createSlice } from '@reduxjs/toolkit'
import choirPhoto from '../../assets/img/5Z7A8457.jpg.jpeg'
import { YOUTUBE_FEED_PROXY_URL, parseYoutubeFeed } from '../../utils/youtube'

const galleryPhotos = Object.values(
  Object.fromEntries(
    Object.entries(import.meta.glob('../../assets/img/*', { eager: true, import: 'default' })).map(([path, src]) => {
      const fileName = path.split('/').pop()

      return [
        fileName,
        {
          id: fileName,
          src,
          alt: fileName.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' ').trim(),
        },
      ]
    }),
  ),
)

const initialState = {
  hero: {
    title: 'Isezerano Choir',
    subtitle: 'ADEPR Kabuga Ville',
    mission: 'A choir rooted in worship, fellowship, and service, lifting voices and hearts in praise.',
  },
  about: {
    label: 'ABOUT ISEZERANO',
    heading: 'A choir rooted in worship, fellowship and service.',
    description:
      'Isezerano Choir is a gospel music ministry based at ADEPR Kabuga Ville, Rwanda. Through song, prayer, and community outreach, we seek to share the message of hope and faith. Our music reflects the rich spiritual heritage of our church and the vibrant culture of our community.',
    image: choirPhoto,
  },
  latestMusic: {
    label: 'MUSIC',
    heading: 'Listen to Isezerano',
    tracks: [],
    albums: [],
  },
  upcomingEvent: {
    label: 'EVENTS',
    heading: "What's happening",
    event: null,
  },
  ministry: {
    label: 'MINISTRY',
    heading: 'More than music',
    description:
      'Our ministry extends beyond the choir loft into the heart of our community. Through worship, evangelism, prayer, and outreach, we serve as ambassadors of faith and hope.',
    activities: [
      { id: 'worship', name: 'Worship', description: 'Leading congregations in Spirit-filled praise and adoration.' },
      { id: 'evangelism', name: 'Evangelism', description: 'Sharing the gospel through song, word, and personal testimony.' },
      { id: 'prayer', name: 'Prayer', description: 'Interceding for our church, community, and nation.' },
      { id: 'community', name: 'Community', description: 'Building meaningful relationships and supporting one another.' },
      { id: 'outreach', name: 'Outreach', description: 'Extending love and support to those in need across Kabuga Ville.' },
    ],
  },
  story: {
    label: 'OUR JOURNEY',
    heading: 'The story of Isezerano',
    milestones: [],
  },
  gallery: {
    label: 'GALLERY',
    heading: 'Moments of worship',
    photos: galleryPhotos,
    categories: [],
  },
  news: {
    label: 'NEWS',
    heading: 'From Isezerano',
    articles: [],
  },
  contact: {
    email: 'isezeranochoir1@gmail.com',
    phone: '+250 788 000 000',
    location: 'ADEPR Kabuga Ville, Kigali, Rwanda',
    social: {
      youtube: 'https://youtube.com/@ISEZERANOCHOIRADEPRKABUGA',
      instagram: 'https://instagram.com/isezeranochoir',
      facebook: 'https://facebook.com/isezeranochoir',
    },
  },
  footer: {
    name: 'ISEZERANO CHOIR',
    address: 'ADEPR Kabuga Ville, Kigali, Rwanda',
    links: ['About', 'Music', 'Events', 'Ministry', 'Gallery', 'News', 'Contact'],
    social: {
      youtube: 'https://youtube.com/@ISEZERANOCHOIRADEPRKABUGA',
      instagram: 'https://instagram.com/isezeranochoir',
      facebook: 'https://facebook.com/isezeranochoir',
    },
  },
}

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setLatestMusic: (state, action) => {
      state.latestMusic = {
        ...state.latestMusic,
        tracks: action.payload?.tracks || [],
        albums: action.payload?.albums || [],
      }
    },
  },
})

export const fetchLatestMusic = () => async (dispatch) => {
  try {
    const response = await fetch(YOUTUBE_FEED_PROXY_URL)

    if (!response.ok) {
      throw new Error(`YouTube feed request failed with status ${response.status}`)
    }

    const xml = await response.text()
    const tracks = parseYoutubeFeed(xml).slice(0, 12)

    dispatch(
      contentSlice.actions.setLatestMusic({
        tracks,
        albums: [],
      }),
    )
  } catch (error) {
    console.error('Unable to load music from YouTube channel:', error)
  }
}

export const { setLatestMusic } = contentSlice.actions
export default contentSlice.reducer
