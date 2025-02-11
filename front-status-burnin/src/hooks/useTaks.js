import { useReducer, useState } from "react"
import { tasksReducer } from "../reducers/tasksReducer"
import { getAllTasks } from "../services/tasksService";



export const useTasks = () => {
    const [tasks, dispatch] = useReducer(tasksReducer, [])
    const [isLoading, setIsLoading] = useState(false);

    const getTasks = async () => {
        try {
            setIsLoading(true);
            const result = await getAllTasks();
            dispatch({
                type: 'loadTasks',
                payload: result.data
            });
        } catch (error) {
            console.error('Error fetching tasks:', error)
        } finally {
            setIsLoading(false);
        }
    }


    return {
        tasks,




        getTasks
    }
}