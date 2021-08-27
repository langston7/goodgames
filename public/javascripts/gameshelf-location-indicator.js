document.addEventListener("DOMContentLoaded", event => {
  const path = window.location.pathname;
  const pathArray = path.split('/');
  const shelfId = pathArray[2];
  
  if (shelfId) {
    const highlightedShelf = document.querySelector(`div[data-highlight-shelfid="${shelfId}"] li`)
    highlightedShelf.setAttribute('id', 'currently-visiting');
  }
})
