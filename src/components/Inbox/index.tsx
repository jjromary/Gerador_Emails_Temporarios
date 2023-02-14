import {
  BodyEmail,
  BodyEmailContent,
  BodyEmailHeader,
  EmailText,
  HeaderInbox,
  ImboxItem,
  InboxContainer,
  InboxList,
  TitleEmail,
} from "./styles";

export default function Inbox() {
  return (
    <InboxContainer>
      <InboxList>
        <HeaderInbox>Inbox</HeaderInbox>
        <ImboxItem>
          <button>
            <strong>Hello</strong>
            <span>Welcome</span>
            <span>Text Text Text Text Text Text Text Text</span>
          </button>
        </ImboxItem>
      </InboxList>
      <BodyEmail>
        <BodyEmailHeader />
        <BodyEmailContent>
          <TitleEmail>
            Welcome
            <EmailText>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. Lorem Ipsum is
              simply dummy text of the printing and typesetting industry. Lorem
              Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled
              it to make a type specimen book.
            </EmailText>
          </TitleEmail>
        </BodyEmailContent>
      </BodyEmail>
    </InboxContainer>
  );
}
