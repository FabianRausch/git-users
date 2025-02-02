import { Snackbar, SnackbarCloseReason, SnackbarProps } from "@mui/material";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const SnackbarContext = createContext<
  { openSnackbar: (props: SnackbarProps) => void } | undefined
>(undefined);

interface Props {
  children: ReactNode;
}

export const SnackbarProvider = ({ children }: Props) => {
  const [snackbarProps, setSnackbarProps] = useState<SnackbarProps>({
    open: false,
    autoHideDuration: 3000,
  });

  const openSnackbar = useCallback(
    (props: SnackbarProps) => {
      setSnackbarProps({ ...snackbarProps, ...props });
    },
    [snackbarProps]
  );

  const handleClose = useCallback(
    (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
      if (reason === "clickaway") return;
      setSnackbarProps({ ...snackbarProps, open: false });
    },
    [snackbarProps]
  );

  const contextValue = useMemo(
    () => ({
      openSnackbar,
    }),
    [openSnackbar]
  );

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <Snackbar {...snackbarProps} onClose={handleClose} />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarContext");
  }
  return context;
};
