const truncateText = (text: string, allowedLength: number) => {
  return text?.length > allowedLength
    ? text.slice(0, allowedLength) + '...'
    : text
}
export default truncateText
