export function computeTemporaryArray (pattern: string[]) {
  const lps = [0]
  let index = 0
  for (let i = 1; i < pattern.length;) {
    if (pattern[i] === pattern[index]) {
      lps.push(index + 1)
      index ++
      i ++
    } else {
      if (index !== 0) {
        index = lps[index - 1]
      } else {
        lps[i] = 0
        i ++
      }
    }
  }
  return lps
}

export function KMP (text: string, pattern: string) {
  const textArr = text.split('')
  const patternArr = pattern.split('')
  const lps = computeTemporaryArray(patternArr)
  let i = 0
  let j = 0
  while(i < textArr.length && j < patternArr.length) {
    if (textArr[i] === patternArr[j]) {
      i ++
      j ++
    } else {
      if (j !== 0) {
        j = lps[j - 1]
      } else {
        i ++
      }
    }
  }
  if (j === pattern.length) {
    return true
  }
  return false
}