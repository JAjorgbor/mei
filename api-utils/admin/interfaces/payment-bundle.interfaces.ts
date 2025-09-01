export interface IPaymentBundle {
  id: string
  amount: number
  numberOfstars: number
  bundleType:
    | 'cash'
    | 'purchaseOfBooks'
    | 'transferringStarsToOtherUsers'
    | 'cashPromo'
    | 'bookPromo'
  description: string
  dateCreated: number
}
