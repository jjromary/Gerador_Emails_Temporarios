import { Key, useState } from "react";
import InboxItem from "../InboxItem";
import {
  BodyEmail,
  BodyEmailContent,
  BodyEmailHeader,
  EmailText,
  EmailTitle,
  InboxContainer,
  InboxHeader,
  InboxList,
} from "./styles";

export default function Inbox() {
  const [assunt, setAssunt] = useState("");
  const [text, setText] = useState("");
  const recoverInbox = JSON.parse(localStorage.getItem("inbox")!);

  const emailDetails = (text: string, assunt: string) => {
    setAssunt(assunt);
    setText(text);
  };

  return (
    <InboxContainer>
      <InboxList>
        <InboxHeader>Inbox</InboxHeader>
        {recoverInbox?.map(
          (
            inbox: { fromAddr: string; headerSubject: string; text: string },
            key: Key | null | undefined
          ) => {
            return (
              <InboxItem
                key={key}
                fromAddr={inbox.fromAddr}
                headerSubject={inbox.headerSubject}
                text={inbox.text}
                onClick={() => emailDetails(inbox.text, inbox.headerSubject)}
              />
            );
          }
        )}
      </InboxList>
      <BodyEmail>
        <BodyEmailHeader />
        <BodyEmailContent>
          <EmailTitle>
            {assunt}
            <EmailText>
              {text ? text : "Select an email to read its content"}
            </EmailText>
          </EmailTitle>
        </BodyEmailContent>
      </BodyEmail>
    </InboxContainer>
  );
}
