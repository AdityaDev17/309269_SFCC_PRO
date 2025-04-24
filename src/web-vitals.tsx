'use client'
 
import { useReportWebVitals } from 'next/web-vitals'
 
export function WebVitals() {
  useReportWebVitals((metric) => {
    console.log(metric)
  })
 
  return null
}


// 'use client'

// import { useReportWebVitals } from 'next/web-vitals'

// type WebVitalName = 'TTFB' | 'FCP' | 'LCP' | 'FID' | 'CLS' | 'INP'

// export function WebVitals() {
//   useReportWebVitals((metric) => {
//     const { name, value, rating, delta, id, entries } = metric

//     switch (name as WebVitalName) {
//       case 'TTFB': {
//         console.log('[TTFB]', value, { metric })
//         break
//       }
//       case 'FCP': {
//         console.log('[FCP]', value, { metric })
//         break
//       }
//       case 'LCP': {
//         console.log('[LCP]', value, { metric })
//         break
//       }
//       case 'FID': {
//         console.log('[FID]', value, { metric })
//         break
//       }
//       case 'CLS': {
//         console.log('[CLS]', value, { metric })
//         break
//       }
//       case 'INP': {
//         console.log('[INP]', value, { metric })
//         break
//       }
//       default: {
//         console.log('[OTHER METRIC]', name, value, { metric })
//         break
//       }
//     }
//   })

//   return null
// }
