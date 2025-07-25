import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import {fileURLToPath} from 'url'
import {dirname} from 'path'

dotenv.config()

const dreamStudioApiKey = 'sk-ApMwHAKRLZqKFkaQKtdSMamGdnTtvngoFD5C7dJAx9nbuSNv' // Replace with your API key
//const dreamStudioApiKey = process.env.DREAMSTUDIO_API_KEY
console.log('DREAMSTUDIO_API_KEY:', dreamStudioApiKey)

if (!dreamStudioApiKey) {
  throw new Error(
    'API key is missing. Please check your .env file or provide the API key manually.',
  )
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const generateImage = async (prompt) => {
  try {
    const response = await fetch(
      'https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${dreamStudioApiKey}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          text_prompts: [{text: prompt}],
          cfg_scale: 7, // Adjust for image quality
          height: 512,
          width: 512,
          samples: 1,
        })
      }
    )

    if (!response.ok) {
      console.error(`API request failed: ${response.status} ${response.statusText}`)
      return undefined
    }

    const data = await response.json()
    console.log('API Response:', data)

    if (!data.artifacts || data.artifacts.length === 0) {
      console.error('No artifacts found in the API response.')
      return undefined
    }

    const base64Image = data.artifacts[0].base64
    console.log('Base64 Image Data:', base64Image)
    return base64Image
  } catch (error) {
    if (error instanceof Response) {
      console.error('Error generating image:', error.status, error.statusText)
    } else {
      console.error('Error generating image:', error.message || error)
    }
    return undefined
  }
}

const processCsv = async (csvFilePath) => {
  const csvData = fs.readFileSync(csvFilePath, 'utf-8')
  const rows = csvData.split('\n').slice(1)

  for (const row of rows) {
    const [sku, productId, name, description] = row.split(',')

    const prompt = `Generate a professional, high-resolution studio-style eCommerce product image of "${name}". The product should be well-lit, centered, and displayed on a clean white background. Include the following description: "${description}". Ensure the image is visually appealing and suitable for online marketplaces.`
    const base64Image = await generateImage(prompt)

    if (base64Image) {
      const imagePath = path.join(__dirname, './images', `${sku}.png`)
      const imageBuffer = Buffer.from(base64Image, 'base64')
      fs.writeFileSync(imagePath, imageBuffer)
      console.log(`Image saved: ${imagePath}`)
    }
  }
}

// Run the script
const csvFilePath = path.join(__dirname, './products.csv') // Adjust path if needed
processCsv(csvFilePath)
