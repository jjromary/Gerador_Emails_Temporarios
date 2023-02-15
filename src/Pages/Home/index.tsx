import { gql } from "graphql-request";
import { useState } from "react";
import copyIcon from "../../assets/copy.svg";
import refreshIcon from "../../assets/refresh.svg";
import ButtonWithIcon from "../../components/buttonWithIcon";
import Inbox from "../../components/Inbox";
import { useQuery, useQueryReceived } from "../../Hooks/graphql";
import {
  FieldContainer,
  Header,
  HomeContainer,
  ProvisoryContent,
  UpdateDataContainer,
} from "./styles";

export interface Session {
  id: string;
  expiresAt: Date;
  addresses: Address[];
}

export interface Address {
  address: string;
}

export default function Home() {
  const [sessionCurrent, setSessionCurrent] = useState<any>();
  // const [inbox, setInbox] = useState<any>([]);

  const query = gql`
    mutation {
      introduceSession {
        id
        expiresAt
        addresses {
          address
        }
      }
    }
  `;

  const queryReceived = gql`
    query {
      session(id: "U2Vzc2lvbjoLuKeBcWdIDY9MBaCbzQS6") {
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
  `;

  const data = useQuery(query);
  const dataReceived = useQueryReceived(queryReceived);

  console.log("teste", dataReceived.data);
  console.log("teste DATA", data.data);

  let emailDisposable = data.data?.data.introduceSession.addresses.map(
    function (item: { address: any }) {
      return item.address;
    }
  );

  const idSession = data.data?.data.introduceSession.id;

  console.log("id", idSession);

  return (
    <HomeContainer>
      {/* <pre>{JSON.stringify(sessionCurrent, null, 2)}</pre> */}
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
