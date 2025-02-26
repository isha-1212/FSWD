import { TaskManager } from './taskManager.js';

const manager = new TaskManager();

manager.addTask("reading", 5, 2);
manager.addTask("singing", 15, 3);
manager.addTask("workout", 10, 1);
manager.addTask("dance", 20, 1);

console.log("\n📌 All Tasks:");
console.log(manager.listTasks());

manager.sortTasksByPriority();
console.log("\n🔝 Tasks Sorted by Priority:");
console.log(manager.listTasks());

console.log("\n⏳ Tasks Due in 10 Minutes:");
console.log(manager.getTasksDueWithin(10));

console.log("\n🔔 Setting Reminders...");
manager.sendReminders();
