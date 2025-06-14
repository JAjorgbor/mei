import axios from 'axios'

export const uploadToCloudinary = async (data: {
  file: any
  public_id?: string
  folder?: string
}) => {
  try {
    const { file, public_id, folder } = data
    const res = await axios.post('/api/upload-signature', {
      public_id,
      folder,
    })
    const { api_key, timestamp, signature } = res.data
    return axios.post(
      String(process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL),
      {
        file,
        api_key,
        signature,
        timestamp,
        public_id,
        folder,
        // upload_preset: 'mie-novel',
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
  } catch (error) {
    console.error(error)
    return { data: error }
  }
}
