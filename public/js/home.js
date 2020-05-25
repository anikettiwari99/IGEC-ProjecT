const openlist=()=>{
// document.getElementById('list').style.top="78px";
// document.getElementById('list').style.transform="scale(1)";
document.getElementById('list').style.display="block";
document.getElementById('upward-icon').style.display="block";
document.getElementById('bars-icon').style.display="none";
}

const closelist=()=>{
// document.getElementById('list').style.top="-200px";
// document.getElementById('list').style.transform="scale(0)";
document.getElementById('list').style.display="none";
document.getElementById('upward-icon').style.display="none";
document.getElementById('bars-icon').style.display="block";
}


const getbtn = document.getElementById('acc_btn');

const acc_menu = document.getElementById('account_modal');

const acc_btn = document.getElementById('acc-btn');

getbtn.addEventListener('click',openuModal);

function openuModal(){
  acc_menu.style.opacity='1';
  acc_menu.style.visibility='visible';
}

window.addEventListener('click',closeuModal);

acc_btn.addEventListener('click',closeuModal);

function closeuModal(e1){
    if(e1.target == acc_menu){
  acc_menu.style.opacity='0';
  acc_menu.style.visibility='hidden';
    }
};





// document.addEventListener("click", function(e) {
//   if(  !acc_menu.contains(e.target) && !getbtn.contains(e.target) ){
//     lmenu.classList.remove('show');
// });

///feedback

const febtn = document.getElementById('feedback');

const femenu = document.querySelector('.feedback-modal');

febtn.addEventListener('click',function(){
  femenu.style.opacity='1';
  femenu.style.visibility='visible';
})

window.addEventListener('click',function(e2){
  if(e2.target == femenu){
      femenu.style.opacity='0';
      femenu.style.visibility='hidden';
        }
    })
