const conteudo = document.createElement('div');
const style_conteudo ={
    width: "90vw",
    maxWidth: "940px",
    minHeight: "100px",
    height: "60vh",
    background: "rgba(0, 0, 255, 0.562)",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    overflowY: "scroll",
    padding: "20px 0",
    zIndex: "3",
    boxShadow: "0px 0px 10px #FFFFFF",
    marginBottom: "10px",
};
Object.assign(conteudo.style, style_conteudo);
document.body.appendChild(conteudo);

const form = document.querySelector('.container__form');
const itens = JSON.parse(localStorage.getItem("itens")) || [] 
const data = document.getElementById('data')
const descricao = document.getElementById('descricao')

form.addEventListener("submit", (formulario)=>{
    formulario.preventDefault();
    const evento = formulario.target.elements['evento'];

    if(evento.value === "" || data.value === ""){
        $(document).ready( function(){
            toastr.error("Não é possível adicionar um evento vazio sem data e nome");
        } );
    }else{
        const itemAtributos = {
            "data": data.value,
            "evento": evento.value,
            "descricao": descricao.value,
        }
    
        itemAtributos.id = itens.length
        
        criarEvento(itemAtributos);
    
        itens.push(itemAtributos)
        localStorage.setItem("itens", JSON.stringify(itens));
    
        data.value = ""
        evento.value = ""
        $(document).ready( function(){
            toastr.success("Evento adicionado com sucesso");
        } );
    }
})

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": false,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }