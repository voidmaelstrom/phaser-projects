// Workaround for audio in Safari
let finalAudioContext = null;
window.AudioContext = window.AudioContext || window.webkitAudioContext;
function fixAudioContext(e){if(finalAudioContext==null){finalAudioContext=new AudioContext();finalAudioContext.resume();}}
document.addEventListener("click",fixAudioContext);
document.addEventListener("touchstart",fixAudioContext);

function resizeContent()
{
  document.getElementById("content").style.width = window.innerWidth + "px";
  document.getElementById("content").style.height = window.innerHeight + "px";
}

window.addEventListener("load", function()
{
  // Seeing if the game is not running in an iframe
  if (window.top == window.self)
    {
    // Resize the iframe
    resizeContent();

    // Workaround for IOS devices to keep resizing and focusing the iframe
    setInterval(function()
      {
      resizeContent();
      document.getElementById("content").focus();
      }, 250);

    // Load the game
    document.getElementById("content").src = "index.html";

    // Show the iframe
    document.getElementById("content").style.display = "block";
    }
});

window.addEventListener("resize", function()
{
  // Resize iframe when the screen changes
  resizeContent();
});

let supportsOrientationChange = "onorientationchange" in window, orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
window.addEventListener(orientationEvent, function()
{
  // Resize the iframe as the screen orientation shifts
  resizeContent();
}, false);

if ("serviceWorker" in navigator)
{
  navigator.serviceWorker.register("worker.js").then(function(registration)
  {
    // Registration successful
    //console.log("ServiceWorker registration successful with scope: " + registration.scope);
    }).catch(function(err)
    {
    // Registration failed
    //console.log("ServiceWorker registration failed: " + err);
    });
}