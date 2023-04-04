export function checkUserStatus() {
  const userStatus = window.localStorage.getItem("googleToken") || null;
  const USER = JSON.parse(window.localStorage.getItem("googleUser")) || null;

  if (userStatus) {
    document.querySelector("#google-sign-in").classList.add("d-none");
    document.querySelector("#google-sign-out").classList.remove("d-none");
    document.querySelector("#user-profile-img").setAttribute("src", `${USER.photoURL}`);
  } else {
    document.querySelector("#google-sign-in").classList.remove("d-none");
    document.querySelector("#google-sign-out").classList.add("d-none");
  }
}
