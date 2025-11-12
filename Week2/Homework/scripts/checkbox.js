const memberListBody = document.querySelector(".member-list tbody");
const headerCheckbox = document.querySelector(
  ".member-list thead input[type='checkbox']"
);

const updateHeaderCheckbox = () => {
  if (!headerCheckbox) return;

  const itemCheckboxes = document.querySelectorAll(".checkListItem");
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

const handleHeaderCheck = (event) => {
  if (!headerCheckbox) return;
  const isChecked = event.target.checked;
  document.querySelectorAll(".checkListItem").forEach((checkbox) => {
    checkbox.checked = isChecked;
  });
};

export const setupCheckboxDelegation = () => {
  if (!memberListBody || !headerCheckbox) return;

  headerCheckbox.addEventListener("change", handleHeaderCheck);

  memberListBody.addEventListener("change", (e) => {
    if (e.target.classList.contains("checkListItem")) {
      updateHeaderCheckbox();
    }
  });
};

export { updateHeaderCheckbox };
