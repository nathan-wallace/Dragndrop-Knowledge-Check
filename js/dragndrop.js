// JavaScript Document


/*
	Copyright (C) 2014  1ST AMERICAN SYSTEM AND SERVICES
*/


// DRAG & DROP KNOWLEDGE CHECK 

function initPage(){

// DEFINES DRAGGABLE CLASS 			
// makes draggable items draggable after event, jquery and :Focus - BUG FIX
$('.draggable').on({
    mouseover: function() {
       $(this).focus();
    },
    focus: function() {
        $(this).draggable({ disabled: false });

    },
    blur: function() {
        $('.draggable').draggable({ disabled: true });
    }
});


 $( ".draggable" ).draggable({
	//helper:'clone',
	//snap: '.dropZone',
	//snapMode: 'inner',
	//helper: function() { draggedClone = jQuery(this).clone(); return draggedClone; },
	containment: '#content',
	revert: 'invalid',
  	cursor: 'move',
	//start:function( event, ui ){$(this).css({border:'5px solid #FF0000'});},
	
	//start:function( event, ui ){$(this).setAttribute('aria-grabbed', 'true');},
	//stop: function( event, ui ) {$(this).setAttribute('aria-grabbed', 'false');}
	
		});
		
$(".draggable").data("left", $(".draggable").position().left).data("top", $(".draggable").position().top);
	
// END OF DRAGGABLE CLASS
			
	
// DEFINES DROPPABLE CLASS 
$( ".droppable" ).droppable({
	//only accepts a draggable item if droppable is empty.
	accept: function(draggable) {
        
			return $(this).find(".draggable").length == 0;
		
    },
    drop: function(ev, ui) {
        $(ui.draggable).detach().css({top: -20,left: -20, marginTop:'10px'}).appendTo(this);
		$(ui.draggable).attr('id');
		$($(this).find('input')).attr('value', $(ui.draggable).attr('id'));
		console.log($(ui.draggable).attr('id'));
		snapToMiddle(ui.draggable,$(this));
		$(ui.draggable).draggable({ disabled: true });
		
    } 
  
});


$( ".draggable_container" ).droppable({
    drop: function(ev, ui) {
        $(ui.draggable).detach().css({top: -20,left: -20, marginTop:'5px'}).appendTo(this);
		snapToMiddle(ui.draggable,$(this));
    }
	
});

//animate draggable on drop to snap into drop zone.
function snapToMiddle(dragger){
dragger.animate({top:0,left:0},{duration:600,easing:'easeOutBack'});

}


//RETURN ALL DRAGGABLES BACK TO ORIGINAL CONTAINER ON CLICK EVENT ALSO REMOVES FEEDBACK MODAL FOR RETRY
function resetButton(){
	
	$($('.droppable').find('input')).attr('value', null);
	$('.draggable').detach().css({top: 0,left: 0, marginTop:'5px'}).appendTo($('.draggable_container'));
	$('#kcFeedback').addClass('hidden').animate({'Top': '-=400px'}, 200);
	
}

$("#btnReset").click(function() {
	
	resetButton();
});


function InstructButton(){
	$('.draggable').detach().css({top: 0,left: 0, marginTop:'5px'}).appendTo($('.draggable_container'));
	$('#kcFeedback').addClass('hidden').animate({'Top': '-=400px'}, 200);
}

$("#instructions").click(function() {
	$("#instructions_panel").toggle();
});
$("#instructions_panel").click(function() {
	$("#instructions_panel").hide();
});



// KEYBOARD ACCESSIBILITY FOR DRAG & DROP INTERACTION

/*
	Press Left/Right Arrow keys to moves selected draggable one space to the right or left through available drappable zones. 
	Press Esc key or click Reset Button to return all draggable items to their original container.
*/ 

document.onkeyup = KeyCheck;       
function leftarrowpressed() {
		
	if( ($('.draggable:focus').parent().attr('data-dropnum')) == undefined && $(".droppable[data-dropnum = '" + 1 + "']").children('.draggable').length == 0){
			console.log('right arrow if function');
			$(".droppable").each(function() {
			($('.draggable:focus')).appendTo(this);
			
			});
			
			
	}
 
	if( (parseInt($('.draggable:focus').parent().attr('data-dropnum'))) > 1 ){
		console.log( 'left arrow if ' );
			
			var drpnm = (parseInt($('.draggable:focus').parent().attr('data-dropnum'))) - 1 ;
			
		for(i = drpnm; i >= 1 ; i--)
			{
				console.log( i )
				console.log(parseInt($(".droppable[data-dropnum = '" + i + "']").children().length) == parseInt(1));
				
				if($(".droppable[data-dropnum = '" + i + "']").children('.draggable').length == 0){
				$(".droppable[data-dropnum = '" + i + "']").append($('.draggable:focus').get(0));					
				i =  - 1; 
				}
				
			}
			($('.draggable:focus')).appendTo($('.draggable_container'));
		
	}		
	
	else if(($('.draggable:focus').parent().attr('data-dropnum')) == 1 || undefined){
	console.log('else if');
	($('.draggable:focus')).appendTo($('.draggable_container'));
	}		
}

function rightarrowpressed() {
	
	//console.log(($('.draggable:focus')).parent().attr('data-dropnum'));
	
	if( ($('.draggable:focus').parent().attr('data-dropnum')) == undefined && $(".droppable[data-dropnum = '" + 1 + "']").children('.draggable').length == 0){
			console.log('right arrow if function');
			$(".droppable").each(function() {
			($('.draggable:focus')).appendTo(this);
			
			});
			
			
	}
	
	// HOPS/ACKNOWLEDGES FIRST FULL DROPPABLE AND STARTS LOOKING FOR AN EMPTY DROPPABLE
	if( ($('.draggable:focus').parent().attr('data-dropnum')) == undefined && $(".droppable[data-dropnum = '" + 1 + "']").children('.draggable').length == 1){
			var drpnm = (parseInt($(".droppable[data-dropnum = '" + 1 + "']").attr('data-dropnum'))) + 1 ;

			for(i = drpnm; i <= ($('.droppable')).length; i++)
				{
					console.log( i )
					console.log(parseInt($(".droppable[data-dropnum = '" + i + "']").children().length) == parseInt(1));
					if($(".droppable[data-dropnum = '" + i + "']").children('.draggable').length == 0){
					$(".droppable[data-dropnum = '" + i + "']").append($('.draggable:focus').get(0));
					//($('.draggable:focus')).appendTo($(".droppable[data-dropnum = '" + drpnm + "']"));
					i = ($('.droppable')).length + 1; 
					console.log('if frog leap ' + i);
					}
					
					//console.log(($(".droppable")).find($(".draggable")).length == 0);
			
				}
	
			
			
	}// END FROG LEAP
	
	
	// IF DRAGGABLE IS IN LAST DROPPABLE SLOT RETURN TO DRAGGABLE CONTAINER
	if( ((parseInt($('.draggable:focus').parent().attr('data-dropnum'))) == ($('.droppable')).length)){
		$('.draggable:focus').appendTo($(".draggable_container"));
			
	}
	
	// TOGGLE THROUGH DROPPABLES 
	else if( (parseInt($('.draggable:focus').parent().attr('data-dropnum'))) < ($('.droppable')).length){
		
			var drpnm = (parseInt($('.draggable:focus').parent().attr('data-dropnum'))) + 1 ;

			for(i = drpnm; i <= ($('.droppable')).length; i++)
				{
					console.log( i )
					console.log(parseInt($(".droppable[data-dropnum = '" + i + "']").children().length) == parseInt(1));
					if($(".droppable[data-dropnum = '" + i + "']").children('.draggable').length == 0){
					$(".droppable[data-dropnum = '" + i + "']").append($('.draggable:focus').get(0));
					//($('.draggable:focus')).appendTo($(".droppable[data-dropnum = '" + drpnm + "']"));
					i = ($('.droppable')).length + 1; 
					console.log('else if if for ' + i);
					}
				}
				($('.draggable:focus')).appendTo($('.draggable_container'));			
	}
			
}


function KeyCheck(e)
    {
       var KeyID = (window.event) ? event.keyCode : e.keyCode;

       switch(KeyID)
       {

 // left arrow key
         case 37:
         leftarrowpressed()    
          break;

//  right arrow key
          case 39:
          rightarrowpressed() 
           break;
		  
//  esc key	(reset .draggables to original container)	  
		  case 27:
	
			resetButton();
    		$("#instructions_panel").hide();
			break;
		
       }
	   
    
	} 		
			
// END KEYBOARD CONTROLS FOR DRAG AND DROP 
// END OF DRAG AND DROP SPECIFIC CODE

// KNOWLEDGE CHECK LOGIC FOR DRAGANDDROP.HTML

	
	if($('#kcFeedback').length > 0){
			id = document.getElementById('kcFeedback');
			//$(id).removeClass('hidden'); this is specifically for droppable unable to have overflow:hidden (added this below with the animation)
			$(id).css('left', '+=300px');
			if($('.draggable').length > 0){
				$('.kcSubmit').attr('onclick', 'showFeedback()');
			}
			else{
			$('input, label').click(function(e){
				if(tries < maxTries){
					$('.kcSubmit').attr('onclick', 'showFeedback()');
				}
	
			});
		}
		
		$('#kcFeedback').click(function() {
			resetButton();
			});
		}
	
}// end 


