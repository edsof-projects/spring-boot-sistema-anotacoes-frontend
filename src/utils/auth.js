export function getUser() {
  return {
    role: localStorage.getItem("role"),
    token: localStorage.getItem("token"),
    photo: localStorage.getItem("photo")
  };
}