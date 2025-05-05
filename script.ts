document.addEventListener("DOMContentLoaded", () => {
    const tabela = document.querySelector("table tbody");
  
    tabela?.addEventListener("click", (evento) => {
      const alvo = evento.target as HTMLElement;
  
      if (alvo.classList.contains("excluir")) {
        const linha = alvo.closest("tr");
        if (linha) linha.remove();
      }
  
      if (alvo.classList.contains("editar")) {
        const linha = alvo.closest("tr");
        if (!linha) return;
  
        const colunas = linha.querySelectorAll("td");
  
        const novoTitulo = prompt("Novo título:", colunas[1].textContent || "");
        const novoAutor = prompt("Novo autor:", colunas[2].textContent || "");
  
        if (novoTitulo) colunas[1].textContent = novoTitulo;
        if (novoAutor) colunas[2].textContent = novoAutor;
      }
    });
  });
  