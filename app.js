// FORM 1
var transForm=document.getElementById('form1');
var date=document.getElementById('date');
var transactionSubmit=document.getElementById('taskSubmit');
var transactionName=document.getElementById('addTask');

// FORM 2
var transAmtForm=document.getElementById('form2');
var transactionDetails=document.getElementById('addDetails');
var selecter=document.getElementById('myonoffswitch');
var transactionAmt=document.getElementById('amount');
var budgetSubmit=document.getElementById('budgetSubmit');
var back=document.getElementById('switch');
var transdate=document.getElementById('form2date');
// LIST
var listCont=document.getElementById('listContainer');
// BUDGET VIEWER
var balanceAmt=document.getElementById('balanceAmount');
var incomAmt=document.getElementById('incomeAmt');
var expenseAmt=document.getElementById('expenseAmt');
// NOTES
var notes=document.getElementById('noty');
var noteSection=document.getElementById('notes');
var notedate=document.getElementById('notedate');
var textcont=document.getElementById('edit');
var texts=document.getElementById('textarea');
var editbtn=document.getElementById('editbutton');
var submitbtn=document.getElementById('editSubmit');
// TRANSFER
var transferCont=document.querySelector('.transferContainer');
var dateinfo=document.getElementById('detaildate');
var transferSection=document.getElementById('transfer');

// NOTE TEMP ADDRESS STORAGE/BUDGET TEMP ADDRESS
var notear=[];
var budar=[];
//SAMPLE STORAGE 
// var sample=[{id:1,date:'2020-03-14',name:'Purchase',notes:'The ashes filled a black plastic box about the size of a toaster. It weighed three and a half pounds. I put it in a canvas tote bag and packed it in my suitcase this past July for the transpacific flight to Manila. From there I would travel by car to a rural village. When I arrived, ',detail:[{id:1,details:'CAR',amt:500},{id:2,details:'BIKE',amt:-250},{id:4,details:'OFFICE',amt:-250},{id:5,details:'SALES',amt:250}]},{id:2,date:'2020-01-08',name:'Asset',notes:'The novel begins with an explanation that the story is not at all "true" and that everything in it is, in fact, a complete and utter lie. marker indicating that Heracles and Dionysus have traveled to this point, and trees that look like women',detail:[{id:6,details:'HOUSE',amt:800},{id:7,details:'BIKE',amt:-450},{id:8,details:'STORE',amt:-250},{id:9,details:'SALES',amt:350}]}];
const localStorageTransactions=JSON.parse(localStorage.getItem('dailybudgettracker'));



//GENERAL
general=()=>{
  listCont.innerHTML='<li>PLEASE ADD TRANSACTIONS</li>';
  transAmtForm.classList.add('toggle');
  transForm.classList.remove('toggle');
}
var transactions=localStorage.getItem('dailybudgettracker')!==null?localStorageTransactions:[];


// UPDATE TASK
updatetask=(val)=>{
var newtask=document.createElement('li');
newtask.innerHTML=`<div class="wid"><span class="listHeading">${val.name}</span></div><div class="wid"><button class="viewNotebtn">View Note</button><button class="viewBudgetbtn">Budget</button></div><div class="wid"><span class="viewDate">${val.date}</span></div>
<div class="id">${val.id}</div>
<div><span class="close">x</span></div>`
newtask.classList.add('listitem');
listCont.appendChild(newtask);
}
// UPDATE BUDGET
updatebudget=(val)=>{
var newbudget=document.createElement('li');
if(val.amt>0){
  newbudget.classList.add('plus');
}
else{newbudget.classList.add('minus');}
newbudget.innerHTML=`<span class="transferHead">${val.details}</span>
<span class="transferAmt"><span>&#x20b9;</span>${val.amt}</span>
<span class="amid">${val.id}</span>
<span class="closed">x</span>`;
transferCont.appendChild(newbudget);
}

// BALANCE SECTION
updatebalance=()=>{
positive=(val)=>{
  var pos=val.reduce((acc,item)=>{
    item=item.amt>0?item.amt:0;
    return acc+item;
  },0);
  return pos;
}
negative=(val)=>{
  var nev=val.reduce((acc,item)=>{
    item=item.amt<0?item.amt:0;
    return acc+item;
  },0);
  return nev;
}
var income=transactions.map(item=>{return positive(item.detail)}).reduce((acc,item)=>{return acc+item},0).toFixed(2);
var expense=transactions.map(item=>{return negative(item.detail)}).reduce((acc,item)=>{return acc+item},0).toFixed(2);
var total=((+income)+(+expense)).toFixed(2);
balanceAmt.innerHTML=`<span>&#x20b9;${total}</span>`;
incomAmt.innerHTML=`<span>&#x20b9;${income}</span>`;
expenseAmt.innerHTML=`<span>&#x20b9;${expense}</span>`;
updateLocalstorage();
}  

