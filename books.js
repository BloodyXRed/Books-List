let title=document.getElementById("title");
let price=document.getElementById("price");
let date=document.getElementById("date");
let author=document.getElementById("author");
let sendData=document.getElementById("sendData");
let clearAll=document.getElementById("clearAll");
let filter=document.getElementById("filter");
let NbrF=document.getElementsByClassName("NbrF");
let NbrF1=document.getElementById("NbrF1");
let NbrF2=document.getElementById("NbrF2");
let search = document.getElementById("filter");

let searchMood="Title";
let data=[];
let sortMode="";
if (localStorage.Book!=null){
    data=JSON.parse(localStorage.Book);
}else{
    data=[];
}

sendData.onclick = function(){
    let book={
        title:title.value.toLowerCase(),
        author:author.value,
        price:price.value,
        date:date.value,
    }
    if (title.value.trim()=="" && author.value.trim()==""){
        displayError("Errortitle");
        displayError("Errorauthor");
    }
    else if (title.value.trim()==""){
        displayError("Errortitle");
    }else if (author.value.trim()==""){
        displayError("Errorauthor");
    }else{
        data.push(book);
        cleardata();
        Errortitle.style.display="none";
        Errorauthor.style.display="none";
    }
    localStorage.setItem("Book",JSON.stringify(data));
    showData()
}
function showData(){
    let table=""
    for(let i=0;i<data.length;i++){
        table+=`<tr>
                <td>${data[i].title}</td>
                <td>${data[i].author}</td>
                <td>${data[i].price}</td>
                <td>${data[i].date}</td>
                <td id="clear" onclick="deletedata()">Clear</td>
                </tr>`
    }
    document.getElementById("tbody").innerHTML=table;
}
showData()

function cleardata(){
    title.value="";
    price.value="";
    author.value="";
    date.value="";
}

clearAll.addEventListener("click",function(){
    localStorage.clear();
    data=[];
    showData()
})

function deletedata(i){
    data.splice(i,1);
    localStorage.Book=JSON.stringify(data);
    showData()
}
function filterNbr(id){
    for (let i = 0; i < NbrF.length; i++) {
        NbrF[i].style.display = "inline-block";
    }
    if (id==="filterP"){
        searchMood="Price";
        NbrF1.innerText="Rising price";
        NbrF1.onclick=function(){
            sortMode="priceAscending";
            searchData(search.value);
        }
        NbrF2.innerText="Decreasing price";
        NbrF2.onclick=function(){
            sortMode="priceDescending";
            searchData(search.value);
        }
    }else{
        searchMood="Date";
        NbrF1.innerText="Oldest";
        NbrF1.onclick=function(){
            sortMode="dateOldest";
            searchData(search.value);
        }
        NbrF2.innerText="Newest";
        NbrF2.onclick=function(){
            sortMode="dateNewest";
            searchData(search.value);
        }
    }
    search.style.display="none";
}


function getsearchmood(id){
    
    filter.style.display="block";
    if(id=="filterT"){
        searchMood = "Title";
    }else if(id=="filterA"){
        searchMood = "Author";
    }
    for (let i = 0; i < NbrF.length; i++) {
        NbrF[i].style.display = "none";
    }
    search.placeholder="Filter by "+searchMood;
    search.focus();
    search.value="";
    showData();
}

function searchData(value){
    showData();
    let table = "";
    let sortedData = [...data];
    
    if (searchMood === "Title") {
        sortedData = sortedData.filter(item => item.title.includes(value.toLowerCase()));
    } else if (searchMood === "Author") {
        sortedData = sortedData.filter(item => item.author.includes(value.toLowerCase()));
    }
    
    if (sortMode === "priceAscending") {
        sortedData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortMode === "priceDescending") {
        sortedData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortMode === "dateOldest") {
        sortedData.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortMode === "dateNewest") {
        sortedData.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    for (let i = 0; i < sortedData.length; i++) {
        table += `<tr>
            <td>${sortedData[i].title}</td>
            <td>${sortedData[i].author}</td>
            <td>${sortedData[i].price}</td>
            <td>${sortedData[i].date}</td>
            <td id="clear" onclick="deletedata(${i})">Clear</td>
        </tr>`;
    }
    
    document.getElementById("tbody").innerHTML = table;
}
function displayError(id){
    document.getElementById(id).style.display="block"
}