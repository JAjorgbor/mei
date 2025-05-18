export const currencyFormatter = (input: number, currency: string = 'NGN') => {
  const formattedNumber = new Intl.NumberFormat(
    currency == 'NGN' ? 'en-NG' : 'en-US',
    {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }
  ).format(Number(input))

  return formattedNumber
}
