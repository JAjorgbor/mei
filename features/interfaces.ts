export interface SidebarState {
  openSidebar: boolean
}
export interface CurrencyState {
  currency: 'ngn' | 'usd'
}

export interface HeaderState {
  theme: 'light' | 'dark' | 'system'
  fontSize: 'normal' | 'large'
  navigation?: { title: string; backLink: string }
}
