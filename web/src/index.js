import $ from 'jquery'
import _ from 'lodash'
import { View, Model, Collection } from 'backbone'
import { calculateLayout } from './layout-utils'

import 'normalize.css'
import './styles/main.scss'

const Node = Model
const NodeView = View.extend({
  template: _.template($('#node-template').html()),

  initialize: function() {
    this.listenTo(this.model, 'change', this.render)
  },

  render: function() {
    this.setElement(this.template(this.model.attributes))
    return this
  }
})

$(() => {
  const nodeData = {
    0: { id: 0, title: '0asdfa', position: {}, children: [1, 2, 3] },
    1: { id: 1, title: '1asdfa', position: {}, children: [] },
    2: { id: 2, title: '2asdfa', position: {}, children: [4, 5] },
    3: { id: 3, title: '3asdfa', position: {}, children: [6] },
    4: { id: 4, title: '4asdfa', position: {}, children: [] },
    5: { id: 5, title: '5asdfa', position: {}, children: [] },
    6: { id: 6, title: '6asdfa', position: {}, children: [] },
  }

  const nodeModels = _.mapValues(nodeData, nodeDatum => new Node(nodeDatum))

  calculateLayout(nodeData)

  // I want to re-run calculateLayout, and have any differences cause change events in those corresponding models.
  // recalculate, then iterate through all nodes and set.

  _.forEach(nodeModels, model => {
    const view = new NodeView({ model })
    $('#main').append(view.render().el)
  })
})
