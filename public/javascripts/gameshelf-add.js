document.addEventListener("DOMContentLoaded", event => {
  const button = document.querySelector(".shelf-button");
  const shelfForm = document.querySelector(".new-shelf")

  button.addEventListener("click", async(event) => {
    event.preventDefault();
    const formData = new FormData(shelfForm);
    const shelfName = formData.get("shelfName");
    try {
      const res = await fetch(`/gameshelves/new`, {
        method: "POST",
        body: JSON.stringify({shelfName}),
        headers: {
          "Content-Type": "application/json"
        },
      });
      const resObj = await res.json();
      const shelfId = resObj.newShelfId;
      const newShelfLink = `/gameshelves/${shelfId}`;
      console.log(resObj)
      console.log(shelfId)
      console.log(newShelfLink)

      const shelfList = document.querySelector(".shelf-list");
      const newLinkRow = document.createElement('div');
      newLinkRow.setAttribute('class', `link-row-${shelfId}`);
      newLinkRow.classList.add('link-row')

      const newLink = document.createElement('a');
      newLink.setAttribute('href', newShelfLink)
      const newShelf = document.createElement('li');
      newShelf.setAttribute('class', 'shelf-link');
      newShelf.innerText = `${shelfName} (0)`;

      const deleteLink = document.createElement('a');
      deleteLink.setAttribute('href', `#`)
      deleteLink.setAttribute('class', 'delete-link')
      deleteLink.setAttribute('data-shelfid', shelfId)
      const deleteIcon = document.createElement('span');
      deleteIcon.setAttribute('class', 'material-icons');
      deleteIcon.innerText = 'close';

      shelfList.appendChild(newLinkRow);
      newLinkRow.appendChild(newLink);
      newLink.appendChild(newShelf);
      
      newLinkRow.appendChild(deleteLink);
      deleteLink.appendChild(deleteIcon);

      deleteLink.addEventListener('click', async(event) => {
        event.preventDefault();
        const result = confirm('Are you sure you want to delete this Game shelf?')
      
        if (result) {
          await fetch(`/gameshelves/${shelfId}`, {
            method: "DELETE"
          });
          const linkRowToDestroy = document.querySelector(`.link-row-${shelfId}`)
          linkRowToDestroy.remove();
        }
    
      });

      let input = document.querySelector(".shelf-input");
      input.value = "";

    }catch (e) {
      console.log(e);
    }

  });

  // add the event listener for deleting that record to each X when the DOM content loads
  const deleteShelfLinks = document.querySelectorAll('.delete-link');
  const deleteShelfLinksArray = Array.from(deleteShelfLinks);

  for (let i = 0; i < deleteShelfLinksArray.length; i++) {
    const deleteLink = deleteShelfLinksArray[i];

    deleteLink.addEventListener('click', async(event) => {
      event.preventDefault();
      const result = confirm('Are you sure you want to delete this Game shelf?')
    
      if (result) {
        await fetch(`/gameshelves/${deleteLink.dataset.shelfid}`, {
          method: "DELETE"
        });
        const linkRowToDestroy = document.querySelector(`.link-row-${deleteLink.dataset.shelfid}`)
        console.log(deleteLink);
        linkRowToDestroy.remove();
      }
  
    });
    
  }

});
