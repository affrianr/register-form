import * as React from "react";
import MainScreen from "./screens/MainScreen";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};

function App() {
  return (
    <PaperProvider theme={theme}>
      <MainScreen />
    </PaperProvider>
  );
}

export default App;
