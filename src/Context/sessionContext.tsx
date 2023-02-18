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
  const [expiresAt, setExpiresAt] = useState<string>("");
  const [isExpirate, setIsExpirate] = useState(false);

  const recoverDate = localStorage.getItem("expirate");
  const formattedCurrentDate: Date = new Date(recoverDate!);

  const verifyExpirateSession = () => {
    if (new Date() > formattedCurrentDate) {
      setIsExpirate(true);
      localStorage.clear();
      localStorage.removeItem("expirate");
      localStorage.removeItem("email");
      localStorage.removeItem("idSession");
    } else {
      setIsExpirate(false);
    }
  };

  setTimeout(() => {
    verifyExpirateSession();
    if (isExpirate === true) {
      refreshPage();
    }
  }, 1000 * 60); // 1 minute

  const idSessionNow = localStorage.getItem("idSession");

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
      id: idSessionNow,
    },
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const saveLocalInbox = () => {
    const savedIinbox = JSON.stringify(inboxSession);
    localStorage.setItem("inbox", savedIinbox);

    refreshPage;
  };

  const loadSession = async () => {
    const response = await apiEmail.post("/tokentest", querySession);
    setUserSession(response.data?.data.introduceSession);

    localStorage.removeItem("inbox");
  };

  const loadInbox = async () => {
    const response = await apiEmail.post("/tokentest", queryInbox);
    setInboxSession(response.data.data.session?.mails);
    saveLocalInbox();
  };

  setTimeout(loadInbox, 1000 * 15); // 15 segundos

  useEffect(() => {
    setEmailDisposable(userSession?.addresses[0]?.address);
    setCurrentId(userSession?.id);
    setExpiresAt(userSession?.expiresAt);
  }, [userSession]);

  if (userSession) {
    localStorage.setItem("idSession", currentId);
    localStorage.setItem("email", emailDisposable);
    localStorage.setItem("expirate", expiresAt);
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
