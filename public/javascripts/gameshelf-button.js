document.addEventListener("DOMContentLoaded", event => {
  const button = document.querySelector(".add-to-game-shelf-button");
  const dropdown = document.querySelector(".game-shelf-dropdown");
  const gameTitle = document.querySelector(".game-info-header");
  button.addEventListener("click", async(event) => {
    const selectedShelf = document.querySelector(`option[value="${dropdown.value}"]`);
    const shelfId = parseInt(selectedShelf.dataset.id, 10);
    const gameId = parseInt(selectedShelf.dataset.gameid, 10);
    console.log(shelfId, gameId)
    try {
      const res = await fetch("http://localhost:8080/gameshelves/:id/games", {
        method: "POST",
        body: JSON.stringify({shelfId, gameId}),
        headers: {
          "Content-Type": "application/json"
        },
      });
    } catch {

    }
  });
});
