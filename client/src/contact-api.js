const API_URL = "http://localhost:3000"; 

export const createContact = async (token, contactData) => {
  try {
    let response = await fetch(`${API_URL}/api/contact`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(contactData),
    });

    return response.json();
  } catch (err) {
    return { error: "Network error" };
  }
};