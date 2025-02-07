import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs([...blogs].reverse()));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setNotification({
        text: "Login Successful!",
        type: "success"
      })

       setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (exception) {
      if (exception.response && exception.response.data) {
        setNotification({
          text: exception.response.data.error,
          type: "error"
        })
      } else {
        setNotification({
          text: "Login Failed. Please try again",
          type: "error"
        })
      }

      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    const newBlogObj = {
      title,
      author,
      url,
    };

    try {
      await blogService.createBlog(newBlogObj);
      setTitle("")
      setAuthor("")
      setUrl("")
      
      setNotification({
        text: "New blog added!",
        type: "success"
      })

       setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (exception) {
      if (exception.response && exception.response.data) {
        setNotification({
          text: exception.response.data.error,
          type: "error"
        })
      } else {
        setNotification({
          text: "Failed to create blo. Try again",
          type: "error"
        })
      }

      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const loginForm = () => {
    return (
      <>
        <p>Please log in:</p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="login"
            id="login"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <br />
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <br />
          <button type="submit">log in</button>
        </form>
        <br />
      </>
    );
  };

  const createFrom = () => (
    <>
      <form onSubmit={handleCreateBlog}>
        <p>new blog:</p>
        <div>
          <label htmlFor="title">title</label>
          <input
            onChange={({ target }) => setTitle(target.value)}
            type="text"
            name="title"
            id="title"
            value={title}
          />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input
            onChange={({ target }) => setAuthor(target.value)}
            type="text"
            name="author"
            id="author"
            value={author}
          />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input
            onChange={({ target }) => setUrl(target.value)}
            type="text"
            name="url"
            id="url"
            value={url}
          />
        </div>
        <button type="submit">create</button>
      </form>
      <br />
    </>
  );

  return (
    <div>
      <div>
        <h2>blogs</h2>
        {notification && <Notification text={notification.text} type={notification.type} />}
        {user !== null ? (
          <div>
            <p>
              user <strong>{user.username}</strong> logged in
            </p>
            <button onClick={handleLogout}>LogOut</button>
            {createFrom()}
          </div>
        ) : (
          loginForm()
        )}

        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default App;
