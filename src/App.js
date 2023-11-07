import React, {useState, useEffect} from "react";
import {View} from "react-native";
// import {Provider} from "react-redux";
import {NativeBaseProvider} from "native-base";
// import {ProvideAuth as AuthProvider} from "../src/hooks/useAuth";
import AppContextProvider from "./context/state";

// import store from "./redux/store";
import "./utils/ignore";

// assets
import {imageAssets} from "./theme/images";
import {fontAssets} from "./theme/fonts";
import Navigator from "./navigation";

const App = () => {
  const [didLoad, setDidLoad] = useState(false);

  // assets preloading
  const handleLoadAssets = async () => {
    await Promise.all([...imageAssets, ...fontAssets]);
    setDidLoad(true);
  };

  useEffect(() => {
    handleLoadAssets();
  }, []);

  return didLoad ? (
    // <Provider store={store}>
    <AppContextProvider>
      <NativeBaseProvider>
        <Navigator />
      </NativeBaseProvider>
    </AppContextProvider>
  ) : (
    // </Provider>
    <View />
  );
};

export default App;
