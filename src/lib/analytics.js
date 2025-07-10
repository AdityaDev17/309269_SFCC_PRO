// analytics.js
import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'

const analytics = Analytics({
  app: 'your-app',
  debug: true,
  plugins: [
    googleAnalytics({
      measurementIds: ['G-N75CYCY1PB'] // GA4 ID
    })
  ]
})

export default analytics
