import { useMutation } from "@tanstack/react-query";
import { singup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: singup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success(
        "Account succesfully created! Please verify the new account from the user's email address."
      );
    },
  });
  return { singup, isLoading };
}
