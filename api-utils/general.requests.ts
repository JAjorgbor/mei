import axios from 'axios'

export const uploadToCloudinary = async (data: {
  file: any
  public_id: string
}) => {
  try {
    const { file, public_id } = data
    const res = await axios.post('/api/upload-signature', {
      public_id,
    })
    console.log(res.data)
    const { api_key, timestamp, signature } = res.data
    return axios.post(
      String(process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL),
      {
        file,
        api_key,
        signature,
        timestamp,
        public_id,
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
