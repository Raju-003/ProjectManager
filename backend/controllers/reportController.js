const Task = require('../models/Task');
const User = require('../models/User');
const excelJS = require('exceljs');

//@desc Export all tasks as Excel File
//@route GET /api/reports/export/tasks
//@access Private/Admin
const exportTasksReport = async (req, res) => {
  try {
    const tasks = await Task.find({}).populate('assignedTo', 'name email'); // Fixed: Changed from 'user' to 'assignedTo'

    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet('Tasks Report');

    // Define columns with proper headers and keys
    worksheet.columns = [
      { header: 'Task ID', key: '_id', width: 20 },
      { header: 'Title', key: 'title', width: 30 },
      { header: 'Description', key: 'description', width: 50 },
      { header: 'Priority', key: 'priority', width: 15 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Due Date', key: 'dueDate', width: 20 },
      { header: 'Assigned To', key: 'assignedTo', width: 30 },
      { header: 'Created At', key: 'createdAt', width: 20 },
    ];

    // Add rows with proper data mapping
    tasks.forEach((task) => {
      const assignedTo = task.assignedTo
        .map((user) => (user ? `${user.name} (${user.email})` : 'Unassigned'))
        .join(', ');

      worksheet.addRow({
        _id: task._id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate.toLocaleDateString(),
        assignedTo: assignedTo,
        createdAt: task.createdAt.toLocaleDateString(),
      });
    });

    // Set response headers
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=tasks_report.xlsx'
    );

    // Write and send the file
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Export Tasks Error:', error);
    res.status(500).json({
      message: 'Error exporting tasks report',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

//@desc Export user-task report as Excel File
//@route GET /api/reports/export/users
//@access Private/Admin
const exportUsersReport = async (req, res) => {
  try {
    const users = await User.find({}).select('name email _id').lean();
    const userTasks = await Task.find().populate(
      'assignedTo',
      'name email _id'
    );

    // Initialize user task map
    const userTaskMap = {};
    users.forEach((user) => {
      userTaskMap[user._id] = {
        _id: user._id,
        name: user.name,
        email: user.email,
        taskCount: 0,
        pendingTasks: 0,
        inProgressTasks: 0,
        completedTasks: 0,
      };
    });

    // Count tasks per user
    userTasks.forEach((task) => {
      if (task.assignedTo && task.assignedTo.length) {
        task.assignedTo.forEach((assignedUser) => {
          if (userTaskMap[assignedUser._id]) {
            userTaskMap[assignedUser._id].taskCount += 1;

            // Use consistent status checks
            if (task.status === 'Pending') {
              userTaskMap[assignedUser._id].pendingTasks += 1;
            } else if (task.status === 'In Progress') {
              userTaskMap[assignedUser._id].inProgressTasks += 1;
            } else if (task.status === 'Completed') {
              userTaskMap[assignedUser._id].completedTasks += 1;
            }
          }
        });
      }
    });

    // Create workbook and worksheet
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet('User Task Report');

    worksheet.columns = [
      { header: 'User ID', key: '_id', width: 20 },
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Total Tasks', key: 'taskCount', width: 15 },
      { header: 'Pending Tasks', key: 'pendingTasks', width: 15 },
      { header: 'In Progress Tasks', key: 'inProgressTasks', width: 20 },
      { header: 'Completed Tasks', key: 'completedTasks', width: 20 },
    ];

    // Add user data to worksheet
    Object.values(userTaskMap).forEach((user) => {
      worksheet.addRow(user);
    });

    // Set response headers
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=user_task_report.xlsx'
    );

    // Write and send the file
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Export Users Report Error:', error);
    res.status(500).json({
      message: 'Error exporting users report',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

module.exports = {
  exportTasksReport,
  exportUsersReport,
};
