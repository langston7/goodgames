document.addEventListener("DOMContentLoaded", event => {
  const gamesList = document.querySelectorAll('a[class="game-link"] > div');
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



      // const res = await fetch(`/gameshelves/api/${shelfId}`);
      // const resObj = await res.json();
      // console.log(resObj);
      // const shelfName = resObj.shelfName;

      const targetLink = document.querySelector('#currently-visiting');
      const currentText = targetLink.innerText;
      const currentTextArray = currentText.split(' ');
      const shelfNameArray = currentTextArray.slice(0, (currentTextArray.length - 1))
      const shelfName = shelfNameArray.join(' ');
      const numberWithParentheses = currentTextArray[currentTextArray.length - 1].split('');
      numberWithParentheses.shift();
      numberWithParentheses.pop();
      const number = parseInt(numberWithParentheses.join(''), 10);

      const allLink = document.querySelector('.all-link');
      const allLinkText = allLink.innerText; // All (12)
      const allLinkTextArray = allLinkText.split(' '); // [All, (12)]
      const allLinkNameArray = allLinkTextArray.slice(0, (currentTextArray.length - 1)) // [All]
      const allLinkName = allLinkNameArray[0]; // All
      const allLinkNumberWithParentheses = allLinkTextArray[allLinkTextArray.length - 1].split(''); // ['(', '1', '2', ')']
      allLinkNumberWithParentheses.shift(); // ['1', '2', ')']
      allLinkNumberWithParentheses.pop(); // ['1', '2']
      const allLinkNumber = parseInt(allLinkNumberWithParentheses.join(''), 10);

      targetLink.innerText = `${shelfName} (${number - 1})`;
      allLink.innerText = `${allLinkName} (${allLinkNumber - 1})`

      const currentContainer = document.querySelector(`div[data-gameid="${gameId}"]`);
      currentContainer.remove();
    })
  }
})
