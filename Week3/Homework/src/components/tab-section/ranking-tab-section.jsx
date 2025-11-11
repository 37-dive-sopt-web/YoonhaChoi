import Tab from "../tab";

const RankingTabSection = ({ storedData }) => {
  const onStorageReset = () => {
    window.localStorage.removeItem("memoryGameRecords");
    window.location.reload();
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Seoul",
    };

    const formatted = date.toLocaleString("ko-KR", options);

    return formatted.replace(/\s(오전|오후)/, " $1").replace(/,/g, "");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h2 className="nowrap mb-4 text-2xl font-bold whitespace-nowrap">
          게임 보드
        </h2>
        <Tab variant="reset" onClick={onStorageReset}>
          게임 리셋
        </Tab>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-green-200">
              <th className="w-16 px-4 py-3 text-sm whitespace-nowrap">순위</th>
              <th className="w-20 text-sm whitespace-nowrap">레벨</th>
              <th className="w-32 text-sm whitespace-nowrap">
                클리어 시간(초)
              </th>
              <th className="text-sm whitespace-nowrap">기록 시각</th>
            </tr>
          </thead>

          <tbody>
            {storedData && storedData.length > 0 ? (
              storedData.map((record, index) => (
                <tr>
                  <td className="px-4 py-3 text-sm">{index + 1}</td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    Level {record.level}
                  </td>
                  <td className="px-4 py-3 text-sm">{record.clearTime}</td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    {formatTimestamp(record.timestamp)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-8 text-center text-gray-500">
                  클리어 기록이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RankingTabSection;
