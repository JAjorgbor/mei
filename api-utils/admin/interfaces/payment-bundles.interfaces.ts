export interface IPaymentBundle {
  id: string
  amount: number
  numberOfstars: number
  bundleType:
    | 'cash'
    | 'Purchase Of Books'
    | 'Transferring Stars To Other Users'
    | 'Cash Promo'
    | 'Book Promo'
  description: string
  dateCreated: number
}
