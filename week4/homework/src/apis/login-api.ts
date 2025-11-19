import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const LOGIN_API_ENDPOINT = "/api/v1/auth/login";
const FULL_API_URL = `${API_BASE_URL}${LOGIN_API_ENDPOINT}`;

export interface LoginRequest {
  username: string;
  password: string;
}

export async function authenticateUser(credentials: LoginRequest): Promise<number> {
  try {
    const response = await axios.post(FULL_API_URL, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.success) {
      return response.data.data.userId as number; 
    } else {
      throw new Error(response.data.message || "로그인에 실패했습니다.");
    }

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      let message = "";

      switch (status) {
        case 400:
          message = "요청 값이 유효하지 않습니다.";
          break;
        case 401:
          message = "아이디 또는 비밀번호가 올바르지 않습니다.";
          break;
        case 403:
          message = "탈퇴한 사용자입니다.";
          break;
        case 404:
          message = "리소스를 찾을 수 없습니다.";
          break;
        default:
          message = "서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";
      }
      
      throw new Error(message);

    } else {
      throw new Error("네트워크 연결을 확인해 주세요.");
    }
  }
}