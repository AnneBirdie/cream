
async function getPostsCakes() {
    let urlS = ['../db/biscuits.php', '../db/desserts.php', '../db/mousse.php'];
    let cake_categories = ['biscuit_cake', 'dessert', 'mousse'];
    let container_items = ['container_items_biscuits', 'container_items_desserts', 'container_items_mousses'];
    
    for (let u = 0; u < urlS.length; u++){
        let response = await fetch(urlS[u]);
        let res = await response.text();
        res  =  JSON.parse(res);

        let cake_category = document.getElementById(cake_categories[u]);
        let menu_description_cake = document.getElementById('menu_description_cake');
        let container_item = document.getElementById(container_items[u]);
//create items........................................................
        for (let i = 0; i < res.length; i++) {
            let item = document.createElement('div');
            item.classList.add("item");
            container_item.append(item);

            let itemImg = document.createElement('div')
            itemImg.classList.add("item_img");
            item.append(itemImg);

            let img = document.createElement('img')
            img.src = res[i][2];
            img.alt = "cake";
            itemImg.append(img);

            let itemText = document.createElement('div')
            itemText.classList.add("item_text");
            item.append(itemText);

            let item_title = document.createElement('p')
            item_title.classList.add("item_title");
            item_title.innerHTML = res[i][0];
            itemText.append(item_title);

            let item_price = document.createElement('p')
            item_price.classList.add("item_price");
            if (u === 1 || u === 2) {
                item_price.innerHTML = `цена за штуку ${res[i][1]} ₽`;
            }else{
                item_price.innerHTML = `цена за кг ${res[i][1]} ₽`;
            }
            itemText.append(item_price);
            item.dataset.id = res[i][4];
//create descriptions........................................................
            item.addEventListener('click', () => {
                menu_description_cake.classList.remove("hidden");
                menu_description_cake.classList.add("cake_show_description");
                cake_category.classList.add("hidden");
                cake_category.classList.remove("cakes_block_show");

                let description_top = document.createElement('div');
                description_top.classList.add("description_top");
                menu_description_cake.append(description_top);

                let cake_back = document.createElement('div');
                cake_back.classList.add("cake_back");
                cake_back.innerHTML = "назад";
                description_top.append(cake_back);

                let description_container = document.createElement('div');
                description_container.classList.add("description_container");
                menu_description_cake.append(description_container);

                let description_Img = document.createElement('div');
                description_Img.classList.add("description_Img");
                description_container.append(description_Img);
                let imgD = document.createElement('img');
                imgD.src = res[i][2];
                imgD.alt = "cake";
                description_Img.append(imgD);

                let description_container_text = document.createElement('div');
                description_container_text.classList.add("description_container_text");
                description_container.append(description_container_text);

                let description_title = document.createElement('p');
                description_title.classList.add("description_title");
                description_title.innerHTML = res[i][0];
                description_container_text.append(description_title);

                let description_text = document.createElement('p');
                description_text.classList.add("description_text");
                description_text.innerHTML = res[i][3];
                description_container_text.append(description_text);

                let description_bottom = document.createElement('div');
                description_bottom.classList.add("description_bottom");
                menu_description_cake.append(description_bottom);

                let description_count = document.createElement('div');
                description_count.classList.add("description_count");
                description_bottom.append(description_count);

                let texts = [['Вес в граммах', 1000], ['Цена', res[i][1]]];
                let text_alternative = [['Количество', 1], ['Цена', res[i][1]]];
                let target = 1;
                for (let k = 0; k < 2; k++){
                    let div = document.createElement('div');
                    description_count.append(div);
                    for (let j = 0; j < 2; j++){
                        let p = document.createElement('div');
                        div.append(p);
                        if (k===0 && j===0 && (u === 1 || u === 2)){
                            p.innerHTML = `${text_alternative[k][j]}`;
                        }else if (k === 1 && j === 1){
                            p.classList.add("description_price");
                            p.innerHTML = `${texts[k][j]} ₽`;
                        }else if (k === 0 && j ===1){
                            let minus = document.createElement('p');
                            minus.innerHTML= '-';
                            let plus = document.createElement('p');
                            plus.innerHTML = '+';
                            let w = document.createElement('p');
                            w.id = "w";
                            if (u === 1 || u === 2){
                                w.innerHTML = text_alternative[k][j];
                            }else{
                                w.innerHTML = texts[k][j];
                            }
                            p.insertAdjacentElement('afterBegin', minus);
                            p.insertAdjacentElement('beforeEnd', w);
                            p.insertAdjacentElement('beforeEnd', plus);

                            minus.style.cssText = 'cursor: pointer; transition: all ease 1s; font-size: 1.2rem' ;
                            plus.style.cssText = 'cursor: pointer; transition: all ease 1s; font-size: 1.2rem' ;

                            let description_price = document.getElementsByClassName("description_price");
                            minus.addEventListener('click', () => {
                                if (w.textContent >= 2000 && u !== 1){
                                    w.textContent -= 1000;
                                    target--;
                                    description_price[0].innerHTML = `${res[i][1] * target} ₽`;
                                }else if (u === 1 || u ===2 && w.textContent >= 2){
                                    w.textContent -= 1;
                                    target--;
                                    description_price[0].innerHTML = `${res[i][1] * target} ₽`;
                                }
                            });
                            plus.addEventListener('click', () => {
                                if (w.textContent < 10000 && u !== 1 && u !== 2){
                                    w.textContent = Number(w.textContent) + 1000;
                                    target++;
                                    description_price[0].innerHTML = `${res[i][1] * target} ₽`;
                                }else if (u === 1 || u === 2){
                                    w.textContent = Number(w.textContent) + 1;
                                    target++;
                                    description_price[0].innerHTML = `${res[i][1] * target} ₽`;
                                }
                            });
                        }else{
                            p.innerHTML = texts[k][j];
                        }
                    }
                }

                let description_basket = document.createElement('div');
                description_basket.classList.add("description_basket");
                description_bottom.append(description_basket);

                let p = document.createElement('p');
                p.innerHTML = "Добавить в корзину";
                description_basket.append(p);

                description_basket.addEventListener('click', () => {
                    showCountBasket(1);
                    p.style.cssText = "-webkit-animation: basketAddingItem 3s 1; animation: basketAddingItem 3s 1;";
                    p.innerHTML = "Добавлено в корзину";
                    function changeTextBasket (){
                        p.innerHTML = "Добавить в корзину";
                        p.style.cssText = "-webkit-animation: none; animation: none;";
                    }
                    setTimeout(changeTextBasket, 2500);

                    cakesList.push({"cake": res[i][4], "count": target}); //basket.js..............................................
                    target = 1;

                   
                    let w = document.getElementById("w"); 
                    if (u === 1 || u === 2){
                        w.textContent = "1";
                    }else{
                        w.textContent = "1000";
                    }
                    let description_price = document.getElementsByClassName("description_price");
                    description_price[0].innerHTML = `${res[i][1]} ₽`;
                });
//back_menu_category............................. .................................          
                cake_back.addEventListener('click', () => {
                    menu_description_cake.classList.remove("cake_show_description");
                    menu_description_cake.classList.add("hidden");
                    cake_category.classList.remove("hidden");
                    cake_category.classList.add("cakes_block_show");
                    description_top.remove();
                    description_container.remove();
                    description_bottom.remove();
                });
            });
        }
    }
}

getPostsCakes();