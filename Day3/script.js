console.log("JavaScript file is connected!");
document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript is running!");

    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Debugging: Check if elements exist
    if (!taskInput || !addTaskBtn || !taskList) {
        console.error("One or more elements are missing!");
        return;
    }

    addTaskBtn.addEventListener("click", addTask);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const taskItem = createTaskElement(taskText);
        taskList.appendChild(taskItem);

        saveTasks();
        taskInput.value = "";
    }

    function createTaskElement(taskText) {
        const li = document.createElement("li");
        
        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;

        // Toggle completed
        taskSpan.addEventListener("click", () => {
            li.classList.toggle("completed");
            saveTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", () => {
            li.remove();
            saveTasks();
        });

        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);

        return li;
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("#taskList li").forEach(task => {
            tasks.push({ text: task.querySelector("span").textContent, completed: task.classList.contains("completed") });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            const taskItem = createTaskElement(task.text);
            if (task.completed) taskItem.classList.add("completed");
            taskList.appendChild(taskItem);
        });
    }

    loadTasks(); // Load tasks when page opens
});
