// When the dom loads, intialize our extension
document.addEventListener("DOMContentLoaded", () => {
  // making a div and assigning it to a var meme
    const meme = document.createElement(`div`);
    //set the id of the variable to the string meme
    meme.setAttribute("id", "meme");
    //attach meme to the bottom of the body in html
    document.querySelector("body").appendChild(meme);
    // creating an element with audio tag and assigning it to audioEl
    const audioEl = document.createElement("audio");
    //assign src to relative path of mp3 file
    audioEl.src = "Rick Roll Sound Effect.mp3"
    //auto play rickroll
    audioEl.play();
    //create a click button to the first id of takeScreenshot and invoke takeScreenshot function
    document.getElementById("takeScreenshot").addEventListener('click', () => {
      takeScreenshot()
    })
})

function takeScreenshot() {
  // Capture the visible area of the currently active tab
  chrome.tabs.captureVisibleTab({ format: "png" }, function (dataUrl) {
    // Create a new image element
    const screenshotImg = new Image();

    // Set the 'src' attribute of the image to the captured data URL
    screenshotImg.src = dataUrl;

    // Open a new tab and display the screenshot image in it
    chrome.tabs.create({ url: screenshotImg.src });
  });
}

// sending GET request to api URL
fetch ('https://api.imgflip.com/get_memes')
    .then(response => {
      //conditional: if status !== 200 throw an error
    if (!response.ok) {
      throw new Error('Too bad');
    } // if it is 200 return that data in JSON format
    return response.json();
  })  // chain with a .then
    .then(data => {
      // generating a random number betweeo 0-100 and assigning it
      let randomNum = Math.floor(Math.random() * 101);
      //create a variabble and assign with one of our memes from the array at index randomNum
      const tester = data.data.memes[randomNum]['url'];
      // create an element with the img tag and assigning it to memeIMG
      const memeImg = document.createElement('img');
      //assign the id src to tester
      memeImg.setAttribute("src", tester);
      // styling the memeImg to fit the div
      memeImg.style.width = "500px"
      memeImg.style.height = "500px"
      // appending the meme onto our div
      document.getElementById("meme").appendChild(memeImg);
    })
    //console log the error found in the conditional on lines 39-40
    .catch(error => {
      console.log(error)
    });

  