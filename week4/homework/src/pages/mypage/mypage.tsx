import Button from "../../components/button/button";
import Input from "../../components/input/input";
import { useMyPage } from "../../hooks/use-mypage"; 
import * as styles from "./mypage.css"; 


const MyPage = () => {
  const {
    formData,
    isDisabled,
    handleChange,
    handleAgeChange,
    handleSave,
  } = useMyPage();

  return (
    <>
      <h1 className={styles.title}>내 정보</h1>
      
      <div className={styles.idContainer}>
          <label className={styles.label}>아이디</label>
          <p className={styles.name}>
             {formData.username}
          </p>
      </div>
      
      <Input 
        label="이름" 
        placeholder="이름을 입력해주세요." 
        value={formData.name}
        onChange={(e) => handleChange(e, 'name')}
      />
      
      <Input 
        label="이메일" 
        placeholder="이메일을 입력해주세요." 
        value={formData.email || ''}
        onChange={(e) => handleChange(e, 'email')}
      />
      
      <Input 
        label="나이" 
        placeholder="나이를 입력해주세요." 
        value={formData.age === undefined || formData.age === null ? '' : String(formData.age)}
        onChange={handleAgeChange}
        type="number" 
      />

      <Button 
        children="저장"
        disabled={isDisabled} 
        onClick={handleSave}
      />
    </>
  );
};

export default MyPage;