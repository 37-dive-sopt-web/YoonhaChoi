import { getMembers, updateLocalStorage } from "./storage.js";
import { renderMemberList } from "./render.js";

const modal = document.getElementById("add-member-modal");
const addMemberForm = document.getElementById("add-member-form");

// 모달 토글 함수
export const toggleModal = (isOpen) => {
  if (modal) {
    modal.style.display = isOpen ? "block" : "none";
    if (isOpen) {
      addMemberForm?.reset();
    }
  }
};

// '추가' 버튼 클릭 핸들러

export const onClickPlus = () => {
  toggleModal(true);
};

// 새 ID 생성 함수
const getNewId = (membersData) => {
  if (membersData.length === 0) return 1;

  const maxId = Math.max(...membersData.map((member) => member.id));
  return maxId + 1;
};

// 새 멤버 추가 폼 제출 핸들러
export const handleAddMemberSubmit = (event) => {
  event.preventDefault();

  const allMembers = getMembers();
  const newId = getNewId(allMembers);

  const formData = new FormData(addMemberForm);
  const newMember = { id: newId };

  for (const [key, value] of formData.entries()) {
    newMember[key] =
      key === "codeReviewGroup" || key === "age" ? Number(value) : value.trim();
  }

  allMembers.push(newMember);
  updateLocalStorage(allMembers);

  toggleModal(false);
  renderMemberList();
};

export const setupModalListeners = () => {
  const closeButton = document.querySelector(".close-button");

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      toggleModal(false);
    });
  }

  // 모달 외부 클릭 시 닫기
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      toggleModal(false);
    }
  });

  // 새 멤버 추가 폼 제출 이벤트 리스너
  if (addMemberForm) {
    addMemberForm.addEventListener("submit", handleAddMemberSubmit);
  }
};
