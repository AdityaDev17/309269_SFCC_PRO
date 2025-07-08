// analytics.js
import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'

const analytics = Analytics({
  app: 'your-app',
  debug: true,
  plugins: [
    googleAnalytics({
      measurementIds: ['G-3VRCBCH572'] // GA4 ID
    })
  ]
})

export default analytics
