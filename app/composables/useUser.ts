import { userServices } from "~/services/user.services";

const { updateProffileApi } = userServices();
export function useUser() {
  const show = useToast();

  const getMe = () => $fetch("/api/me");

  const formUpdateProffile = ref({
    name: "",
    phone: "",
  });

  const fetchUserData = async () => {
    const res = await getMe();
    formUpdateProffile.value.name = res.name;
    formUpdateProffile.value.phone = res.phone;
  };
  fetchUserData();

  const updateProffile = async () => {
    try {
      await updateProffileApi(formUpdateProffile.value);
      show.show("Success save changes", "success");
    } catch (e: any) {
      show.show(e.data?.message ?? "Failed", "error");
    }
  };

  return { getMe, formUpdateProffile, fetchUserData, updateProffile };
}
