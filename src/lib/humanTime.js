export default humanTime = (sec) => {
  const minutes = Math.floor(sec / 60)
  let seconds = Math.floor(sec % 60)
  if (seconds < 10) seconds = ('0' + seconds)
  return `${minutes}:${seconds}`
}