/*Global block ................................................... need to wrap in a function*/ 
  let cakesList = [];
  let countItems = 0;
  let nav_basket = document.getElementById('nav_basket');
/*..........................................................................................*/

function openBasket(){
  nav_basket.addEventListener('click', function (){
    let basketTakeOrder = document.getElementById('basketTakeOrder');
    basketTakeOrder.classList.remove("basketTakeOrder");
    basketTakeOrder.classList.add("hidden");
    let basketTakeOrder_res = document.getElementById('basketTakeOrder_res');
    basketTakeOrder_res.classList.add('hidden');
    basketTakeOrder_res.classList.remove('basketTakeOrder_res_active');
    let basket_containers = document.getElementById('basket_containers');
    basket_containers.classList.remove("hidden");
    basket_containers.classList.add("basket_containers");
    let emptyBasket = document.getElementById("emptyBasket");

    let basket_container = document.getElementsByClassName("basket_container");
    let placeOrder = document.getElementById("placeOrder");
    let basket_DeliveryRule = document.getElementById("basket_DeliveryRule");
    if (cakesList.length > 0){
      emptyBasket.innerHTML = '';
      placeOrder.classList.add('placeOrder');
      placeOrder.innerHTML = 'оформить заказ';
      basket_DeliveryRule.innerHTML = 'Доставка и оплата обсуждается после оформления заказа';
      getBasket(cakesList);
      
    }else if (basket_container.length == 0){
      emptyBasket.innerHTML = 'Ваша корзина пуста!';
      zeroCountBasket();
      placeOrder.innerHTML = '';
      placeOrder.classList.remove('placeOrder');
      basket_DeliveryRule.innerHTML = '';
      let basket_sale = document.querySelectorAll('.basket_sale');
      let basket_sale_price = document.querySelectorAll('.basket_sale_price');
      let TOTAL = document.getElementById('TOTAL');
      TOTAL.innerHTML = '';
      basket_sale_price.innerHTML = '';
      basket_sale.innerHTML = '';
    }else{
      emptyBasket.innerHTML = '';
      placeOrder.classList.add('placeOrder');
      placeOrder.innerHTML = 'оформить заказ';
      basket_DeliveryRule.innerHTML = 'Доставка и оплата обсуждается после оформления заказа';
    }
  });
}

openBasket();





  

async function getBasket(cakesList) {
  let response = await fetch('../db/basket.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(cakesList)
  });

  let res = await response.text();
  res  =  JSON.parse(res);
  for (let i = 0; i < res.length; i++){
    countItems++;
    createItemBasket(res[i][0], res[i][1], res[i][2], countItems, JSON.stringify(res[i][3]), res[i][4], res[i][5]);

  }

  //calculateSumBasket();//calculate price and sale.................................
  cakesList.length = 0;

};
                

//Add items in list of basket................................................................................
function createItemBasket(name, price, weight, count, id, category, target){ 
  let basket_items = document.getElementsByClassName('basket_items');

  let basket_container = document.createElement('div');
  basket_container.classList.add('basket_container');
  basket_items[basket_items.length-1].append(basket_container);

  let basket_item_count = document.createElement('div');
  basket_item_count.classList.add('basket_item_count');
  basket_item_count.innerHTML = count;
  basket_container.append(basket_item_count);

  let basket_item = document.createElement('div');
  basket_item.classList.add('basket_item');
  basket_container.append(basket_item);
  basket_item.dataset.id = id;
  basket_item.dataset.category = category;
  basket_item.dataset.target = target;

  let basket_item_name = document.createElement('div');
  basket_item_name.classList.add('basket_item_name');
  basket_item_name.innerHTML = name;
  basket_item.append(basket_item_name);

  let current_item_quantity = document.createElement('div');
  current_item_quantity.classList.add('current_item_quantity');
  current_item_quantity.innerHTML = weight;
  basket_item.append(current_item_quantity);

  let basket_item_price = document.createElement('div');
  basket_item_price.classList.add('basket_item_price');
  basket_item_price.innerHTML = price;
  basket_item.append(basket_item_price);

  let basket_item_delete = document.createElement('div');
  basket_item_delete.classList.add('basket_item_delete');
  basket_item_delete.innerHTML = 'X';
  basket_container.append(basket_item_delete);
  calculateSumBasket();//calculate price and sale.................................
  basket_item_delete.addEventListener('click', function () {
    showCountBasket(-1);
    basket_container.remove();
    let basket_item_count = document.getElementsByClassName('basket_item_count');
    if (basket_item_count.length > 0) {
      calculateSumBasket();//calculate price and sale.................................
      countItems = basket_item_count.length;
      for (let i = 0; i < basket_item_count.length; i++){
        basket_item_count[i].innerHTML = i+1;
      }
    }else{
      let emptyBasket = document.getElementById("emptyBasket");
      emptyBasket.innerHTML = 'Ваша корзина пуста!';
      countItems = 0;
      zeroCountBasket();

      let placeOrder = document.getElementById("placeOrder");
      let basket_DeliveryRule = document.getElementById("basket_DeliveryRule");
      placeOrder.innerHTML = '';
      placeOrder.classList.remove('placeOrder');
      basket_DeliveryRule.innerHTML = '';

      let basket_sale = document.querySelectorAll('.basket_sale');
      let basket_sale_price = document.querySelectorAll('.basket_sale_price');
      let TOTAL = document.getElementById('TOTAL');
      TOTAL.innerHTML = '';
      basket_sale_price.innerHTML = '';
      basket_sale.innerHTML = '';
    }

  });
  //calculateBasket();//calculate price and sale.................................
}


