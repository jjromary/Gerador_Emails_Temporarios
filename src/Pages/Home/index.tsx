import { useContext, useEffect, useState } from "react";
import copyIcon from "../../assets/copy.svg";
import refreshIcon from "../../assets/refresh.svg";
import ButtonWithIcon from "../../components/buttonWithIcon";
import Inbox from "../../components/Inbox";
import { SessionContext } from "../../Context/sessionContext";
import {
  FieldContainer,
  Header,
  HomeContainer,
  ProvisoryContent,
  UpdateDataContainer,
} from "./styles";

export interface Inbox {
  data: Data;
}

export interface Data {
  session: Session;
}

export interface Session {
  mails: any[];
}

export default function Home() {
  const [inboxSession, setInboxSession] = useState<Inbox>();
  const [emailDisposable, setEmailDisposable] = useState<string>("");
  const [currentId, setCurrentId] = useState<string>("");

  // let queryInbox = {
  //   query: gql`
  //     query ($id: ID!) {
  //       session(id: $id) {
  //         mails {
  //           rawSize
  //           fromAddr
  //           toAddr
  //           downloadUrl
  //           text
  //           headerSubject
  //         }
  //       }
  //     }
  //   `,
  //   variables: {
  //     id: idSession,
  //   },
  // };

  // const loadInbox = async () => {
  //   const response = await apiEmail.post("/tokentest", queryInbox);
  //   setInboxSession(response.data);
  // };

  // useEffect(() => {
  //   loadInbox();
  // }, []);

  const { userSession, loadSession } = useContext(SessionContext);
  //@ts-ignore

  useEffect(() => {
    setEmailDisposable(userSession?.addresses[0]?.address);
    setCurrentId(userSession?.id);
  }, [userSession]);

  if (userSession) {
    localStorage.setItem("email", emailDisposable);
  }
  // console.log("Email", userSession?.addresses[0]?.address);

  // const recoverEmail = localStorage.getItem("email");

  console.log("EmailDisposable", emailDisposable);
  console.log("CurrentId", currentId);
  return (
    <HomeContainer>
      {/* <pre>{JSON.stringify(userSession, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(inboxSession, null, 2)}</pre> */}
      <Header>
        <h1>Disposable Email</h1>
      </Header>

      <FieldContainer>
        <label>Your provisory email address</label>
        <ProvisoryContent>
          <input type="text" value={"oi"} readOnly />
          <ButtonWithIcon
            width="25%"
            height="30px"
            icon={copyIcon}
            alt="Icon copy email address"
            title="Copy"
          />
        </ProvisoryContent>
        <button onClick={loadSession}>Get emial disposable</button>
      </FieldContainer>

      <UpdateDataContainer>
        <span>Autorefresh in 15s</span>
        <ButtonWithIcon
          icon={refreshIcon}
          alt="Icon refresh inbox email address"
          title="Refresh"
        />
      </UpdateDataContainer>

      <Inbox />
    </HomeContainer>
  );
}
