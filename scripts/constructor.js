async function constructor() {
    let url = '../db/constructor.php';
    let response = await fetch(url);
    let res = await response.text();
    res  =  JSON.parse(res);
    let items = [];
    let diameterActive;

    const constructor_main_cake = document.getElementById("constructor_main_cake");
    let constructor_price = document.getElementById("constructor_price");
    let constructor_weight = document.getElementById("constructor_weight");
    let constructor_addToBasket = document.getElementById("constructor_addToBasket");
    let constructor_addToBasket_text = document.getElementById("constructor_addToBasket_text");

    let categories = ['декор', 'корж', 'начинка', 'мусс'];
    let decors = [];
    let cakesL = [];
    let fillings = [];
    let mousses = [];
    let layers = [decors, cakesL, fillings, mousses, cakesL];
    let layers_2 = [fillings, mousses, cakesL];
    for (let i = 0; i < res.length; i++) {
        if (res[i][0] === categories[0]){
            decors.push(res[i]);
        }else if (res[i][0] === categories[1]){
            cakesL.push(res[i]);
        }else if (res[i][0] === categories[2]){
            fillings.push(res[i]);
        }else{
            mousses.push(res[i]);
        }   
    }

/*create layers....................................................................*/
    function createLayers (layers){
        for (let j = 0; j < layers.length; j++) {
            let layer = document.createElement('svg');
            layer.innerHTML = layers[j][0][4];
            constructor_main_cake.append(layer);
            layer.classList.add('svgLayer');
        
            let layerDescription = document.createElement('div');
            layerDescription.classList.add('select');
            constructor_main_cake.append(layerDescription);
        
            let option = document.createElement('div');
            option.classList.add('new-select');
            option.innerHTML = layers[j][0][1];
            layerDescription.append(option);
            option.dataset.id = layers[j][0][5];
            option.dataset.name = layers[j][0][1];
            option.dataset.price = layers[j][0][2];
            option.dataset.weight = layers[j][0][3];
            getId();
    
            let newSelectList = document.createElement('div');
            newSelectList.classList.add('new-select__list');
            layerDescription.append(newSelectList);  
            newSelectList.classList.add('slideUp');

            option.addEventListener('click', function(){
                let allSelects = document.getElementsByClassName("new-select__list");
                for (let s = 0; s < allSelects.length; s++){
                    if (s!== j && s !== 5+j){ // 5 is a length layers first array
                        allSelects[s].classList.remove('slideDown');
                        allSelects[s].classList.add('slideUp');
                    }else{
                    newSelectList.classList.add('slideDown');
                    newSelectList.classList.remove('slideUp');
                    }
                }
            });

            document.addEventListener('click', e => {
                if (!e.target.classList.contains('new-select')){
                    newSelectList.classList.add('slideUp');
                    newSelectList.classList.remove('slideDown');
                }
            });

            for (let i = 0; i < layers[j].length; i++) {
                let newSelectItem = document.createElement('div');
                newSelectItem.classList.add('new-select__item');
                newSelectList.append(newSelectItem);
    
                let span = document.createElement('span');
                newSelectItem.append(span);
                span.innerHTML = layers[j][i][1];
           

                newSelectItem.addEventListener('click', function(){
                    option.innerHTML = layers[j][i][1];
                    layer.innerHTML = layers[j][i][4];

                    option.dataset.id = layers[j][i][5];
                    option.dataset.name = layers[j][i][1];
                    option.dataset.price = layers[j][i][2];
                    option.dataset.weight = layers[j][i][3];

                    getId();
                    newSelectList.classList.remove('slideDown');
                    newSelectList.classList.add('slideUp');
                });
            }
        }
    }
    createLayers(layers);


/*diameter.......................................................................*/
    function diameter(){
        let diameters = document.querySelectorAll(".diameter");
        let rowDiameter = document. getElementById("row_diameter");
        let widths = ["16.6%", "32.2%", "49.8%", "66.4%", "83%", "100%"];

        for (let i = 0; i < diameters.length; i++){
            if (i === 2){               
                rowDiameter.style.width = widths[2];
            }
            diameters[i].addEventListener("click", () => {
                for (let j = 0; j < diameters.length; j++){
                    if (i === j){
                        diameters[j].classList.add("diameter_active");
                        rowDiameter.style.width = widths[j]; 
                    }else{
                        diameters[j].classList.remove("diameter_active");
                    }
                }
                getId();
            });
        }
    }
    diameter();

/*add Layers.......................................................................... */
    function addLayer(){
        let addLayer = document.getElementById("add_layer");
        addLayer.addEventListener("click", () => {
            if (!addLayer.classList.contains("layerActive")){
                createLayers(layers_2);
                addLayer.innerHTML = "удалить слой"; 
                addLayer.classList.add("layerActive");
            }else{
                items.length = 0;
                addLayer.classList.remove("layerActive");
                addLayer.innerHTML = "добавить слой";
                let layers = document.querySelectorAll(".svgLayer");
                let layerDescription = document.querySelectorAll(".select");
                for (let i = layers.length-1; i >= 5; i--){
                    layers[i].remove();
                    layerDescription[i].remove()
                }               
            } 
            getId();
        });
    }
    addLayer();

//getting layer's id..............................................................    
    function getId(){
        let sum = 0;
        let weight = 0;      
        let options = document.getElementsByClassName("new-select");
        for (let i = 0; i < options.length; i++){
            items[i] = options[i].dataset.id;
            sum += Number(options[i].dataset.price);
            weight += Number(options[i].dataset.weight);
        }
        let d = document.getElementsByClassName("diameter");
        for (let i = 0; i < d.length; i++){
            if (d[i].classList.contains("diameter_active")){
                diameterActive = d[i].dataset.diameter;
                sum *= Number(diameterActive);
                weight *= Number(diameterActive);
            }
        }
        constructor_price.textContent = `цена : ${sum} ₽`;
        constructor_weight.textContent = `вес : ${weight} грамм`;
    }

//check item ....................................................................
    function addToBasket(){
        constructor_addToBasket.addEventListener('click', () => {
            showCountBasket(1);
            constructor_addToBasket.style.cssText = "-webkit-animation: basketAddingItem 3s 1; animation: basketAddingItem 3s 1;";
            constructor_addToBasket_text.innerHTML = "Добавлено в корзину";
            function changeTextBasket (){
                constructor_addToBasket_text.innerHTML = "Добавить в корзину";
                constructor_addToBasket.style.cssText = "-webkit-animation: none; animation: none;";
            }
            setTimeout(changeTextBasket, 2500);
        

            async function sumC(items, diameterActive) {    
                items.push(diameterActive);
                  let response = await fetch('../db/sumConstructor.php', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(items)
                  });

                  let res = await response.text();
                  res  =  JSON.parse(res);

                  
                    constructor_price.textContent = `цена : ${res['totalPrice']} ₽`;
                    constructor_price.dataset.price = res['totalPrice'];

                    constructor_weight.textContent = `вес : ${res['totalWeight']} грамм`;
                    constructor_weight.dataset.weight = res['totalWeight'];
                    items.pop();
                    cakesList.push({"authorCake": items, "diameter": diameterActive}); //adding
                    
            }
            sumC(items, diameterActive);            
        });       
    }
    addToBasket();
}
constructor();
