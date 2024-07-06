function navigationState(){
/* navigation open - close.............................................*/
    let block_opacity = document.getElementById("open_close");
    let nav_element = document.querySelectorAll(".nav_element");

    let nav_tag = document.getElementsByTagName("nav")[0];

    block_opacity.addEventListener("click", () => {
        if (nav_tag.classList.contains('nav_big')){
            nav_tag.classList.add('nav_small');
            nav_tag.classList.remove('nav_big');

            nav_element.forEach((n) => n.classList.add('hidden'));
            nav_element.forEach((n) => n.classList.remove('nav_show'));
        }else{
            nav_tag.classList.add('nav_big');
            nav_tag.classList.remove('nav_small');

            nav_element.forEach((n) => n.classList.add('nav_show'));
            nav_element.forEach((n) => n.classList.remove('hidden'));
        }   
    });
/* navigation svg onclick...............................................*/
    let svg_elem_icon = document.getElementsByClassName("svg-elem-icon");
    let svg_elem_menu = document.getElementsByClassName("svg-elem-menu");
    let svg_elem_basket = document.getElementsByClassName("svg-elem-basket");
    let svg_elem_sale = document.getElementsByClassName("svg-elem-sale");
    let svg_elem_opinion = document.getElementsByClassName("svg-elem-opinion");
    let svg_elem_about = document.getElementsByClassName("svg-elem-about");


    let arrSvg = [svg_elem_icon, svg_elem_menu, svg_elem_basket, svg_elem_sale, svg_elem_opinion, svg_elem_about];
    let arrAnimations = [
        [
            ['icon_erase_1', 'icon_erase_2'],
            ['icon_draw_1', 'icon_draw_2']
        ], 
        [
            ['menu_erase_1', 'menu_erase_2'], 
            ['menu_draw_1', 'menu_draw_2']
        ],
        [
            ['basket_erase_1'],
            ['basket_draw_1']
        ],
        [
            ['sale_erase_1', 'sale_erase_2', `sale_erase_3`],
            ['sale_draw_1', 'sale_draw_2', 'sale_draw_3']
        ],
        [
            ['opinion_erase_1', 'opinion_erase_2', 'opinion_erase_3', 'opinion_erase_4', 'opinion_erase_5', 'opinion_erase_6', 'opinion_erase_7'],
            ['opinion_draw_1', 'opinion_draw_2', 'opinion_draw_3', 'opinion_draw_4', 'opinion_draw_5', 'opinion_draw_6', 'opinion_draw_7']
        ],
        [
            ['about_erase_1', 'about_erase_2'],
            ['about_draw_1', 'about_draw_2']
        ]
    ];
    let nav_anim = document.getElementsByClassName("nav_anim");

    for (let i = 0; i < nav_anim.length; i++) {  
        //delete all descriptions from menu ............................. 
        nav_anim[i].addEventListener("click", () => {
            let description_top = document.getElementsByClassName("description_top"); 
            let description_container = document.getElementsByClassName("description_container");
            let description_bottom = document.getElementsByClassName("description_bottom");
            for (let d = 0; d < description_top.length; d++){
                description_top[d].remove();
                description_container[d].remove();
                description_bottom[d].remove();
            }
            //animation svg..................................................
            for (let j = 0; j < arrSvg[i].length; j++){
                function svg_erase (){  
                    arrSvg[i][j].classList.add(arrAnimations[i][0][j]);
                }
                setTimeout(svg_erase, 0);            
            }
            for (let j = 0; j < arrSvg[i].length; j++){
                function svg_draw (){
                    arrSvg[i][j].classList.add(arrAnimations[i][1][j]);
                }
                if (i === 4 || i === 3){
                    setTimeout(svg_draw, 2000);
                }else{
                    setTimeout(svg_draw, 1000);
                }           
            }       
            for (let j = 0; j < arrSvg[i].length; j++){
                function removeAnimation(){
                    arrSvg[i][j].classList.remove(arrAnimations[i][0][j]);
                    arrSvg[i][j].classList.remove(arrAnimations[i][1][j]);

                }
                if (i === 4 || i === 3){
                    setTimeout(removeAnimation, 4000);
                }else{
                    setTimeout(removeAnimation, 3000);
                }
            }
        })
    }
/* to change blocks...............................................*/
    let blocks = [];
    let cakes = document.querySelectorAll(".cakes_block");
    for (let i = 0; i < 6; i++){
        blocks[i] = document.getElementById(`block_${i}`);
    }

    for (let i = 0; i < nav_anim.length; i++) {    
        nav_anim[i].addEventListener("click", () => {
            for (let j = 0; j < blocks.length; j++){    
                if (i === j){
                    if (j === 1){
                        blocks[j].classList.remove("hidden");
                        blocks[j].classList.add("menu_show_items");
                        for (let k = 1; k <cakes.length; k++) {
                             cakes[k].classList.add("hidden");
                             cakes[k].classList.remove("cakes_block_show");
                        }
                        cakes[0].classList.remove("hidden");
                        cakes[0].classList.add("cakes_block_show");
                        let menu_description_cake = document.getElementById("menu_description_cake");
                        menu_description_cake.classList.remove("cake_show_description");
                        menu_description_cake.classList.add("hidden");
                    }else{
                        blocks[j].classList.remove("hidden");
                        blocks[j].classList.add("block_show");
                    }
                }else{
                    if (j === 1){
                        blocks[j].classList.remove("menu_show_items");
                        blocks[j].classList.add("hidden");
                    }else{
                        blocks[j].classList.remove("block_show");
                        blocks[j].classList.add("hidden");
                    }
                }
            }
        })
    }
}
navigationState();


