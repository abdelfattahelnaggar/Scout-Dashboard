import axios from "axios";

export async function loginApi(userData) {
  const BASE_URL = import.meta.env.VITE_BASE_URL || '';
  
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    if (error.response) {
      throw error;
    } else if (error.request) {
      throw new Error("No response from server. Please check your connection.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}
