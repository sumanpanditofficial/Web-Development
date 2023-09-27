import logo from './logo.svg';
import './App.css';
const name = "Suman Pandit";
const date = new Date();
const currentYear = date.getFullYear();

function App() {
  return (
    <div className="App">
  <h1 className="heading">Hello this is Suman Pandit</h1>
    <p>Creator is {name}</p>
    <p>copyright content {currentYear}</p>
    <div>
      <img src="https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
      <img src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
      <img src="https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
    </div>
    </div>
  );
}

export default App;