export default (s = [], a) => {
  if (a.type === 'DATA') {
    return a.data
  }

  return s
}
