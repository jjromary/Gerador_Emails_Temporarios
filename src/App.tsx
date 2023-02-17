import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import SessionProvider from "./Context/sessionContext";
import { Router } from "./Routes";
import { GlobalStyles } from "./Styles/Global";
import { defaultTheme } from "./Styles/Themes/default";

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <SessionProvider>
          <Router />
        </SessionProvider>
      </BrowserRouter>
      <GlobalStyles />
    </ThemeProvider>
  );
}
