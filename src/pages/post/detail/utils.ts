export interface AnchorItem {
  parent: AnchorItem | null
  key: string
  href: string
  title: string | null
  nodeName: string
  children: AnchorItem[]
}
export const getAnchorTree = (dom: HTMLElement) => {
  const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  const elements = Array.from(dom.querySelectorAll(headings.join(',')))
  if (!elements.length) return []
  let previousElement: AnchorItem | null = null
  const anchorItems: AnchorItem[] = []
  const rootTag =
    'H' +
    Math.min(...elements.map((item) => Number(item.nodeName.replace('H', ''))))
  function getParent(
    current: AnchorItem,
    previous: AnchorItem | null
  ): AnchorItem | null {
    if (!previous) return null
    if (previous.nodeName === current.nodeName) {
      return previous.parent
    } else if (previous.nodeName < current.nodeName) {
      return previous
    } else {
      return getParent(current, previous.parent)
    }
  }
  elements.forEach((element) => {
    const isRoot = element.nodeName === rootTag
    const currentElement: AnchorItem = {
      parent: null,
      key: element.id,
      href: '#' + element.id,
      title: element.textContent,
      nodeName: element.nodeName,
      children: []
    }
    if (previousElement) {
      const isSibling = previousElement.nodeName === element.nodeName
      const isIndirectChildren = previousElement.nodeName > element.nodeName
      const isChildren = previousElement.nodeName < element.nodeName
      if (isRoot) {
        anchorItems.push(currentElement)
      } else if (isSibling) {
        currentElement.parent = previousElement.parent
        previousElement.parent?.children.push(currentElement)
      } else if (isIndirectChildren) {
        const parentElement = getParent(currentElement, previousElement)
        if (parentElement) {
          currentElement.parent = parentElement
          parentElement.children.push(currentElement)
        }
      } else if (isChildren) {
        currentElement.parent = previousElement
        previousElement.children.push(currentElement)
      }
    } else {
      anchorItems.push(currentElement)
    }
    previousElement = currentElement
  })
  return anchorItems
}
