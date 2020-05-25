const openlist = () => {
  // document.getElementById('list').style.top="78px";
  // document.getElementById('list').style.transform="scale(1)";
  document.getElementById('list').style.display = "block";
  document.getElementById('upward-icon').style.display = "block";
  document.getElementById('bars-icon').style.display = "none";
}

document.getElementById("mySelect").selectedIndex = -1;

const closelist = () => {
  // document.getElementById('list').style.top="-200px";
  // document.getElementById('list').style.transform="scale(0)";
  document.getElementById('list').style.display = "none";
  document.getElementById('upward-icon').style.display = "none";
  document.getElementById('bars-icon').style.display = "block";
}



// getting toggle button to open sloginbar that holds archive , new file etc options
const lbtn = document.getElementById('toggle_login');


//getting that login bar
const lmenu = document.getElementById('login_bar');
lbtn.addEventListener("click", () => {
  lmenu.classList.toggle("open");
});

document.addEventListener("click", function(e) {
  if (!lmenu.contains(e.target) && !lbtn.contains(e.target)) {
    lmenu.classList.remove("open");
  }
});


//   modal code

var menu = document.getElementById('modal-container');

//get open button
var open_btn = document.getElementById('open-button');

//get open button
var close_btn = document.getElementById('close_btn');

//get sidebar
var sidebar = document.getElementById('login_bar');

open_btn.addEventListener('click', openModal);

close_btn.addEventListener('click', closeModal);

window.addEventListener('click', outsideClick);

function openModal() {
  menu.style.opacity = '1';
  menu.style.visibility = 'visible';
  sidebar.classList.remove("open");
}

function closeModal() {
  menu.style.opacity = '0';
  menu.style.visibility = 'hidden';
}

function outsideClick(e) {
  if (e.target == menu) {
    menu.style.opacity = '0';
    menu.style.visibility = 'hidden';
  }
}

// modal-archive begins that hold heading automated switch... etc

// Get all our menu buttons
const optionsMenuButtons = document.querySelectorAll('.options-menu__button');



// This is a function we can reuse to close all open menus on the page
function closeOpenMenus(exception) {
  const openMenus = document.querySelectorAll('.options-menu__list.show');
  openMenus.forEach(openMenu => {
    if (openMenu !== exception) {
      openMenu.classList.remove('show');
    }
  });
}


// This callback function close all menus if the user hasn't clicked a menu OR a menu button
function handleOutsideMenuClick(event) {
  if (!event.target.closest('.show') && !event.target.closest('.options-menu__button')) {
    closeOpenMenus();
  }
}


function handleOptionsButtonClick(event) {
  // Get our clicked button
  const clickedButton = event.target;
  // Select our clicked button's parent
  const buttonParent = clickedButton.parentElement;
  // Now select our parent's child that has our list class
  const optionsMenu = buttonParent.querySelector('.options-menu__list');

  // Close other menu lists
  closeOpenMenus(optionsMenu);

  // Add the open class to it
  optionsMenu.classList.toggle('show');
}

// For each of our buttons, add an event listener
optionsMenuButtons.forEach(button => {
  button.addEventListener('click', handleOptionsButtonClick);
});

// Add an event listener to our document to handle clicks that aren't on an open menu or a menu button
document.addEventListener('click', handleOutsideMenuClick);
// modal-archive over***********************************


// modal-form-begins*************************
var fmenu = document.getElementById('modal_form-container');

//get open button
var fopen_btn = document.getElementById('form_button');

//get sidebar
var sidebar = document.getElementById('login_bar');

fopen_btn.addEventListener('click', openfModal);

window.addEventListener('click', outsidefClick);

function openfModal() {
  fmenu.style.opacity = '1';
  fmenu.style.visibility = 'visible';
  sidebar.classList.remove("open");
}

function closefModal() {
  fmenu.style.opacity = '0';
  fmenu.style.visibility = 'hidden';
}

function outsidefClick(e) {
  if (e.target == fmenu) {
    fmenu.style.opacity = '0';
    fmenu.style.visibility = 'hidden';
  }

}

// project submitted modal*******************************

var sbtn = document.getElementById('form_submit');

var smenu = document.getElementById('submit_modal');

// var frm = document.querySelector('.modal_form_body');


sbtn.addEventListener('click', function() {
  smenu.style.opacity = '1';
  smenu.style.visibility = 'visible';
  // frm.style.display='none';

});

window.addEventListener('click', function(e2) {
  if (e2.target == smenu) {
    smenu.style.opacity = '0';
    smenu.style.visibility = 'hidden';
    // frm.style.display='none';
  }
});

// modal-form-over*****************************

//******************************************************************************************************************************



const del_btn = document.querySelectorAll('#remove_btn');
var del_menu = document.querySelector('.remove_modal');
const pro_list = document.querySelector('.content ul');
const cont_btn = document.querySelector('.delete_btn');

del_btn.forEach((item => {

  item.addEventListener('click', function() {
    del_menu.style.opacity = '1';
    del_menu.style.visibility = 'visible';
  })


  window.addEventListener('click', function(e2) {
    if (e2.target == del_menu) {
      del_menu.style.opacity = '0';
      del_menu.style.visibility = 'hidden';
      // frm.style.display='none';
    }
  });

}));



///feedback

const febtn = document.getElementById('feedback');

const femenu = document.querySelector('.feedback-modal');

febtn.addEventListener('click', function() {
  femenu.style.opacity = '1';
  femenu.style.visibility = 'visible';
})

window.addEventListener('click', function(e2) {
  if (e2.target == femenu) {
    femenu.style.opacity = '0';
    femenu.style.visibility = 'hidden';
  }
})
