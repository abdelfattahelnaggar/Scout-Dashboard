import axios from "axios";

export async function loginApi(userData) {
  
  try {
    const data = JSON.stringify(userData)
    const response = await axios.post(`/api/auth/login`, data, {
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
