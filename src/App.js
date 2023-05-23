import { ThemeProvider, createTheme } from "@material-ui/core";
import "./App.css";
import Herosection from "./components/Herosection";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Test from "./components/Test";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#090E16",
      light: "#7B4AE2",
      dark: "#090E16",
    },
    success: {
      main: "#4AE290",
    },
  },
  typography: {
    fontFamily: "Poppins",
    h1: {
      fontWeight: 700,
      fontSize: "15rem",
      "@media (max-width:959.95px)": {
        fontSize: "5rem",
        textAlign: "left",
      },
    },
    h2: {
      fontWeight: 500,
      fontSize: "6rem",
      background: "transparent",
      color: "white",
      "@media (max-width:959.95px)": {
        fontSize: "3rem",
        textAlign: "center",
      },
    },
    h4: {
      fontSize: "5rem",
      fontWeight: 600,
      "@media (max-width:959.95px)": {
        fontSize: "2.5rem",
        textAlign: "center",
      },
    },
    body1: {
      fontSize: "2rem",
      textAlign: "center",
      background: "transparent",
      color: "white",
      "@media (max-width:959.95px)": {
        fontSize: "1.4rem",
        textAlign: "center",
      },
    },
    body2: {
      fontSize: "1.6rem",
      textAlign: "left",
      background: "transparent",
      color: "white",
      "@media (max-width:959.95px)": {
        fontSize: "1.4rem",
        textAlign: "left",
      },
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar />
        <Home />
        {/* <Test /> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
