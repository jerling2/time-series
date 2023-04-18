const loginButton = document.getElementById("login-button");
const loginPopup = document.getElementById("login-popup-container");
const submit = document.getElementById("submit-login-button");
const searchButton = document.getElementById("search-button");
const USER = "admin";
const PASS = "admin";


function validate_admin(user, pass){
  if (user == USER && pass == PASS){
    alert("success");
  } else {
    alert("fail");
  }
}

loginButton.addEventListener("click", function() {
  loginPopup.style.display = "block";
});

submit.addEventListener("click", function() {
  loginPopup.style.display = "none";
});

searchButton.addEventListener("click", function() {
  const searchValue = document.getElementById("search-input").value;
  window.location.href = "search-results.php?query=" + encodeURIComponent(searchValue);
});