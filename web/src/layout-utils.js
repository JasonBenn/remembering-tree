import _ from 'lodash'

export const calculateLayout = nodes => {
  calculateXPositions(nodes)
  calculateYPositions(nodes)
  return nodes;
}

const calculateXPositions = nodes => {
  let x = 0
  for (let level of nodesByLevel(nodes)) {
    for (let node of level) {
      node.position.x = x
    }

    x += _.max(level.map(node => width(node)))
  }
  return nodes;
}

// TODO: Width of the first line of a node. Is number of chars or 80, whichever is less.
const width = node => 80

const calculateYPositions = nodes => {
  _.forEach(nodes, node => {
    node.position.y = _.random(0, 500)
  })
  return nodes;
}

const getNodeChildren = (node, nodes) => {
  return node.children.map(id => nodes[id])
}

function * nodesByLevel(nodes, currentLevel, nextLevel = []) {
  if (!currentLevel) currentLevel = [nodes[0]]
  if (!currentLevel.length && !nextLevel.length) return

  currentLevel.forEach(node => {
    if (node.children.length) nextLevel.push(...getNodeChildren(node, nodes))
  })

  yield currentLevel
  yield * nodesByLevel(nodes, nextLevel)
}


if (require.main === module) {
  const test = require('tape')
  const nodes = {
    0: { id: 0, position: {}, children: [1, 2, 3] },
    1: { id: 1, position: {}, children: [] },
    2: { id: 2, position: {}, children: [4, 5] },
    3: { id: 3, position: {}, children: [6] },
    4: { id: 4, position: {}, children: [] },
    5: { id: 5, position: {}, children: [] },
    6: { id: 6, position: {}, children: [] },
  }

  test('getNodeChildren', t => {
    const nodeChildren = [ nodes[2], nodes[3] ]

    t.plan(1)
    t.ok(_.isEqual(getNodeChildren(nodes[0], nodes), nodeChildren))
  })

  test('calculateLayout', t => {
    // TODO:
    const positionedNodes = nodes

    t.plan(1)
    console.log(calculateLayout(nodes))
    t.ok(_.isEqual(calculateLayout(nodes), positionedNodes))
  })
}
