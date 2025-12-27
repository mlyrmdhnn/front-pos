export function useCreateUser() {
  const { show } = useToast();

  type UserCreate = {
    username: string;
    name: string;
    password: string;
    phone: string;
    role: string;
  };
  const formCreateUser = useState<UserCreate>("formCreateUser", () => ({
    username: "",
    name: "",
    password: "",
    phone: "",
    role: "",
  }));
  const userCreate = async () => {
    try {
      const res = await $fetch("/api/createUser", {
        method: "POST",
        body: formCreateUser.value,
      });
      show("User create Successfully", "success");
    } catch (err: any) {
      //   console.error("Create user failed:", err);
      show(err.data.data.message, "error");
    }
  };
  return { userCreate, formCreateUser };
}
