import { useNavigate } from "react-router";
import * as styles from "./header.css";

const Header = () => {
  const navigate = useNavigate();

  const tabs = [
    { name: "내 정보", path: "/mypage" },
    { name: "회원 조회", path: "/mypage/members" },
    { name: "로그아웃", action: "" },
    { name: "회원탈퇴", path: "" },
  ];

  const handleTabClick = (tab: (typeof tabs)[0]) => {
    if (tab.path && tab.path !== "/mypage/delete" && tab.path !== "") {
      navigate(tab.path);
    }
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.leftSection}>
        <p className={styles.title}>마이페이지</p>
        <p>안녕하세요, 최윤하님</p>
      </div>

      <nav>
        <ul className={styles.tabList}>
          {tabs.map((tab) => (
            <li key={tab.name}>
              <button
                className={styles.tabButton}
                onClick={() => handleTabClick(tab)}
              >
                {tab.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
