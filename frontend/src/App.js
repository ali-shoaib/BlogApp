import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState([])
  const [title, setTitle] = useState('')
  const [toggleTodo, setToggleTodo] = useState(false)
  const [editTodo, setEditTodo] = useState({});
  
  useEffect(() => {
    async function fetchData(){
      await axios.post('http://localhost:2000/todos/'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        setData(response.data);
      })
      .catch(err => console.log(err))
    }
    fetchData()
  },[])
  
  // async function f(){
  //   let promise = new Promise((resolve,reject) => {
  //     setTimeout(() => resolve('done!'), 3000)
  //   })
  //   let result = await promise;
  //   console.log(result);
  // }
  // f();

  const deleteTodo = async(id) =>{
    await axios.post(`http://localhost:2000/todos/deleteTodo/${id}`)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
    setData(data.filter(data => data._id !== id));
  }

  const deleteAll = () =>{
    axios.delete(`http://localhost:2000/todos/deleteTodos`)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
    setData([]);
  }

  const addTodo = async(e) =>{
    e.preventDefault();
    const items = {
      title,
    }
    await axios.post(`http://localhost:2000/todos/addTodo`, items)
    .then(res => data.unshift(res.data.todo))
    .catch(err => console.log(err))
    console.log(data)
    setTitle('');
  }

  const enableUpdateTodo = (todo) => {
    setToggleTodo(true)
    setEditTodo({...todo});
    console.log(todo)
  }

  function handleEditInputChange(e) {
    setEditTodo({ ...editTodo, title: e.target.value });
  }

  const handleEditTodo = async(e) => {
    e.preventDefault();
    const updateditem = {
      title: editTodo.title,
    }
    await axios.post(`http://localhost:2000/todos/updateTodo/${editTodo._id}`, updateditem)
    .then(res => (setEditTodo(res.data.todo)))
    .catch(err => console.log(err))

    // let index = data.findIndex(todo => todo.id === editTodo._id)
    // if(index !== -1){
    //   data.splice(index, 1, editTodo);
    // }
    const et = data.map(todo => {
      return todo._id === editTodo._id ? editTodo : todo
    })
    setData(et)
    setToggleTodo(false)

  }

  return (
    <div className="App">
      {
        toggleTodo ?
          (
            <form onSubmit={handleEditTodo}>
              <input 
                  type="text" 
                  placeholder="Edit Todo..." 
                  value={editTodo.title} 
                  onChange={handleEditInputChange} 
                  name='title' 
                />
              <button type="submit">Save</button>
              <button onClick={() => setToggleTodo(false)}>Cancel</button>
            </form>
          )
        :
          (
            <form onSubmit={addTodo}>
              <input 
                  type="text" 
                  placeholder="Enter Todo..." 
                  value={title} 
                  onChange={e => setTitle(e.target.value)} 
                  name='title' 
                />
              <button type="submit">Add</button>
              <button onClick={deleteAll}>Delete All</button>
            </form>
          )
        }
        <ul className='list'>
          {data.length === 0 ? 
            <>No todos here</> : 
            data.map(d => {
            return(
              <li key={Math.random()} className='list-todos'>
                {d.title} 
                <button onClick={() => enableUpdateTodo(d)}>Edit</button>
                <button onClick={() => deleteTodo(d._id)}>Delete</button>
            </li>
            )
          })}
        </ul>
    </div>
  );
}
export default App;