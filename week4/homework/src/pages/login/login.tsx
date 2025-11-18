import { Link } from "react-router";
import Button from "../../components/button/button";
import Input from "../../components/input/input";
import * as styles from "./login.css"; 
import { useLogin } from "../../hooks/use-login"; 

const LoginPage = () => {
  const {
    credentials,
    errorMessage,
    isLoading,
    isFormValid,
    handleChange,
    handleLogin
  } = useLogin();
  
  return (
    <div className={styles.container}>
      <p className={styles.title}>로그인</p>
      
      <Input 
        label="아이디" 
        placeholder="아이디를 입력해 주세요" 
        value={credentials.username}
        onChange={(e) => handleChange(e, "username")}
        type="text"
      />
      
      <Input 
        label="비밀번호" 
        placeholder="비밀번호를 입력해 주세요" 
        value={credentials.password}
        onChange={(e) => handleChange(e, "password")}
        type="password"
      />

      {errorMessage && (
        <div 
          style={{ 
            color: 'red', 
            textAlign: 'center', 
            marginTop: '10px', 
            fontSize: '0.9em' 
          }}
        >
          {errorMessage}
        </div>
      )}

      <Button 
        children={isLoading ? "로그인 중..." : "로그인"} 
        disabled={!isFormValid || isLoading} 
        onClick={handleLogin}
      />

      <div className={styles.link}>
        <Link to="/signup">회원가입</Link>
      </div>
    </div>
  );
};

export default LoginPage;