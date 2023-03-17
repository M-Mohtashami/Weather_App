export function El({ element, children, eventListener, dataset, ...rest }) {
  const elem = document.createElement(element);
  for (const attr in rest) {
    elem[attr] = rest[attr];
  }
  if (children) {
    for (const child of children) {
      elem.append(child);
    }
  }
  if (eventListener) {
    eventListener.map((el) => elem.addEventListener(el.event, el.callback));
  }
  if (dataset) {
    for (const key in dataset) {
      elem.dataset[key] = dataset[key];
    }
  }
  return elem;
}
