const Blog = ({ blog }) => (
  <div>
    <a href={blog.url}><strong>{blog.title}</strong></a>   by {blog.author}
     <br />
     {blog.likes} likes
  </div>
);

export default Blog;
