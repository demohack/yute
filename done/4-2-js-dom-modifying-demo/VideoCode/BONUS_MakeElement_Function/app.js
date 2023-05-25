


function makeElement(type, attributes, text) {
  const newEl = document.createElement(type);
  for (let attr in attributes) {
    newEl.setAttribute(attr, attributes[attr])
  }
  newEl.textContent = text;
  return newEl;
}

const h1 = makeElement('h1', {
  class: 'title',
  id: 'blahhh'
}, 'hi');


const wash = makeElement('p', {class:'todo', id:'special'}, 'Wash Dishes');

const body = document.querySelector("body");

body.appendChild(h1);
body.appendChild(wash);