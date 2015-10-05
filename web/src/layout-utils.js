import _ from 'lodash'

export const calculateLayout = models => {
  calculateXPositions(models)
  calculateYPositions(models)
  return models;
}

const calculateXPositions = models => {
  let x = 0
  for (let level of modelsByTreeLevel(models)) {
    for (let model of level) {
      model.attributes.position.x = x
    }

    x += 100
  }
  return models;
}

const calculateYPositions = models => {
  _.forEach(models, model => {
    model.attributes.position.y = _.random(0, 500)
  })
  return models;
}

const getNodeChildren = (model, models) => {
  return model.attributes.children.map(id => models[id])
}

function * modelsByTreeLevel(models, currentLevel, nextLevel = []) {
  if (!currentLevel) currentLevel = [models[0]]
  if (!currentLevel.length && !nextLevel.length) return

  currentLevel.forEach(model => {
    if (model.attributes.children.length) {
      nextLevel.push(...getNodeChildren(model, models))
    }
  })

  yield currentLevel
  yield * modelsByTreeLevel(models, nextLevel)
}


if (require.main === module) {
  const test = require('tape')
  // TODO: rewrite to use a collection instead of an array
  const nodes = [
    { id: 0, visible: true, front: '00', position: {}, children: [1, 2, 3] },
    { id: 1, visible: true, front: '11', position: {}, children: [] },
    { id: 2, visible: true, front: '22', position: {}, children: [4, 5] },
    { id: 3, visible: true, front: '33', position: {}, children: [6] },
    { id: 4, visible: true, front: '44', position: {}, children: [] },
    { id: 5, visible: true, front: '55', position: {}, children: [] },
    { id: 6, visible: true, front: '66', position: {}, children: [] },
  ]

  test('getNodeChildren', t => {
    const nodeChildren = [ nodes[1], nodes[2], nodes[3] ]

    t.plan(1)
    t.ok(_.isEqual(getNodeChildren(nodes[0], nodes), nodeChildren))
  })

  test('calculateLayout', t => {
    // TODO: finish this test.
    const positionedNodes = nodes

    t.plan(1)
    console.log(calculateLayout(nodes))
    t.ok(_.isEqual(calculateLayout(nodes), positionedNodes))
  })
}
