const uuid4 = require('uuid/v4');
const util = require('../utils/util')
var blogs = require('./blogStore');

module.exports = {
    getAllBlogs : _ => blogs,
    addBlog : (blogData) => {
        var blog = {
            blogID : uuid4(),
            title : blogData["title"],
            content : blogData["content"],
            dateAdded : util.getDate(),
            votes: 0
        }
        blogs.push(blog)
        return {
            msg : "Blog added successfully",
            status : 200,
            blogs : blogs
        }
    },
    upVoteBlog : (blogID) => {
        if (blogID == "") {
            return "blog id can't be empty"
        }

        let blogFound = false
        let updatedBlogs = blogs.map(blog => {
            if (blog.blogID == blogID) {
                blogFound = true
                blog.votes++
            } 
            return blog
        })

        if (!blogFound) {
            return "blog not found"
        } 
        
        blogs = updatedBlogs
        return {
            status : "Blog upvoted successfully",
            blogs : updatedBlogs
        }
    }
}