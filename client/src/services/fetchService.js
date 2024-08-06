const API_URL = import.meta.env.VITE_API_URL;

export default async function fetchData(url, options) {
  const response = await fetch(`${API_URL}${url}`, options);
  if (response.ok) {
    return response.json();
  }
  throw new Error(
    `Failed to fetch data: ${response.status} ${response.statusText}`
  );
}
