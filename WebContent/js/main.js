function collegamentoGet(){

    let nome = document.getElementById("nome");	
    let cognome = document.getElementById("cognome");	
    let cell = document.getElementById("cell");	
        
        fetch("http://localhost:8080/Rubrica/rest/getciao/json/uno")
        .then(response => {
            const contentType = response.headers.get('content-type');
            if(!contentType || !contentType.includes('application/json')){
                
                
                throw new TypeError("Oops, we haven't got JSON");
            }
            return response.json();
        })
        .then(data => {
            let contatto = data;
            nome.value = contatto.nome;
            cognome.value = contatto.cognome;
            cell.value = contatto.cell;
            
        }) 
        .catch(error => console.error(error));
    }


async function allContatti(){
  showMenu();
  var tab = document.getElementById("tuttiTable");
  if (document.body.contains(document.getElementById("tuttiBody"))){
    var sub = document.getElementById("tuttiBody");
    tab.removeChild(sub);
  }
        
        fetch("http://localhost:8080/Rubrica/rest/servizi/all")
        .then(response => {
            const contentType = response.headers.get('content-type');
            if(!contentType || !contentType.includes('application/json')){
                
                
                throw new TypeError("Oops, we haven't got JSON");
            }
            return response.json();
        })
        .then(data => {
            let contatti = data;      
            var tbody = document.createElement('tbody')
                tbody.id = "tuttiBody";     
            var table = document.getElementById("tuttiTable");
            for( var i = 0; i < contatti.length; i++ ) {
              var checkbox = document.createElement('input');
              checkbox.type = "checkbox";
              checkbox.name = "check";
              checkbox.id = "cbTutti" + i;
//              var dettagli = document.createElement('button');
//              dettagli.innerHTML = "Dettagli";
              var child = contatti[i];
              var row = tbody.insertRow();
              row.id = "trTutti" + i;
              row.appendChild(checkbox);
//              row.appendChild(dettagli);
              Object.keys(child).forEach(function(k) {
                if(k == "numero"){
                  checkbox.value = child[k];
                }               
                var cell = row.insertCell();             
                cell.appendChild(document.createTextNode(child[k]));
              })
            }
            table.appendChild(tbody);
            
        }) 
        .catch(error => console.error(error));
}

async function create(){

    const url = 'http://localhost:8080/Rubrica/rest/servizi/create';
    const formEl = document.getElementById("formCreate");
        //formEl.addEventListener("submit" , async (e) => {
           // e.preventDefault();
        const formData = new FormData(formEl);
        const formDataSerialized = Object.fromEntries(formData);
   
        try{
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(formDataSerialized),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const risultato = await response.text();
            console.log(risultato);
            alert(risultato);
        }catch(e){
            console.error(e);
        }
        allContatti();
    //});
}

