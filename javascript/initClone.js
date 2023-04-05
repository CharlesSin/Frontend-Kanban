import { readFirestoreData } from "../module/CRUD.js";

export function initCloneMission() {
  const USER = JSON.parse(window.localStorage.getItem("googleUser")) || null;
  const LOCALDATA = JSON.parse(window.localStorage.getItem("kanban-data")) || null;

  if (!LOCALDATA) {
    if (!USER) {
      readFirestoreData("kanban-data").then((dummy) => {
        const { data } = dummy;
        localStorage.setItem("kanban-data", data);
      });
    } else {
      localStorage.removeItem("kanban-data");
      readFirestoreData("kanban-data", `${USER.uid}`).then((dummy) => {
        const { data } = dummy;
        localStorage.setItem("kanban-data", data);
      });
    }
  }
}
