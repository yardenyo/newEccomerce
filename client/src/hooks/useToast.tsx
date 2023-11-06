import { toast, ToastOptions } from "react-toastify";

const useToast = () => {
  const options: ToastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
  };
  const toastSuccess = (message: string) => {
    toast.success(message, options);
  };

  const toastError = (message: string) => {
    toast.error(message, options);
  };

  return { toastSuccess, toastError };
};

export default useToast;
