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

      const resObject = await res.json();
      // const ownedShelves = resObject.ownedShelves
      // const playedStatusList = document.querySelector('.played-status-list')

      // check the current contents of the played-status div
      // const divPlayedLi = [...document.querySelectorAll('.played-status li')];
      // const divPlayedStatusContents = divPlayedLi.map(li => li.innerText)

      // for (let i = 0; i < ownedShelves.length; i++) {
      //   const shelf = ownedShelves[i];

        // if any contents match of ownedShelves match the value of contents currently in played-status div, then don't add it to played-status div
      //   if (divPlayedStatusContents.includes(shelf)) {
      //     continue;
      //   }
      //   const li = document.createElement('li');
      //   li.innerText = shelf;
      //   playedStatusList.appendChild(li);
      // }

      // if (!ownedShelves.length) {
      //   const li = document.createElement('li');
      //   li.innerText = selectedShelf.value;
      //   playedStatusList.appendChild(li);
      // }

    } catch (e) {
      console.log(e);
    }
  });
});
