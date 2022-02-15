// Fetch Api = Stoke token pour local storage /
export const fetchApi = async (url, params = {}) => {
  const { method, body } = params; // gestion d'erreur
  const token = localStorage.getItem("token"); // recup token for bearer

  try {
    const res = await fetch(`http://localhost:4002${url}`, {
      method: method || "GET",
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // type Bearer + place token dans header
      },
    });

    if (!res.ok) {
      //console.log("User offline");
      return;
    }

    if (res.ok) {
      //console.log("User online");
      return res.json();
    }
  } catch (error) {
    // fin try
    console.log(error);
  }
}; // fin fetchApi
