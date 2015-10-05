NAME/KEYWORDS:
  The Knowledge Tree.
  The Giving Tree?
  The Apple of Knowledge?
  Mind Map
  Flashcards
  Spaced Repetition

KEYBOARD SHORTCUTS:
  SELECTION
    Left: select parent node
    Right: to middle child
    Up/Down: traverse children at the same level
    Cmd-Click: Select multiple

  CREATING NODES (while not editing)
    Tab: new child at end
    Shift-tab: new parent to selected node
    Enter: new sibling to the right
    Shift-enter: new sibling to the left

  EDITING
    Type (while selected): clear node contents, edit selected node
    Cmd-Enter (while selected): start editing node
    Cmd-Enter (while editing): save changes to node you're editing
    Esc (while editing): stop editing, don't save changes, select node
    Tab (while editing): switch from front of card to back of card

  DRAG + DROP
    When hovering over a node, highlight one of its four edges.
    Drop on top/bottom edge: new sibling
    Drop on left edge: new parent
    Drop on right edge: add as last child

  SHOW/HIDE: re-display afterwards
    Space: show/hide children
    Cmd-Shift-[: hide deepest level with visible nodes
    Cmd-Shift-]: show shallowest level with hidden nodes
    ?: Show keyboard shortcuts modal

  STUDY
    s: study selected cards and children
    f: focus mode. hide everything but selected and children.

DISPLAY ALGORITHM:
  VISIBLE nodes = focus mode OR all visible nodes
  All VISIBLE nodes
    EACH node with HIDDEN or NULL parent
      Display side-by-side at top level
    children should be grouped together

  Focus mode: Initial focus mode visible/hidden state: copy the visible/hidden state of the currently selected nodes and children. Exiting focus mode clears the focus mode set, restoring previously hidden/visible nodes.

DESIGNS NEEDED:
  Viewing node
  Viewing flashcard
  Editing node
  Editing flashcard
  For selected nodes:
    how many cards would I study?

State:
  root: special node, has no front/back, always visible, no content, no lines drawn
  mapping of ID -> NODE:
    ID
    parent
    children (IDs, ordered)
    type: Flashcard | Node
    front: text.
    back: null for categories, text for flashcards
    visible: boolean (true means "visible", false means "hidden")
    editing?

  focus mode: set of IDs that are visible.

IDEAS:
  Flashcards/categories maybe should be the same.
  Studying would bring in any card with a back.

RESOURCES:
  Pretty tree styles (from D3): http://bl.ocks.org/mbostock/4339184
  An explanation of a pleasing tree-drawing algorithm: https://rachel53461.wordpress.com/2014/04/20/algorithm-for-drawing-trees/
