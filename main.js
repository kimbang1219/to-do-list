//유저가 값을 입력한다
//+버튼을 클릭하면, 할일이 추가된다
//delete버튼을 누르면 할일이 삭제된다
//check버튼을 누르면 할일이 끝나면서 밑줄이 간다
//1.check버튼을 클릭하는 순간 true false
//2.true이면 끝난걸로 간주하고 밑줄 보여주기
//3.false이면 안끝난걸로 간주하고 그대로
//진행중 끝남 탭을 누르면, 언더바가 이동한다
//끝남땜은, 끝난 아이템만, 진행중탭은 진행중인 아이템만 나오게 된다.
//전체탬을 누르면 다시 전체타임으로 돌아옴



let inputTask = document.getElementById('input-txt')
let addBtn = document.getElementById('add-btn')
let Tabs = document.querySelectorAll('#tabs div')
let taskList = []
let mode = 'all'
let filterList = []
let list = []
let underLine = document.getElementById('under-line')


addBtn.addEventListener('click',addTask)
inputTask.addEventListener('keyup',enterKey)


function enterKey(e){
    let key = e.key || e.keycode

    if(key == 'Enter' || key ==13){
        addTask(e)
    }
}


for(i=0;i<Tabs.length;i++){
    Tabs[i].addEventListener('click',function(event){filter(event)})
}


function addTask(){
    if(inputTask.value == 0){
        alert('할 일을 입력해주세요')
        return 0;
    }
    let Task = {
        id:uid(),
        taskContent:inputTask.value,
        isComplete:false 
    }
    taskList.push(Task)
    console.log(taskList)
    inputTask.value = ''
    render() 

}


function render(){
    list = []
    if(mode == 'all'){
        list = taskList
    }else if(mode == 'ongoing' || mode == 'done'){
        list = filterList
    }
    let resultHtml = ''
    for(i=0;i<list.length;i++){
        if(list[i].isComplete == true){
            resultHtml += `<div class="task task-done">
            <div><span>${list[i].taskContent}</span></div>
            <div class="task-btn-box">
                <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
                <button onclick="toggleDelete('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>`
        }else{
            resultHtml += `<div class="task">
            <div><span>${list[i].taskContent}</span></div>
            <div class="task-btn-box">
                <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-circle-check"></i></button>
                <button onclick="toggleDelete('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>`
        }

    }

    document.getElementById('task-board').innerHTML = resultHtml

}

function toggleComplete(id){

    for(i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete
            break;        
        }
    }
    filter();

}

function toggleDelete(id){
    for(i=0;i<taskList.length;i++){
        if(taskList[i].id==id){
            taskList.splice(i,1)
            break;
        }
    }
    filter();
}


function filter(event){
    if(event){
        mode = event.target.id
        underLine.style.width = event.target.offsetWidth+'px'
        underLine.style.left = event.target.offsetLeft+'px'
        underLine.style.top = event.target.offsetTop+(event.target.offsetHeight-4)+'px'
    }
    filterList = []
    if(mode == 'all'){
        render()
    }else if(mode == 'ongoing'){
        for(i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i])
            }
        }
        render()
    }else if(mode == 'done'){
        for(i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i])
            }
        }
        render()
    }

}



function uid() {
    return (performance.now().toString(36)+Math.random().toString(36)).replace(/\./g,"");
  };