function LetterIndex(id,callback){
var $letterIndex=this.$letterIndex=$("#"+id).addClass("letter-index");;
var $letterIndexPanel=this.$letterIndexPanel=$("<div class='letter-index-panel'></div>").insertAfter($letterIndex);

this.callback=callback;

var index=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
for(var i=0;i<index.length;i++){
	var html="<div class='letter'>"+index[i]+"</div>";
	var $div=$(html).addClass("letter-"+index[i]).appendTo($letterIndex);
}

$letterIndex[0].addEventListener(START_EV,$.proxy(function(e){
	if(e.target.innerHTML.length!=1)
		return;
		
	e.preventDefault();
	
	this.showLetterPanel(e.target.innerHTML);
	
	var point=window.supportTouch?e.touches[0]:e;
	this.startTop=point.clientY;
	this.startTargetTop=e.target.offsetTop;
},this));

$letterIndex[0].addEventListener(MOVE_EV,$.proxy(function(e){
	if(e.target.innerHTML.length!=1)
		return;
	
	e.preventDefault();
	
	var point=window.supportTouch?e.touches[0]:e;
	var indexNum=Math.ceil( (this.startTargetTop+point.clientY-this.startTop)/e.target.clientHeight );
	
	if(indexNum>-1 && indexNum<index.length)
		this.showLetterPanel(index[indexNum]);
},this));

}
LetterIndex.prototype.showLetterPanel=function(x){
if(this.panelTimer)
	clearTimeout(this.panelTimer);
	
var $letterIndexPanel=this.$letterIndexPanel;
var $letterIndex=this.$letterIndex;

$letterIndexPanel.html(x).show();
$letterIndex.find("div").removeClass("active-letter");
$letterIndex.find(".letter-"+x).addClass("active-letter");

this.panelTimer=setTimeout(function(){
	$letterIndexPanel.hide();
	$letterIndex.find(".letter-"+x).removeClass("active-letter");
},1000);

if(this.callback)
	this.callback(x);
}