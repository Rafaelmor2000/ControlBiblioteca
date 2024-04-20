
document.getElementById('planta').addEventListener("change", getEdificios)
            function getEdificios(){
                let id = document.getElementById('planta').value
                alert("selección de id " + id)
            }