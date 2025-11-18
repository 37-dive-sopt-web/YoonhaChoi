import { useState } from "react";
import { authenticateUser, type LoginRequest } from "../apis/login-api"; 
import { useNavigate } from "react-router"; 

interface LoginHookReturn {
  credentials: LoginRequest;
  errorMessage: string | null;
  isLoading: boolean;
  isFormValid: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, field: keyof LoginRequest) => void;
  handleLogin: () => Promise<void>;
}

export const useLogin = (): LoginHookReturn => {
  const navigate = useNavigate();
  
  const [credentials, setCredentials] = useState<LoginRequest>({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = credentials.username.length > 0 && credentials.password.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof LoginRequest) => {
    setCredentials({
      ...credentials,
      [field]: e.target.value,
    });
    setErrorMessage(null);
  };

  const handleLogin = async () => {
    if (!isFormValid || isLoading) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const userId = await authenticateUser(credentials);
      
      localStorage.setItem("user_id", userId.toString());
      navigate("/mypage");
      
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    credentials,
    errorMessage,
    isLoading,
    isFormValid,
    handleChange,
    handleLogin,
  };
};