import Kanban from "./kanban.js";

import { googleSignInFunc, googleSignOutFunc } from "../module/googleAuth.js";
import { checkUserStatus } from "../javascript/userStatus.js";

new Kanban(document.querySelector(".kanban"));

checkUserStatus();

// 觸發登入按鈕
document.querySelector("#google-sign-in")?.addEventListener("click", function () {
  googleSignInFunc();
});

// 觸發登出按鈕
document.querySelector("#google-sign-out")?.addEventListener("click", function () {
  googleSignOutFunc();
});
