export class Task {
    constructor(title, dueTimeMinutes) {
        this.title = title;
        this.dueTime = new Date(Date.now() + dueTimeMinutes * 60000); 
        this.priority = Math.floor(Math.random() * 5) + 1; 
    }
}
export class TaskManager {
    constructor() {
        this.tasks = [];
    }
    addTask(title, dueTimeMinutes) {
        try {
            if (!title || dueTimeMinutes <= 0) throw new Error("Invalid task details");
            const task = new Task(title, dueTimeMinutes);
            this.tasks.push(task);
            console.log(`Task added: ${task.title}, Due in: ${dueTimeMinutes} minutes`);
        } catch (error) {
            console.error("Error adding task:", error.message);
        }
    }
    sortTasksByPriority() {
        this.tasks.sort((a, b) => a.priority - b.priority);
    }

    listTasks() {
        return this.tasks.map(task => `${task.title} - Priority: ${task.priority} - Due: ${task.dueTime}`);
    }

    async scheduleReminders() {
        for (let task of this.tasks) {
            const delay = task.dueTime - Date.now();
            if (delay > 0) {
                console.log(`Reminder set for: ${task.title}`);
                await new Promise(resolve => setTimeout(resolve, delay));
                console.log(`⏰ Reminder: ${task.title} is due now!`);
            }
        }
    }
}
