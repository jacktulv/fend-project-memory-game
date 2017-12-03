/*
 * Create a list that holds all of your cards
 */


//画HTML
$(drawGird);
 function drawGird(){
   $('.moves').html(count);
   //定义卡片图标类型
   var CardsType=['fa fa-diamond','fa fa-paper-plane-o','fa fa-anchor','fa fa-bolt',
   'fa fa-cube','fa fa-leaf','fa fa-diamond','fa fa-paper-plane-o','fa fa-anchor',
   'fa fa-bolt','fa fa-cube','fa fa-leaf'];
  //定义卡牌
   var Card=$('<li class="card"><i></i></li>');
   shuffle(CardsType);
   for(var i=0;i<12;i++){
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

 var Cards=new Array();
 var count=0,matched=0;//记数和匹配

$(function(){
  //处理重置
  $('div.restart').on('click', function(){
     count=0;matched=0;
     Cards=[];
     $('.deck').html('');
     drawGird();
  });

  //处理点击事件
  $('.deck').on('click','li',function(){
    count++;
    $('.moves').html(count);
    var Card = $(this);
    var CardsType=Card.children().attr("class");
    //保证是未翻的牌
    if(Card.hasClass("open")||Card.hasClass("match")||Card.hasClass("show")){
        alert("此牌已翻");
    }


    else if(Cards.length===0){
      Card.addClass("open show");
      Cards.push(CardsType);
    }else{
          if(Cards.includes(CardsType)){
              Card.addClass("show match");
              $('li.open').toggleClass("open match");
              Cards.pop();
              matched++;
              if(matched===6){
                setTimeout(function(){
                  alert("恭喜您获得胜利 \n 共用"+count+"步 重新开始请点刷新")},500);
              }
          }else{
              Card.addClass("open show");
              setTimeout(function(){
              Card.removeClass("open show");
              $('li.open').toggleClass("open show");
              Cards.pop();
            },200);
        }
      }


  });
})
