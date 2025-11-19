import Input from "../../components/input/input";
import Button from "../../components/button/button";
import { useMemberSearch } from "../../hooks/use-member-search";
import * as styles from "./member.css";

const MemberPage = () => {
 const {
    memberId,
    memberInfo,
    error,
    isDisabled,
    handleIdChange,
    handleSearch
  } = useMemberSearch();

  return (
    <>
     <p className={styles.title}>회원 조회</p>
     
     <Input
        label="회원 ID"
        placeholder="숫자만 입력"
        value={memberId}
        onChange={handleIdChange}
        type="number"
      />

     <Button 
        children="확인" 
        disabled={isDisabled} 
        onClick={handleSearch}
      />

      {error && <p className={styles.errorMessage}>{error}</p>}

      {memberInfo && (
        <table className={styles.table}>
          <tbody className={styles.tbody}>
            <tr className={styles.tr}>
              <th className={styles.label}>이름</th>
              <td className={styles.value}>{memberInfo.name}</td>
            </tr>
            
            <tr className={styles.tr}>
              <th className={styles.label}>아이디</th>
              <td className={styles.value}>{memberInfo.username}</td>
            </tr>
            
            <tr className={styles.tr}>
              <th className={styles.label}>이메일</th>
              <td className={styles.value}>{memberInfo.email}</td>
            </tr>
            
            <tr className={styles.tr}>
              <th className={styles.label}>나이</th>
              <td className={styles.value}>{memberInfo.age}</td>
            </tr>
          </tbody>
        </table>
        )}
      </>
  );
};

export default MemberPage;