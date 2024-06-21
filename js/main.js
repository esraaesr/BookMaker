let nameInput = document.getElementById("name");
let urlInput = document.getElementById("url");
let addBtn = document.getElementById("addbtn");
let tableBody =document.getElementById("tableBody");
let mainIndex = 0 ;
var bookMarks;
if(localStorage.getItem("bookMarks")==null){
    bookMarks = [];
}else{
    bookMarks = JSON.parse(localStorage.getItem("bookMarks"));
    display(bookMarks);
}
var nameRegex = /^[A-Za-z_]+$/;
var urlRegex = /^(https?:\/\/)?(www\.)?[A-Za-z0-9_\.]+\.[a-z]{2,3}$/; 
function valed() {
    return nameRegex.test(nameInput.value);
}
function urlvaled() {
    return urlRegex.test(urlInput.value);
}
addBtn.disabled = true;
nameInput.onkeyup = function() {
    if (valed() && urlvaled()) {
        addBtn.disabled = false; 
    } else {
        addBtn.disabled = true; 
    }
};
urlInput.onkeyup = function() {
    if (valed() && urlvaled()) {
        addBtn.disabled = false; 
    } else {
        addBtn.disabled = true;
    }
};


addBtn.onclick = function(){
    if(addBtn.innerHTML == "Update"){
            addBtn.innerHTML = "Submit";
            let bookMrker = {
                name : nameInput.value ,
                url : urlInput.value
            }
            bookMarks.splice(mainIndex , 1 , bookMrker);
    }else{
        let bookMrker = {
            name : nameInput.value ,
            url : urlInput.value
        }
        bookMarks.push(bookMrker);
    }
    localStorage.setItem("bookMarks",JSON.stringify(bookMarks));
    display(bookMarks);
    clearData();
}
function display(any){
    var cartona= ``;
    for(let i = 0 ; i<any.length ; i++){
cartona+= `
<tr>
<td>${any[i].name}</td>
<td> <button class= "btn btn-warning">Visit</button></td>
<td> <button onclick="updateBook(${i})" class= "btn btn-primary">Update</button></td>
<td> <button onclick="deleteBook(${i})" class= "btn btn-danger">Delete</button></td>

</tr>
`
    }
    tableBody.innerHTML = cartona;
}
function deleteBook(index){
    bookMarks.splice(index ,1);
    localStorage.setItem("bookMarks",JSON.stringify(bookMarks))
    display(bookMarks)
}
function clearData(){
    nameInput.value="";
    urlInput.value="";
}

function updateBook(index){
    nameInput.value = bookMarks[index].name;
    urlInput.value = bookMarks[index].url;
    addBtn.innerHTML = "Update";
    mainIndex = index ; 
}
function search (term){
    let wantedBook=[];
    for( var i = 0 ; i<bookMarks.length ; i++){
        if (bookMarks[i].name.toLowerCase().includes(term)){
            wantedBook.push(bookMarks[i]);
        }
    }
    display(wantedBook);
}
