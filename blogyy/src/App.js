import logo from './logo.svg';
import './App.css';
import Login from './component/Login';
import CreatePost from './component/createPost';
import BlogBox from './component/blogBox';
function App() {
  return (
    <div className="App">
      <CreatePost/>
      <BlogBox/>
    </div>
  );
}

export default App;
