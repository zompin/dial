interface IProfile {
  id: string
  title: string
}

interface IBookmark {
  id: string
  title: string
  url: string
  parentId: string
}

interface IFavicon {
  timestamp: number
  image: string
}
