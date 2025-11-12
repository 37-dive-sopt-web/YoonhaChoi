import "./storage.js";
import { handleFormSubmit, handleFormReset } from "./filter.js";
import { renderMemberList, onClickDelete } from "./render.js";
import { onClickPlus, setupModalListeners } from "./modal.js";

const searchForm = document.querySelector("form");
const deleteButton = document.querySelector(
  ".list-title button[type='delete']"
);
const plusButton = document.querySelector(".list-title button[type='plus']");
const resetButton = searchForm.querySelector('button[type="reset"]');

// 초기화 함수
document.addEventListener("DOMContentLoaded", () => {
  renderMemberList();

  searchForm.addEventListener("submit", handleFormSubmit);
  resetButton.addEventListener("click", handleFormReset);

  deleteButton.addEventListener("click", onClickDelete);
  plusButton.addEventListener("click", onClickPlus);

  setupModalListeners();
});
