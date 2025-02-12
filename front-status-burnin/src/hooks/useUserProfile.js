import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { updateProfile } from "../services/profileService";
import { AuthContext } from "../auth/context/AuthContext";

export const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    customClass: {
        // Clases personalizadas que usaremos en CSS
        popup: "ios-toast-popup",
        title: "ios-toast-title",
        timerProgressBar: "ios-toast-progress",
    },
    didOpen: (toast) => {
        // Pausar / reanudar el timer al pasar el ratón
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    },
    showClass: {
        popup: "ios-toast-show",
    },
    hideClass: {
        popup: "ios-toast-hide",
    },
});

export const useUserProfile = () => {
    const { handlerUpdateProfile } = useContext(AuthContext);
    const [visibleUserProfile, setVisibleUserProfile] = useState(false);
    const [visibleFormProfile, setVisibleFormProfile] = useState(false);
    const [errors, setErrors] = useState({});

    const handleEditProfile = async (input) => {
        try {
            console.log(input)
            const response = await updateProfile(input)

            if (response.status === 201) {
                Toast.fire({
                    icon: "success",
                    title: "Your profile has been updated",
                });
                handlerUpdateProfile(response.data.result);
                handleCloseFormProfile();
            } else if (response.status === 409) {
                const errorMessage = response.data.error;
                if (errorMessage === 'username_exists') {
                    setErrors({ username: 'Username already exists' })
                }

            } else if (response.status === 400) {
                const outErrors = response.data.error.reduce((acc, curr) => {
                    acc[curr.path[0]] = curr.message;
                    return acc;
                }, {});
                setErrors(outErrors);

            } else {
                throw new Error('Error desconocido');
            }
        } catch (error) {
            console.error('Error in handleEditProfile:', error);
            Toast.fire({
                icon: "error",
                title: "Error to update your profile",
            });
        }
    }


    const handleOpenFormProfile = () => {
        setVisibleFormProfile(true)
    }

    const handleCloseFormProfile = () => {
        setVisibleFormProfile(false)
    }

    const handleOpenProfile = () => {
        setVisibleUserProfile(true);
    }

    const handleCloseProfile = () => {
        setVisibleUserProfile(false);
        setErrors({})
    }

    return {
        visibleUserProfile,
        visibleFormProfile,
        errors,

        handleOpenProfile,
        handleCloseProfile,
        handleEditProfile,

        handleOpenFormProfile,
        handleCloseFormProfile,
    }
}