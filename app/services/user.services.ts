export function userServices() {
  const createUser = (payload: {
    username: string;
    name: string;
    password: string;
    phone: string;
    role: string;
  }) => {
    return $fetch("/internal/userCreate", {
      credentials: "include",
      method: "POST",
      body: payload,
    });
  };
  const updateProffileApi = (payload: { name: string; phone: string }) => {
    return $fetch("/api/updateProffile", {
      credentials: "include",
      method: "POST",
      body: payload,
    });
  };
  return { createUser, updateProffileApi };
}
