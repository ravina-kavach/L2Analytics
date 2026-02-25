import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginUser } from "../../store/slices/commonSlice";
import { useNavigation } from "@react-navigation/native";

const useLogin = () => {
    const dispatch = useAppDispatch();
    const Navigation: any = useNavigation();
    const { loading, error } = useAppSelector(
        (state) => state.common
    );
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secure, setSecure] = useState(true);


    const handleLogin = () => {
        dispatch(loginUser({ email: email, password: password }));
    };


    const gotoRegister = () => {
        Navigation.navigate('Signup')
    }

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
        gotoRegister
    };

}

export default useLogin;