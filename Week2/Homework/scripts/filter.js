import { getMembers } from "./storage.js";
import { renderMemberList } from "./render.js";

const searchForm = document.querySelector("form");

// 필터링 함수
export const getFilterValues = () => {
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
export const filterMembers = (membersData, filters) => {
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

// 검색 폼 제출 핸들러
export const handleFormSubmit = (event) => {
  event.preventDefault();

  const allMembers = getMembers();
  const filters = getFilterValues();
  const filteredMembers = filterMembers(allMembers, filters);

  renderMemberList(filteredMembers);
};

// 검색 폼 리셋 핸들러
export const handleFormReset = () => {
  setTimeout(() => {
    renderMemberList();
  }, 0);
};
