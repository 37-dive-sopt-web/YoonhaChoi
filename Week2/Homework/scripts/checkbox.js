// 체크박스 동기화 함수
export const attachCheckboxListeners = () => {
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
