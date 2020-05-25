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


//feedback
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


        // project submitted modal*******************************

        var sbtn = document.getElementById('form_submit');

        var smenu = document.getElementById('submit_modal');

        // var frm = document.querySelector('.modal_form_body');


        sbtn.addEventListener('click', function(){
          smenu.style.opacity='1';
          smenu.style.visibility='visible';
          // frm.style.display='none';

        });

        window.addEventListener('click',function(e2){
          if(e2.target == smenu){
              smenu.style.opacity='0';
              smenu.style.visibility='hidden';
              // frm.style.display='none';
          }
        });
