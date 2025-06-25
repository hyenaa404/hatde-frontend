import { weddingServiceAPI, accessoryServiceAPI, getServiceByIdAPI, weddingServiceByCategoryAPI } from "./serviceAPI";


export const getWeddingServices = async () => {
  try {
    const response = await weddingServiceAPI();
    return response.data;
  } catch (error) {
    console.error("Error fetching wedding services:", error);
    throw error;
  }
};
export const getWeddingServicesByCategoryIdAsync = async (id) => {
  try {
    const response = await weddingServiceByCategoryAPI(id);
    return response.data;
  } catch (error) {
    console.error("Error fetching wedding services:", error);
    throw error;
  }
};
export const getServiceById = async (id) => {
  try {
    const response = await getServiceByIdAPI(id);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching wedding services:", error);
    throw error;
  }
};

export const getAccessoryServices = async () => {
  try {
    const response = await accessoryServiceAPI();
    return response.data;
  } catch (error) {
    console.error("Error fetching accessory services:", error);
    throw error;
  }
};

