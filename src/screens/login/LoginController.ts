import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginUser } from "../../store/slices/commonSlice";
import { useNavigation } from "@react-navigation/native";
import STORAGE_KEYS from "../../utils/storageKeys";
import { setStorage, getStorage, removeStorage } from "../../utils/storage";
import { showMessage } from "react-native-flash-message";

const useLogin = () => {

    const dispatch = useAppDispatch();
    const Navigation: any = useNavigation();

    const { loading } = useAppSelector(
        (state) => state.common
    );

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secure, setSecure] = useState(true);
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        loadRememberedData();
    }, []);

    const loadRememberedData = async () => {
        const isRemembered = await getStorage(STORAGE_KEYS.REMEMBER_ME);

        if (isRemembered) {
            const savedEmail = await getStorage(STORAGE_KEYS.USER_EMAIL);
            const savedPassword = await getStorage(STORAGE_KEYS.USER_PASSWORD);

            setRememberMe(true);
            setEmail(savedEmail || '');
            setPassword(savedPassword || '');
        }
    };

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleLogin = async () => {

        if (!email) {
            showMessage({
                message: "Please enter email",
                type: "danger",
                icon: "auto",
                duration: 3000,
            });
            return;
        }

        if (!validateEmail(email)) {
            showMessage({
                message: "Please enter valid email",
                type: "danger",
                icon: "auto",
                duration: 3000,
            });
            return;
        }

        if (!password) {
            showMessage({
                message: "Please enter password",
                type: "danger",
                icon: "auto",
                duration: 3000,
            });
            return;
        }

        if (password.length < 6) {
            showMessage({
                message: "Password must be at least 6 characters",
                type: "danger",
                icon: "auto",
                duration: 3000,
            });
            return;
        }

        try {

            if (rememberMe) {
                await setStorage(STORAGE_KEYS.REMEMBER_ME, true);
                await setStorage(STORAGE_KEYS.USER_EMAIL, email);
                await setStorage(STORAGE_KEYS.USER_PASSWORD, password);
            } else {
                await removeStorage(STORAGE_KEYS.REMEMBER_ME);
                await removeStorage(STORAGE_KEYS.USER_EMAIL);
                await removeStorage(STORAGE_KEYS.USER_PASSWORD);
            }

            const result = await dispatch(loginUser({ email, password })).unwrap();
            if (result) {
                showMessage({
                    message: result.message,
                    type: "success",
                    icon: "auto",
                    duration: 3000,
                });

                Navigation.navigate("MainTabs");
            }

        } catch (error) {
            console.log("error", error)
        }
    };

    const gotoRegister = () => {
        Navigation.navigate('Signup');
    };

    return {
        handleLogin,
        loading,
        email,
        setEmail,
        password,
        setPassword,
        secure,
        setSecure,
        rememberMe,
        setRememberMe,
        gotoRegister
    };
};

export default useLogin;