//claculate sum and sale ...................................................................
async function calculateSumBasket(){
  let totalPrice = 0;
  let sale = 0;
  let items = [];
  let basket_item = document.getElementsByClassName('basket_item');
  if (basket_item.length > 0){
    for (let i = 0; i < basket_item.length; i++){
      items.push({"id" : JSON.parse(basket_item[i].dataset.id), "category" : basket_item[i].dataset.category, "target" : basket_item[i].dataset.target});          
    }
  }
  let response = await fetch('../db/basketCalculateSum.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(items)
  });

  let result = await response.text();
  result  =  JSON.parse(result);

  totalPrice = parseInt(result[0]);
  sale = result[1];

  let basket_sale = document.querySelectorAll('.basket_sale');
  let basket_sale_price = document.querySelectorAll('.basket_sale_price');
  let TOTAL = document.getElementById('TOTAL');
  TOTAL.innerHTML = `итого : ${totalPrice} ₽`;
  if (sale == 3){
    basket_sale[0].innerHTML = 'скидка за “Счастливые часы” :';
    basket_sale_price[0].innerHTML = parseInt(result[2]) + ' ₽';
  }else if (sale == 5){
    basket_sale[0].innerHTML = 'скидка за “Сладкоежка” :';
    basket_sale_price[0].innerHTML = parseInt(result[2]) + ' ₽';
  }else{
    basket_sale[0].innerHTML = '';
    basket_sale_price[0].innerHTML = '';
  }
}




function openPlaceOrder(){
  let placeOrder = document.getElementById("placeOrder");
  placeOrder.addEventListener("click", function(){
    let basketTakeOrder = document.getElementById("basketTakeOrder");
    basketTakeOrder.classList.remove("hidden");
    basketTakeOrder.classList.add("basketTakeOrder");


    let basket_containers = document.getElementById('basket_containers');
    basket_containers.classList.remove("basket_containers");
    basket_containers.classList.add("hidden");

    let btnBasketBack = document.getElementById("btnBasketBack");
    btnBasketBack.addEventListener("click", function(){
    let basketTakeOrder = document.getElementById("basketTakeOrder");
    basketTakeOrder.classList.remove("basketTakeOrder");
    basketTakeOrder.classList.add("hidden");

    let basket_containers = document.getElementById('basket_containers');
    basket_containers.classList.remove("hidden");
    basket_containers.classList.add("basket_containers");
    });

  });
}
openPlaceOrder();



function getInfoSubmit(){
  document.getElementById('submit').addEventListener('click', e => {
    e.preventDefault();
    zeroCountBasket();
    let name = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;
    let check = document.getElementById('check').checked;

    let data = {
      "name": name,
      "phone": phone,
      "check" : check
    }
    console.log(data);
    sendOrder(data);

    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('check').checked = false;

    let basket_container = document.getElementsByClassName("basket_container");
    while(basket_container.length > 0){
      basket_container[0].parentNode.removeChild(basket_container[0]);
    } 
    countItems = 0;
  });
}
getInfoSubmit();

async function sendOrder(data) {
  let regex = /89\d{9}/mg;
  if (data["name"].trim() !== "" &&
  data["phone"].trim() !== "" &&
   data["check"] === true &&
   regex.test(data["phone"])){
    let response = await fetch('../db/getOrder.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    });
    let answer = await response.text();
    answer  =  JSON.parse(answer);
        console.log(answer);
        if (answer === 'ok'){
          let basketTakeOrder = document.getElementById("basketTakeOrder");
          basketTakeOrder.classList.remove("basketTakeOrder");
          basketTakeOrder.classList.add("hidden");

          let basketTakeOrder_res = document.getElementById('basketTakeOrder_res');
          basketTakeOrder_res.classList.add('basketTakeOrder_res_active');
          basketTakeOrder_res.classList.remove('hidden');
        }else{
          alert("Ошибка! Попробуйте еще раз или позвоните по номеру телефона 89026310626");
        }

        let btnBasketBack_1 = document.getElementById("btnBasketBack_1");
        btnBasketBack_1.addEventListener("click", function(){
          let basketTakeOrder_res = document.getElementById("basketTakeOrder_res");
          basketTakeOrder_res.classList.remove("basketTakeOrder_res_active");
          basketTakeOrder_res.classList.add("hidden");
      
          let basket_containers = document.getElementById('basket_containers');
          basket_containers.classList.remove("hidden");
          basket_containers.classList.add("basket_containers");
          
          let basket_sale = document.querySelectorAll('.basket_sale');
          let basket_sale_price = document.querySelectorAll('.basket_sale_price');
          let TOTAL = document.getElementById('TOTAL');
          TOTAL.innerHTML = '';
          basket_sale_price[0].innerHTML = '';
          basket_sale[0].innerHTML = '';
          let emptyBasket = document.getElementById("emptyBasket");
          emptyBasket.innerHTML = 'Ваша корзина пуста!';
          let placeOrder = document.getElementById("placeOrder");
          placeOrder.innerHTML = '';
          placeOrder.classList.remove('placeOrder');
          let basket_DeliveryRule = document.getElementById("basket_DeliveryRule");
          basket_DeliveryRule.innerHTML = '';
          zeroCountBasket();
        });

  }else{
    alert('Заполните все поля корректно! Если у Вас возникли проблемы, позвоните нам 89026310626');  
  }
}



