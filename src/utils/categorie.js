import axios from "../axios/axios";

export const getCategories = async () => {
  try {
    const response = await axios.get("categorie");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCategorieByID = async (id) => {
  try {
    const response = await axios.get(`categorie/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
