const form = document.getElementById('form');
form.addEventListener('submit', addItem);
const todoList = document.querySelector('.todo-list');
todoList.addEventListener('click',change);
const todoCompletedList = document.querySelector('.todo-completed');
const crudId="76c67933d02840cba82731d7c753da6b";
function addItem(e){
    e.preventDefault();
    const todo = {
        todoName:e.target.item.value,
        desc: e.target.description.value,
        completed:false
    };
    axios.post('https://crudcrud.com/api/'+crudId+'/todoList',todo)
    .then((res)=> addToList(todo))
    .catch((err)=>console.log(err));
    form.reset();
}

function addToList(todo){
    let newTodo = document.createElement('li');
    newTodo.id=todo._id
    
 
    newTodo.innerHTML=`<span>${todo.todoName} ${todo.desc}</span>
         <button class="checked btn m-1"> &#10004; </button>  <button class=" delete btn m-1">X</button>`
    todoList.appendChild(newTodo);
    
    
}
function showCompletedTodos(todo){
    let newTodo = document.createElement('li');
    newTodo.id=todo._id
    
    newTodo.innerHTML=`<span>${todo.todoName} ${todo.desc}</span>`;
        
    todoCompletedList.appendChild(newTodo);
}
window.addEventListener('DOMContentLoaded',()=>{
    axios.get('https://crudcrud.com/api/'+crudId+'/todoList')
    .then((res )=> {
        for(let i=0;i<res.data.length;i++){
            addToList(res.data[i]);
           
        }
    })
    .catch((err)=>console.log(err));
    axios.get('https://crudcrud.com/api/f0424399e70947e7875b02af8fc410e2/todo')
    .then((res )=> {
        for(let i=0;i<res.data.length;i++){
            showCompletedTodos(res.data[i]);
           
        }
    })
    .catch((err)=>console.log(err));
})

function change(e){
    var li = e.target.parentElement;
    var todos;
    let todo_id = li.id;
    
    
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure to delete?')){
            //deleting using id
            todoList.removeChild(li);
            axios.delete('https://crudcrud.com/api/'+crudId+'/todoList/'+todo_id)
            .then(res => console.log(res.status))
            .catch((err)=> console.log(err));
        }
    }
    if(e.target.classList.contains('checked')){
        axios.get('https://crudcrud.com/api/'+crudId+'/todoList/'+todo_id)
        .then((res)=>{
            
            todos ={
                todoName:res.data.todoName,
                desc: res.data.desc,
                completed:true
            }
            axios.post('https://crudcrud.com/api/f0424399e70947e7875b02af8fc410e2/todo',todos)
            .then((res)=>{ 
                axios.delete('https://crudcrud.com/api/'+crudId+'/todoList/'+todo_id)
                .then(newRes => console.log(newRes.status))
                .catch((err)=> console.log(err));
                
                showCompletedTodos(res.data);
            
            })
        .catch((err)=>console.log(err));
        })
        .catch((err) => console.log(err));
        todoList.removeChild(li);
        
    }
}