/* to change reviews...............................................*/
function showReviews(){
    let last_review = document.getElementById("last_review");
    let next_review = document.getElementById("next_review");

    let reviews = document.getElementsByClassName("review");
    let target_rev = 0;
    last_review.addEventListener("click", () => {
            reviews[target_rev].classList.remove("review_show");
            reviews[target_rev].classList.add("hidden");
        if (target_rev === 0){
            target_rev = reviews.length - 1;
        }else{
            target_rev--;
        }
            reviews[target_rev].classList.remove("hidden");
            reviews[target_rev].classList.add("review_show");    
    });

    next_review.addEventListener("click", () => {
        reviews[target_rev].classList.remove("review_show");
        reviews[target_rev].classList.add("hidden");
    if (target_rev === reviews.length - 1){
        target_rev = 0;
    }else{
        target_rev++;
    }
            reviews[target_rev].classList.remove("hidden");
            reviews[target_rev].classList.add("review_show");    
    });
}
showReviews();

/* to open menu categories...............................................*/
function menu(){
    let buttons_menu = document.querySelectorAll(".cake_btn");
    let cakes = document.querySelectorAll(".cakes_block");

    for (let i = 0; i < buttons_menu.length; i++){
        buttons_menu[i].addEventListener("click", () => {
            for (let j = 0; j < cakes.length; j++){
                if (i+1 === j){
                    cakes[j].classList.remove("hidden");
                    cakes[j].classList.add("cakes_block_show");
                }else{
                    cakes[j].classList.remove("cakes_block_show");
                    cakes[j].classList.add("hidden");
                }
            }
        })
    }
    let menu_back = document.querySelectorAll(".menu_back");
    for (let i = 0; i < menu_back.length; i++){
        menu_back[i].addEventListener("click", () => {
            cakes[0].classList.remove("hidden");
            cakes[0].classList.add("cakes_block_show");
            for (let j = 1; j < cakes.length; j++){
                cakes[j].classList.remove("cakes_block_show");
                cakes[j].classList.add("hidden");
            }
        })
    }
}

menu();

//Show amount of items in the basket
function showCountBasket(t){
    let nav_basket_count = document.getElementById("nav_basket_count");
    console.log(nav_basket_count.innerHTML)
    nav_basket_count.innerHTML = parseInt(nav_basket_count.innerHTML) + t;

}
//Clear amount of items in the basket
function zeroCountBasket(){
    let nav_basket_count = document.getElementById("nav_basket_count");
    nav_basket_count.innerHTML = 0;
}
