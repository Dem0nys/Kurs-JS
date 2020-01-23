$(function(){
    $("#input").on("keyup", function() {
      let value = $(this).val().toLowerCase();
      $("#table tr").filter(function() {
        $(this).toggle($(this).children().eq(2).text().toLowerCase().indexOf(value) > -1);
      });
    });
    let crypto=GetData();
    crypto.then(i=>WriteInTable(i));
    function WriteInTable(data){     
      let i=0; 
        for(let item of Object.entries(data)){
          i++;
            let tr=document.createElement("tr");
            let td=document.createElement("td");
            tr.id = "tr"+i;
            td.innerHTML="<td>"+i+"</td>";
            tr.append(td);
            td=document.createElement("td");
            td.innerHTML="<td>"+item[0]+"</td>";
            tr.append(td);
            td=document.createElement("td");
            td.innerHTML="<td>"+item[1].name+"</td>";
            tr.append(td);
            td=document.createElement("td");
            td.innerHTML="<td>"+item[1].humanType+"</td>";
            tr.append(td);
            td=document.createElement("td");
            td.innerHTML="<td>"+item[1].currencyType+"</td>";
            tr.append(td);
            td=document.createElement("td");
            td.innerHTML="<td>"+item[1].minConf+"</td>";
            tr.append(td);
            td=document.createElement("td");
            td.innerHTML="<td>"+parseFloat(item[1].txFee)+"</td>";
            tr.append(td);
            let but = document.createElement("button");
            but.innerHTML = "Delete"
            but.classList.add("btn", "btn-dark");
            but.addEventListener("click", function Delete() {
              let row = this.parentNode.parentNode;
              row.parentNode.removeChild(row);
              });
            td=document.createElement("td");
            td.appendChild(but)
            tr.appendChild(td);
            $('#table').append(tr);
          }

}
});
async function GetData(){
    let url="https://poloniex.com/public?command=returnCurrencies";
    let responce=await fetch(url);
    let res= responce.json();
    return res;
}