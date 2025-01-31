import type { ReactNode } from "react";
import Navbar from "../Navbar";

interface Props {
  children: ReactNode;
}

const UsersLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <main style={{ padding: "70px 16px" }}>{children}</main>
    </>
  );
};

export default UsersLayout;
