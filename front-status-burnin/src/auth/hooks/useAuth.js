import { useReducer } from "react";
import { authReducer } from "../reducers/authReducer";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginUser, logoutUser } from "../services/authService";

const initialLogin = JSON.parse(sessionStorage.getItem("login")) || {
    isAuth: 0,
    user: undefined,
};

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    },
});

export const useAuth = () => {
    const [login, dispatch] = useReducer(authReducer, initialLogin);
    const navigate = useNavigate();

    const handlerLogin = async ({ username, password }) => {
        try {
            const { user } = await loginUser({ username, password });
            dispatch({
                type: "login",
                payload: user,
            });

            sessionStorage.setItem(
                "login",
                JSON.stringify({
                    isAuth: true,
                    user,
                })
            );
            navigate('/home');
        } catch (error) {
            Toast.fire({
                title: "Username/Password incorrectos",
                icon: "error",
            });
        }
    };

    const handlerLogout = async () => {
        try {
            await logoutUser();
            dispatch({
                type: "logout",
            });
            sessionStorage.removeItem("login");
            navigate('/login');
        } catch (error) {
            Toast.fire({
                title: "Error al cerrar sesión",
                icon: "error",
            });
        }
    };

    const handlerUpdateProfile = (updatedUser) => {
        dispatch({
            type: "updateProfile",
            payload: updatedUser,
        });

        sessionStorage.setItem(
            "login",
            JSON.stringify({
                isAuth: true,
                user: updatedUser,
            })
        );
    };


    return {
        //const
        login,

        //functions
        handlerLogin,
        handlerLogout,
        handlerUpdateProfile,

    }
}
