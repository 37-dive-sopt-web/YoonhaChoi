import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const DELETE_API_ENDPOINT = "/api/v1/users";

// 회원 탈퇴 API 호출 (DELETE)
export async function deactivateMember(userId: number) {
  const endpoint = `${API_BASE_URL}${DELETE_API_ENDPOINT}/${userId}`;
  
  try {
    const response = await axios.delete(endpoint);
    
    if (response.data.success) {
      return; 
    } else {
      throw new Error(response.data.message || "회원 탈퇴 처리 중 오류가 발생했습니다.");
    }
    
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      let message = "";

      switch (status) {
        case 400:
        case 404:
          message = "사용자 정보를 찾을 수 없습니다.";
          break;
        case 500:
          message = "서버에서 알 수 없는 오류가 발생했습니다.";
          break;
        default:
          message = "알 수 없는 오류가 발생했습니다."
          break;
      }
      throw new Error(message);
    }
    throw new Error("네트워크 연결을 확인해 주세요.");
  }
}

// 로그아웃 처리 함수
export function logoutUser(): void {
  localStorage.removeItem("user_id"); 
}