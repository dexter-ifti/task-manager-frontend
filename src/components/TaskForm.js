"use client"
import React, { useState, useContext, useCallback } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import AuthContext from "@/context/AuthContext"; 

const TaskForm = ({ task, onSubmit }) => {
    const { user } = useContext(AuthContext); 
    const api = process.env.NEXT_PUBLIC_API_URL;
    const [form, setForm] = useState({
        title: task?.title || "",
        description: task?.description || "",
        status: task?.status || "To Do",
        priority: task?.priority || "Low",
        dueDate: task?.dueDate ? new Date(task.dueDate) : null,
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [id]: value }));
    };

    const getAuthToken = useCallback(() => {
        return localStorage.getItem("authToken");
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
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

            const taskData = {
                ...form,
                userId: user._id, // Include the user ID in the task data
            };

            if (task) {
                await axios.patch(`/${api}/tasks/${task._id}`, taskData, config);
            } else {
                await axios.post(`/${api}/tasks`, taskData, config);
            }
            onSubmit();
        } catch (error) {
            console.error("Error submitting task:", error);
            // Handle error (e.g., show error message to user)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-red-400 w-1/2 rounded-lg shadow-md">
            <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">Title</Label>
                <Input
                    id="title"
                    value={form.title}
                    onChange={handleInputChange}
                    placeholder="Enter task title"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description</Label>
                <Textarea
                    id="description"
                    value={form.description}
                    onChange={handleInputChange}
                    placeholder="Enter task description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                />
            </div>

            <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Status</Label>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                            {form.status}
                            <span className="ml-2 opacity-50">▼</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                        <DropdownMenuLabel>Task Status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {["To Do", "In Progress", "Completed"].map((status) => (
                            <DropdownMenuItem
                                key={status}
                                onSelect={() => setForm((prev) => ({ ...prev, status }))}
                            >
                                {status}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Priority</Label>
                <RadioGroup
                    defaultValue={form.priority}
                    onValueChange={(value) => setForm((prev) => ({ ...prev, priority: value }))}
                    className="flex space-x-4"
                >
                    {["Low", "Medium", "High"].map((priority) => (
                        <div key={priority} className="flex items-center space-x-2">
                            <RadioGroupItem value={priority} id={priority} />
                            <Label htmlFor={priority}>{priority}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>

            <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Due Date</Label>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                            {form.dueDate ? format(form.dueDate, "PPP") : "Select a date"}
                            <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={form.dueDate}
                            onSelect={(date) => setForm((prev) => ({ ...prev, dueDate: date }))}
                            initialFocus
                        />
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                {task ? "Update Task" : "Create Task"}
            </Button>
        </form>
    );
};

export default TaskForm;