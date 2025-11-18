import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface MemberData {
  id: number;
  username: string;
  name: string;
  email: string;
  age: number;
  status: string;
}

export async function fetchMemberInfo(id: number): Promise<MemberData> {
  const endpoint = `${API_BASE_URL}/api/v1/users/${id}`;

  try {
    const response = await axios.get(endpoint);

    if (response.data.success) {
      return response.data.data; 
    } else {
      throw new Error(response.data.message);
    }

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;

      let message = "";

      switch (status) {
        case 400:
          message = "잘못된 요청입니다.";
          break;
        case 403:
          message = "탈퇴한 사용자입니다.";
          break;
        case 404:
          message = "사용자를 찾을 수 없습니다.";
          break;
        default:
          message = "알 수 없는 오류가 발생했습니다.";
      }
      
      throw new Error(message);

    } else {
      throw new Error("네트워크 연결을 확인해 주세요.");
    }
  }
}