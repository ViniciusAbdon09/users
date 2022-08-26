import { Provider } from "react-redux";
import store from "../../redux/store";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import GlobalStyles from "../../assets/styles/global";
import defaultTheme from "../../assets/styles/themes/default";

import Routes from "../../router/Routes";
import Header from "../Header";

import { Container } from "./styles";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyles />
          <Container>
            <Header />
            <Routes />
          </Container>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
