import { TaskManager } from './taskManager.js';

const taskManager = new TaskManager();


taskManager.addTask("Reading", 1); 
taskManager.addTask("singing", 3);    
taskManager.addTask("Workout", 2);          


taskManager.sortTasksByPriority();
console.log("Sorted Tasks:", taskManager.listTasks());


taskManager.scheduleReminders();
