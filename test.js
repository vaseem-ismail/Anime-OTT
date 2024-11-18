fetch('http://localhost:8000/getUsers')
.then(response => response.json())
.then(x => console.log(x))    
.catch(error => console.error('Error:', error));