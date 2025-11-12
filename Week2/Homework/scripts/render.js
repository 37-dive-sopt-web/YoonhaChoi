import { getMembers, updateLocalStorage } from "./storage.js";
import { getFilterValues, filterMembers } from "./filter.js";
import { attachCheckboxListeners } from "./checkbox.js";

const memberListBody = document.querySelector(".member-list tbody");
const noDataParagraph = document.querySelector(".member-list + p");

// 멤버 리스트 렌더링 함수
export const renderMemberList = (data) => {
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

// '삭제' 버튼 클릭 핸들러

export const onClickDelete = () => {
  const checkedCheckboxes = document.querySelectorAll(".checkListItem:checked");

  if (checkedCheckboxes.length === 0) return;

  const checkedIds = Array.from(checkedCheckboxes).map((cb) =>
    Number(cb.dataset.memberId)
  );

  const allMembers = getMembers();

  const newMembers = allMembers.filter(
    (member) => !checkedIds.includes(member.id)
  );

  updateLocalStorage(newMembers);

  const filters = getFilterValues();
  const filteredMembers = filterMembers(newMembers, filters);

  renderMemberList(filteredMembers);
};
