// Redirect placeholder: avoid duplicate ForgotPassword inside (tabs) group
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function TabsForgotPasswordRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/forgot_password");
  }, [router]);

  return null;
}
