import Swal from "sweetalert2";
import { useReducer, useState } from "react"
import { createUser, deleteByIdUser, getAllUsers, updateUser } from "../services/usersService";
import { usersReducer } from "../reducers/usersReducer";

// Mezcla para Toast "top-end"
export const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    customClass: {
        popup: "ios-toast-popup",
        title: "ios-toast-title",
        timerProgressBar: "ios-toast-progress",
    },
    didOpen: (toast) => {
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

// Mezcla para Toast "center"
export const ToastDeleted = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    customClass: {
        popup: "ios-toast-popup",
        title: "ios-toast-title",
    },
    showClass: {
        popup: "ios-toast-show",
    },
    hideClass: {
        popup: "ios-toast-hide",
    },
});

// Mixin para el loading (espera)
export const ToastLoading = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    allowEscapeKey: false,
    didOpen: () => {
        Swal.showLoading();
    },
    customClass: {
        popup: "ios-toast-popup",
        title: "ios-toast-title",
    },
    showClass: {
        popup: "ios-toast-show",
    },
    hideClass: {
        popup: "ios-toast-hide",
    },
});

// Mixin para el success después de la espera
export const ToastSuccess = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 2000,
    customClass: {
        popup: "ios-toast-popup",
        title: "ios-toast-title",
    },
    showClass: {
        popup: "ios-toast-show",
    },
    hideClass: {
        popup: "ios-toast-hide",
    },
});

const initialUsersForm = {
    id: 0,
    username: '',
    password: '',
    name: '',
    num_employee: '',
    shift: '',
    area: 'Burnin',
    isAdmin: 0
}


const initialUsers = [];

export const useUsers = () => {
    const [users, dispatch] = useReducer(usersReducer, initialUsers);
    const [isLoading, setIsLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [visibleForm, setVisibleForm] = useState(false);
    const [errors, setErrors] = useState({})
    const [userSelected, setUserSelected] = useState(initialUsersForm);


    const getUsers = async () => {
        try {
            setIsLoading(true);
            const result = await getAllUsers();
            dispatch({
                type: 'loadUsers',
                payload: result.data
            });
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const handlerAddUser = async (user) => {
        console.log(user)
        try {
            const response = user.id === 0
                ? await createUser(user)
                : await updateUser(user)

            if (response && response.status === 201) {
                dispatch({
                    type: (user.id === 0) ? 'addUser' : 'updateUser',
                    payload: response.data.result
                });

                if (user.id === 0) {
                    handlerCloseFormUsers();
                    Toast.fire({
                        icon: "success",
                        title: "User added successfully",
                    });
                }

                if (user.id !== 0) {
                    handlerCloseFormUsers();
                    Toast.fire({
                        icon: "success",
                        title: "User updated successfully",
                    });
                }
            } else if (response && response.status === 409) {
                const errorMessage = response.data.error;
                switch (errorMessage) {
                    case 'username_exists':
                        setErrors({ username: 'username already exists.' });
                        break;
                    case 'num_employee_exists':
                        setErrors({ num_employee: 'Employee Num already exists.' });
                        break;
                    default:
                        setErrors({ other: 'Unknow error' });
                }
            } else if (response && response.status === 400) {
                const outErrors = response.data.error.reduce((acc, curr) => {
                    acc[curr.path[0]] = curr.message;
                    return acc;
                }, {});
                setErrors(outErrors);
            } else {
                throw new Error('Unknow error');
            }
        } catch (error) {
            console.error('Error in handlerAddUser:', error);
            Toast.fire({
                icon: "error",
                title: "Error to register user",
            });
        }
    }

    const handlerDeleteUser = (id) => {
        ToastDeleted.fire({
            title: "Delete User?",
            text: "This action cannot be undone",
            icon: "warning",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Delete"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteByIdUser(id);
                dispatch({
                    type: "deleteUser",
                    payload: id,
                });
                Toast.fire({
                    title: "User deleted successfully",
                    icon: "success"
                });
            }
        });
    }


    const handlerUserSelected = (user) => {
        setEditing(true);
        setVisibleForm(true);
        setUserSelected({
            ...user
        })
    }

    const handlerOpenFormUsers = () => {
        setEditing(false);
        setVisibleForm(true);
    }

    const handlerCloseFormUsers = () => {
        setVisibleForm(false);
        setUserSelected(initialUsersForm)
        setErrors({})
    }


    return {
        users,
        isLoading,
        editing,
        visibleForm,
        errors,
        initialUsersForm,
        userSelected,
        getUsers,
        handlerOpenFormUsers,
        handlerCloseFormUsers,
        handlerUserSelected,
        handlerAddUser,
        handlerDeleteUser,
    }
}