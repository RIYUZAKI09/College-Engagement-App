const express = require('express');
// const data = require('./dummyData').data;
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');

const app = express();
app.set("view engine", "ejs");
app.use(express.json);
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect('mongodb://localhost:27017/blog').then(()=>{
    console.log('Connected to database');
})


// let blogs = data;

let blogSchema = new mongoose.Schema(
    {
        title: String,
        body: String,
        created: {type: Date, default: Date.now},
    }
)

let Blog = mongoose.model('Blog',blogSchema);

app.get('/', (req, res)=>{
    res.send('Hello World');
})


// SHOW ALL BLOGS
app.get('/blog', async (req,res)=>{
    // console.log(blogs);
    try{
        let blogs = await Blog.find({});
        res.render('index', {blog:blogs});

    }catch{
        res.render('index');
    }
})


// CREATE NEW BLOG FORM
app.get('/blog/new', (req,res)=>{
    res.render('createBlog');
})


// INDIVIDUAL VIEW
app.get('/blog/:id', (req,res)=>{
    // let id = req.params.id;
    // console.log(id);
    // let filteredData = blogs.filter((blog) => blog.id === id);
    // // console.log(filteredData);
    // res.render('blog', {val: filteredData[0]});
})


// NEW BLOG PUSH INTO ARRAY
app.post('/blog', async (req,res)=>{
    // console.log(req.body);
    try{
        await Blog.create(req.body);
        console.log('New Blog Created');
        res.render('index', {blog: blogs});
    }catch{
        res.redirect('/blog');
    }
    // console.log(toString(blogs.length+1));
    // blogs.push({id:toString(blogs.length+1) ,body: req.body.body, title: req.body.title});
    // console.log(blogs);
    res.redirect('/blog');
})

// BLOG EDIT FORM
app.get('/blog/:id/edit', (req,res)=>{
    // let id = req.params.id;
    // let filteredData = blogs.filter((blog) => blog.id === id);
    // res.render('editBlog', {val: filteredData[0]});
    
})

// BLOG EDIT CHANGES TO ARRAY
app.post('/blog/:id', (req,res)=>{
    // let title = req.body.title;
    // let body = req.body.body;
    // const id = req.params.id;
    // data.map(k=>{
    //     if(k.id === id){
    //         k.title = title;
    //         k.body = body;

    //         return;
    //     }
    // })
    // res.redirect(`/blog/${id}`);
})

app.listen(3001, ()=>{
    console.log('Server Listening at port 3001');
})