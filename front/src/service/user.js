const apiUrl = process.env.REACT_APP_API_URL;

// Création d'un utilisateur :

const createUser = async (values) => {
  try {
    const response = await fetch(`${apiUrl}/user/register`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Erreur réseau ou du serveur");
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur.");
    throw error;
  }
};

export { createUser };
