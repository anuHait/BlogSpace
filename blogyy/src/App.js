import logo from './logo.svg';
import './App.css';
import Login from './component/Login';
import CreatePost from './component/createPost';
import BlogBox from './component/blogBox';
import Navbar from './component/navbar';
import Posts from './component/posts';
import {  Route, Routes } from "react-router-dom";
import Hello from './component/hello';
function App() {
  return (
    <div className="App">
    
    
      <Routes>
      <Route path="/"  element={<Login/>} />
        <Route path="/posts"  element={<Posts/>} />
      </Routes>
    </div>
  );
}

export default App;
