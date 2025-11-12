import { getMembers } from "./storage.js";
import { renderMemberList } from "./render.js";

const searchForm = document.querySelector("form");

const includesCI = (a = "", b = "") =>
  String(a).toLowerCase().includes(String(b).toLowerCase());

const equalsCI = (a = "", b = "") =>
  String(a).toLowerCase() === String(b).toLowerCase();

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

// 필터링 로직 함수
const FILTERS = {
  name: (m, v) => includesCI(m.name, v),
  englishName: (m, v) => includesCI(m.englishName, v),
  github: (m, v) => includesCI(m.github, v),

  age: (m, v) => Number(m.age) === Number(v),
  codeReviewGroup: (m, v) => Number(m.codeReviewGroup) === Number(v),

  gender: (m, v) => equalsCI(m.gender, v),
  role: (m, v) => equalsCI(m.role, v),
};

// 필터링 로직
export const filterMembers = (membersData, filters) => {
  const entries = Object.entries(filters);

  if (!entries.length) return membersData;

  return membersData.filter((member) =>
    entries.every(([key, value]) => {
      return FILTERS[key]?.(member, value) ?? true;
    })
  );
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
