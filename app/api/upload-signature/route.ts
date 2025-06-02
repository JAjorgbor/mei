import cloudinary from '@/api-utils/cloudinary'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { public_id } = await req.json()

    const timestamp = Math.floor(Date.now() / 1000)

    const paramsToSign = {
      timestamp,
      public_id,
      // folder: 'your_folder', // optional
    }

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      String(process.env.CLOUDINARY_API_SECRET)
    )

    return NextResponse.json({
      signature,
      timestamp,
      api_key: process.env.CLOUDINARY_API_KEY,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to generate signature' },
      { status: 500 }
    )
  }
}
