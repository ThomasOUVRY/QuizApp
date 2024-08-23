import { ReactNode } from "react";

const ContentContainer = ({ children }: { children: ReactNode }) => {
  return <div className="p-4 bg-gray-100 shadow-md">{children}</div>;
};

export default ContentContainer;
