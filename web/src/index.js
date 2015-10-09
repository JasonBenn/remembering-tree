import $ from 'jquery'
import { CategoryCollectionView } from './views'
import { CategoryCollection } from './models'

import 'normalize.css'
import './styles/main.scss'

export const ROOT_NODE_ID = 0
export const nodes = [
  { id: 0, expanded: true, front: '00', position: {}, cards: [1, 2], subcategories: [1, 2, 3] },
  { id: 1, expanded: true, front: '11', position: {}, cards: [1, 2], subcategories: [] },
  { id: 2, expanded: false, front: '22', position: {}, cards: [1, 2], subcategories: [4, 5] },
  { id: 3, expanded: true, front: '33', position: {}, cards: [1, 2], subcategories: [6, 7, 8, 9] },
  { id: 4, expanded: true, front: '44', position: {}, cards: [1, 2], subcategories: [] },
  { id: 5, expanded: true, front: '55', position: {}, cards: [1, 2], subcategories: [] },
  { id: 6, expanded: true, front: '66', position: {}, cards: [1, 2], subcategories: [] },
  { id: 7, expanded: true, front: '77', position: {}, cards: [1, 2], subcategories: [] },
  { id: 8, expanded: true, front: '8', position: {}, cards: [1, 2], subcategories: [] },
  { id: 9, expanded: true, front: '96', position: {}, cards: [1, 2], subcategories: [] },
]

$(() => {
  new CategoryCollectionView({
    el: '#main',
    collection: new CategoryCollection(nodes)
  }).render()
})
