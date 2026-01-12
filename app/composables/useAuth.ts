/* eslint-disable @typescript-eslint/no-unused-vars */
import { authServices } from "~/services/auth.services";
import { useAuthStore } from "~/store/auth";
const { loginApi, changePassApi } = authServices();
export function useAuth() {
  const isLoading = ref(false);
  const show = useToast();
  const auth = useAuthStore();
  const msg = ref<string>("");
  type Login = {
    username: string;
    password: string;
  };
  const form = ref<Login>({
    username: "",
    password: "",
  });
  const login = async () => {
    isLoading.value = true;
    try {
      await loginApi(form.value);
      const user = await $fetch("/api/me");
      auth.setUser(user);
      const usrCookie: any = useCookie("usr");
      usrCookie.value = user;
      await nextTick();
      navigateTo("/redirect");
    } catch (err: any) {
      msg.value = err.data.message;
    } finally {
      isLoading.value = false;
    }
  };

  type ChangePassword = {
    current_pass: string;
    new_pass: string;
    confirm_pass: "";
  };
  const formChangePass = ref<ChangePassword>({
    current_pass: "",
    new_pass: "",
    confirm_pass: "",
  });
  const changePassword = async () => {
    try {
      if (formChangePass.value.new_pass !== formChangePass.value.confirm_pass) {
        return show.show("New password and confirm password must same", "info");
      }
      await changePassApi(formChangePass.value);
      show.show("Success to change password", "success");
      formChangePass.value.confirm_pass = "";
      formChangePass.value.current_pass = "";
      formChangePass.value.new_pass = "";
    } catch (e: any) {
      show.show(e.data?.message, "error");
    }
  };

  return { login, form, formChangePass, changePassword, msg, isLoading };
}
