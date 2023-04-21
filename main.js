const form = document.getElementById('form');
form.addEventListener('submit', addItem);
const todoList = document.querySelector('.todo-list');
todoList.addEventListener('click',change);
const todoCompletedList = document.querySelector('.todo-completed');
const crudId="88ad028d5b14412798f151e88788651b";
function addItem(e){
    e.preventDefault();
    const todo = {
        todoName:e.target.item.value,
        desc: e.target.description.value,
        completed:false
    };
    axios.post('https://crudcrud.com/api/'+crudId+'/todoList',todo)
    .then((res)=> addToList(res.data))
    .catch((err)=>console.log(err));
    form.reset();
}

function addToList(todo){
    let newTodo = document.createElement('li');
    newTodo.id=todo._id;
    if(!todo.completed){
        newTodo.innerHTML=`<span>${todo.todoName} ${todo.desc}</span>
         <button class="checked btn m-1"> &#10004; </button>  <button class=" delete btn m-1">X</button>`
        todoList.appendChild(newTodo);
    }
    else{
        newTodo.innerHTML=`<span>${todo.todoName} ${todo.desc}</span>`;
        todoCompletedList.appendChild(newTodo);
    }
}

window.addEventListener('DOMContentLoaded',()=>{
    axios.get('https://crudcrud.com/api/'+crudId+'/todoList')
    .then((res )=> {
        for(let i=0;i<res.data.length;i++){
            addToList(res.data[i]);
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
            
            todoUpdated ={
                todoName:res.data.todoName,
                desc: res.data.desc,
                completed:true
            }
            axios.put('https://crudcrud.com/api/'+crudId+'/todoList/'+todo_id,todoUpdated)
            .then(() => addToList(todoUpdated))
            .catch((err)=>console.log(err));
        })
        .catch((err) => console.log(err));
        todoList.removeChild(li);
    }
}
