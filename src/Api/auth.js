import axios from "axios";
import toast from "react-hot-toast";

export function login(data) {
  // Send login credentials to the API
  axios
    .post(`${import.meta.env.VITE_API_URL}/auth/login`, {
      email: data.email,
      password: data.password,
    })
    .then(async (res) => {
      const token = res.headers["x-auth-token"];

      if (!token) {
        toast.error("No token received from the server.");
        return;
      }

      // Store token in localStorage
      localStorage.setItem("token", token);

      try {
        // Now use the token to get the user data (only _id in this case)
        const userResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/protected`,
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );

        const userId = userResponse.data._id;

        if (userId) {
          // Store the user _id in localStorage
          localStorage.setItem("userId", userId);
          toast.success("Logged in successfully!");

          // After successful login, redirect
          window.location.href = "/";
        } else {
          toast.error("No user data found.");
        }
      } catch (error) {
        toast.error("Failed to retrieve user data.");
        console.error("Error fetching user data: ", error);
      }
    })
    .catch((error) => {
      // Handle login failure (wrong credentials, etc.)
      toast.error(error?.response?.data?.error || "Server error");
      console.error("Login error: ", error);
    });
}

export function register(data) {
  const result = axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
    name: data.name,
    email: data.email,
    password: data.password,
  });

  toast.promise(result, {
    success: () => {
      return "Account created successfully";
    },
    error: (error) => {
      return error?.response?.data?.error || "Server error";
    },
    loading: "Sending...",
  });
}
