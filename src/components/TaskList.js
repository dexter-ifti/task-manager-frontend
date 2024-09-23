"use client"
import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import AuthContext from "@/context/AuthContext";

const TaskList = () => {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const [tasks, setTasks] = useState([]);
    const [filters, setFilters] = useState({ status: "", priority: "", dueDate: "" });
    const { user } = useContext(AuthContext);

    const getAuthToken = useCallback(() => {
        return localStorage.getItem("authToken");
    }, []);

    const fetchTasks = useCallback(async () => {
        try {
            const token = getAuthToken();
            if (!token) {
                throw new Error("No authentication token found");
            }

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.get(`${api}/tasks`, config);
            setTasks(data.tasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            // Handle error (e.g., show error message to user)
        }
    }, [api, getAuthToken]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks, filters]);

    const handleDelete = async (id) => {
        try {
            const token = getAuthToken();
            if (!token) {
                throw new Error("No authentication token found");
            }

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };

            await axios.delete(`${api}/tasks/${id}`, config);
            fetchTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
            // Handle error (e.g., show error message to user)
        }
    };

    const handleFilterChange = (filterType, value) => {
        setFilters(prevFilters => ({ ...prevFilters, [filterType]: value }));
    };

    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
            case 'high': return 'bg-red-500';
            case 'medium': return 'bg-yellow-500';
            case 'low': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Task List</h2>

            {/* Filtering Controls */}
            <div className="flex space-x-4 mb-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            Status: {filters.status || 'All'}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onSelect={() => handleFilterChange('status', '')}>All</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleFilterChange('status', 'To Do')}>To Do</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleFilterChange('status', 'In Progress')}>In Progress</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleFilterChange('status', 'Completed')}>Completed</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            Priority: {filters.priority || 'All'}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onSelect={() => handleFilterChange('priority', '')}>All</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleFilterChange('priority', 'Low')}>Low</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleFilterChange('priority', 'Medium')}>Medium</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleFilterChange('priority', 'High')}>High</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Task List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks.map((task) => (
                    <Card key={task._id} className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                                {task.title}
                                <Badge className={`${getPriorityColor(task.priority)} text-white`}>
                                    {task.priority}
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-2">{task.description}</p>
                            <p className="text-sm text-gray-500 mb-2">Status: {task.status}</p>
                            {task.dueDate && (
                                <p className="text-sm text-gray-500 mb-2">
                                    Due: {format(new Date(task.dueDate), 'PP')}
                                </p>
                            )}
                            <div className="flex justify-end space-x-2 mt-4">
                                <Button variant="outline" onClick={() => {/* Implement edit functionality */ }}>
                                    Edit
                                </Button>
                                <Button variant="destructive" onClick={() => handleDelete(task._id)}>
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default TaskList;