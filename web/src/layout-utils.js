import _ from 'lodash'
import { ROOT_NOTE_ID } from './index'

export const assignPositions = models => {
  const modelsToPlace = filterToVisible(models, getModel(models, ROOT_NOTE_ID))
  placeHorizontally(modelsToPlace)
  placeVertically(modelsToPlace)
  return modelsToPlace
}

// Visible models: those whose parents are expanded
const filterToVisible = (models, rootNode) => {
  if (!rootNode.attributes.expanded) return [rootNode]

  const nextLevel = rootNode.attributes.subcategories.map(id => _.findWhere(models, { id }))
  return _.flatten(nextLevel.map(_.partial(filterToVisible, models))).concat(rootNode)
}

const placeHorizontally = models => {
  let x = 0
  for (let level of modelsByTreeLevel(models, ROOT_NOTE_ID)) {
    for (let model of level) {
      model.attributes.position.x = x
    }

    // TODO: change this to 1, make view responsible for translating from relative position to absolute px.
    x += 100
  }
  return models;
}

const placeVertically = models => {
  _.forEach(models, model => {
    model.attributes.position.y = _.random(0, 500)
  })
  return models;
}

const getModel = (models, id) => {
  return _.findWhere(models, { id })
}

const getNodeChildren = (model, models) => {
  return model.attributes.subcategories.map(id => getModel(models, id)).filter(_.identity)
}

function * modelsByTreeLevel(models, currentLevel, nextLevel = []) {
  if (!currentLevel) currentLevel = [getModel(models, ROOT_NOTE_ID)]
  if (!currentLevel.length && !nextLevel.length) return

  currentLevel.forEach(model => {
    if (model.attributes.subcategories.length) {
      nextLevel.push(...getNodeChildren(model, models))
    }
  })

  yield currentLevel
  yield * modelsByTreeLevel(models, nextLevel)
}


// if (require.main === module) {
//   const test = require('tape')
//   // TODO: rewrite to use a collection instead of an array
//   const nodes = [
//     { id: 0, visible: true, front: '00', position: {}, children: [1, 2, 3] },
//     { id: 1, visible: true, front: '11', position: {}, children: [] },
//     { id: 2, visible: true, front: '22', position: {}, children: [4, 5] },
//     { id: 3, visible: true, front: '33', position: {}, children: [6] },
//     { id: 4, visible: true, front: '44', position: {}, children: [] },
//     { id: 5, visible: true, front: '55', position: {}, children: [] },
//     { id: 6, visible: true, front: '66', position: {}, children: [] },
//   ]

//   test('getNodeChildren', t => {
//     const nodeChildren = [ nodes[1], nodes[2], nodes[3] ]

//     t.plan(1)
//     t.ok(_.isEqual(getNodeChildren(nodes[0], nodes), nodeChildren))
//   })

//   test('assignLayout', t => {
//     // TODO: finish this test.
//     const positionedNodes = nodes

//     t.plan(1)
//     console.log(assignLayout(nodes))
//     t.ok(_.isEqual(assignLayout(nodes), positionedNodes))
//   })
// }
