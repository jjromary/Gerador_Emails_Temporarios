import { useContext } from "react";
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

export default function Home() {
  const { loadSession, loadInbox } = useContext(SessionContext);
  const emailUser: string = localStorage.getItem("email")!;

  const handleCopyClick = () => {
    navigator.clipboard.writeText(emailUser);
  };

  return (
    <HomeContainer>
      <Header>
        <h1>Disposable Email</h1>
      </Header>

      <FieldContainer>
        <label>Your provisory email address</label>
        <ProvisoryContent>
          <input
            type="text"
            value={emailUser === "undefined" ? "" : emailUser}
            readOnly
            // onChange={handleInputChange}
          />
          <ButtonWithIcon
            width="25%"
            height="30px"
            icon={copyIcon}
            alt="Icon copy email address"
            title="Copy"
            onClick={() => handleCopyClick()}
          />
        </ProvisoryContent>
        <button onClick={loadSession}>Create email disposable</button>
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
function copy(copyText: string) {
  throw new Error("Function not implemented.");
}
