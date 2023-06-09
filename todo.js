

let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');


console.log('Working');


function showNotification(text) {
    alert(text);
}


// this function is to grab the input box content, keyup event is used when enter key is pressed it will take the input an store it as text
// also this function is used to show alert messages if input box is empty or not

function handleInputKeypress(e){
    if(e.key==='Enter'){
        const text=e.target.value;
        console.log("text",":",text)
        if(!text){
            showNotification("Task text cannot be empty");
            return;
        }
        const task={
            text:text,  
            // text, is nothing but shorthand for text:text keyword
            id: Date.now().toString(),
            // date.Now is use to give id name as time stamp in the form of string using to string
            done:false
            // done here represents if task is done or not
        }

        e.target.value='';
        // above statement is used to empty input box after task is entered and saved
        addTask(task);
    }
}
addTaskInput.addEventListener('keyup',handleInputKeypress);

function addTask (task) {
  //here task object is pushed on to tasks array
  //   here if statement is used just to be cautious to be sure task object is present ,it will push if its true
  if(task){
    tasks.push(task);   
    renderList();
    showNotification("Task Added Successfully");  
    return;
    // render list is to add list task in tasks in ul
  }
  showNotification("Unable to add task");

}

function deleteTask (taskId) {
    const newTasks=tasks.filter(function(task){
            return task.id !== taskId 
    });
    tasks=newTasks;
    renderList();
    showNotification("Task deleted successfully");
}


function markTaskAsComplete (taskId) {
    let toggletask=tasks.filter(function(task){
        return task.done===taskId;
    });
    console.log(toggletask);
    if(toggletask.length>0){
        let currenttask=toggletask[0];
        currenttask.done=!currenttask.done;
        renderList();
        showNotification("task toggled succesfully");
        return;
    }
    showNotification("Could not toggle the task");
}




function renderList () {
    taskList.innerHTML='';
    for(let i=0;i<tasks.length;i++){
        addTaskToDom(tasks[i]);
    }
     tasksCounter.innerHTML=tasks.length;
}

function addTaskToDom(task){
    let li= document.createElement("li");
    li.innerHTML=`
        <input type="checkbox" id="${task.id}" ${task.done?'checked':""} class="custom-checkbox">
        <label for="${task.id}">${task.text}</label>
        <img src="bin.svg" class="delete" data-id="${task.id}" />
    `;
    taskList.append(li);
}

//  event delegation is the event we can use when there are multiple event use, instead of adding multiple events we use delegation
// so that only one event is common to all the document

function handleClickListener(e){
    let target=e.target;
    console.log(target);

    if(target.className=="delete"){
        let taskId=target.dataset.id;
        // here we have used data- id attribute in delete image if we wanna access it we need to use dataset-id
        // if it was event then dataset-event
        deleteTask(taskId) 
    }
    else if(target.className=="custom-checkboc"){
        let taskId=target.dataset.id;
        markTaskAsComplete(taskId);
    }
}

document.addEventListener('click',handleClickListener);
// here we have added event listener to whole document instead of individual targets this is called as delegation