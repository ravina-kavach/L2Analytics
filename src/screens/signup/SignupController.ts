import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { registerUser } from "../../store/slices/commonSlice";
import { useNavigation } from "@react-navigation/native";

export const useSignup = () => {
    const dispatch = useAppDispatch();
    const Navigation = useNavigation();
    const { loading, error, success } = useAppSelector(
        (state) => state.common
    );
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secure, setSecure] = useState(true);

    useEffect(() => {
        if (success) {
            gotoLogin();
        }
    }, [success])

    const handleRegisterUser = () => {
        const payload = {
            name: name,
            email: email,
            password: password,
            role: "user"
        }
        dispatch(registerUser(payload));
    };

    const gotoLogin = () => {
        Navigation.goBack()
    }


    return {
        loading,
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        secure,
        setSecure,
        handleRegisterUser,
        gotoLogin
    }
}