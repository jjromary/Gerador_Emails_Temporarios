import { ImboxItemContainer } from "./styles";

interface InboxItemProps {
  fromAddr: string;
  headerSubject: string;
  text: string;
  onClick?: any;
}

export default function InboxItem({
  fromAddr,
  headerSubject,
  text,
  onClick,
}: InboxItemProps) {
  return (
    <ImboxItemContainer onClick={onClick}>
      <strong>{headerSubject}</strong>
      <span>{fromAddr}</span>
      <span>{text}</span>
    </ImboxItemContainer>
  );
}
