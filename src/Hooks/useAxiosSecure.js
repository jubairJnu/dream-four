import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "${base_url}/",
});

const useAxiosSecure = () => {
  return [axiosSecure];
};

export default useAxiosSecure;
