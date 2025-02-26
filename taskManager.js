export class Task {
    constructor(title, dueTimeMinutes, priority) {
        if (!title || dueTimeMinutes <= 0) throw new Error("Invalid task details");
        this.title = title;
        this.dueTime = new Date(Date.now() + dueTimeMinutes * 60000);
        this.priority = priority || Math.floor(Math.random() * 5) + 1;
    }
}

export class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(title, dueTimeMinutes, priority) {
        try {
            const task = new Task(title, dueTimeMinutes, priority);
            this.tasks.push(task);
            console.log(`Task "${title}" added successfully.`);
        } catch (error) {
            console.error("Error adding task:", error.message);
        }
    }

    listTasks() {
        return this.tasks;
    }

    sortTasksByPriority() {
        this.tasks.sort((a, b) => b.priority - a.priority);
    }

    getTasksDueWithin(minutes) {
        const now = new Date();
        return this.tasks.filter(task => (task.dueTime - now) / 60000 <= minutes);
    }

    async sendReminders() {
        for (const task of this.tasks) {
            const delay = task.dueTime - new Date();
            if (delay > 0) {
                console.log(`Reminder set for "${task.title}" in ${Math.ceil(delay / 60000)} minutes.`);
                setTimeout(() => {
                    console.log(`⏰ Reminder: Task "${task.title}" is due now!`);
                }, delay);
            }
        }
    }
}
