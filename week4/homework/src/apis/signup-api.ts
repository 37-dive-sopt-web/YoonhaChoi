import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_ENDPOINT = "/api/v1/users";
const FULL_API_URL = `${API_BASE_URL}${API_ENDPOINT}`;

export interface SignupRequest {
    username: string;
    password: string;
    name: string;
    email: string;
    age: number;
}

export interface MemberData {
    id: number;
    username: string;
    name: string;
    email: string;
    age: number;
    status: string;
}

export async function createMember(data: SignupRequest): Promise<MemberData> {
  try {
    const response = await axios.post(FULL_API_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.success) {
      return response.data.data; 
    } else {
      throw new Error(response.data.message || "회원가입에 실패했습니다.");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      let message = "";

      switch (status) {
        case 400:
            message = "잘못된 요청 형식입니다.";
          break;
        case 409:
            message = "이미 존재하는 사용자명입니다.";
          break;
        default:
          message = "알 수 없는 오류가 발생했습니다.";
      }
      
      throw new Error(message);

    } else {
      throw new Error("네트워크 연결 상태를 확인해 주세요.");
    }
  }
}