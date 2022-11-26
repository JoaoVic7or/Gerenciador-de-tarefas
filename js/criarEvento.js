itens.forEach(elemento => {    
       criarEvento(elemento);
});

function criarEvento(item){
    const event_box = document.createElement('div');
    event_box.classList.add("item")
    event_box.dataset.id = item.id

    const style_event_box = {
        width: "80vw",
        maxWidth: "900px",
        minHeight: "70px",
        height: "70px",
        background: "#FFFFFF",
        marginTop: "10px",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    };
    Object.assign(event_box.style, style_event_box);

    const conteudo_box = document.createElement('section');
    conteudo_box.classList.add("item")
    const style_conteudo_box = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100vw",
        overflowY: "hidden",
        padding: "0 10px"
    }
    Object.assign(conteudo_box.style, style_conteudo_box);

    //Data
    const data_text = document.createElement('label');
    const style_data_text ={ 
        width: "30px",
    }
    Object.assign(data_text.style, style_data_text)

    const ano = item.data.slice(0,4)
    const mes = item.data.slice(5,7)
    const dia = item.data.slice(8,10)
    const data_converted = dia + '/' + mes + '/' + ano
    data_text.innerHTML = data_converted;
    
    conteudo_box.appendChild(data_text);
     
    //Evento
    const texto_box = document.createElement('label');
    texto_box.innerHTML = item.evento;    
    conteudo_box.appendChild(texto_box);

    //Div calendario e botão
    const div = document.createElement('div')

    //Botão adicionar ao calendário
    const calendario = document.createElement('img');
    calendario.src = "/assets/calendar.svg"

    const descricao = document.getElementById('descricao').value
    const config = {
        name: item.evento,
        description: descricao,
        startDate: item.data,
        endDate: item.data,
        options: ["Google", "Apple", "Yahoo", "Outlook.com"],
        timeZone: "America/Sao_Paulo",
        trigger: "click",
        iCalFileName: "Reminder-Event",
    }
    const style_calendario = {
        width: "20px",
        cursor: "pointer",
    }
    Object.assign(calendario.style, style_calendario)
    calendario.addEventListener('click', ()=> atcb_action(config, calendario));
    div.appendChild(calendario)


    //Botão deletar
    const deletar = document.createElement('img')
    deletar.src = "/assets/deletar.svg"
    const style_deletar = {
        width: "20px",
        cursor: "pointer",
    }
    Object.assign(deletar.style, style_deletar)

    deletar.addEventListener("click", function(id) {
        removerEvento(this.parentNode.parentNode.parentNode, item.id)
    })
    div.appendChild(deletar)

    event_box.appendChild(conteudo_box)
    conteudo_box.appendChild(div)
    conteudo.appendChild(event_box);

    conteudo.scrollTop = conteudo.scrollHeight;
}

function removerEvento(tag, id){
    tag.remove()
    
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)
    localStorage.setItem("itens", JSON.stringify(itens))
    $(document).ready( function(){
        toastr.info("Evento removido com sucesso");
    } );
}