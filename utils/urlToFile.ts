export async function urlToFile(
  url: string,
  filename: string,
  mimeType: string,
): Promise<File> {
  const response = await fetch(url)
  const buffer = await response.arrayBuffer()
  return new File([buffer], filename, { type: mimeType })
}
