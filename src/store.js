const STORAGE_KEY = 'health-v1'
export default {
  fetch: () => {
    let response = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (response === null) return []
    let id = -1
    response.forEach((item, index) => {
      response[index].id = id--
    })
    return response
  },
  save: (item) => {
    if (item === undefined) {
      localStorage.removeItem(STORAGE_KEY)
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(item))
    }
  }
}
