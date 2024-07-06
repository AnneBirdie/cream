// get reviews...............................................
async function getReviews (){
    let url = '../db/getReviews.php';
    let response = await fetch(url);
    let res = await response.text();
    res  =  JSON.parse(res);
    console.log(res);
    for(let i = 0; i < res.length; i++){
        postReviews(res[i][0], res[i][1], res[i][2]);
    }

}

getReviews ();
// post reviews...............................................
function postReviews(id, text, img){
    let reviews = document.getElementsByClassName('reviews');
    let review = document.createElement('div');
    review.classList.add('review');
    review.innerHTML = `<div class="review_text">
                            ${text}
                        </div>
                        <div class="review_photo">
                            <img src=${img}>
                        </div>`;
    review.dataset.id = id;
    reviews[0].append(review);
    if (id == 1){
        review.classList.add('review_show');
    }else{
        review.classList.add('hidden');
    }
}