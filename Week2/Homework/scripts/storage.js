import { members } from "./members_data.js";

// 로컬 스토리지 초기화
if (!localStorage.getItem("membersData")) {
  localStorage.setItem("membersData", JSON.stringify(members));
}

// 로컬 스토리지에서 멤버 데이터를 가져오기
export const getMembers = () => {
  const membersJson = localStorage.getItem("membersData");
  if (membersJson) {
    return JSON.parse(membersJson);
  }
};

// 변경된 멤버 데이터를 로컬 스토리지에 저장하기
export const updateLocalStorage = (newMembers) => {
  localStorage.setItem("membersData", JSON.stringify(newMembers));
};
