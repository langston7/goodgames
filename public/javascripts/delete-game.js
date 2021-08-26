document.addEventListener("DOMContentLoaded", event => {
  const gamesList = document.querySelectorAll('.gameshelf-games > div');
  const gamesListArray = Array.from(gamesList);
  const testurl = window.location.pathname;
  const urlArray = testurl.split('/');

  const shelfId = urlArray[2];

  for (let i = 0; i < gamesListArray.length; i++) {
    const game = gamesListArray[i];
    //create a clickable a tag
    const deleteButton = document.createElement('a');
    deleteButton.setAttribute('href', '#')
    deleteButton.setAttribute('class', 'delete-button')

    //create the icon to represent the delete button
    const deleteIcon = document.createElement('span');
    deleteIcon.setAttribute('class', 'material-icons');
    deleteIcon.innerText = 'delete';

    //add the icon as a child to the clickable a tag
    deleteButton.appendChild(deleteIcon);
    game.appendChild(deleteButton);

    const gameId = game.dataset.gameid;


    deleteButton.addEventListener('click', async(event) => {
      event.preventDefault();

      await fetch(`/gameshelves/${shelfId}/games/${gameId}`, {
        method: "DELETE",
      });

      const currentContainer = document.querySelector(`div[data-gameid="${gameId}"]`);
      currentContainer.remove();
    })
    //<span class="material-icons-outlined">delete</span>
  }
})
