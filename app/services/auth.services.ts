export function authServices() {
  const loginApi = (payload: { username: string; password: string }) => {
    return $fetch("/api/login", {
      credentials: "include",
      method: "POST",
      body: payload,
    });
  };
  const changePassApi = (payload: {
    current_pass: string;
    new_pass: string;
    confirm_pass: string;
  }) => {
    return $fetch("/api/changePassword", {
      credentials: "include",
      method: "POST",
      body: payload,
    });
  };
  return { loginApi, changePassApi };
}
