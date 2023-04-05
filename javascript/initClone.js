import { readFirestoreData } from "../module/CRUD.js";

export function initCloneMission() {
  const USER = JSON.parse(window.localStorage.getItem("googleUser")) || null;
  if (USER) {
    readFirestoreData("kanban-data", `${USER.uid}`).then((dummy) => {
      const { data } = dummy;
      localStorage.setItem("kanban-data", data);
    });
  } else {
    readFirestoreData("kanban-data").then((dummy) => {
      const { data } = dummy;
      localStorage.setItem("kanban-data", data);
    });
  }
}
