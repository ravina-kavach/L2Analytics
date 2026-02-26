import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginUser } from "../../store/slices/commonSlice";
import { useNavigation } from "@react-navigation/native";
import STORAGE_KEYS from "../../utils/storageKeys";
import { setStorage, getStorage, removeStorage } from "../../utils/storage";

const useLogin = () => {
    const dispatch = useAppDispatch();
    const Navigation: any = useNavigation();

    const { loading, error } = useAppSelector(
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

    const handleLogin = async () => {
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
        console.log("RESULT======>", Navigation)
        if (result) {
            Navigation.navigate("MainTabs")
        }

    };

    const gotoRegister = () => {
        Navigation.navigate('Signup');
    };

    return {
        handleLogin,
        loading,
        error,
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