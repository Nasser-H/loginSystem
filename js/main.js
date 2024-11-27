var regesterName = document.getElementById("regesterName");
var regesterEmail = document.getElementById("regesterEmail");
var regesterPassword = document.getElementById("regesterPassword");
var email = document.getElementById("email");
var password = document.getElementById("password");
var innerLogin = document.querySelector(".inner-login");
var innerRegest = document.querySelector(".inner-regest");
var innerHome = document.querySelector(".inner-home");
var main = document.querySelector("main");
var loginAlart = document.querySelectorAll(".inner-login .alart");
var regestAlart = document.querySelectorAll(".inner-regest .alart");
var nav = document.querySelector("nav");

/* stop load form */
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault;
});

/* local user list */
var usersList = [];
if (localStorage.getItem("users")) {
  usersList = JSON.parse(localStorage.getItem("users"));
}

/* Screen Stability */
if (
  sessionStorage.getItem("screenStability") == "login" ||
  sessionStorage.getItem("screenStability") == null
) {
  Signin();
} else if (sessionStorage.getItem("screenStability") == "regest") {
  SignUp();
} else {
  welcome(sessionStorage.getItem("screenStability"));
}

/* regester */
function regester() {
  newUser = {
    userName: regesterName.value,
    email: regesterEmail.value,
    password: regesterPassword.value,
  };
  if (newUser.userName == "" || newUser.email == "" || newUser.password == "") {
    regestAlart[0].classList.replace("d-none", "d");
    regestAlart[1].classList.add("d-none");
    regestAlart[2].classList.add("d-none");
  } else {
    if (checkEmailFound(newUser.email)) {
      regestAlart[0].classList.add("d-none");
      regestAlart[1].classList.replace("d-none", "d");
      regestAlart[2].classList.add("d-none");
    } else {
      usersList.push(newUser);
      localStorage.setItem("users", JSON.stringify(usersList));
      regestAlart[0].classList.add("d-none");
      regestAlart[1].classList.add("d-none");
      regestAlart[2].classList.replace("d-none", "d");
    }
  }
}

/* login */
function login() {
  user = {
    email: email.value,
    password: password.value,
  };
  if (user.email == "" || user.password == "") {
    loginAlart[0].classList.remove("d-none");
    loginAlart[1].classList.add("d-none");
  } else if (checkUserValied(user.email, user.password).state) {
    welcome(checkUserValied(user.email, user.password).user);
  } else {
    loginAlart[0].classList.add("d-none");
    loginAlart[1].classList.remove("d-none");
  }
}

/* logout */
function logout() {
  innerHome.classList.add("d-none");
  nav.classList.add("d-none");
  loginAlart[0].classList.add("d-none");
  loginAlart[1].classList.add("d-none");
  regestAlart[0].classList.add("d-none");
  regestAlart[1].classList.add("d-none");
  regestAlart[2].classList.add("d-none");
  email.value = "";
  password.value = "";
  Signin();
}

/* Move pages */
function Signin() {
  innerLogin.classList.remove("d-none");
  innerRegest.classList.add("d-none");
  loginAlart[0].classList.add("d-none");
  loginAlart[1].classList.add("d-none");
  regestAlart[0].classList.add("d-none");
  regestAlart[1].classList.add("d-none");
  regestAlart[2].classList.add("d-none");
  email.value = "";
  password.value = "";
  sessionStorage.setItem("screenStability", "login");
}

/* Move pages to Home */
function welcome(userName) {
  innerLogin.classList.add("d-none");
  innerRegest.classList.add("d-none");
  innerHome.classList.remove("d-none");
  nav.classList.remove("d-none");
  loginAlart[0].classList.add("d-none");
  loginAlart[1].classList.add("d-none");
  regestAlart[0].classList.add("d-none");
  regestAlart[1].classList.add("d-none");
  regestAlart[2].classList.add("d-none");
  main.style.cssText = `
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);`;
  sessionStorage.setItem("screenStability", "welcome");
  innerHome.innerHTML = `<h2 class="h1 m-0">Welcome ${userName}</h2>`;
  sessionStorage.setItem("screenStability", userName);
}

/* Move pages */
function SignUp() {
  innerLogin.classList.add("d-none");
  innerRegest.classList.remove("d-none");
  loginAlart[0].classList.add("d-none");
  loginAlart[1].classList.add("d-none");
  regestAlart[0].classList.add("d-none");
  regestAlart[1].classList.add("d-none");
  regestAlart[2].classList.add("d-none");
  regesterName.value = "";
  regesterEmail.value = "";
  regesterPassword.value = "";
  sessionStorage.setItem("screenStability", "regest");
}

/* Email check */
function checkEmailFound(email) {
  var state = false;
  for (var i = 0; i < usersList.length; i++) {
    if (usersList[i].email == email) {
      state = true;
      break;
    }
  }
  return state;
}

/* Check existing user */
function checkUserValied(email, password) {
  var state = {
    state: false,
    user: "",
  };
  for (var i = 0; i < usersList.length; i++) {
    if (usersList[i].email == email && usersList[i].password == password) {
      state = {
        state: true,
        user: usersList[i].userName,
      };
      break;
    }
  }
  return state;
}
