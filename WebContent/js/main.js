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
    