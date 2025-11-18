import { Outlet } from "react-router";
import * as styles from "./header.css";
import { useHeaderLogic } from "../../hooks/use-delete"; 
import Modal from "../../components/modal/modal"; 


const Header = () => {
  const {
    isModalOpen,
    tabs,
    userName,
    handleTabClick,
    confirmDeactivate,
    setIsModalOpen,
  } = useHeaderLogic();

  return (
    <div>
      <header className={styles.headerContainer}>
        <div className={styles.leftSection}>
          <p className={styles.title}>마이페이지</p>
          <p>안녕하세요. {userName}님</p> 
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
      <main>
        <Outlet />
      </main>

      <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={confirmDeactivate}
      />
    </div>
  );
};

export default Header;