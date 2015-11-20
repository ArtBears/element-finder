'use strict';

var el_list = document.getElementById('el_list');

// recurssive algo that will walk dom and 
//   retrieve all children.
// Takes a callback function to perform 
//   an action on each child
function walkDOM(root, func){
  var parent_node;
  var node = root;

  start: while(node){
    func(node);
    if (node.firstChild){
      node = node.firstChild;
      continue start;
    }

    while(node){
      if (node === root){
        break start;
      }

      if(node.nextSibling){
        node = node.nextSibling;
        continue start;
      }

      node = node.parentNode;
    }
  }
}

function master(node){
  if(isDirectChildOfBody(node)){
    el_list.appendChild(createListItem(
                        generateName(node)));
  }
  else{

  }
}

// check if body is it's parent node
function isDirectChildOfBody(node){
  if(node.parentNode.nodeName === "BODY"){
    return true;
  }
  return false;
}

// pass in a text node to become the text inside of the li 
function createListItem(text_node){
  var new_item = document.createElement('li');
  new_item.appendChild(text_node);
  return new_item;
}

function generateName(node){
  var text_node;
  var node_class  = combineClasses(node);
  var node_id     = node.getAttribute('id');
  var node_elem   = node.nodeName.toLowerCase();
  var parent_name = node.parentNode.toLowerCase();
  
  if(node_id){
    text_node = document.createTextNode('#' + node_id);
    return text_node;
  }
  else if(node_class){
    text_node = document.createTextNode(parent_name 
                                        + ' ' 
                                        + node_elem 
                                        + '.' 
                                        + node_class);
    return text_node;
  }
  else {
    // may replace this for a recurssive algo to find all parents up to body.
    text_node = document.createTextNode(parent_name 
                                        + ' '
                                        + node_elem);
    return text_node;
  }
}

function combineClasses(node){
  var node_class = node.getAttribute('class');
  if(node_class){
    var class_array =  node_class.split(' ');
    var combined_string = node_class.join('.');
    return combined_string;
  }
  return null;
} /* combineClasses */ 

function appendUList(node){
  if(node.hasChildNodes() 
      && node.childNodes <= 1 
      && node.childNodes[0].nodeType == 3){
    return;
  }
  else if(node.hasChildNodes()){
    var new_list = document.createElement('ul');
    node.appendChild(new_list);
  }
  else{}
}

// To load when page loads 
document.addEventListener('DOMContentLoaded', listener);