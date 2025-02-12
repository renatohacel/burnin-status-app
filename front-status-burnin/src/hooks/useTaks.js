import { useReducer, useState } from "react"
import { tasksReducer } from "../reducers/tasksReducer"
import { changeStatus, createTask, deleteTask, getAllTasks, getStatus, updateTask } from "../services/tasksService";
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
    const [statusSelected, setStatusSelected] = useState([])
    const [visibleForm, setVisibleForm] = useState(false);
    const [visibleTask, setVisibleTask] = useState(false);
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
            type: 'addStatus',
            payload: {
                task_id: task.id,
                date: task.date,
                time: task.time,
                input: 'Status Updated To',
                value: task.status,
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
        const { id } = task
        const response = id === 0
            ? await createTask(task)
            : await updateTask(task)

        if (response.status === 201) {
            dispatch({
                type: (id === 0) ? 'addTask' : 'updateTask',
                payload: (id === 0) ? response.data.result.newTask : response.data.result.updatedTask,
            })
            if (id === 0) {
                dispatchStatus({
                    type: 'addStatus',
                    payload: response.data.result.newStatusTitle
                })
                dispatchStatus({
                    type: 'addStatus',
                    payload: response.data.result.newStatusDesc
                })
                dispatchStatus({
                    type: 'addStatus',
                    payload: response.data.result.newStatusStu
                })
            } else if (id > 0) {
                const oldTask = tasks.find((t) => t.id === id);
                if (task.title !== oldTask.title) {
                    dispatchStatus({
                        type: 'addStatus',
                        payload: {
                            task_id: task.id,
                            date: task.date,
                            time: task.time,
                            updated_by: task.updated_by,
                            input: 'Title Updated To',
                            value: task.title
                        }
                    })
                }
                if (task.description !== oldTask.description) {
                    dispatchStatus({
                        type: 'addStatus',
                        payload: {
                            task_id: task.id,
                            date: task.date,
                            time: task.time,
                            updated_by: task.updated_by,
                            input: 'Description Updated To',
                            value: task.description
                        }
                    })
                }
                if (task.status !== oldTask.status) {
                    dispatchStatus({
                        type: 'addStatus',
                        payload: {
                            task_id: task.id,
                            date: task.date,
                            time: task.time,
                            updated_by: task.updated_by,
                            input: 'Status Updated To',
                            value: task.status
                        }
                    })
                }

            }
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

    const handlerDeleteTask = async (id) => {
        ToastDeleted.fire({
            title: "Delete Task?",
            text: "This action cannot be undone",
            icon: "warning",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Delete"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTask(id)
                dispatch({
                    type: 'deleteTask',
                    payload: id
                })
                Toast.fire({
                    title: "Tasks deleted successfully",
                    icon: "success"
                });
            }
        });
    }

    const handlerOpenForm = () => {
        setVisibleForm(true)
        setEditing(false)
    }

    const handlerCloseForm = () => {
        setVisibleForm(false)
        setTaskSelected(initialTaskForm)
    }

    const handlerTaskSelected = (task) => {
        setTaskSelected(task)
        setVisibleForm(true)
        setEditing(true)
    }

    const handlerTaskDetail = ({ task, status }) => {
        setVisibleTask(true);
        setTaskSelected(task)
        setStatusSelected(status)
    }

    const handlerCloseTaskDetail = () => {
        setVisibleTask(false);
        setTaskSelected(initialTaskForm);
        setStatusSelected([]);
    }


    return {
        tasks,
        status,
        visibleForm,
        initialTaskForm,
        taskSelected,
        editing,
        visibleTask,
        statusSelected,

        handlerOpenForm,
        handlerCloseForm,
        updateTaskState,
        getTasks,
        getTaskStatus,
        handlerTaskSelected,
        handlerAddTask,
        handlerDeleteTask,
        handlerTaskDetail,
        handlerCloseTaskDetail,
    }
}