import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ title: "", description: "", status: "" });


  useEffect(()=>{
    fetchtasks();
  }, [])
  const fetchtasks= async() =>{
    try{
      const res = await fetch('http://localhost:3001/api/v1/tasks');
    const myt = await res.json()
    setTasks(myt)
    console.log(myt);
    } catch(error){
      console.log(error)
    }
  }


  const addTask = async() => {
    if (task.title.trim() === "") return;

    try{
      const res = await fetch("http://localhost:3001/api/v1/tasks/",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:{
          ...task,
          dueDate: Date.now()
        }
      })
      setTasks([...tasks, { ...task, id: Date.now(), }]);
    }
    catch(err){
      console.log(err)
    }
    setTask({ title: "", description: "" });
  };

  const deleteTask = async (id) => {
    console.log("Deleting task with ID:", id);
    try {
      const response = await fetch(`http://localhost:3001/api/v1/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        toast.error("An error occured. Please try again")
        throw new Error("Failed to delete task");
        
      }
  
      setTasks(tasks.filter((task) => task._id !== id));
      toast.success("Task deleted successfully")
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("An error occured. Please try again")
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-center text-blue-600">Task Manager</h1>

      {/* Input Form */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Task Title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="w-full p-2 border rounded-md mb-2"
        />
        <textarea
          placeholder="Task Description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className="w-full p-2 border rounded-md mb-2"
        />
        <button
          onClick={addTask}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      <div className="mt-6">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks available</p>
        ) : (
          tasks.map((task) => (
           <div key={task._id}>
             <div key={task.id} className="flex justify-between items-center bg-gray-100 p-3 mb-2 rounded-md">
              <div>
                <h2 className="font-semibold">{task.title}</h2>
                <p className="text-gray-600">{task.description}</p>
                <p>status: {task.status}</p>
              </div>
              <button
                onClick={() => deleteTask(task._id)}
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
            <div>
              {task.status == "pending"? <button>Mark as completed</button>: <button>mark as in progress</button>}
            </div>
           </div>
          ))
        )}
      </div>
    </div>
  );
}
