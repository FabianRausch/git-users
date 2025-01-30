import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return <main>{children}</main>;
};

export default MainLayout;
