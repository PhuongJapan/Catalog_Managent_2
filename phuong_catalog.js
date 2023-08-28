let arrCatalogs = JSON.parse(localStorage.getItem("arrCatalogs")) || [];

let action = "Create";

// Phân trang
let currentPage = 1;
let numberOfCatalogPerPage = 3;

//Hàm render Data
function renderData(page) {
  //Hiển thị số trang
  let totalPage = getTotalPage();
  let listPage = document.getElementById("listPage");
  listPage.innerHTML = "";
  for (let i = 1; i <= totalPage; i++) {
    listPage.innerHTML += `
       <li><a href="javascript:renderData('${i}')">${i}</a></li>
       `;
  }
  //Nếu ở trang 1 thì ẩn preview còn nếu ở trang cuối thì ẩn next
  if (page == 1) {
    document.getElementById("preview").style.visibility = "hidden";
  } else {
    document.getElementById("preview").style.visibility = "visible";
  }
  if (page == totalPage) {
    document.getElementById("next").style.visibility = "hidden";
  } else {
    document.getElementById("next").style.visibility = "visible";
  }

  //Tính index của dữ liệu hiển thị trên table
  let firstIndex = (page - 1) * numberOfCatalogPerPage;
  let lastIndex = page * numberOfCatalogPerPage;
  if (lastIndex > arrCatalogs.length) {
    lastIndex = arrCatalogs.length;
  }
  let listCatalog = document.getElementById("listCatalog");
  listCatalog.innerHTML = "";
  for (let index = firstIndex; index < lastIndex; index++) {
    listCatalog.innerHTML += `
        <tr>
        <td>${index + 1}</td>
        <td>${arrCatalogs[index].catalogIdVal}</td>
        <td>${arrCatalogs[index].catalogNameVal}</td>
        <td>${arrCatalogs[index].priorityVal}</td>
        <td>${arrCatalogs[index].descriptionVal}</td>
        <td>${arrCatalogs[index].statusVal ? 'Active' : 'Inactive'}</td>
        <td>
            <button>Edit</button>
            <button>Delete</button>
        </td>
    </tr>         
            
       `;
  }
}
// Ngoài dùng vòng for có thể sử dụng forEach
// arrCatalogs.forEach(catalog,index){
//   catalog.catalogId
//   catalog.catalogName
//   catalog.priority
// }

//Function tính tổng số page
function getTotalPage() {
  return Math.ceil(arrCatalogs.length / numberOfCatalogPerPage);
}

//Function thực hiện thêm mới dữ liệu
function createCatalog() {
  //Lấy dữ liệu từ ô input
  let catalogIdVal = document.getElementById("catalogId").value;
  let catalogNameVal = document.getElementById("catalogName").value;
  let priorityVal = document.getElementById("priority").value;
  let descriptionVal = document.getElementById("description").value;
  let statusVal = document.querySelector("input[type='radio']:checked").value == "true" ? true : false;

  let newCatalog = {catalogIdVal, catalogNameVal, priorityVal, descriptionVal, statusVal};
  if (!validateCatalogId(catalogIdVal)) {
    return;
  }
  if (!validateCatalogName(catalogNameVal)) {
    return;
  }

  arrCatalogs.push(newCatalog);
  localStorage.setItem("arrCatalogs",JSON.stringify(arrCatalogs));
  clearForm();
  renderData(1);
  
}
// function validate catalogId
function validateCatalogId(catalogIdVal) {
    let indexToFind = arrCatalogs.findIndex(element=>element.catalogId===catalogIdVal);
    if (indexToFind>=0){
        //Đã tồn tại mã danh mục trong arrCatalogs
        document.getElementById("catalogId").style.backgroundColor=="yellow";
        alert("Mã danh mục đã tồn tại");
        return false;
    }
    document.getElementById("catalogId").style.backgroundColor =="";
    return true;    
}
function validateCatalogName(catalogNameVal) {
  let indexToFind = arrCatalogs.findIndex(element=>element.catalogName===catalogNameVal)
  //Nếu indexToFind>=0 tức là index đã tồn tại trong mảng
  if(indexToFind>=0){
    document.getElementById("catalogName").style.backgroundColor=="yellow";
    alert("Tên danh mục đã tồn tại");
    return false;
  }
  document.getElementById("catalogName").style.backgroundColor=="";
  return true;
}

//Function clearForm
function clearForm() {
  document.getElementById("catalogId").value = "";
  document.getElementById("catalogName").value = "";
  document.getElementById("priority").value = "";
  document.getElementById("description").value = "";
  document.getElementById("active").checked = true;  
}

//UpdateCatalog

function updateCatalog(page) {
  
}
let btnSave = document.getElementById("btnSave")
btnSave.addEventListener("click", function(event){
  event.preventDefault();
  if (action=="Create") {
    createCatalog();    
  }
  // else{
  //   updateCatalog()
  // }
})

window.onload= renderData(1);
//Function 
