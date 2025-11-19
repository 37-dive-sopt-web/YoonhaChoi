import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ApiErrorResponse {
  success: false;
  code: string;
  message: string;
  data: unknown; 
}

export interface MemberData {
  id: number;
  username: string;
  name: string;
  email: string;
  age: number;
  status: string;
}

export interface UpdateRequest {
  name?: string;
  email?: string;
  age?: number; 
}


function handleApiError(error: unknown): string {
  if (axios.isAxiosError(error) && error.response) {
    const errorData = error.response.data as ApiErrorResponse; 
    const status = error.response.status;
    let message = "";

    if (errorData?.message) {
      message = errorData.message;
    }

    switch (status) {
      case 400:
        message = "요청 값이 유효하지 않습니다.";
        break;
      case 403:
        message = "탈퇴한 사용자입니다.";
        break;
      case 404:
        message = "리소스를 찾을 수 없습니다.";
        break;
      case 409:
        message = "요청이 현재 리소스 상태와 충돌합니다.";
        break;
      default:
        message = "알 수 없는 오류가 발생했습니다.";
        break;
    }
    return message;
  }
  return "네트워크 연결을 확인해 주세요.";
}

// 정보 조회 (GET)
export async function fetchMemberInfo(id: number): Promise<MemberData> {
  const endpoint = `${API_BASE_URL}/api/v1/users/${id}`;
  try {
    const response = await axios.get(endpoint);
    if (response.data.success) {
      return response.data.data; 
    }
    throw new Error(response.data.message || "정보 조회에 실패했습니다.");
  } catch (error) {
    throw new Error(handleApiError(error));
  }
}

// 정보 수정 (PATCH)
export async function updateMemberInfo(id: number, data: UpdateRequest): Promise<MemberData> {
  const endpoint = `${API_BASE_URL}/api/v1/users/${id}`;
  
  const payload: UpdateRequest = {};
  
  if (data.name !== undefined && data.name !== null) payload.name = data.name;
  if (data.email !== undefined && data.email !== null) payload.email = data.email;
  if (data.age !== undefined && data.age !== null) payload.age = data.age;

  try {
    const response = await axios.patch(endpoint, payload);
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || "정보 수정에 실패했습니다.");
  } catch (error) {
    throw new Error(handleApiError(error));
  }
}