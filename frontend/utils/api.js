const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const fetchData = async (endpoint) => {
  const res = await fetch(`${API_URL}/${endpoint}`);
  return res.json();
};
