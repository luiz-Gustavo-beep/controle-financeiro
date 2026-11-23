
const botaoAdicionar = document.getElementById("btnAdicionar");
const nomeGasto = document.getElementById("nomeGasto");
const valorGasto = document.getElementById("valorGasto");
const listaGastos = document.getElementById("listaGastos");
const totalGastosElemento = document.getElementById("totalGastos");

// Recupera os gastos salvos
let gastos = JSON.parse(localStorage.getItem("gastos")) || [];

// Salva os gastos no navegador
function salvarGastos() {
    localStorage.setItem("gastos", JSON.stringify(gastos));
}

// Atualiza a lista e o total
function atualizarLista() {
    listaGastos.innerHTML = "";

    let totalGastos = 0;

    gastos.forEach(function(gasto, indice) {
        const novoGasto = document.createElement("li");

        novoGasto.textContent = `${gasto.nome}: R$ ${gasto.valor.toFixed(2)} `;

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";

        botaoEditar.addEventListener("click", function() {
            editarGasto(indice);
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";

        botaoExcluir.addEventListener("click", function() {
            excluirGasto(indice);
        });

        novoGasto.appendChild(botaoEditar);
        novoGasto.appendChild(botaoExcluir);
        listaGastos.appendChild(novoGasto);

        totalGastos += gasto.valor;
    });

    totalGastosElemento.textContent = totalGastos.toFixed(2).replace(".", ",");
}

// Adiciona um novo gasto
botaoAdicionar.addEventListener("click", function() {
    const nome = nomeGasto.value.trim();
    const valor = Number(valorGasto.value);

    if (nome === "" || !Number.isFinite(valor) || valor <= 0) {
        alert("Preencha o nome e um valor válido!");
        return;
    }

    gastos.push({
    nome: nome,
    valor: valor,
    data: new Date().toISOString()
    });

    salvarGastos();
    atualizarLista();

    nomeGasto.value = "";
    valorGasto.value = "";
});

// Edita um gasto existente
function editarGasto(indice) {
    const gasto = gastos[indice];

    const novoNome = prompt("Novo nome do gasto:", gasto.nome);

    if (novoNome === null) {
        return;
    }

    const nome = novoNome.trim();

    if (nome === "") {
        alert("O nome não pode ficar vazio!");
        return;
    }

    const novoValor = prompt("Novo valor do gasto:", gasto.valor);

    if (novoValor === null) {
        return;
    }

    const valor = Number(novoValor.replace(",", "."));

    if (!Number.isFinite(valor) || valor <= 0) {
        alert("Digite um valor válido!");
        return;
    }

    gastos[indice] = {
        nome: nome,
        valor: valor
    };

    salvarGastos();
    atualizarLista();
}

// Exclui um gasto
function excluirGasto(indice) {
    gastos.splice(indice, 1);

    salvarGastos();
    atualizarLista();
}

// Exibe os gastos ao abrir a página
atualizarLista();

