import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import axios from "axios";

const KanbanBoard = () => {
    const [tasks, setTasks] = useState({ todo: [], inProgress: [], completed: [] });

    useEffect(() => {
        const fetchTasks = async () => {
            const { data } = await axios.get("/api/tasks");
            setTasks({
                todo: data.filter((task) => task.status === "To Do"),
                inProgress: data.filter((task) => task.status === "In Progress"),
                completed: data.filter((task) => task.status === "Completed"),
            });
        };
        fetchTasks();
    }, []);

    const onDragEnd = async (result) => {
        if (!result.destination) return;

        const sourceStatus = result.source.droppableId;
        const destinationStatus = result.destination.droppableId;
        const draggedTask = tasks[sourceStatus][result.source.index];

        const updatedTasks = {
            ...tasks,
            [sourceStatus]: [...tasks[sourceStatus]],
            [destinationStatus]: [...tasks[destinationStatus]],
        };

        updatedTasks[sourceStatus].splice(result.source.index, 1);
        updatedTasks[destinationStatus].splice(result.destination.index, 0, draggedTask);

        setTasks(updatedTasks);
        await axios.put(`/api/tasks/${draggedTask._id}`, { status: destinationStatus });
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {["todo", "inProgress", "completed"].map((status) => (
                <Droppable key={status} droppableId={status}>
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            <h2>{status}</h2>
                            {tasks[status].map((task, index) => (
                                <Draggable key={task._id} draggableId={task._id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <h3>{task.title}</h3>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            ))}
        </DragDropContext>
    );
};

export default KanbanBoard;
