import { toast, ToastOptions } from "react-toastify";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { useSelector } from "react-redux";

const useToast = () => {
  const user = useSelector(selectCurrentUser);
  const isDarkMode = user?.userSettings?.settings?.darkMode;

  const options: ToastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    theme: isDarkMode,
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
