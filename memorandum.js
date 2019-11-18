var Note = function(title, desc){
    this.title = title;
    this.desc = desc;
    this.date = getDate();
};
var noteSelected; 
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
　　var currentdate = year + "-" + month + "-" + day;
　　return currentdate;
}
function getNoteById(id) {
    return JSON.parse(localStorage.getItem(id));
}
function saveNoteById(id, note) {
    localStorage.setItem(id, JSON.stringify(note));
}
function getKeysArray(){
    var keysArray = localStorage.getItem("noteKeysArray");
    if (!keysArray) {
        keysArray = [];
        localStorage.setItem("noteKeysArray", keysArray);
    } else {
        keysArray = JSON.parse(keysArray);
    }
    return keysArray;
}

function showNote(noteKey){
    var note = getNoteById(noteKey);
    var title = note.title;
    var listContent = document.getElementById("list-content");
    var li = document.createElement("li");
    li.setAttribute("id", noteKey);
    li.classList.add("task-item");
    li.classList.add("animated", "swing");
    li.innerHTML = '<span class="content">' + title + '</span>' + '<span class="edit" onclick="editNote(this)"></span>' + '<span class="delete" onclick="deleteNote(this)"></span>';
    listContent.insertBefore(li, listContent.firstElementChild);  
}
function showAllNotes() {
    var keysArray = getKeysArray(); 
    var noteKey;
    for(var i = 0; i < keysArray.length; i++) {
        noteKey = keysArray[i];
        showNote(noteKey);
    };
}

function saveNote(title, desc){
    var note = new Note(title, desc);
    noteKey = "note_" + new Date().getTime();
    var keysArray = getKeysArray();
    keysArray.push(noteKey);
	localStorage.setItem("noteKeysArray", JSON.stringify(keysArray));
    localStorage.setItem(noteKey, JSON.stringify(note));
    showNote(noteKey);
}
function save(){
    var inputContent = document.getElementById("input-content");
    var title = inputContent.value;
    if(title !== ""){
        saveNote(title, "");
        inputContent.classList.remove("invalid");
		inputContent.setAttribute("placeholder", "请输入要保存的内容");
    } else{
        inputContent.classList.add("invalid");
		inputContent.setAttribute("placeholder", "内容为空，请重新输入");
    }
    inputContent.value = "";
}

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
    var noteKey = noteSelected.id;
    var keysArray = getKeysArray();
    localStorage.removeItem(noteKey);
    for(var i = 0; i < keysArray.length; i++){
        if (keysArray[i] == noteKey) {
            keysArray.splice(i, 1);
        }
    };
    localStorage.setItem("noteKeysArray", JSON.stringify(keysArray));
};

function editNote(obj){
    noteSelected = obj.parentNode;
    var noteKey = noteSelected.id;
    var note = getNoteById(noteKey);
    var taskDetail= document.getElementById("task-detail");
    taskDetail.classList.add("show");
    var detailDesc = document.getElementById("task-desc");
    var detaiTitle = document.getElementById("task-title");
    var detailDate = document.getElementById("task-date");
    detaiTitle.innerHTML = note.title;
    detailDate.value = note.date;
    detailDesc.value = note.desc;
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
    var noteKey = noteSelected.id;
    var note = getNoteById(noteKey);
    note.title = detaiTitle.innerHTML;
    noteSelected.childNodes[0].innerHTML = detaiTitle.innerHTML;
    note.date = detailDate.value;
    note.desc = detailDesc.value;
    saveNoteById(noteKey, note);

    var taskDetail= document.getElementById("task-detail");
    taskDetail.classList.remove("show");  
}

function keyEnter(){
    if(window.event.keyCode == 13){
        document.getElementById("task-submit").click();
    }
}