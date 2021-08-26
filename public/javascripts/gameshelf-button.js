document.addEventListener("DOMContentLoaded", event => {
  const button = document.querySelector(".add-to-game-shelf-button");
  const dropdown = document.querySelector(".game-shelf-dropdown");

  button.addEventListener("click", async(event) => {
    const selectedShelf = document.querySelector(`option[value="${dropdown.value}"]`);
    const shelfId = parseInt(selectedShelf.dataset.id, 10);
    const gameId = parseInt(selectedShelf.dataset.gameid, 10);

    try {
      const res = await fetch(`/gameshelves/${shelfId}/games`, {
        method: "POST",
        body: JSON.stringify({shelfId, gameId}),
        headers: {
          "Content-Type": "application/json"
        },
      });
      // const resObject = await res.json();
      // const ownedShelves = resObject.ownedShelves
      const playedStatusList = document.querySelector('.played-status-list')
      // check the current contents of the played-status div
      const divPlayedLi = [...document.querySelectorAll('.played-status li')];
      const divPlayedStatusContents = divPlayedLi.map(li => li.innerText)

      if (!divPlayedStatusContents.includes(selectedShelf.value)) {
        const successMessage = document.createElement('div');
        successMessage.innerText = `Added to ${selectedShelf.value} shelf`;
        successMessage.setAttribute('class', 'success-message')
        const gameInfoContainer = document.querySelector('.game-info-container');
        gameInfoContainer.appendChild(successMessage);

        setTimeout(() => {
          successMessage.style.opacity = 0;
          successMessage.style.transition = 'opacity 0.5s ease-out 0s'
        }, 1000)

        setTimeout(() => {
          successMessage.remove();
        }, 2100)

        //TODO: add selectedShelf.value to playedStatusList dynamically
        const li = document.createElement('li');
        li.innerText = selectedShelf.value;
        playedStatusList.appendChild(li);
      }


    } catch (e) {
      console.log(e);
    }
  });
});
