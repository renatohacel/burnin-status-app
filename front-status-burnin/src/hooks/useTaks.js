import { useReducer, useState } from "react"
import { tasksReducer } from "../reducers/tasksReducer"
import { changeStatus, createTask, getAllTasks, getStatus } from "../services/tasksService";
import { statusReducer } from "../reducers/statusReducer";
import Swal from "sweetalert2";


const initialTaskForm = {
    id: 0,
    title: "",
    description: "",
    status: "TODO",
}

// Mezcla para Toast "top-end"
export const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
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

export const useTasks = () => {
    const [tasks, dispatch] = useReducer(tasksReducer, [])
    const [status, dispatchStatus] = useReducer(statusReducer, [])
    const [taskSelected, setTaskSelected] = useState(initialTaskForm)
    const [visibleForm, setVisibleForm] = useState(false);
    const [editing, setEditing] = useState(false)

    const getTasks = async () => {
        try {
            const response = await getAllTasks();
            dispatch({
                type: 'loadTasks',
                payload: response.data
            });
        } catch (error) {
            console.error('Error fetching tasks:', error)
        }
    }

    const getTaskStatus = async () => {
        try {
            const response = await getStatus();
            dispatchStatus({
                type: 'loadStatus',
                payload: response.data
            })
        } catch (error) {
            console.error('Error fetching status:', error)
        }
    }

    const updateTaskState = async (task) => {
        const oldTask = tasks.find((t) => t.id === task.id);
        dispatch({
            type: 'updateTaskState',
            payload: task
        })
        dispatchStatus({
            type: 'updateStatus',
            payload: {
                id: task.status_id,
                task_id: task.id,
                date: task.date,
                time: task.time,
                updated_by: task.updated_by
            }
        })
        try {
            await changeStatus(task);
        } catch (error) {
            dispatch({
                type: 'updateTask',
                payload: oldTask,
            });
            console.error('Error change status task:', error)
        }
    }


    const handlerAddTask = async (task) => {
        console.log(task)
        const { id } = task
        const response = id === 0
            ? await createTask(task)
            : 'update'

        if (response.status === 201) {
            dispatch({
                type: (id === 0) ? 'addTask' : 'updateTask',
                payload: response.data.result.newTask
            })
            dispatchStatus({
                type: (id === 0) ? 'addStatus' : 'updateStatus',
                payload: response.data.result.newStatus
            })
            if (id !== 0) {
                handlerCloseForm();
                Toast.fire({
                    icon: "success",
                    title: 'Task updated successfully'
                })
            } else {
                handlerCloseForm();
                Toast.fire({
                    icon: "success",
                    title: 'Task created successfully'
                })
            }
        } else if (response.status === 409) {
            ToastDeleted.fire({
                icon: "warning",
                title: "Employee not found",
                text: "Employee does not register",
            });
        }
    }

    const handlerDeleteTask = async () => {
        ToastDeleted.fire({
            title: "¿Está seguro de eliminar la entrada/salida?",
            text: "Cuidado! Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Si, eliminar"
        }).then((result) => {
        });
    }

    const handlerOpenForm = () => {
        setVisibleForm(true)
        setEditing(false)
    }

    const handlerCloseForm = () => {
        setVisibleForm(false)
    }

    const handlerTaskSelected = (task) => {
        setTaskSelected(task)
        setVisibleForm(true)
        setEditing(true)
    }


    return {
        tasks,
        status,
        visibleForm,
        initialTaskForm,
        taskSelected,
        editing,

        handlerOpenForm,
        handlerCloseForm,
        updateTaskState,
        getTasks,
        getTaskStatus,
        handlerTaskSelected,
        handlerAddTask,
    }
}