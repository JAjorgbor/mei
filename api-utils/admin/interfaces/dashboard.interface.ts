export interface IDashboardStats {
  chapterAnalytics: ChapterAnalytics
  pageAnalytics: PageAnalytics
  readerAnalytics: ReaderAnalytics
  revenueAnalytics: RevenueAnalytics
  recentChapters: RecentChapter[]
  recentUsers: RecentUser[]
}

export interface ChapterAnalytics {
  totalChapters: string
  chapterChange: string
  changeType: string
}

export interface PageAnalytics {
  totalpages: string
  pageChange: string
  changeType: string
}

export interface ReaderAnalytics {
  totalReaders: string
  readerChange: string
  changeType: string
}

export interface RecentChapter {
  bookId: string
  chapterLabel: string
  status: string
  coverImage: string
  number: number
  dateUpdated: Date
  wordCount: number
  id: string
}

export interface RecentUser {
  userId: string
  email: string
  firstName: null | string
  lastName: null | string
  avatar: null | string
  dateCreated: Date
  status: string
  plan: string
}

export interface RevenueAnalytics {
  totalRevenue: string
  revenueChange: string
  changeType: string
}
