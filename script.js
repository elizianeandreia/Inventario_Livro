document.addEventListener("DOMContentLoaded", function () {

    function formatarData(dataISO) {
        const partes = dataISO.split("-");
        return `${partes[2]}/${partes[1]}/${partes[0]}`; 
    }

    function carregarTabela() {
        var livros = JSON.parse(localStorage.getItem("livros") || "[]");
        var tabela = document.querySelector("table tbody");
        tabela.innerHTML = ""; 
        livros.forEach(function (livro) {
            var novaLinha = document.createElement("tr");
            novaLinha.innerHTML = `
                <td>${livro.id}</td>
                <td>${livro.titulo}</td>
                <td>${livro.autor}</td>
                <td>${livro.data}</td>
                <td>${livro.genero}</td>
                <td>
                    <button class="editar">Editar</button>
                    <button class="excluir">Excluir</button>
                </td>
            `;
            tabela.appendChild(novaLinha);
        });
    }

   
    function adicionarLivro() {
        var titulo = document.getElementById("titulo").value;
        var autor = document.getElementById("autor").value;
        var data = document.getElementById("data").value;
        var genero = document.getElementById("genero").value;
        var tabela = document.querySelector("table tbody");
    
        if (titulo && autor && data && genero) {
            var novaLinha = document.createElement("tr");
            novaLinha.innerHTML = `
                <td>${tabela.children.length + 1}</td>
                <td>${titulo}</td>
                <td>${autor}</td>
                <td>${data}</td>
                <td>${genero}</td>
                <td>
                    <button class="editar">Editar</button>
                    <button class="excluir">Excluir</button>
                </td>
            `;
            tabela.appendChild(novaLinha);
    
          
            document.getElementById("titulo").value = "";
            document.getElementById("autor").value = "";
            document.getElementById("data").value = "";
            document.getElementById("genero").value = "";
    
            salvarTabela(); 
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    }

  
    function editarLivro(evento) {
        if (evento.target.classList.contains("editar")) {
            var linha = evento.target.closest("tr");
            if (!linha) return;
            var colunas = linha.querySelectorAll("td");
            var novoTitulo = prompt("Novo título:", colunas[1].textContent || "");
            var novoAutor = prompt("Novo autor:", colunas[2].textContent || "");
            if (novoTitulo) colunas[1].textContent = novoTitulo;
            if (novoAutor) colunas[2].textContent = novoAutor;
            salvarTabela(); 
        }
    }

    
    function excluirLivro(evento) {
        if (evento.target.classList.contains("excluir")) {
            var linha = evento.target.closest("tr");
            if (linha) {
                linha.remove();
                salvarTabela();  
            }
        }
    }

   
    function salvarTabela() {
        var tabela = document.querySelector("table tbody");
        var livros = [];
        tabela.querySelectorAll("tr").forEach(function (linha) {
            var colunas = linha.querySelectorAll("td");
            var livro = {
                id: parseInt(colunas[0].textContent || "0"),
                titulo: colunas[1].textContent || "",
                autor: colunas[2].textContent || ""
            };
            livros.push(livro);
        });
        localStorage.setItem("livros", JSON.stringify(livros));
    }

    
    document.getElementById("adicionar").addEventListener("click", adicionarLivro);
    document.querySelector("table tbody").addEventListener("click", function(evento) {
        editarLivro(evento);  
        excluirLivro(evento);
    });


    carregarTabela();
});

document.getElementById("limparStorage").addEventListener("click", function () {
    if (confirm("Tem certeza que deseja apagar todos os livros do inventário?")) {
        localStorage.removeItem("livros");

    
        const tabela = document.querySelector("table tbody");
        tabela.innerHTML = "";

        alert("Inventário apagado com sucesso!");
    }
});



