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
    } catch (e) {
      console.log(e.msg);
    }
  });
});
