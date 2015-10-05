Some options, when passed to a view, are directly attached. Can you name all 8?

Properties for views that have to make their own element:
  id
  tagName
  className
  attributes

Backbone view properties with special meaning::
  el
  events
  model
  collection


Difference between setElement() and $el.html()?

setElement eliminates the wrapper div (and therefore the place to put the id, tagName, className, and attributes properties), creates the cached $el reference, moves delegated events.
$el.html() replaces the contents of the $el.


What does it mean to set an $el?

If it's on the page: it'll use it and not modify it (make sure the DOM is ready first). Otherwise, it'll create a wrapper element out of the four properties on the view and wrap your template with it.


Predict and fix the bug: new CollectionView({ $el: $('#main') })

$el isn't on the page! (?) Pass { el: '#main' }, and Backbone will create the cached $el property automatically.


