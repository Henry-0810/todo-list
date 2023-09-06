import { useEffect, useState } from "react";

const TodoList = () => {
    function getCurrentDate()
    {
        const current = new Date();
        const year = current.getFullYear();  
        const month = String(current.getMonth() + 1).padStart(2, '0');  
        const day = String(current.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
    }

    let [task, setTask] = useState("");
    let [taskList, setTaskList] = useState([]);
    let [isEmpty, setisEmpty] = useState(true);
    let [date, setDate] = useState(getCurrentDate());

    const handleAdd = () => {
        if (task.trim !== "" && date > getCurrentDate()) {
            const updatedTaskList = [...taskList, {task, date}];
            setTaskList(updatedTaskList);
            setTask("");
            setisEmpty(false);
        }
    };

    const handleDelete = (indexToDelete) => {
            const updatedTaskList = taskList.filter((_, index) => index !== indexToDelete);
            setTaskList(updatedTaskList);
            if(updatedTaskList.length === 0){
                setisEmpty(true);
            }
    };

    useEffect(() => {
        console.log(taskList);
    }, [taskList]);

    return (  
        <div className="todoApp">
            <h1 className="todoTitle">To do</h1>
            <div>
                Task: <input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Add a new task" required/><br /><br />
                Completed by: <input type="date" name="taskDate" id="taskDate" value={date} onChange={(e) => setDate(e.target.value)}/><br /><br />
                <button onClick={handleAdd}>Add</button>
            </div>
            <div className="taskList">
            { !isEmpty && (
                <table>
                    <thead>
                    <tr><th>Index</th><th>Task</th><th>Completed by</th><th></th></tr>
                    </thead>
                    <tbody>
                    {taskList.map((taskItem, index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td><input type="checkbox" name="taskDone" id="taskDone" />{taskItem.task}</td>
                        <td>{taskItem.date}</td>
                        <td><button className="taskBtn" onClick={() => handleDelete(index)}>Delete</button></td>
                    </tr>))}
                    </tbody>
                </table>
            )}
            </div>
        </div>
    );
}
 
export default TodoList;