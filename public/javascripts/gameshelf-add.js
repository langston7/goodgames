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
      const newLink = document.createElement('a');
      newLink.setAttribute('href', newShelfLink)
      const newShelf = document.createElement('li');
      newShelf.setAttribute('class', 'shelf-link');
      newShelf.innerText = `${shelfName} (0)`;

      const deleteLink = document.createElement('a');
      deleteLink.setAttribute('href', `#`)
      deleteLink.setAttribute('class', 'delete-link')
      const deleteIcon = document.createElement('span');
      deleteIcon.setAttribute('class', 'material-icons');
      deleteIcon.innerText = 'close';

      shelfList.appendChild(newLink);
      newLink.appendChild(newShelf);
      
      deleteLink.appendChild(deleteIcon);
      let input = document.querySelector(".shelf-input");
      input.value = "";

    }catch (e) {
      console.log(e);
    }

  });

});
