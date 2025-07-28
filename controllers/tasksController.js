// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
export const getTasks = async (req, res) => {
    try {
        // Fetch all tasks from MySQL
        const [tasks] = await req.db.promise().query("SELECT * FROM todos");

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });

    } catch (err) {
        console.error("MySQL Error:", err);
        res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
};

//@des  get single tasks
//@route /api/tasks/:id

export const getTask = (req, res,next) => {


}


// @desc    Create a new task
// @route   POST /api/tasks
// @access  Public
export const createTask = async (req, res) => {
    const { task } = req.body;
    const currentDate = new Date();

    // Validate input
    if (!task) {
        return res.status(400).json({ error: "task is required" });
    }

    try {
        // Execute MySQL query using req.db (attached via middleware)
        const [result] = await req.db.promise().query(
            "INSERT INTO todos (task, createdAt,completed) VALUES (?, ?, ?)",
            [task, currentDate || null, false ]
        );

        const [tasks] = await req.db.promise().query("SELECT * FROM todos");

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });





    } catch (err) {
        console.error("MySQL Error:", err);
        res.status(500).json({ error: "Failed to create task" });
    }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Public

export const updateTask = async (req, res) => {
    const taskId = req.params.id;
    const { task } = req.body;

    try {
        // 1. Check if task exists
        const [existingTask] = await req.db.promise().query(
            "SELECT * FROM todos WHERE id = ?",
            [taskId]
        );

        if (existingTask.length === 0) {
            return res.status(404).json({
                success: false,
                error: "Task not found"
            });
        }


        // 2. Update the task (only changed fields)
        await req.db.promise().query(
            " UPDATE todos SET task = ?WHERE id = ? ",
            [
                task ,
                taskId
            ]
        );

        // 3. Fetch updated task
        const [updatedTask] = await req.db.promise().query(
            "SELECT * FROM todos",
            [taskId]
        );

        res.status(200).json({
            success: true,
            data: updatedTask
        });

    } catch (err) {
        console.error("MySQL Error:", err);
        res.status(500).json({
            success: false,
            error: "Failed to update task"
        });
    }
};


// @desc    Update a task status
// @route   PUT /api/tasks/completed/:id
// @access  Public

export const updateTaskStatus = async (req, res) => {
    const taskId = req.params.id;
    const { completed } = req.body;

    try {
        // 1. Check if task exists
        const [existingTask] = await req.db.promise().query(
            "SELECT * FROM todos WHERE id = ?",
            [taskId]
        );

        if (existingTask.length === 0) {
            return res.status(404).json({
                success: false,
                error: "Task not found"
            });
        }

        console.log(completed);
        // 2. Update the task (only changed fields)
        await req.db.promise().query(
            " UPDATE todos SET completed = ? WHERE id = ? ",
            [
                completed ,
                taskId
            ]
        );

        // 3. Fetch updated task
        const [updatedTask] = await req.db.promise().query(
            "SELECT * FROM todos",
            [taskId]
        );

        res.status(200).json({
            success: true,
            data: updatedTask
        });

    } catch (err) {
        console.error("MySQL Error:", err);
        res.status(500).json({
            success: false,
            error: "Failed to update task"
        });
    }
};




// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Public
export const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        // 1. Check if task exists
        const [task] = await req.db.promise().query(
            "SELECT id FROM todos WHERE id = ?",
            [taskId]
        );

        if (task.length === 0) {
            return res.status(404).json({
                success: false,
                error: "Task not found"
            });
        }

        // 2. Delete the task
        await req.db.promise().query(
            "DELETE FROM todos WHERE id = ?",
            [taskId]
        );

        const [tasks] = await req.db.promise().query("SELECT * FROM todos");

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });


    } catch (err) {
        console.error("MySQL Error:", err);
        res.status(500).json({
            success: false,
            error: "Failed to delete task"
        });
    }
};
