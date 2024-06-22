const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";


const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// for (code in countryList){
//     console.log(code);
// }


  for(let select of dropdown){
    for(node in countryList){
        let newOption = document.createElement("option");
        newOption.innerText= node;
        newOption.value=node;

        if(select.name === "from" && node ==="USD"){
            newOption.selected="selected";
        }else if(select.name === "to" && node ==="INR"){
            newOption.selected="selected";
        }

        select.append(newOption);
    }
    select.addEventListener("change",(evn)=>{
        updateFlag(evn.target);
    });
  }

  const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
  };


  btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount= document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal ==="" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    
    let res = await fetch(URL);
    let data = await res.json();
    let rate = data[toCurr.value.toLowerCase()];
   
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  });


