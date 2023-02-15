import { gql } from "graphql-request";
import { useEffect, useState } from "react";
import copyIcon from "../../assets/copy.svg";
import refreshIcon from "../../assets/refresh.svg";
import ButtonWithIcon from "../../components/buttonWithIcon";
import Inbox from "../../components/Inbox";
import { apiEmail } from "../../lib/axios";
import {
  FieldContainer,
  Header,
  HomeContainer,
  ProvisoryContent,
  UpdateDataContainer,
} from "./styles";

export interface Session {
  introduceSession: IntroduceSession;
}

export interface IntroduceSession {
  id: string;
  expiresAt: Date;
  addresses: Address[];
}

export interface Address {
  address: string;
}

// inbox

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
  const [userSession, setUserSession] = useState<Session>();
  const [inboxSession, setInboxSession] = useState<Inbox>();

  let querySession = {
    query: gql`
      mutation {
        introduceSession {
          id
          expiresAt
          addresses {
            address
          }
        }
      }
    `,
  };

  const loadSession = async () => {
    const response = await apiEmail.post("/tokentest", querySession);
    setUserSession(response.data?.data);
    // setUserSession(response.data?.data);
  };

  let emailDisposable = userSession?.introduceSession.addresses.map(
    function (item: { address: any }) {
      return item.address;
    }
  );

  let idSession = userSession?.introduceSession.id;
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
      id: idSession,
    },
  };

  const loadInbox = async () => {
    const response = await apiEmail.post("/tokentest", queryInbox);
    setInboxSession(response.data);
  };

  useEffect(() => {
    loadSession();
  }, []);

  useEffect(() => {
    loadInbox();
  }, []);

  console.log("teste", userSession?.introduceSession);
  console.log("Inbox", inboxSession?.data);

  return (
    <HomeContainer>
      <pre>{JSON.stringify(userSession, null, 2)}</pre>
      <pre>{JSON.stringify(inboxSession, null, 2)}</pre>
      <Header>
        <h1>Disposable Email</h1>
      </Header>

      <FieldContainer>
        <label>Your provisory email address</label>
        <ProvisoryContent>
          <input type="text" value={emailDisposable} readOnly />
          <ButtonWithIcon
            width="25%"
            height="30px"
            icon={copyIcon}
            alt="Icon copy email address"
            title="Copy"
          />
        </ProvisoryContent>
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
