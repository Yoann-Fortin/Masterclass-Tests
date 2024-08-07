import fetchData from "./fetchService";

async function createUser(user) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };
  const data = await fetchData("/api/users", options);
  return data.insertId;
}

async function deleteUser(userId) {
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  await fetchData(`/api/users/${userId}`, options);
}

export { createUser, deleteUser };