// for knowledge check
	function showFeedback(){
		var finished = false;
		id.className = "";
		var ansArr = [];
		if($('.kc_matching').length > 0 || $('.kc_order').length > 0 ){
			$('#myform').find('input[name=distractors]').each(function(index, element) {
				ansArr.push($(this).val().toLowerCase());
			});
		}
		//else{
			//$('#myform').find('input[name=distractors]:checked').each(function(index, element) {
				//ansArr.push($(this).val());
			//});
		//}

		console.log('ansArr.toString(): ' + ansArr.toString());

		if(ansArr.toString() == correctAnswer){
			$('#feedback').fadeOut(0).text(correctFB + " " + restOfFeedback).fadeIn(800);
			if(tries === 1) $('#kcFeedback').removeClass('hidden').animate({'Top': '+=400px'}, 200);
			$('.kcSubmit, input, label').removeAttr('onclick');
			finished = true;
//			enableNext();
		}
		else if(tries < maxTries){
			$('#feedback').fadeOut(0).text(incorrectFB + " " + tryAgain).fadeIn(800);
			$('#kcFeedback').animate({'Top': '+=400px'}, 200);
			tries++;
		}
		else{
			$('#feedback').fadeOut(0).text(incorrectFB + " " + restOfFeedback).fadeIn(800);
			$('.kcSubmit').removeAttr('onclick');
			$('.kcSubmit, input, label').removeAttr('onclick');
			$('#kcFeedback').click(function() {
			$('#kcFeedback').addClass('hidden').animate({'Top': '-=400px'}, 200);
			});
//			enableNext();
			finished = true;
		}
		$('#feedback').attr('aria-live', 'polite');
		if(finished) 
			$('input').attr('disabled', true);
	}
	
	function logit(str){
		if(!isIE)console.log(str);
/*		if (typeof console !== "undefined" || typeof console.log !== "undefined") {
			console.log(str);
		} */
	}