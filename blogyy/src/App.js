import logo from './logo.svg';
import './App.css';
import Login from './component/Login';
import CreatePost from './component/createPost';
import BlogBox from './component/blogBox';
import Navbar from './component/navbar';
function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className='flex flex-row gap-3'>
      <BlogBox/>
      <BlogBox/>
      </div>
      
    </div>
  );
}

export default App;