async function del(){
  const array = new Array();
  var num = document.getElementById("del_num");
  var inputElems = document.getElementsByTagName("input");
  var count = 0;
  for (var i=0; i<inputElems.length; i++) {
  if (inputElems[i].type === "checkbox" && inputElems[i].checked === true){
      array.push(inputElems[i].value);
      count++;
      console.log(count);
    }   
  }
  num.innerHTML = count;
  console.log(num.innerHTML);

    const url = 'http://localhost:8080/Rubrica/rest/servizi/delete';
   
        try{
            const response = await fetch(url, {
                method: "DELETE",
                body: JSON.stringify(array),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const risultato = await response.text();
            console.log(risultato);
            alert(risultato);
        }catch(e){
            console.error(e);
        }
        allContatti();
}

async function searchByName(){

  var tab = document.getElementById("tuttiTable");
  if (document.body.contains(document.getElementById("tuttiBody"))){
    var sub = document.getElementById("tuttiBody");
    tab.removeChild(sub);
  }
    const url = 'http://localhost:8080/Rubrica/rest/servizi/searchByName';
    const searchName = document.getElementById("nomes").value;
   
            const response = await fetch(url, {
                method: "POST",
                body: searchName,
                headers: {
                    "Content-Type": "application/text",
                },
            })
            .then(response => {
                const contentType = response.headers.get('content-type');
                if(!contentType || !contentType.includes('application/json')){
                    
                    
                    throw new TypeError("Non è un JSON");
                }
                return response.json();
            })
            .then(data => {
              let contatti = data;        
              var tbody = document.createElement('tbody');
                  tbody.id = "tuttiBody";     
              var table = document.getElementById("tuttiTable");
              for( var i = 0; i < contatti.length; i++ ) {
                var checkbox = document.createElement('input');
                checkbox.type = "checkbox";
                checkbox.name = "check";               
                checkbox.id = "cbTutti" + i;
 //               var dettagli = document.createElement('button');
  //              dettagli.innerHTML = "Dettagli";
                var child = contatti[i];
                var row = tbody.insertRow();
                row.id = "trTutti" + i;
                row.appendChild(checkbox);
 //               row.appendChild(dettagli);
                Object.keys(child).forEach(function(k) {
                  if(k == "numero"){
                    checkbox.value = child[k];
                  }               
                  var cell = row.insertCell();               
                  cell.appendChild(document.createTextNode(child[k]));
                })
              }
              table.appendChild(tbody);
                
            }) 
            .catch(error => console.error(error));
        
}
async function searchByNumber(){

  var tab = document.getElementById("tuttiTable");
  if (document.body.contains(document.getElementById("tuttiBody"))){
    var sub = document.getElementById("tuttiBody");
    tab.removeChild(sub);
  }
    const url = 'http://localhost:8080/Rubrica/rest/servizi/searchByNumber';
    const searchNumber = document.getElementById("ns").value;
   
            const response = await fetch(url, {
                method: "POST",
                body: searchNumber,
                headers: {
                    "Content-Type": "application/text",
                },
            })
            .then(response => {
                const contentType = response.headers.get('content-type');
                if(!contentType || !contentType.includes('application/json')){
                    
                    
                    throw new TypeError("Non è un JSON");
                }
                return response.json();
            })
            .then(data => {
              let contatti = data;     
              var tbody = document.createElement('tbody');
                  tbody.id = "tuttiBody";     
              var table = document.getElementById("tuttiTable");
                var checkbox = document.createElement('input');
                checkbox.type = "checkbox";
                checkbox.name = "check";
                checkbox.id = "cbTutti";
  //              var dettagli = document.createElement('button');
 //               dettagli.innerHTML = "Dettagli";

                var child = contatti;
                var row = tbody.insertRow();
                row.id = "trTutti";
                row.appendChild(checkbox);
  //              row.appendChild(dettagli);
                Object.keys(child).forEach(function(k) {
                  if(k == "numero"){
                    checkbox.value = child[k];
                  } 

                  var cell = row.insertCell();               
                  cell.appendChild(document.createTextNode(child[k]));
                })
              table.appendChild(tbody);
                
            }) 
            .catch(error => console.error(error));
}

async function update(){

  var inputElems = document.getElementsByTagName("input");
  var id = document.getElementById("idu");
   for(var i=0; i<inputElems.length; i++) {
  if (inputElems[i].type === "checkbox" && inputElems[i].checked === true){
    id.value = inputElems[i].value;
    id.innerHTML = inputElems[i].value;
    console.log(id);
    }   
  }
  const formEl = document.getElementById("formUpdate");
  const formData = new FormData(formEl);
  const formDataSerialized = Object.fromEntries(formData , id);
  console.log(JSON.stringify(formDataSerialized));
  const url = 'http://localhost:8080/Rubrica/rest/servizi/update';

          try{
            const response = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(formDataSerialized),
                headers: {
                    "Content-Type": "application/json",
                },
                
            });
            const risultato = await response.json();
            var msg = risultato;
            console.log(msg);
            var out = msg.status;
            console.log(out);
            alert(out);
        }catch(e){
            console.error(e);
        }
        allContatti();
}


