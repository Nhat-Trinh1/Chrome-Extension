document.addEventListener("DOMContentLoaded", () => {
    const meme = document.createElement(`div`);
    meme.setAttribute("id", "meme");
    document.querySelector("body").appendChild(meme);
    
    const audioEl = document.createElement("audio");
    //assign src to relative path of mp3 file
    audioEl.src = "Rick Roll Sound Effect.mp3"
    //auto play rickroll
    audioEl.play();
})


fetch ('https://api.imgflip.com/get_memes')
    .then(response => {
    if (!response.ok) {
      throw new Error('Too bad');
    }
    return response.json();
  })
    .then(data => {
      let randomNum = Math.floor(Math.random() * 101);
      const tester = data.data.memes[randomNum]['url'];
      const memeImg = document.createElement('img');
      memeImg.setAttribute("src", tester);
      memeImg.style.width = "500px"
      memeImg.style.height = "500px"
      document.getElementById("meme").appendChild(memeImg);
    })
    .catch(error => {
      console.log(error)
    });