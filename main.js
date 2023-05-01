const form = document.getElementById('form');
form.addEventListener('submit', addItem);
const todoList = document.querySelector('.todo-list');
todoList.addEventListener('click',change);
const todoCompletedList = document.querySelector('.todo-completed');
const crudId="e13ea8f583ca4e4eb42538ea85f3518d";
async function addItem(e){
    e.preventDefault();
    const todo = {
        todoName:e.target.item.value,
        desc: e.target.description.value,
        completed:false
    };
    try{
        const res  = await axios.post('https://crudcrud.com/api/'+crudId+'/todoList',todo);
        addToList(res.data);
    }
    catch(error){ console.log(error); }
   // resetting the field 
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
        newTodo.innerHTML=`<span>${todo.todoName} ${todo.desc} on ${new Date().toLocaleDateString()}</span>`;
        todoCompletedList.appendChild(newTodo);
    }
}

window.addEventListener('DOMContentLoaded',async ()=>{
    try{
        const res = await axios.get('https://crudcrud.com/api/'+crudId+'/todoList');
        for(let i=0;i<res.data.length;i++){
            addToList(res.data[i]);
        }
    }
    catch(error){ console.log(error) }
})

async function change(e){
    const li = e.target.parentElement;
    const todo_id = li.id;
    
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure to delete?')){
            //deleting using id
            todoList.removeChild(li);
            try{
                await axios.delete('https://crudcrud.com/api/'+crudId+'/todoList/'+todo_id);
            }
            catch(error) { console.log(error) }
        }
    }
    if(e.target.classList.contains('checked')){
        const todo = {
            todoName: li.firstElementChild.textContent,
            desc: '',
            completed: true,
          };
        await axios.put('https://crudcrud.com/api/'+crudId+'/todoList/'+todo_id, todo);
        todoList.removeChild(li);
        addToList(todo);
    }
}
