import {useEffect, useState} from "react";
import styles from "./ToDo.module.css";

//useEffect(() => {}) //WIll run every time
//useEffect(() => {}, []) //Will run only once when on mount the component
//useEffect(() => {}, [dependencies]//Will run only when the dependencies values changes

function ToDo() {

    const [tasks, setTasks] = useState(["Eat breakfast", "Take a shower", "Clean the glass"]);
    const [newTask, setNewTask] = useState("");
    const [color, setColor] = useState("white");

    useEffect(() => {
        if (tasks.length > 3) {
            setColor("red")
        } else {
            setColor("white")
        }

    }, [tasks]);

    function handleInputChange(event: any) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim().length > 0) {
            setTasks(oldTasks => [...oldTasks, newTask]);
        }
    }

    function deleteTask(index: number) {
        setTasks(oldTasks => oldTasks.filter((_: string, i: number) => i !== index));
    }

    function moveTaskUp(index: number) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);

        }
    }

    function moveTaskDown(index: number) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);

        }
    }

    return (
        <div className={styles.toDoList}>
            <h1>To-do-list</h1>

            <input
                type="text"
                placeholder="Enter a new task..."
                value={newTask}
                onChange={handleInputChange}
            />
            <button className={styles.addButton} onClick={addTask}>Add</button>

            <ol>
                {tasks.map((task: string, index: number) => (<li
                    key={index}>
                    <span>{task}</span>
                    <button className={styles.deleteButton} onClick={() => deleteTask(index)}>Delete</button>
                    <button className={styles.moveButton} onClick={() => moveTaskUp(index)}>Up</button>
                    <button className={styles.moveButton} onClick={() => moveTaskDown(index)}>Down</button>
                </li>))}
            </ol>
            <h1 style={{color: color}}>Task: {tasks.length}</h1>

        </div>
    );
}

export default ToDo;
