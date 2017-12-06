/*
 * Create a list that holds all of your cards
 */


//画HTML
$(drawGird);
 function drawGird(){
   $('.seconds').html(times);
   $('.moves').html(count);
   //定义卡片图标类型
   const CardsType=['fa fa-diamond','fa fa-paper-plane-o','fa fa-anchor','fa fa-bolt',
   'fa fa-cube','fa fa-leaf','fa fa-diamond','fa fa-paper-plane-o','fa fa-anchor',
   'fa fa-bolt','fa fa-cube','fa fa-leaf'];
  //定义卡牌
   let Card=$('<li class="card"><i></i></li>');
   shuffle(CardsType);
   for(let i=0;i<12;i++){
      Card.children('i').addClass(CardsType[i]);
      $('.deck').append(Card.clone());
      Card.children('i').removeClass(CardsType[i]);
   }
 }

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 let Cards=new Array();
 let count=0,matched=0;star=3; times=0; startFlag=false//记数和匹配和星 时间 开始计时标志

 //设计数器
 let nIntervId ;
 function jia1s() {
   nIntervId= setInterval(function(){times++;$('.seconds').html(times);}, 1000);
 }
 //
 function stopJia1s() {
   clearInterval(nIntervId);
 }


$(function(){

  //处理重置
  $('div.restart').on('click', function(){
     stopJia1s();
     count=0;matched=0;times=0;startFlag=false;
     Cards=[];
     $('.deck').html('');
     drawGird();
  });

  //处理点击事件
  $('.deck').on('click','li',function(){

    if(!startFlag){
       jia1s();startFlag=true;
    }
    $('.moves').html(count);
    let Card = $(this);
    let CardsType=Card.children().attr("class");
    //保证是未翻的牌
    if(Card.hasClass("open")||Card.hasClass("match")||Card.hasClass("show")){
        alert("此牌已翻");
    }

    //push1个pop1个
    else if(Cards.length===0){
      Card.addClass("open show animated bounce");
      Cards.push(CardsType);
    }else{
          if(Cards.includes(CardsType)){
              Card.addClass("show match animated bounce");
              $('li.open').toggleClass("open match animated bounce");
              Cards.pop();
              dealcount();
              matched++;
              if(matched===6){
                stopJia1s();
                setTimeout(function(){
                  alert(
                      `        恭喜您获得胜利
                  共用 ${count}步 获得${star}总耗时${times}秒
                  重新开始请点刷新按钮`)},500);
              }
          }else{
              Card.addClass("open show animated bounce");
              dealcount();
              setTimeout(function(){
              Card.removeClass("open show");
              $('li.open').toggleClass("open show animated bounce");
              Cards.pop();

            },200);
        }
      }


  });
})

//处理计数以及依照计数打星
function dealcount(){
  count++;
  $('.moves').html(count);
  switch (count) {


    case 10:$('.stars li:first-child').children().attr("class","fa fa-star-o");star--;
    break;

    case 15:$('.stars li:nth-child(2)').children().attr("class","fa fa-star-o");star--;
    break;

    case 22:$('.stars li:nth-child(3)').children().attr("class","fa fa-star-o");star--;
    break;

  }
}
