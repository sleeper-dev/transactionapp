import { BASE_API_URL } from "../utils/constants";

const token = localStorage.getItem("jwtToken");

export const fetchExchangeRates = async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/exchange-rates`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    throw error;
  }
};

export const fetchAndSaveExchangeRates = async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/exchange-rates/fetch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch and save exchange rates");
    }

    const message = await response.json();
    return message;
  } catch (error) {
    console.error("Error fetching and saving exchange rates:", error);
    throw error;
  }
};
