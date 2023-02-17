import { ReactNode } from "react";
import { ImboxItemContainer } from "./styles";

interface InboxItemProps {
  fromAddr: string;
  headerSubject: string;
  text: string;
  onClick?: any;
  children: ReactNode;
}

export default function InboxItem({
  fromAddr,
  headerSubject,
  text,
  onClick,
  children,
}: InboxItemProps) {
  return (
    <ImboxItemContainer>
      <strong>{headerSubject}</strong>
      <span>{fromAddr}</span>
      <span>{text}</span>
      {children}
    </ImboxItemContainer>
  );
}
