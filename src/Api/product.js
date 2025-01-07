import axios from "axios";
import toast from "react-hot-toast";
import { addProduct } from "../Redux/index";

const BASE_URL = import.meta.env.VITE_API_URL;

// Function to create a product
export async function createProduct(data) {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Authentication token is missing");
    return;
  }

  try {
    const response = await axios.post(`${BASE_URL}/products`, data, {
      headers: { "x-auth-token": token },
    });
    return response.data; // Return response data if successful
  } catch (error) {
    handleAxiosError(error, "Server error while creating product");
    throw error; // Re-throw the error if needed for further handling
  }
}

// Function to fetch all products
export function fetchProducts(dispatch, setLoading) {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Authentication token is missing");
    return;
  }

  setLoading && setLoading(true);

  axios
    .get(`${BASE_URL}/products`, {
      headers: { "x-auth-token": token },
    })
    .then((response) => {
      const productData = response?.data?.data;
      if (!productData) {
        throw new Error("Invalid response from server");
      }
      dispatch(addProduct(productData));
    })
    .catch((error) => {
      handleAxiosError(error, "Server error while fetching products");
    })
    .finally(() => {
      setLoading && setLoading(false);
    });
}

// Function to delete a product
export function deleteProduct(id, dispatch, setLoading) {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Authentication token is missing");
    return;
  }

  setLoading && setLoading(true);

  axios
    .delete(`${BASE_URL}/products/${id}`, {
      headers: { "x-auth-token": token },
    })
    .then(() => {
      fetchProducts(dispatch, setLoading);
    })
    .catch((error) => {
      handleAxiosError(error, "Server error while deleting product");
    })
    .finally(() => {
      setLoading && setLoading(false);
    });
}

// Function to update a product
export async function updateProduct(id, data) {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Authentication token is missing");
    return;
  }

  try {
    const response = await axios.patch(`${BASE_URL}/products/${id}`, data, {
      headers: { "x-auth-token": token },
    });
    return response.data; // Return response data if successful
  } catch (error) {
    handleAxiosError(error, "Server error while updating product");
    throw error; // Re-throw the error if needed for further handling
  }
}

// Helper function to handle Axios errors
function handleAxiosError(error, defaultMessage) {
  if (error.response) {
    console.error("Error Response Data:", error.response.data);
    console.error("Error Response Status:", error.response.status);
    toast.error(error.response.data.message || defaultMessage);
  } else {
    console.error("Error Message:", error.message);
    toast.error("Network error. Please try again.");
  }
}
