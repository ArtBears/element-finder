'use strict';

/*
New and better approach using some OOP paradigms

Walk the Dom
  in each element on the DOM, 
    add the event listener
      this event listener will:
        on hover:
          option1:
            change the background color of the element that is hovered over
          option2:
            add a frame over the element with a high opacity and off color.
        on click:
          search for an element id
          if id:
            paste '#id' to the clipboard
          else: 
            create an element identifier based on parent and/or classname 
            copy the element identifier to the clip board
12-21-15{
  I've made the decision to use a popup box to show by the hovered node.
    This decision was made for 2 reasons: 
      1. The Chrome Selection API can grab text from a selector using 
        document.execCommand('copy');
      2. It will look better.
}

*/

// This method makes it simpler and more clear 
// that a method is methods added to the 
// ElementFinder object.
Function.prototype.method = function(name, func){
  if(!this.prototype[name]){
    this.prototype[name] = func;
    return this;
  }
}


// Constructor for ElementFinder
var ElementFinder = function(element){
  var that = this;  // parent object reference
  this.touched = false;
  if(!element){
    this.elements = document.getElementsByTagName('*');  
  }
  else{
    this.elements = document.getElementByTagName(element);
  } // change this so it can read if an id or class was involved
  
};

ElementFinder.method(nodeTraveler, function(root, func){
  func(node);
  node = node.firstChild;

  while(node){
    nodeTravler(node, func);
    node = node.nextSibling;
  }
});

ElementFinder.method('hover', function(node){
  var old_background = node.style.background;
  node.addEventListener('mouseenter', function(){
    node.style.background = '#80ffd3';
    // create text box after delay
  });
  node.addEventListener('mouseleave',function(){
    node.style.background = old_background;
  });
});

ElementFinder.method('copy_to_clipboard', function(){
  var element_box = document.getElementById('element_finder_text_box');
  var range = document.createRange();
  range.selectNode(element_box);
  window.getSelection().addRange(range)

  try{
    // for testing purposes
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copy email command was ' + msg); 
  }catch(err){
    console.log("Unable to copy \r " + err);
  }
});

function(){
  if (node.getAttribute('id')){
    setTimeout(that.copy_to_clipboard, 1500);
  }
  else{
    
  }
}

ElementFinder.method('', function(node){ // come back
  node.addEventListener('click', )
});


 




