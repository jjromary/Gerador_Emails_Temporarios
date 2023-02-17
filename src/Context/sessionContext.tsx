import { gql } from "graphql-request";
import { createContext, ReactNode, useEffect, useState } from "react";
import { apiEmail } from "../lib/axios";

export interface InboxMail {
  downloadUrl: string;
  fromAddr: string;
  headerSubject: string;
  rawSize: number;
  text: string;
  toAddr: string;
}
interface SessionContextype {
  userSession: any;
  inboxSession: InboxMail[];
  loadSession: () => Promise<void>;
  loadInbox: () => Promise<void>;
}

interface sessionProviderProps {
  children: ReactNode;
}

export const SessionContext = createContext({} as SessionContextype);

export default function SessionProvider({ children }: sessionProviderProps) {
  const [userSession, setUserSession] = useState<any>();
  const [inboxSession, setInboxSession] = useState<InboxMail[]>([]);

  const [emailDisposable, setEmailDisposable] = useState<string>("");
  const [currentId, setCurrentId] = useState<string>("");

  const teste = localStorage.getItem("idSession");

  const querySession = {
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

  const queryInbox = {
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
      id: teste,
    },
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const saveLocalInbox = () => {
    const savedIinbox = JSON.stringify(inboxSession);
    console.log("inbox", savedIinbox);
    localStorage.setItem("inbox", savedIinbox);
  };

  const loadSession = async () => {
    const response = await apiEmail.post("/tokentest", querySession);
    setUserSession(response.data?.data.introduceSession);
    localStorage.removeItem("inbox");
    // refreshPage();
  };

  const loadInbox = async () => {
    const response = await apiEmail.post("/tokentest", queryInbox);
    setInboxSession(response.data.data.session?.mails);
    saveLocalInbox();
  };

  // setTimeout(loadInbox, 15000);

  useEffect(() => {
    setEmailDisposable(userSession?.addresses[0]?.address);
    setCurrentId(userSession?.id);
  }, [userSession]);

  if (userSession) {
    localStorage.setItem("idSession", currentId);
    localStorage.setItem("email", emailDisposable);
  }

  return (
    <SessionContext.Provider
      value={{
        userSession,
        inboxSession,
        loadSession,
        loadInbox,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
