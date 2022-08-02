class Alunos{
  constructor(){
      this.id = 1;
      
      this.arrayAlunos = [];
      this.editId = null;
  }
  //ler o preenchimento do formulario e salva
  salvar(){
      let alunos = this.lerForm();   
    
      if(this.campoValido(alunos)){
          if(this.editId == null){
            this.adicionar(alunos);
          }else{
            this.atualizar(this.editId, alunos);
          }
      }
      this.listaEscolar();
      this.cancelar();
  }
  recuperacao(){
    let alunos = this.lerForm(); 
      if(this.campoValido(alunos)){
        this.lancar(this.editId, alunos);
    }
    
    this.listaEscolar();
    this.cancelar();
  }

  listaEscolar(){
    let tbody = document.getElementById("tbody");
    tbody.innerText = "";
      for(let i = 0; i < this.arrayAlunos.length; i++){
        let tr = tbody.insertRow();

        //adiciona as linhas
        let td_id = tr.insertCell();
        let td_aluno = tr.insertCell();
        let td_prinota = tr.insertCell ();
        let td_segnota = tr.insertCell();
        let td_aprovado = tr.insertCell();
        let td_recuperacao = tr.insertCell();
        let td_notafinal = tr.insertCell();
        let td_acoes = tr.insertCell();

        //preenchimento dos arrays
        td_id.innerText = this.arrayAlunos[i].id;
        td_aluno.innerText = this.arrayAlunos[i].nomeAluno;
        td_prinota.innerText = this.arrayAlunos[i].priNota;
        td_segnota.innerText = this.arrayAlunos[i].segNota;
        td_aprovado.innerText = this.arrayAlunos[i].Aprovado;
        td_recuperacao.innerText = this.arrayAlunos[i].Recuperacao;
        td_notafinal.innerText = this.arrayAlunos[i].NotaFinal;
        //td_acoes.innerText = this.arrayAlunos[i].Acoes;

        //alinhamento do conteudo da tabela
        td_id.classList.add("center");
        td_prinota.classList.add("center");
        td_segnota.classList.add("center");
        td_aprovado.classList.add("center");
        td_recuperacao.classList.add("center");
        td_notafinal.classList.add("center");
        td_acoes.classList.add("center");

        //icone edit + func botao
        let imgEdit = document.createElement("img");
        imgEdit.src = "edit.png";
        imgEdit.setAttribute("onclick", "alunos.lobbydeEdicao("+ JSON.stringify(this.arrayAlunos[i]) +")");

        let imgRec = document.createElement("img");
        imgRec.src = "Rec.png";
        //***********************teste**************************
        imgRec.setAttribute("onclick", "alunos.menuRecuperacao("+ JSON.stringify(this.arrayAlunos[i]) +")");
                
        //icone excluir + func botao
        let imgDelete = document.createElement("img");
        imgDelete.src = "delete.png";
        imgDelete.setAttribute("onclick", "alunos.apagar("+ this.arrayAlunos[i].id +")");

        //a imagem vira um galho na arvore => acoes
        td_acoes.appendChild(imgEdit);
        td_acoes.appendChild(imgRec);
        td_acoes.appendChild(imgDelete);
         
      }
  }

  adicionar(alunos){
    this.arrayAlunos.push(alunos);
    this.id++;
  }
  atualizar(id, alunos){
    for (let i = 0; i < this.arrayAlunos.length; i++){
      if(this.arrayAlunos[i].id == id){
        this.arrayAlunos[i].nomeAluno = alunos.nomeAluno;
        this.arrayAlunos[i].priNota = alunos.priNota;
        this.arrayAlunos[i].segNota = alunos.segNota;
    let mediaEdit = (1 *alunos.priNota + 1* alunos.segNota)/2
      if (mediaEdit >= 7){
        this.arrayAlunos[i].Aprovado = ("Aprovado | "+ mediaEdit+" | pts");
        }else{
        this.arrayAlunos[i].Aprovado = ("Recuperação | "+ mediaEdit+" | pts");
        }
      } 
    }
  }
  //************************

lancar(id, alunos){
  
    for (let i = 0; i < this.arrayAlunos.length; i++){
     
      if(this.arrayAlunos[i].id == id){
        this.arrayAlunos[i].nomeAluno = alunos.nomeAluno;
        this.arrayAlunos[i].Recuperacao = alunos.segNota;
        
    let mediaFinal = (1 *alunos.priNota + 1* alunos.segNota)/2
      if (mediaFinal >= 7){
        this.arrayAlunos[i].NotaFinal = ("Aprovado | "+ mediaFinal+" | pts");
        }else{
        this.arrayAlunos[i].NotaFinal = ("Reprovado | "+ mediaFinal+" | pts");
        }
      } 
    }
  }
  
  //************************
  lobbydeEdicao(dados){
    this.editId = dados.id;
    
    document.getElementById("alunos").value = dados.nomeAluno;
    document.getElementById("priNota").value = dados.priNota;
    document.getElementById("segNota").value = dados.segNota;

    document.getElementById("btn1").innerText = "Atualizar";
  }
  
  menuRecuperacao(uti){
    this.editId = uti.id;
    
    document.getElementById("alunos").value = uti.nomeAluno;
    document.getElementById("priNota").value = (1* uti.priNota + 1*uti.segNota)/2;
    document.getElementById("segNota").value = uti.null;

    document.getElementById("medAtual").innerText = "Media atual";
    document.getElementById("recp").innerText = "Nota da Recuperação";
    document.getElementById("btn3").removeAttribute("hidden");
    document.getElementById("btn1").setAttribute("hidden", "true");

   }
  
  lerForm(){
      let alunos = {}
      
      alunos.id = this.id;
      alunos.nomeAluno = document.getElementById('alunos').value;
      alunos.priNota = document.getElementById('priNota').value;
      alunos.segNota = document.getElementById('segNota').value;
          var somatoria = (1 * alunos.priNota)+(1 * alunos.segNota);
          var media = (somatoria/2);
            if (media>=7){
            alunos.Aprovado = "Aprovado | " + media +" | pts";
          } else{
            alunos.Aprovado = "Recuperação | " + media +" | pts";
          }

    return alunos;
  }

  campoValido(alunos){

      let msg = "";
    
      if(alunos.nomeAluno == ""){
        msg += "- Informe o nome do aluno \n";
      }
      if(alunos.priNota == ""){
        msg += "- Informe o valor da primeira nota \n";
      }
      if(alunos.segNota == ""){
        msg += "- Informe o valor da segunda nota \n";
      }
      if(msg != ""){
        alert(msg);
        return false
      }
        return true;
  }
  
  cancelar(){
      document.getElementById("alunos").value = "";
      document.getElementById("priNota").value = "";
      document.getElementById("segNota").value = "";

      document.getElementById("medAtual").innerText = "primeira nota";
      document.getElementById("recp").innerText = "segunda nota";
      document.getElementById("btn1").removeAttribute("hidden");
      document.getElementById("btn1").innerText = "Salvar";
      document.getElementById("btn3").setAttribute("hidden","false");
      
      this.editId = null;
  }
  apagar(id){
    if(confirm("Deseja realmente excluir este aluno(a)? "+ id)){
    
    let tbody = document.getElementById("tbody");
     
   for(let i = 0; i < this.arrayAlunos.length; i++){//laço for para verificar o array
     if(this.arrayAlunos[i].id == id){//if para verificar se o id do delete é igual o selec
        this.arrayAlunos.splice(i, 1);//função de deletar
        tbody.deleteRow(i);
       }
     }
   }
  }
}

var alunos = new Alunos();
