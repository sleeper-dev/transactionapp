import { BASE_API_URL } from "../utils/constants";

export async function updateAddress(address) {
  const token = localStorage.getItem("jwtToken");

  try {
    const response = await fetch(`${BASE_API_URL}/update-address`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    });

    if (response.ok) {
      const updatedAddress = await response.json();
      return updatedAddress;
    } else {
      throw new Error("Failed to update address");
    }
  } catch (error) {
    console.error("Error updating address:", error);
    throw error;
  }
}
