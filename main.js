(function () {
    const $ = q => document.querySelector(q);

    function convert(mil){
        var min = Math.floor(mil / 60000);
        var sec = Math.floor((mil % 60000) / 1000);
        return `${min}m e ${sec}s`;
    }

    function atualizarGaragem(){
         const garagem = getGaragem();
         $("#garagem").innerHTML = "";
         garagem.forEach(c => addCarToGaragem(c))
    }


    function addCarToGaragem (car){
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${car.veiculo}</td>
        <td>${car.placa}</td>
        <td data-time=${car.time} >${new Date(car.time).toLocaleString("pt-BR", {
                hour: 'numeric', minute: 'numeric'
        })}
        </td>
        <td>
            <button class="delete">Excluir</button>
        </td>
        `;
        $("#garagem").appendChild(row);
    };

    function checkOut(info){
        let periodo = new Date() - new Date(info[2].dataset.time);
        periodo = convert(periodo);
        const Placa = info[1].textContent;
        const msg = `O veiculo ${info[0].textContent} de Placa ${Placa} permaneceu estacionado por ${periodo}  \n\n .
        Deseja Encerrar?`


        if(!confirm(msg)) return;
        
        const garagem = getGaragem().filter(c => c.Placa !== Placa);
        localStorage.garagem = JSON.stringify(garagem);

        atualizarGaragem();

    }

    const getGaragem = () => {
        return localStorage.garagem ? JSON.parse(localStorage.garagem) : []
    }

    atualizarGaragem();
    $("#send").addEventListener("click", e => {
        const veiculo = $("#txtVeiculo").value;
        const placa = $("#txtPlaca").value;
        if(!veiculo || !placa){
            alert("Os Campos são Obrigatórios!");
            return;
        }


        const card  = {veiculo, placa, time: new Date()}
        const garagem = getGaragem();

            garagem.push(card);


    localStorage.garagem = JSON.stringify(garagem)
    
    addCarToGaragem(card);
    $("#txtVeiculo").value = "";
    $("#txtPlaca").value = "";   
    });

    $("#garagem").addEventListener("click", (e) => {
        if(e.target.className === "delete")
            checkOut(e.target.parentElement.parentElement.cells);
            

    });

})()