function showCreate() {
  var inputElems = document.getElementsByTagName("input");

  for (var i=0; i<inputElems.length; i++) {
    if(inputElems[i].type === "checkbox"){
      inputElems[i].disabled = true;
    }       
  }
    var x = document.getElementById("DivCreate");   
    var y = document.getElementById("tutti");
    var z = document.getElementById("DivDelete");
    var j = document.getElementById("DivUpdate");
    var k = document.getElementById("DivSearch");
    z.style.display = "none";
    y.style.display = "none";
    k.style.display = "none";
    j.style.display = "none";
    x.style.display = "block";          
  }
  function showDelete() {

    var num = document.getElementById("del_num");
    var inputElems = document.getElementsByTagName("input");
    var count = 0;
    for (var i=0; i<inputElems.length; i++) {
    if (inputElems[i].type === "checkbox" && inputElems[i].checked === true){
        count++;
        console.log(count);
      }   
    }
    console.log(count);
    num.value = count;
    if( count < 1){
      alert("Spunta la casella di uno o piu contatti che vuoi eliminare!");
    }else{
      var inputElems = document.getElementsByTagName("input");

      for (var i=0; i<inputElems.length; i++) {
        if(inputElems[i].type === "checkbox"){
          inputElems[i].disabled = true;
        }       
      }
      var x = document.getElementById("DivCreate");   
      var y = document.getElementById("tutti");
      var z = document.getElementById("DivDelete");
      var j = document.getElementById("DivUpdate");
      var k = document.getElementById("DivSearch");
  
      z.style.display = "block";
      y.style.display = "none";
      k.style.display = "none";
      j.style.display = "none";
      x.style.display = "none";
    }
}

  function showInfo() {
    
    var i_nome = document.getElementById("nomei");
    var i_cognome = document.getElementById("cognomei");
    var i_numero = document.getElementById("numeroi");

    var inputElems = document.getElementsByTagName("input");
    var count = 0;
    for (var i=0; i<inputElems.length; i++) {
    if (inputElems[i].type === "checkbox" && inputElems[i].checked === true){
        count++;
      }   
    }
    if(count == 1){

    var values = new Array();

    $('.tabelle input[type=checkbox]:checked').each(function() { 
 
       var row = $(this).parents("tr");
       var rowcells = row.find('td');
 
       rowcells.each(function() {
         values.push($(this).html());
       });   
    
    });
     console.log(values);
 
     i_nome.innerHTML = values[0];
     i_nome.value = values[0];
     i_cognome.innerHTML = values[1];
     i_cognome.value = values[1];
     i_numero.value = values[2];
     i_numero.innerHTML = values[2];

    var x = document.getElementById("DivCreate");   
    var y = document.getElementById("tutti");
    var z = document.getElementById("DivDelete");
    var j = document.getElementById("DivUpdate");
    var k = document.getElementById("DivSearch");
    z.style.display = "none";
    y.style.display = "none";
    k.style.display = "block";
    j.style.display = "none";
    x.style.display = "none";    
  }else{
    alert("Spuntare uno ed un solo contatto!");
  }       
  }

  function showUpdate() {

    var inputElems = document.getElementsByTagName("input");
    var up_id = document.getElementById("idu");
    var count = 0;
    for (var i=0; i<inputElems.length; i++) {
    if (inputElems[i].type === "checkbox" && inputElems[i].checked === true){
      up_id.value = inputElems[i].value;
      up_id.innerHTML = inputElems[i].value;
        count++;
      }   
    }
    if(count == 1){
      console.log(count);
    var up_nome = document.getElementById("nomeu");
    var up_cognome = document.getElementById("cognomeu");
    var up_numero = document.getElementById("numerou");

    var values = new Array();

   $('.tabelle input[type=checkbox]:checked').each(function() { 

      var row = $(this).parents("tr");
      var rowcells = row.find('td');

      rowcells.each(function() {
        values.push($(this).html());
      });   
   
   });
    console.log(values);

    up_nome.innerHTML = values[0];
    up_nome.value = values[0];
    up_cognome.innerHTML = values[1];
    up_cognome.value = values[1];
    up_numero.value = values[2];
    up_numero.innerHTML = values[2];

    var x = document.getElementById("DivCreate");   
    var y = document.getElementById("tutti");
    var z = document.getElementById("DivDelete");
    var j = document.getElementById("DivUpdate");
    var k = document.getElementById("DivSearch");

      z.style.display = "none";
      y.style.display = "none";
      k.style.display = "none";
      j.style.display = "block";
      x.style.display = "none"; 

//  } 
  }else{
    alert("Spuntare uno ed un solo contatto!");
  }      
}

  function showMenu() {
    var inputElems = document.getElementsByTagName("input");

    for (var i=0; i<inputElems.length; i++) {
      if(inputElems[i].type === "checkbox"){
        inputElems[i].disabled = false;
      }       
    }

    var del = document.getElementById("del_num");
    var nome_up = document.getElementById("nomeu");
    var cognome_up = document.getElementById("cognomeu");
    var num_up = document.getElementById("numerou");
    var nome_c = document.getElementById("nomec");
    var cognome_c = document.getElementById("cognomec");
    var num_c = document.getElementById("numeroc");
    var x = document.getElementById("DivCreate");   
    var y = document.getElementById("tutti");
    var z = document.getElementById("DivDelete");
    var j = document.getElementById("DivUpdate");
    var k = document.getElementById("DivSearch");
    del.value = "";
    nome_up.value = "";
    cognome_up.value = "";
    num_up.value = "";
    nome_c.value = "";
    cognome_c.value = "";
    num_c.value = "";
    z.style.display = "none";
    y.style.display = "block";
    k.style.display = "none";
    j.style.display = "none";
    x.style.display = "none";          
  }


  function showTutti() {
    var x = document.getElementById("trova");   
    var y = document.getElementById("tutti");
    var z = document.getElementById("tuttiTable");
    var k = document.getElementById("trovaTable");
    z.style.display = "block";
    k.style.display = "none";
    y.style.display = "block";
    x.style.display = "none";          
  }

  function showTrova() {
    var x = document.getElementById("trova");   
    var y = document.getElementById("tutti");
    var z = document.getElementById("tuttiTable");
    var k = document.getElementById("trovaTable");
    y.style.display = "none";
    x.style.display = "block";      
    z.style.display = "none";
    k.style.display = "block";    
  }


