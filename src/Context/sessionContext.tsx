import { gql } from "graphql-request";
import { createContext, ReactNode, useState } from "react";
import { apiEmail } from "../lib/axios";

interface SessionContextype {
  userSession: any;
  loadSession: () => Promise<void>;
}

interface sessionProviderProps {
  children: ReactNode;
}

export const SessionContext = createContext({} as SessionContextype);

export default function SessionProvider({ children }: sessionProviderProps) {
  const [userSession, setUserSession] = useState<any>();

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
    setUserSession(response.data?.data.introduceSession);
  };

  return (
    <SessionContext.Provider
      value={{
        userSession,
        loadSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