// CALLING FUNCTION
call=()=>{
  listCont.innerHTML='';
  transactions.forEach(updatetask);
  updateLocalstorage();
  
}
// CALLING VIEW BUDGET
showBudget=(e)=>{
  transferCont.innerHTML='';
  if(e.target.className=='viewBudgetbtn'){
    transAmtForm.classList.remove('toggle');
    transForm.classList.add('toggle');
    if(transferSection.classList.contains('toggle')){
      transferSection.classList.remove('toggle');
      noteSection.classList.add('toggle');
    }
   let idno = e.target.parentElement.parentElement.getElementsByClassName('id')[0].innerText;
   budar=[];
   budar.push(idno);
   transdate.innerText=e.target.parentElement.parentElement.getElementsByClassName('viewDate')[0].innerText;
   dateinfo.innerText=e.target.parentElement.parentElement.getElementsByClassName('viewDate')[0].innerText;
   (transactions.filter(item=>item.id==(+idno)).map(item=>{return item.detail})[0]).forEach(updatebudget);
  } 
  else{dateinfo.innerText='';}
}

showNotes=(e)=>{
  
  if(e.target.className=='viewNotebtn'){
    transferSection.classList.add('toggle');
    noteSection.classList.remove('toggle');
    editbtn.classList.remove('toggle');
   let idno = e.target.parentElement.parentElement.getElementsByClassName('id')[0].innerText;
   notear=[];
   notear.push(idno);
   notedate.innerText=e.target.parentElement.parentElement.getElementsByClassName('viewDate')[0].innerText;
   let texter=transactions.filter(item=>item.id==(+idno)).map(item=>{return item.notes})[0];
   notes.innerText=texter;
   
  }
  else {
    notes.innerText='';
    notedate.innerText='';
    editbtn.classList.add('toggle');
    submitbtn.classList.add('block');
    textcont.classList.add('block');
  }
}





listCont.addEventListener('click',(e)=>{
  showBudget(e);
  showNotes(e);
});


// NOTES EDITING
editbtn.addEventListener('click',()=>{
  textcont.classList.remove('block');
  submitbtn.classList.remove('block');
  texts.value=notes.innerText;
  submitbtn.addEventListener('click',()=>{
    let inx=notear.pop();
    let index=transactions.filter(item=>{return item.id==inx}).map(item=>{return transactions.indexOf(item)});
    transactions[index].notes=texts.value;
    notes.innerText=transactions[index].notes;
    submitbtn.classList.add('block');
    textcont.classList.add('block');
    notear.push(inx);
    updateLocalstorage();
  })
})

// DELETE TASKS
deletetask=(e)=>{
  transactions=transactions.filter(item=>{return item.id!==e});
  call();
  if(transactions.length==0){
    general();
  }
  updatebalance();
}
deleteamt=(ind,val)=>{
  let index=transactions.filter(item=>{return item.id==ind}).map(item=>{return transactions.indexOf(item)});
  let newdetails=transactions[index].detail.filter(item=>{return item.id!==val});
  transactions[index].detail=newdetails;
  transferCont.innerHTML='';
  (transactions.filter(item=>item.id==(+ind)).map(item=>{return item.detail})[0]).forEach(updatebudget);
  updatebalance();
}

// STORAGE
updateLocalstorage=()=>{
  localStorage.setItem('dailybudgettracker',JSON.stringify(transactions));
}

// FORM 1
transForm.addEventListener('submit',(e)=>{
e.preventDefault();
if(transactionName.value==''||date.value==''){
  alert('Please fill in the required fields');
  return;
}
let tempname=transactionName.value;
let tempdate=date.value;
let randomid=Math.floor((Math.random() * 100000) + 1);
transactions.push({id:randomid,date:tempdate,name:tempname,notes:null,detail:[]});
transferCont.innerHTML='';
call();

});

// FORM 2
transAmtForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  if(transactionDetails.value==''||transactionAmt.value==''){
    alert('Please fill in the required fields');
    return;
  }
  let tempdetail=transactionDetails.value;
  let tempamt=transactionAmt.value;
  let amtid=Math.floor((Math.random() * 100000) + 1);
  if(selecter.checked==true){
    tempamt=tempamt * -1;
  }
  else {tempamt=+tempamt;}
  let inx=budar.pop();
  let index=transactions.filter(item=>{return item.id==inx}).map(item=>{return transactions.indexOf(item)});
  transactions[index].detail.push({id:amtid,details:tempdetail,amt:tempamt});
  transferCont.innerHTML='';
  (transactions.filter(item=>item.id==(+inx)).map(item=>{return item.detail})[0]).forEach(updatebudget);
  updatebalance();
  budar.push(inx);
  transactionDetails.value='';
  transactionAmt.value='';
});

// CLOSE CATEGORIES

// FIRST CLOSE
back.addEventListener('click',()=>{
    transAmtForm.classList.add('toggle');
    transForm.classList.remove('toggle');
});

// DELETE TASK
listCont.addEventListener('click',(e)=>{
  if(e.target.className=='close'){
    deletetask(+e.target.parentElement.parentElement.getElementsByClassName('id')[0].innerText)
  }
});
// DELETE TRANSACTIONS
transferCont.addEventListener('click',(e)=>{
  if(e.target.className=='closed'){
    let newidno=+e.target.parentElement.getElementsByClassName('amid')[0].innerText;
    let inx=budar.pop();
    deleteamt(+inx,newidno);
    budar.push(inx);
  }
});


call();
updatebalance();
