// @ts-nocheck
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function TabsIndexRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/home");
  }, [router]);

  return null;
}
