const extractPublicId = (secureUrl: string) => {
  // Remove domain up to /upload/
  const uploadIndex = secureUrl.indexOf('/upload/')
  if (uploadIndex === -1) return null

  const afterUpload = secureUrl.slice(uploadIndex + 8) // "/upload/".length === 8

  // Remove version (starts with 'v' followed by digits)
  const parts = afterUpload.split('/')
  if (parts.length < 2) return null

  const maybeVersion = parts[0]
  let publicIdParts = parts

  if (/^v\d+$/.test(maybeVersion)) {
    publicIdParts = parts.slice(1)
  }

  // Remove file extension from last segment
  const last = publicIdParts.pop() as string
  const [basename] = last.split('.')
  publicIdParts.push(basename)

  return publicIdParts.join('/')
}
export default extractPublicId
