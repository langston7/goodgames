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
      const shelfList = document.querySelector(".shelf-list");
      const newLink = document.createElement('a');
      const newShelf = document.createElement('li');
      newShelf.setAttribute('class', 'shelf-link')
      newShelf.innerText = shelfName;
      shelfList.appendChild(newLink);
      newLink.appendChild(newShelf);
      let input = document.querySelector(".shelf-input");
      input.value = "";
    }catch (e) {
      console.log(e);
    }

  });

});
