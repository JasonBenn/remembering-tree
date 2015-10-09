import _, { findWhere, flatten, forEach, isEqual, partial, random, identity } from 'lodash'
import { ROOT_NODE_ID } from './index'

export const assignPositions = models => {
  const modelsToPlace = filterToVisible(models, getModel(models, ROOT_NODE_ID))
  placeHorizontally(modelsToPlace)
  placeVertically(modelsToPlace)
  return modelsToPlace
}

// Visible models: those whose parents are expanded
const filterToVisible = (models, rootNode) => {
  if (!rootNode.attributes.expanded) return [rootNode]

  const nextLevel = rootNode.attributes.subcategories.map(id => findWhere(models, { id }))
  return flatten(nextLevel.map(partial(filterToVisible, models))).concat(rootNode)
}

const placeHorizontally = models => {
  let x = 0
  for (let level of modelsByTreeLevel(models, ROOT_NODE_ID)) {
    for (let model of level) {
      model.attributes.position.x = x
    }

    // TODO: change this to 1, make view responsible for translating from relative position to absolute px.
    x += 100
  }
  return models;
}

const placeVertically = models => {
  forEach(models, model => {
    model.attributes.position.y = random(0, 500)
  })
  return models;
}

const getModel = (models, id) => {
  return findWhere(models, { id })
}

const getChildModels = (model, models) => {
  return getChildren(model).map(partial(getModel, models)).filter(identity)
}

const getChildren = (node) => node.get('subcategories')

function * conditionalDFS(condition, node) {
  if (condition(node) && getChildren(node).length) return node
  yield * getChildren(node).forEach(partial(conditionalDFS, condition, child))
}

const isVisible = node => node.get('visible')

const dfsVisible = partial(conditionalDFS, isVisible)

function * conditionalBFSByLevel(condition, node) {

}

function * modelsByTreeLevel(models, currentLevel, nextLevel = []) {
  if (!currentLevel) currentLevel = [getModel(models, ROOT_NODE_ID)]
  if (!currentLevel.length && !nextLevel.length) return

  currentLevel.forEach(model => {
    if (model.attributes.subcategories.length) {
      nextLevel.push(...getChildModels(model, models))
    }
  })

  yield currentLevel
  yield * modelsByTreeLevel(models, nextLevel)
}
