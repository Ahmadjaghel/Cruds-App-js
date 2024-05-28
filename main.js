let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("Category");
let creat = document.getElementById("creat");
let Update = document.getElementById("Update");
let temp;
// get total
function getTotal() {
  if (price.value) {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.style.background = "#a00d02";
    total.innerHTML = "";
  }
}
//creat product && save localStorage && clear input
let inital = localStorage.getItem("data")
  ? JSON.parse(localStorage.getItem("data"))
  : [];
let dataProduct = inital;
creat.onclick = () => {
  let product = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (title.value != "" && price.value != "" && category.value != "") {
    if (product.count > 1)
      for (let i = 0; i < product.count; i++) dataProduct.push(product);
    else dataProduct.push(product);
    localStorage.setItem("data", JSON.stringify(dataProduct));
    title.value = null;
    price.value = null;
    taxes.value = null;
    ads.value = null;
    discount.value = null;
    count.value = null;
    category.value = null;
    showData();
  }
};

//read
function showData() {
  let body = document.getElementById("body");
  body.innerHTML = dataProduct
    .map((ele, ind) => {
      return `
    <tr>
    <td>${ind + 1}</td>
    <td>${ele.title}</td>
    <td>${ele.price}</td>
    <td>${ele.taxes}</td>
    <td>${ele.ads}</td>
    <td>${ele.discount}</td>
    <td>${ele.total}</td>
    <td>${ele.category}</td>
    <td><button class="update" onClick="update(${ind})"> update</button></td>
    <td><button  class="delet" onClick="delet(${ind})"> delet</button></td>
  </tr>`;
    })
    .join("");
  let deletAll = document.getElementById("deletAll");
  if (dataProduct.length) {
    deletAll.style.display = "block";
    deletAll.value = `Delet All (${dataProduct.length})`;
  } else deletAll.style.display = "none";
  getTotal();
}
showData();

//delete
function delet(i) {
  dataProduct.splice(i, 1);
  localStorage.setItem("data", JSON.stringify(dataProduct));
  showData();
}
let deletAll = document.getElementById("deletAll");
deletAll.onclick = () => {
  dataProduct = [];
  localStorage.setItem("data", JSON.stringify(dataProduct));
  showData();
};

//update
function update(ind) {
  let ele = dataProduct[ind];
  Update.style.display = "block";
  creat.style.display = "none ";
  title.value = ele.title;
  price.value = ele.price;
  taxes.value = ele.taxes;
  ads.value = ele.ads;
  discount.value = ele.discount;
  category.value = ele.category;
  count.style.display = "none";
  getTotal();
  temp = ind;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
Update.onclick = () => {
  let product = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (title.value != "" && price.value != "" && category.value != "") {
    dataProduct.splice(temp, 1, product);
    localStorage.setItem("data", JSON.stringify(dataProduct));
    title.value = null;
    price.value = null;
    taxes.value = null;
    ads.value = null;
    discount.value = null;
    count.value = null;
    category.value = null;
    showData();
    Update.style.display = "none";
    creat.style.display = "block";
    count.style.display = "block";
  }
};
//search
let searchMode;
function getSearch(id) {
  let textSearch = document.getElementById("textSearch");
  if (id === "SearchTitle") {
    searchMode = "title";
    textSearch.placeholder = "Search By TItle";
  } else {
    searchMode = "category";
    textSearch.placeholder = "Search By Category";
  }
  textSearch.focus();
  textSearch.value = "";
  showData();
}
function searchData(value) {
  if (searchMode === "title") {
    let aa = dataProduct.filter((ele) =>
      ele.title.includes(value.toLowerCase())
    );
    body.innerHTML = aa
      .map((ele, ind) => {
        return `
    <tr>
    <td>${ind + 1}</td>
    <td>${ele.title}</td>
    <td>${ele.price}</td>
    <td>${ele.taxes}</td>
    <td>${ele.ads}</td>
    <td>${ele.discount}</td>
    <td>${ele.total}</td>
    <td>${ele.category}</td>
    <td><button class="update" onClick="update(${ind})"> update</button></td>
    <td><button  class="delet" onClick="delet(${ind})"> delet</button></td>
  </tr>`;
      })
      .join("");
  } else {
    let aa = dataProduct.filter((ele) =>
      ele.category.includes(value.toLowerCase())
    );
    body.innerHTML = aa
      .map((ele, ind) => {
        return `
    <tr>
    <td>${ind + 1}</td>
    <td>${ele.title}</td>
    <td>${ele.price}</td>
    <td>${ele.taxes}</td>
    <td>${ele.ads}</td>
    <td>${ele.discount}</td>
    <td>${ele.total}</td>
    <td>${ele.category}</td>
    <td><button class="update" onClick="update(${ind})"> update</button></td>
    <td><button  class="delet" onClick="delet(${ind})"> delet</button></td>
  </tr>`;
      })
      .join("");
  }
}
//clean data
