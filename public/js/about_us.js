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
