
var noteSelected;  
//add new note 
function saveNote(){
    var inputContent = document.getElementById("input-content");
    var listContent = document.getElementById("list-content");
    var title = inputContent.value; 
    if(title !== ""){
        inputContent.classList.remove("invalid");
        inputContent.setAttribute("placeholder", "请输入要保存的内容");  
        var li = document.createElement("li");
        li.classList.add("task-item");
        li.setAttribute("desc", "");
        var noteDate = getDate();
        li.setAttribute("date", noteDate);
        li.innerHTML = '<span class="content">' + title + '</span>' + '<span class="edit" onclick="editNote(this)"></span>' + '<span class="delete" onclick="deleteNote(this)"></span>';
        listContent.insertBefore(li, listContent.firstElementChild);  
        inputContent.value = "";
        return li;
    } else {
        inputContent.classList.add("invalid");
        inputContent.setAttribute("placeholder", "内容为空，请重新输入");
    };
};
function getDate(){
    var date = new Date();
　　var year = date.getFullYear();
　　var month = date.getMonth() + 1;
　　var day = date.getDate(); 
　　if (month >= 1 && month <= 9) {
　　　　month = "0" + month;
　　}
　　if (day >= 0 && day <= 9) {
        day = "0" + day;
　　}
　　var currentdate = year + "/" + month + "/" + day;
　　return currentdate;
}

//detele one note
function deleteNote(obj){
    noteSelected = obj.parentNode;
    var deleteAlert = document.getElementById("delete-alert");
    deleteAlert.classList.add("show");
    return noteSelected;
};
function deleteCancel(){
    var deleteAlert = document.getElementById("delete-alert");
    deleteAlert.classList.remove("show");
};
function deleteConfirm(){
    noteSelected.parentNode.removeChild(noteSelected);
    var deleteAlert = document.getElementById("delete-alert");
    deleteAlert.classList.remove("show");
};

//edit the info of the note
function editNote(obj){
    noteSelected = obj.parentNode;
    var taskDetail= document.getElementById("task-detail");
    taskDetail.classList.add("show");
    var detaiTitle = document.getElementById("task-title");
    var detailDate = document.getElementById("task-date");
    detaiTitle.innerHTML = noteSelected.childNodes[0].innerHTML;
    detailDate.value = noteSelected.date;
    return noteSelected;
};
function editCancel(){
    var taskDetail= document.getElementById("task-detail");
    taskDetail.classList.remove("show"); 
};
function editConfirm(){
    var detaiTitle = document.getElementById("task-title");
    var detailDate = document.getElementById("task-date");
    var detailDesc = document.getElementById("task-desc");
    
    noteSelected.desc = detailDesc.value;
    noteSelected.date = detailDate.value;
    noteSelected.childNodes[0].innerHTML = detaiTitle.innerHTML;
    var taskDetail= document.getElementById("task-detail");
    taskDetail.classList.remove("show");  
}