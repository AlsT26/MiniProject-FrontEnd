// import { getToken } from "./getToken";

// import { getCookie } from "./getToken";

const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

export const handleOrderSubmit = async (orderData, userId: number, token: string) => {
  try {
    const response = await fetch(`${base_url}/order/make-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the user's token
      },
      credentials: "include",
      body: JSON.stringify({
        ...orderData,
        userId,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Order created:", result);
      return result;
    } else {
      // Read the response only once and handle non-JSON errors gracefully
      let errorMessage = "Failed to create order";
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const error = await response.json();
        errorMessage = error.message || errorMessage;
      } else {
        errorMessage = await response.text();
        console.error("Failed to create order", errorMessage);
        throw new Error(errorMessage || "Failed to create order");
      }
    }
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const getOrdersForUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${base_url}/order/user-order`, {
      next: { revalidate: 0 },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch order");
    }

    const data = await response.json();
    console.log("User orders:", data.orders);
    return data.orders;
  } catch (error) {
    console.log(error);
  }
};

export const getUserOrdersByStatus = async (status: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${base_url}/order/user-orders-by-status?status=${status}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders by status.");
    }

    const data = await response.json();
    console.log("Fetched Orders by Status:", data.orders);
    return data.orders;
  } catch (error) {
    console.error("Error fetching orders by status:", error);
    return [];
  }
};

export const getOrderById = async (orderId: number) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User is not authenticated");
    }

    const response = await fetch(`${base_url}/order/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch the order");
    }

    const data = await response.json();
    return data.order;
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    throw error;
  }
};
