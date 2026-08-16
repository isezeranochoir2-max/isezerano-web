import { Helmet } from 'react-helmet-async'

export default function Seo({
  title = 'Isezerano Choir ADEPR Kabuga Ville',
  description = 'A gospel music ministry rooted in worship, fellowship, and service at ADEPR Kabuga Ville, Rwanda.',
  path = '/',
  image = '/choir-bg.jpg',
}) {
  const url = `https://isezeranochoir.rw${path}`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  )
}
