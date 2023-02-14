import copyIcon from "../../assets/copy.svg";
import refreshIcon from "../../assets/refresh.svg";
import { FieldContainer, Header, HomeContainer, ProvisoryContent, UpdateDataContainer } from "./styles";


export default function Home() {
  return (
    <HomeContainer>
      <Header>
        <h1>Disposable Email</h1>
      </Header>

      <FieldContainer>
        <label>Your provisory email address</label>
        <ProvisoryContent>
          <input type="text" value="joseromarybrandao@gmail.com" readOnly />
          <button>
            <img src={copyIcon} alt="Icon copy address temporary" />
            Copy
          </button>
        </ProvisoryContent>
      </FieldContainer>

      <UpdateDataContainer>
        <span>Autorefresh in 15s</span>
        <button>
          <img src={refreshIcon} alt="Icon refresh your inbox" />
          Refresh
        </button>
      </UpdateDataContainer>
    </HomeContainer>
  )
}