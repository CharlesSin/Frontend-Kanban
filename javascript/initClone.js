import { readFirestoreData } from "../module/CRUD.js";

import Kanban from "./kanban.js";

export function initCloneMission() {
  const USER = JSON.parse(window.localStorage.getItem("googleUser")) || null;
  const LOCALDATA = JSON.parse(window.localStorage.getItem("kanban-data")) || null;

  if (LOCALDATA) {
    if (USER) {
      localStorage.removeItem("kanban-data");
      readFirestoreData("kanban-data", `${USER.uid}`).then((dummy) => {
        const { data } = dummy;
        console.log({ data });
        localStorage.setItem("kanban-data", data);
        removeAllChildNodes(document.querySelector(".kanban"));
        new Kanban(document.querySelector(".kanban"));
      });
    }
  } else {
    if (USER) {
      readFirestoreData("kanban-data", `${USER.uid}`).then((dummy) => {
        const { data } = dummy;
        console.log({ data });
        if (data) {
          localStorage.setItem("kanban-data", data);
          removeAllChildNodes(document.querySelector(".kanban"));
          new Kanban(document.querySelector(".kanban"));
        } else {
          const emptyData = [
            {
              id: 1,
              items: [],
            },
            {
              id: 2,
              items: [],
            },
            {
              id: 3,
              items: [],
            },
            {
              id: 4,
              items: [],
            },
          ];
          localStorage.setItem("kanban-data", JSON.stringify(emptyData));
          removeAllChildNodes(document.querySelector(".kanban"));
          new Kanban(document.querySelector(".kanban"));
        }
      });
    } else {
      readFirestoreData("kanban-data").then((dummy) => {
        const { data } = dummy;
        localStorage.setItem("kanban-data", data);
        removeAllChildNodes(document.querySelector(".kanban"));
        new Kanban(document.querySelector(".kanban"));
      });
    }
  }
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
