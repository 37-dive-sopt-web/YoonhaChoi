import { useState } from "react";
import { useNavigate } from "react-router"; 
import { createMember, type SignupRequest, type MemberData } from "../apis/signup-api"; 

interface SignupData {
  username?: string;
  password?: string;
  name?: string;
  email?: string;
  age?: string | number;
  id?: string; 
}

interface SignupHookReturn {
  step: number;
  signupMessage: string | null;
  nextStep: (data: SignupData) => void;
  prevStep: () => void;
  handleSubmit: (data: SignupData) => Promise<void>;
}

export const useSignup = (): SignupHookReturn => {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Partial<SignupRequest>>({});
  const [signupMessage, setSignupMessage] = useState<string | null>(null);

  const nextStep = (data: SignupData) => {
    const mappedData =
      "id" in data
        ? {
            ...data,
            username: data.id,
            id: undefined,
          }
        : data;

    setFormData((prev) => {
      return {
        ...prev,
        ...(mappedData as Partial<SignupRequest>),
      };
    });
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
      setSignupMessage(null);
    }
  };


  const handleSubmit = async (data: SignupData) => {
    const finalData = {
      ...formData,
      ...data,
      username: formData.username || data.username || data.id,
    };

    setSignupMessage("회원가입 처리 중...");

    const finalRequestData: SignupRequest = {
      username: finalData.username!, 
      password: finalData.password!, 
      name: finalData.name!,
      email: finalData.email!,
      age:
        typeof finalData.age === "string"
          ? parseInt(finalData.age, 10)
          : (finalData.age!),
    };

    try {
      const memberData: MemberData = await createMember(finalRequestData);

      const name = memberData.name || finalRequestData.name;
      const successMessage = `${name}님, 가입이 완료되었어요!`;

      window.alert(successMessage);
      navigate("/login");
    } catch (error) {
      setSignupMessage((error as Error).message);
    }
  };

  return {
    step,
    signupMessage,
    nextStep,
    prevStep,
    handleSubmit,
  };
};