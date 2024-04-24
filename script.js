import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDLtXhkZ0-aWlzm-4tN3B-YMP81bjO2L_0",
    authDomain: "eleven-011.firebaseapp.com",
    databaseURL: "https://eleven-011-default-rtdb.firebaseio.com",
    projectId: "eleven-011",
    storageBucket: "eleven-011.appspot.com",
    messagingSenderId: "798721861917",
    appId: "1:798721861917:web:efe4675e269c62458459f4"
  };


//   window.onload = function() {
//     document.querySelector('daily-quote').style.opacity = 1;
// }

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const quotesRef = ref(database, "dailyQuotes/quotes");

let spinnerWrapper = document.querySelector('.spinner-wrapper');

    window.addEventListener('load', function () {
        spinnerWrapper.parentElement.removeChild(spinnerWrapper);
    });
// Initialize an array to store the keys of the displayed quotes
let displayedKeys = [];

get(quotesRef).then((snapshot) => {
    const quotes = snapshot.val();
    const keys = Object.keys(quotes);

    // Check if all keys have been displayed
    if (displayedKeys.length === keys.length) {
        // If so, reset the displayedKeys array to start over
        displayedKeys = [];
    }

    // Select a random key that has not been displayed
    let randomKey;
    do {
        randomKey = keys[Math.floor(Math.random() * keys.length)];
    } while (displayedKeys.includes(randomKey));

    // Add the selected key to the displayedKeys array
    displayedKeys.push(randomKey);

    const dailyQuote = quotes[randomKey];
    document.getElementById("daily-quote").innerText = dailyQuote;
}).catch((error) => {
    console.error("Error getting data:", error);
});

$(document).ready(function() {
    // Show the spinner when the page loads
    $(".spinner").show();
  
    // Hide the spinner when the content has finished loading
    $(window).on("load", function() {
      $(".spinner").hide();
    });
  });
