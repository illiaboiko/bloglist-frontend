import { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleView = () => {
    setVisible(!visible)
  }

  const additionalInfo = () => {
    return (
      <>
        <div>
          <div>{blog.url}</div>
          <div>
            {blog.likes} likes
            <button onClick={() => addLike(blog)}>like</button>
            <div>created by: {blog.user.username}</div>
          </div>
          {user.username === blog.user.username ? (
            <div>
              <button onClick={() => deleteBlog(blog.id)}>delete</button>
            </div>
          ) : null}
        </div>
      </>
    )
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author}
        <button onClick={toggleView}>{visible ? 'hide' : 'view'}</button>
        {visible && additionalInfo()}
      </div>
    </div>
  )
}

export default Blog
