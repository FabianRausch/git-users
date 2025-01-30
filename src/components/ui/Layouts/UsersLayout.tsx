import type { ReactNode } from "react";
import Navbar from "../Navbar";

interface Props {
  children: ReactNode;
}

const UsersLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <main style={{padding: '16px', paddingTop: '70px'}}>{children}</main>
    </>
  );
};

export default UsersLayout;
