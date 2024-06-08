// get home page and export it
exports.homepage = async (req,res) => {
    const locals = { // used for page titles and description
        title: 'Focus App',
        description: 'Focus is a task manager application'
    }
    res.render('home', locals)
}

// get about page and export it
exports.aboutpage = async (req,res) => {
    const locals = { // used for page titles and description
        title: 'About Focus',
        description: 'Focus is a task manager application'
    }
    res.render('about', locals)
}
