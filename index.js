const express = require("express");
require("dotenv").config();
const cors = require('cors');
const authRouter = require("./routes/authRoute");
const storyRouter = require("./routes/storyRoute");
const chapterRouter = require("./routes/chapterRoute");
const likesRouter = require("./routes/likesRoute");
const commentsRouter = require("./routes/commentsRoute");
const app = express();
app.use(cors());
app.use(express.json());


//Routes
app.use('/auth', authRouter);
app.use('/stories', storyRouter);
app.use('/chapters', chapterRouter);
app.use('/likes', likesRouter);
app.use('/comments', commentsRouter)

//Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const errMessage = err.message || "Something went wrong!"
  res.status(statusCode).setHeader('Content-Type', 'application/json');
  res.json({
    success: false,
    statusCode: statusCode,
    message: errMessage,
    stack: err.stack
  })

});


app.listen(process.env.PORT, () => {
  console.log("Server started successfully!");
});
