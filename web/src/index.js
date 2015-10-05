import $ from 'jquery'
import _ from 'lodash'
import { Model, Collection } from 'backbone'
import { ItemView, CollectionView } from 'backbone.marionette'
import { calculateLayout } from './layout-utils'

import 'normalize.css'
import './styles/main.scss'

const Node = Model.extend({
  toggleVisibility: function(attr) {
    this.set('visibility', !this.get('visibility'))
  }
})

const NodeCollection = Collection.extend({
  model: Node,

  // what the hell? it works when i comment this fn? how did it calculate layout the first time?!
  // initialize: function(models) {
  //   this.models = models
  //   this.setPositions()
  // },

  setPositions: function() {
    console.log('computing layout!', this.models)
    // shit, this needs to know how to work with models.
    this.set(calculateLayout(this.models))
    return this
  }
})

const NodeView = ItemView.extend({
  template: _.template($('#node-template').html()),

  triggers: {
    'click div': 'toggle'
  },

  initialize: function() {
    this.listenTo(this.model, 'change:position', function(model, value, options) { console.log('view heard its model change position!') })
    // WIP:
    // this.model.set('position', { x: 1, y: 3 })
    // debugger
    // this.listenTo(this.model, 'change', this.render)

    // TODO: this should be smarter.
    // 1) When the visibility changes, hide() or show() this view.
    // 2) When the model's position changes, animate the view to the new coordinates.
      // Maybe the model should have some relative coordinate system, and the view translates that into px values?
        // Maybe at the model, X values increment by 1 per level. And Y values are between 0 and 5.
        // The view can get the window size and translate those measurements based on the user scrolling, zooming, etc.
  },

  render: function() {
    this.setElement(this.template(this.model.attributes))
    return this
  }
})

const NodeCollectionView = CollectionView.extend({
  childView: NodeView,

  initialize: function() {
    const { listenTo, collection } = this
    listenTo(collection, 'change:visibility', ::collection.setPositions)
  },

  events: {
    'childview:click': 'toggleVisibility'
  },

  toggleVisibility: function() {
    // TODO: delegate this function directly to the model?
    console.log('toggilng visibility on', arguments)
    // this.model.toggleVisibility()
  },

  layoutNodes: function() {

    this.collection.set(calculateLayout(this.collection))
  }

  // GOAL: when a model's visiblity changes for any reason, or the collection shrinks or grows:
    // calculateLayout(this.collection).
    // Lots of models will have their position prop changes
    // Which will trigger views animating to their new positions.
})

$(() => {
  const nodeCollection = new NodeCollection([
    { id: 0, visible: true, front: '00', position: {}, children: [1, 2, 3] },
    { id: 1, visible: true, front: '11', position: {}, children: [] },
    { id: 2, visible: true, front: '22', position: {}, children: [4, 5] },
    { id: 3, visible: true, front: '33', position: {}, children: [6] },
    { id: 4, visible: true, front: '44', position: {}, children: [] },
    { id: 5, visible: true, front: '55', position: {}, children: [] },
    { id: 6, visible: true, front: '66', position: {}, children: [] },
  ]).setPositions()

  // App kickoff:
  new NodeCollectionView({
    el: '#main',
    collection: nodeCollection
  }).render()
})
