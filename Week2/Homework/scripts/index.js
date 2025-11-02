import { members } from "./members_data.js";

const memberListBody = document.querySelector(".member-list tbody");
const noDataParagraph = document.querySelector(".member-list + p");
const searchForm = document.querySelector("form");

const modal = document.getElementById("add-member-modal");
const closeButton = document.querySelector(".close-button");
const addMemberForm = document.getElementById("add-member-form");

// 검색 폼 제출 핸들러
const handleFormSubmit = (event) => {
  event.preventDefault();

  const allMembers = getMembers();
  const filters = getFilterValues();
  const filteredMembers = filterMembers(allMembers, filters);

  renderMemberList(filteredMembers);
};

// 검색 폼 리셋 핸들러
const handleFormReset = () => {
  setTimeout(() => {
    renderMemberList();
  }, 0);
};

// 데이터 저장하기
if (!localStorage.getItem("membersData")) {
  localStorage.setItem("membersData", JSON.stringify(members));
}

// 데이터 가져오기
const getMembers = () => {
  const membersJson = localStorage.getItem("membersData");

  if (membersJson) {
    return JSON.parse(membersJson);
  }
};

// 필터링 함수
const getFilterValues = () => {
  const formData = new FormData(searchForm);
  const filters = {};

  for (const [key, value] of formData.entries()) {
    if (value !== "") {
      const finalKey = key === "team" ? "codeReviewGroup" : key;
      filters[finalKey] = value.trim();
    }
  }
  return filters;
};

// 필터링 로직 구현
const filterMembers = (membersData, filters) => {
  return membersData.filter((member) => {
    for (const key in filters) {
      const filterValue = filters[key];
      const memberValue = String(member[key]);

      if (["name", "englishName", "github"].includes(key)) {
        if (!memberValue.toLowerCase().includes(filterValue.toLowerCase())) {
          return false;
        }
      } else if (["age", "codeReviewGroup"].includes(key)) {
        if (memberValue !== filterValue) {
          return false;
        }
      } else if (["gender", "role"].includes(key)) {
        if (memberValue.toLowerCase() !== filterValue.toLowerCase()) {
          return false;
        }
      }
    }
    return true;
  });
};

// 멤버 삭제
const updateLocalStorage = (newMembers) => {
  localStorage.setItem("membersData", JSON.stringify(newMembers));
};

// '삭제' 버튼 클릭 핸들러
const onClickDelete = () => {
  const checkedCheckboxes = document.querySelectorAll(".checkListItem:checked");
  const headerCheckbox = document.querySelector(
    ".member-list thead input[type='checkbox']"
  );

  const checkedIds = Array.from(checkedCheckboxes)
    .filter((cb) => cb !== headerCheckbox)
    .map((cb) => Number(cb.dataset.memberId));

  const allMembers = getMembers();

  const newMembers = allMembers.filter(
    (member) => !checkedIds.includes(member.id)
  );

  updateLocalStorage(newMembers);

  const filters = getFilterValues();
  const filteredMembers = filterMembers(newMembers, filters);

  renderMemberList(filteredMembers);
};

// '추가' 버튼 클릭 핸들러
const onClickPlus = () => {
  toggleModal(true);
};

// 새 ID 생성 함수
const getNewId = (membersData) => {
  if (membersData.length === 0) return 1;

  const maxId = Math.max(...membersData.map((member) => member.id));
  return maxId + 1;
};

// 새 멤버 추가 폼 제출 핸들러
const handleAddMemberSubmit = (event) => {
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

// 멤버 리스트 렌더링 함수
const renderMemberList = (data) => {
  const membersData = data || getMembers();

  memberListBody.innerHTML = "";

  if (membersData.length === 0) {
    noDataParagraph.style.display = "block";

    attachCheckboxListeners();
    return;
  }

  const tableHtml = membersData
    .map(
      (member) => `
        <tr data-id="${member.id}" class="listBodyItem">
          <td><input type="checkbox" class="checkListItem" data-member-id="${
            member.id
          }" aria-label="${member.name}" /></td>
          <td>${member.name}</td>
          <td>${member.englishName}</td>
          <td><a href="https://github.com/${
            member.github
          }" target="_blank" rel="noreferrer">${member.github}</a></td>
          <td>${member.gender === "female" ? "여자" : "남자"}</td>
          <td>${member.role}</td>
          <td>${member.codeReviewGroup}</td>
          <td>${member.age}</td>
        </tr>
      `
    )
    .join("");

  memberListBody.innerHTML = tableHtml;
  noDataParagraph.style.display = "none";

  attachCheckboxListeners();
};

// 체크박스 동기화 함수
const attachCheckboxListeners = () => {
  const headerCheckbox = document.querySelector(
    ".member-list thead input[type='checkbox']"
  );
  const itemCheckboxes = document.querySelectorAll(".checkListItem");

  if (!headerCheckbox) return;

  const updateHeaderCheckbox = () => {
    const totalItems = itemCheckboxes.length;
    if (totalItems === 0) {
      headerCheckbox.checked = false;
      return;
    }

    const checkedItems = document.querySelectorAll(
      ".checkListItem:checked"
    ).length;
    headerCheckbox.checked = totalItems === checkedItems;
  };

  // 헤더 체크박스 변경 핸들러
  const handleHeaderCheck = (event) => {
    const isChecked = event.target.checked;
    itemCheckboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });
  };

  const handleItemCheck = () => {
    updateHeaderCheckbox();
  };

  headerCheckbox.removeEventListener("change", handleHeaderCheck);
  headerCheckbox.addEventListener("change", handleHeaderCheck);

  itemCheckboxes.forEach((checkbox) => {
    checkbox.removeEventListener("change", handleItemCheck);
    checkbox.addEventListener("change", handleItemCheck);
  });

  updateHeaderCheckbox();
};

// 모달 토글 함수
const toggleModal = (isOpen) => {
  if (modal) {
    modal.style.display = isOpen ? "block" : "none";
    if (isOpen) {
      document.getElementById("add-member-form")?.reset();
    }
  }
};

// 초기화 함수
document.addEventListener("DOMContentLoaded", () => {
  renderMemberList();

  const resetButton = searchForm.querySelector('button[type="reset"]');

  searchForm.addEventListener("submit", handleFormSubmit);
  resetButton.addEventListener("click", handleFormReset);

  const deleteButton = document.querySelector(
    ".list-title button[type='delete']"
  );
  const plusButton = document.querySelector(".list-title button[type='plus']");

  deleteButton.addEventListener("click", onClickDelete);
  plusButton.addEventListener("click", onClickPlus);

  // 모달 관련 이벤트 리스너
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      toggleModal(false);
    });
  }

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      toggleModal(false);
    }
  });

  // 새 멤버 추가 폼 제출 이벤트 리스너
  if (addMemberForm) {
    addMemberForm.addEventListener("submit", handleAddMemberSubmit);
  }
});
