import $ from 'jquery'
import _ from 'lodash'
import { assignPositions } from './layout-utils'
import { ItemView, CollectionView } from 'backbone.marionette'
import { CategoryCollection } from './models'

export const CategoryView = ItemView.extend({
  template: _.template($('#node-template').html()),

  triggers: {
    'click': 'toggle:expanded'
  },

  onToggleExpanded: function() {
    this.model.toggleExpanded()
  },

  initialize: function() {
    // When the model's position changes, animate the view to the new coordinates.
    // Maybe the model should have some relative coordinate system, and the view translates that into px values?
      // Maybe at the model, X values increment by 1 per level. And Y values are between 0 and 5.
      // The view can get the window size and translate those measurements based on the user scrolling, zooming, etc.
  },

  render: function() {
    this.setElement(this.template(this.model.attributes))
    return this
  }
})

export const CategoryCollectionView = CollectionView.extend({
  childView: CategoryView,

  childEvents: {
    'toggle:expanded': 'reassignNodePositions'
  },

  initialize: function({ collection }) {
    this.originalCollection = new CategoryCollection(collection.models)
    this.reassignNodePositions()
  },

  reassignNodePositions: function() {
    // Goal: render visible nodes to the page.
    // Solution: this.collection is a set of visible nodes.
    // Problem: how do we pass all original nodes to assignPositions, in case some are visible now?
    this.collection.set(assignPositions(this.originalCollection.models))
  }
})
