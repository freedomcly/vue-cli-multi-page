export function getParams (key, defaultValue) {
  const obj = {}
  location.search.substr(1).split('&').forEach(item => {
    const keyValueArr = item.split('=')
    obj[keyValueArr[0]] = keyValueArr[1]
  })
  return obj[key] || defaultValue
}
