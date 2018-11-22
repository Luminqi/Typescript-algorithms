import { expect } from 'chai'
import { countingSort, heapSort, quickSort, randomizedQuickSort, insertionSort, mergeSort } from '../src'

describe('Sort', () => {
    it('countingSort can sort numbers', () => {
        const sorted = countingSort([5, 10, 15, 2, 1, 4, 7, 3, 3, 8, 9, 6, 5, 11], 15)
        expect(sorted).to.have.ordered.members([1, 2, 3, 3, 4, 5, 5, 6, 7, 8, 9, 10, 11, 15])
    })
    it('heapSort can sort numbers', () => {
        const sorted = heapSort([5, 10, 15, 2, 1, 4, 7, 3, 3, 8, 9, 6, 5, 11])
        expect(sorted).to.have.ordered.members([1, 2, 3, 3, 4, 5, 5, 6, 7, 8, 9, 10, 11, 15])
    })
    it('quickSort can sort numbers', () => {
        const sorted = quickSort([5, 10, 15, 2, 1, 4, 7, 3, 3, 8, 9, 6, 5, 11])
        expect(sorted).to.have.ordered.members([1, 2, 3, 3, 4, 5, 5, 6, 7, 8, 9, 10, 11, 15])
    })
    it('quickSort can sort numbers', () => {
        const sorted = quickSort([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0])
        expect(sorted).to.have.ordered.members([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })
    it('randomizedQuickSort can sort numbers', () => {
        const sorted = randomizedQuickSort([5, 10, 15, 2, 1, 4, 7, 3, 3, 8, 9, 6, 5, 11])
        expect(sorted).to.have.ordered.members([1, 2, 3, 3, 4, 5, 5, 6, 7, 8, 9, 10, 11, 15])
    })
    it('randomizedQuickSort can sort numbers', () => {
        const sorted = randomizedQuickSort([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0])
        expect(sorted).to.have.ordered.members([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })
    it('insertionSort can sort numbers', () => {
        const sorted = insertionSort([5, 10, 15, 2, 1, 4, 7, 3, 3, 8, 9, 6, 5, 11])
        expect(sorted).to.have.ordered.members([1, 2, 3, 3, 4, 5, 5, 6, 7, 8, 9, 10, 11, 15])
    })
    it('mergeSort can sort numbers', () => {
        const sorted = mergeSort([5, 10, 15, 2, 1, 4, 7, 3, 3, 8, 9, 6, 5, 11])
        expect(sorted).to.have.ordered.members([1, 2, 3, 3, 4, 5, 5, 6, 7, 8, 9, 10, 11, 15])
    })
})