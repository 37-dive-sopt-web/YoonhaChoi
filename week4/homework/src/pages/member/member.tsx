import axios from "axios";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import { useState } from "react";
import * as styles from "./member.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface MemberData {
  id: number;
  username: string;
  name: string;
  email: string;
  age: number;
  status: string;
}

const MemberPage = () => {
  const [memberId, setMemberId] = useState('');
  const [memberInfo, setMemberInfo] = useState<MemberData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValidId = memberId.length > 0 && !isNaN(Number(memberId)) && Number(memberId) > 0;
  const isDisabled = !isValidId || isLoading;

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, '');
    setMemberId(numericValue);
    setMemberInfo(null); 
    setError(null);
  };

  const handleSearch = async () => {
    if (isDisabled) return;

    setIsLoading(true);
    setMemberInfo(null);
    setError(null);

    const userIdNumber = Number(memberId);
    const endpoint = `${API_BASE_URL}/api/v1/users/${userIdNumber}`;
    
    try {
      const response = await axios.get(endpoint);

      if (response.data.success) {
        setMemberInfo(response.data.data as MemberData);
      } 
    } catch (error) {
      setError("사용자 정보를 찾을 수 없습니다."); 
            
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
     <p className={styles.title}>회원 조회</p>
     
     <Input
        label="회원 ID"
        placeholder="숫자만 입력" value={memberId}
        onChange={handleIdChange}
        type="number"/>

     <Button children="확인" disabled={isDisabled} 
        onClick={handleSearch}/>

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