import { useContext } from "react";
import copyIcon from "../../assets/copy.svg";
import refreshIcon from "../../assets/refresh.svg";
import settings from "../../assets/settings.svg";
import ButtonWithIcon from "../../components/buttonWithIcon";
import Inbox from "../../components/Inbox";
import { SessionContext } from "../../Context/sessionContext";
import {
  ButtonContainer,
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

  const handleNotificationClick = () => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification("Notification Title", {
          body: "Notification Body",
        });
      }
    });
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
        <ButtonContainer>
          <button onClick={loadSession}>Create email disposable</button>
        </ButtonContainer>
      </FieldContainer>

      <UpdateDataContainer>
        <span>Autorefresh in 15s</span>
        <ButtonWithIcon
          icon={refreshIcon}
          alt="Icon refresh inbox email address"
          title="Refresh"
          onClick={loadInbox}
        />

        <ButtonWithIcon
          icon={settings}
          title="Notification ON/Off"
          alt="Open Settings"
          onClick={handleNotificationClick}
        />
      </UpdateDataContainer>

      <Inbox />
    </HomeContainer>
  );
}
