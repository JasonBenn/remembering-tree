import { Model, Collection } from 'backbone'

export const Category = Model.extend({
  toggleExpanded: function(attr) {
    this.set('expanded', !this.get('expanded'))
  }
})

export const CategoryCollection = Collection.extend({
  model: Category
})

export const Card = Model
