import { expect } from 'chai'
import { computeTemporaryArray, KMP } from '../src'

describe('KMP', () => {
  it('computeTemporaryArray will return right answer', () => {
      const lps = computeTemporaryArray(['a', 'b', 'c', 'd', 'a', 'b', 'c', 'a'])
      expect(lps).to.have.ordered.members([0, 0, 0, 0, 1, 2, 3, 1])
  })
  it('computeTemporaryArray will return right answer', () => {
    const lps = computeTemporaryArray(['a', 'a', 'b', 'a', 'a', 'b', 'a', 'a', 'a'])
    expect(lps).to.have.ordered.members([0, 1, 0, 1, 2, 3, 4, 5, 2])
  })
  it('KMP will return true', () => {
    const answer = KMP('abxabcabcaby', 'abcaby')
    expect(answer).to.equal(true)
  })
  it('KMP will return false', () => {
    const answer = KMP('abxabcabcaby', 'abcabx')
    expect(answer).to.equal(false)
  })
})