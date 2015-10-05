import $ from 'jquery'
import _ from 'lodash'
import { View, Model, Collection } from 'backbone'
import { CollectionView } from 'backbone.marionette'
import { calculateLayout } from './layout-utils'

import 'normalize.css'
import './styles/main.scss'

const Node = Model.extend({
  toggle: function(attr) {
    this[attr] = !this[attr]
    // QUESTION: Will this fire the right event?
  }
})

const NodeCollection = CollectionView.extend({
  childView: NodeView

  // GOAL: when a model's visiblity changes for any reason, or the collection shrinks or grows:
    // calculateLayout(this.collection).
    // Lots of models will have their position prop changes
    // Which will trigger views animating to their new positions.
})

const NodeView = View.extend({
  template: _.template($('#node-template').html()),

  events: {
    'click': 'toggleVisibility'
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render)
    // TODO: this should be smarter.
    // 1) When the visibility changes, hide() or show() this view.
    // 2) When the model's position changes, animate the view to the new coordinates.
      // Maybe the model should have some relative coordinate system, and the view translates that into px values?
        // Maybe at the model, X values increment by 1 per level. And Y values are between 0 and 5.
        // The view can get the window size and translate those measurements based on the user scrolling, zooming, etc.
  },

  toggleVisibility: function() {
    // TODO: delegate this function directly to the model?
    this.model.toggle('visible')
  },

  render: function() {
    this.setElement(this.template(this.model.attributes))
    return this
  }
})

$(() => {
  const nodeData = {
    0: { id: 0, visible: true, front: '0asdfa', position: {}, children: [1, 2, 3] },
    1: { id: 1, visible: true, front: '1asdfa', position: {}, children: [] },
    2: { id: 2, visible: true, front: '2asdfa', position: {}, children: [4, 5] },
    3: { id: 3, visible: true, front: '3asdfa', position: {}, children: [6] },
    4: { id: 4, visible: true, front: '4asdfa', position: {}, children: [] },
    5: { id: 5, visible: true, front: '5asdfa', position: {}, children: [] },
    6: { id: 6, visible: true, front: '6asdfa', position: {}, children: [] },
  }

  // TODO: make this a collection instead:
  const nodeModels = _.mapValues(nodeData, nodeDatum => new Node(nodeDatum))

  // App kickoff:
  new CollectionView({ $el: $('#main'), collection: nodeCollection })
})
