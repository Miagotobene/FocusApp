const Todo = require("../models/todo");
const mongoose = require("mongoose");

/**
 * GET /
 * Dashboard with all tasks
 */
exports.dashboard = async (req, res) => {

  const locals = {
    title: "Dashboard",
    description: "Focus is a task manager app",
  };

  try {
    const tasks = await Todo.find({});

    res.render('dashboard/index', {
      userName: req.user.firstName,
      locals,
      tasks,
      layout: "../views/layouts/dashboard",
    })
    // console.log(tasks);
  } catch (error) {
    
  }
}


/**
 * GET /
 * View A Specific Task
 */
exports.dashboardViewTask = async (req, res) => {
  const task = await Todo.findById(req.params.id ).where(req.user.id ); // only signed in user can view this page
  // console.log(req.params.id)
  // console.log(task);
  // res.send(req.params.id, task)


  if (task) {
    res.render("dashboard/view-note", {
      taskID: req.params.id,
      task,
      layout: "../views/layouts/dashboard.ejs"
    });
  } else {
    res.send("Something went wrong.");
  }
}

/**
 * PUT /
 * Update Specific Note
//  */
exports.dashboardUpdateTask = async (req, res) => {
  try {
    await Todo.findOneAndUpdate(
      { _id: req.params.id },
      { title: req.body.title, body: req.body.body, updatedAt: Date.now() }
    )
    .where(req.user.id );
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
}


// /**
//  * DELETE /
//  * Delete Note
//  */
exports.dashboardDeleteTask = async (req, res) => {
  // const id = req.params.id.trim();
  // console.log(id);
  try {
    await Todo.deleteOne(
      {_id: req.params.id.trim()}
    )
    .where(req.user.id);
    res.redirect("/dashboard");
    console.log('task is deleted')
  } catch (error) {
    console.log(error);
  }
};

// /**
//  * GET /
//  * Add Note
//  */
exports.dashboardAddTask = async (req, res) => {
  res.render("dashboard/add", {
    layout: "../views/layouts/dashboard",
  });
};

// /**
//  * POST /
//  * Add Notes
//  */
exports.dashboardAddTaskSubmit = async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Todo.create(req.body); // submit title and form
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

// /**
//  * GET /
//  * Search for a word in your todo list
//  */
exports.dashboardSearch = async (req, res) => {
  try {
    res.render("dashboard/search", {
      searchResults: "",
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {
    console.log(error)
  }
};

// /**
//  * POST /
//  * Search For Notes
//  */
exports.dashboardSearchSubmit = async (req, res) => {
  try {
    let searchTerm = req.body.SearchTerm;
    console.log(searchTerm);
    const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const searchResults = await Todo.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChars, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChars, "i") } },
      ],
    })
    .where(req.user.id );

    res.render("dashboard/search", {
      searchResults,
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {
    console.log(error);
  }
}
