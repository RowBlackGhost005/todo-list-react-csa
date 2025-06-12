import logo from './logo.svg';
import './App.css';
import './styles.css';

import ToDoApp from './components/ToDoApp'

function App() {
  return (
    <div className="App mainContainer">
      <header className='color-primary py-2 text-light'>
        <h1>TO-DO web app</h1>
      </header>

      <main>
        <ToDoApp/>
      </main>
      

      <footer className='color-primary text-light text-center py-2'>
        <p>Developed by: Luis Marin</p>
      </footer>
    </div>
  );
}

export default App;
