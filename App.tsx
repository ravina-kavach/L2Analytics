import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./src/store";
import AppNavigator from "./src/navigation/AppNavigator";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { clearError, clearSuccess } from "./src/store/slices/commonSlice";
import CommonLoader from "./src/components/CommonLoader";
import { Platform, StyleSheet } from "react-native";

const AppWrapper = () => {
  const dispatch = useDispatch();

  const { error, success, loading } = useSelector(
    (state: any) => state.common
  );

  useEffect(() => {
    if (error) {
      showMessage({
        message: error,
        type: "danger",
        icon: "auto",
        duration: 3000,
      });

      dispatch(clearError());
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      showMessage({
        message: success,
        type: "success",
        icon: "auto",
        duration: 3000,
      });

      dispatch(clearSuccess());
    }
  }, [success]);

  return (
    <>
      <AppNavigator />

      {loading && (
        <CommonLoader visible={loading} />
      )}

      <FlashMessage position="bottom" floating style={styles.massageCotanier} />
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
};

const styles = StyleSheet.create({
  massageCotanier: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 60 : 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    elevation: 9999,
  }
})

export default App;