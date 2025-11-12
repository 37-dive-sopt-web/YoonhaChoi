import Tab from "./tab";

const Header = ({ activeTab, handleTab }) => {
  return (
    <div className="max-w-auto flex h-20 items-center justify-between rounded-2xl bg-green-100 px-5">
      <h1 className="text-xl font-bold text-gray-800 sm:text-3xl">
        숫자 카드 짝 맞추기
      </h1>
      <div className="flex gap-2">
        <Tab isActive={activeTab === "게임"} onClick={() => handleTab("게임")}>
          게임
        </Tab>
        <Tab isActive={activeTab === "랭킹"} onClick={() => handleTab("랭킹")}>
          랭킹
        </Tab>
      </div>
    </div>
  );
};

export default Header;
