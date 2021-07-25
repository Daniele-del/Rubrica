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


function allContatti(){
        
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
            function addHeaders(table, keys) {
                var row = table.insertRow();
                for( var i = 0; i < keys.length; i++ ) {
                  var cell = row.insertCell();
                  cell.appendChild(document.createTextNode(keys[i]));
                }
              }
              
              var table = document.createElement('table');
              for( var i = 0; i < contatti.length; i++ ) {
              
                var child = contatti[i];
                if(i === 0 ) {
                  addHeaders(table, Object.keys(child));
                }
                var row = table.insertRow();
                Object.keys(child).forEach(function(k) {
                  console.log(k);
                  var cell = row.insertCell();
                  cell.appendChild(document.createTextNode(child[k]));
                })
              }
              
              document.getElementById('tabella').appendChild(table);
            
        }) 
        .catch(error => console.error(error));
}

function create(){

    const url = 'http://localhost:8080/Rubrica/rest/servizi/create';
    const formEl = document.getElementById("formCreate");
        formEl.addEventListener("submit" , async (e) => {
            e.preventDefault();
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
            alert("C'è un errore!");
        }

    });
}

async function del(){

    const url = 'http://localhost:8080/Rubrica/rest/servizi/delete';
    const delnum = document.getElementById("del_num").value;
   
        try{
            const response = await fetch(url, {
                method: "DELETE",
                body: delnum,
                headers: {
                    "Content-Type": "application/text",
                },
            });
            const risultato = await response.text();
            console.log(risultato);
            alert(risultato);
        }catch(e){
            console.error(e);
            alert("C'è un errore!");
        }

}

async function search(){

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
                function addHeaders(table, keys) {
                    var row = table.insertRow();
                    for( var i = 0; i < keys.length; i++ ) {
                      var cell = row.insertCell();
                      cell.appendChild(document.createTextNode(keys[i]));
                    }
                  }
                  
                  var table = document.createElement('table');
                  for( var i = 0; i < contatti.length; i++ ) {
                  
                    var child = contatti[i];
                    if(i === 0 ) {
                      addHeaders(table, Object.keys(child));
                    }
                    var row = table.insertRow();
                    Object.keys(child).forEach(function(k) {
                      console.log(k);
                      var cell = row.insertCell();
                      cell.appendChild(document.createTextNode(child[k]));
                    })
                  }
                  
                  document.getElementById('tabella').appendChild(table);
                
            }) 
            .catch(error => console.error(error));
        
}

function showCreate() {
    var x = document.getElementById("DivCreate");   
    var y = document.getElementById("scelte");
    var z = document.getElementById("DivDelete");
    var j = document.getElementById("DivUpload");
    var k = document.getElementById("DivSearch");
    z.style.display = "none";
    y.style.display = "none";
    k.style.display = "none";
    j.style.display = "none";
    x.style.display = "block";          
  }
  function showDelete() {
    var x = document.getElementById("DivCreate");   
    var y = document.getElementById("scelte");
    var z = document.getElementById("DivDelete");
    var j = document.getElementById("DivUpload");
    var k = document.getElementById("DivSearch");
    z.style.display = "block";
    y.style.display = "none";
    k.style.display = "none";
    j.style.display = "none";
    x.style.display = "none";          
  }
  function showSearch() {
    var x = document.getElementById("DivCreate");   
    var y = document.getElementById("scelte");
    var z = document.getElementById("DivDelete");
    var j = document.getElementById("DivUpload");
    var k = document.getElementById("DivSearch");
    z.style.display = "none";
    y.style.display = "none";
    k.style.display = "block";
    j.style.display = "none";
    x.style.display = "none";          
  }
  function showUpload() {
    var x = document.getElementById("DivCreate");   
    var y = document.getElementById("scelte");
    var z = document.getElementById("DivDelete");
    var j = document.getElementById("DivUpload");
    var k = document.getElementById("DivSearch");
    z.style.display = "none";
    y.style.display = "none";
    k.style.display = "none";
    j.style.display = "block";
    x.style.display = "none";          
  }
  function showMenu() {
    var x = document.getElementById("DivCreate");   
    var y = document.getElementById("scelte");
    var z = document.getElementById("DivDelete");
    var j = document.getElementById("DivUpload");
    var k = document.getElementById("DivSearch");
    z.style.display = "none";
    y.style.display = "block";
    k.style.display = "none";
    j.style.display = "none";
    x.style.display = "none";          
  }


