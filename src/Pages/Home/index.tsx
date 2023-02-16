import { gql } from "graphql-request";
import { useContext, useEffect, useState } from "react";
import copyIcon from "../../assets/copy.svg";
import refreshIcon from "../../assets/refresh.svg";
import ButtonWithIcon from "../../components/buttonWithIcon";
import Inbox from "../../components/Inbox";
import { SessionContext } from "../../Context/sessionContext";
import { apiEmail } from "../../lib/axios";
import {
  FieldContainer,
  Header,
  HomeContainer,
  ProvisoryContent,
  UpdateDataContainer,
} from "./styles";

interface InboxMail {
  downloadUrl: string;
  fromAddr: string;
  headerSubject: string;
  rawSize: number;
  text: string;
  toAddr: string;
}

export default function Home() {
  const [inboxSession, setInboxSession] = useState<InboxMail[]>([]);
  const [emailDisposable, setEmailDisposable] = useState<string>("");
  const [currentId, setCurrentId] = useState<string>("");

  const { userSession, loadSession } = useContext(SessionContext);

  if (userSession) {
    localStorage.setItem("email", emailDisposable);
    localStorage.setItem("idSession", currentId);

    const savedIinbox = JSON.stringify(inboxSession);
    console.log("oi", savedIinbox);
    localStorage.setItem("inbox", savedIinbox);
  }

  const reverse = () => {
    const beforeRevert = localStorage.getItem("inbox");

    const afterRevert = JSON.parse(beforeRevert!);
  };

  let queryInbox = {
    query: gql`
      query ($id: ID!) {
        session(id: $id) {
          mails {
            rawSize
            fromAddr
            toAddr
            downloadUrl
            text
            headerSubject
          }
        }
      }
    `,
    variables: {
      id: localStorage.getItem("idSession"),
    },
  };

  const loadInbox = async () => {
    const response = await apiEmail.post("/tokentest", queryInbox);
    setInboxSession(response.data.data.session.mails);
  };

  useEffect(() => {
    setEmailDisposable(userSession?.addresses[0]?.address);
    setCurrentId(userSession?.id);
  }, [userSession]);

  return (
    <HomeContainer>
      {/* <pre>{JSON.stringify(userSession, null, 2)}</pre> */}
      <pre>{JSON.stringify(inboxSession, null, 2)}</pre>
      <Header>
        <h1>Disposable Email</h1>
      </Header>

      <FieldContainer>
        <label>Your provisory email address</label>
        <ProvisoryContent>
          <input type="text" value={localStorage.getItem("email")!} readOnly />
          <ButtonWithIcon
            width="25%"
            height="30px"
            icon={copyIcon}
            alt="Icon copy email address"
            title="Copy"
          />
        </ProvisoryContent>
        <button onClick={loadSession}>Create email disposable</button>
        <button onClick={reverse}>reverse</button>
      </FieldContainer>

      <UpdateDataContainer>
        <span>Autorefresh in 15s</span>
        <ButtonWithIcon
          icon={refreshIcon}
          alt="Icon refresh inbox email address"
          title="Refresh"
          onClick={loadInbox}
        />
      </UpdateDataContainer>

      <Inbox />
    </HomeContainer>
  );
}
