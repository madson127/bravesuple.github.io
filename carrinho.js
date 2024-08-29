let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function atualizarCarrinho() {
    const carrinhoDiv = document.getElementById('carrinho');
    carrinhoDiv.innerHTML = '';

    if (carrinho.length === 0) {
        carrinhoDiv.innerHTML = '<p class="text-center">Carrinho vazio</p>';
    } else {
        const lista = document.createElement('ul');
        lista.className = 'list-group';
        carrinho.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.innerHTML = `
                ${item.produto} (R$${item.preco}) - Quantidade: ${item.quantidade}
                <button class="btn btn-danger btn-sm" onclick="removerDoCarrinho('${item.produto}')">Remover</button>
            `;
            lista.appendChild(listItem);
        });
        carrinhoDiv.appendChild(lista);
    }
}

function removerDoCarrinho(produto) {
    carrinho = carrinho.filter(item => item.produto !== produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}

function finalizarPedido() {
    if (carrinho.length === 0) {
        alert('O carrinho está vazio!');
        return;
    }

    let mensagem = 'Pedido:\n\n';
    let total = 0;

    carrinho.forEach(item => {
        mensagem += `${item.produto} - Quantidade: ${item.quantidade} - Preço: R$${item.preco * item.quantidade}\n`;
        total += item.preco * item.quantidade;
    });

    mensagem += `\nTotal: R$${total.toFixed(2)}`;

    const numeroWhatsApp = '+5591993888890';
    const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensagem)}`;
    window.open(url);
}

// Atualiza o carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', atualizarCarrinho);