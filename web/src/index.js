import $ from 'jquery'
import _ from 'lodash'
import { View, Model, Collection } from 'backbone'

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
  ['a', 'b', 'c', 'd'].forEach(word => {
    const node = new Node({
      title: word,
      position: {
        x: _.random(0, 150),
        y: _.random(100, 200)
      }
    })
    const view = new NodeView({
      model: node
    })

    $('#main').append(view.render().el)
  })
})
