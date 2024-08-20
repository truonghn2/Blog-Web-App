import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;

//middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); //to server static files from the "public" directory

//creating a post array
var posts = [];

//Routes
app.get("/", (req, res) => {
    res.render("home.ejs", {
        posts: posts
    });
});

app.get("/post/new", (req, res) => {
    res.render("new-post.ejs");
});

//sending the new post to the server
app.post("/post", (req, res) => {
    //newPost object is created
    const newPost = { 
        id: Date.now(), //current time stamp. to make sure each post has unique id
        title: req.body.title, //value of 'title' from the form data sent in req.body
        content: req.body.content //value of 'content' from the form data sent in req.body
    };
    //adds newPost to the posts array
    posts.push(newPost);
    //after adding a new post the user is sent to the home page
    res.redirect("/");
});


app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
})


