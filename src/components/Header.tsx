import { ReactNode } from "react";

export type HeaderProps = {
  children?: ReactNode;
  title: string;
};

const Header = ({ children, title }: HeaderProps) => {
  return (
    <header className="bg-gray-800 text-white p-4 ">
      <h1 className="font-bold text-3xl mb-4">{title}</h1>
      {children}
    </header>
  );
};

export default Header;
