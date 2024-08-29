let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function alterarQuantidade(id, incremento) {
    const quantidadeInput = document.getElementById(id);
    let quantidade = parseInt(quantidadeInput.value);
    quantidade = Math.max(1, quantidade + incremento); // Garante que a quantidade não seja menor que 1
    quantidadeInput.value = quantidade;
}

function adicionarAoCarrinho(produto, preco, quantidade) {
    const itemExistente = carrinho.find(item => item.produto === produto);
    if (itemExistente) {
        itemExistente.quantidade += parseInt(quantidade);
    } else {
        carrinho.push({ produto, preco, quantidade: parseInt(quantidade) });
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinhoCount();
}

function atualizarCarrinhoCount() {
    const carrinhoCount = carrinho.reduce((total, item) => total + item.quantidade, 0);
    document.getElementById('cart-count').innerText = carrinhoCount;
}

// Atualiza o contagem do carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', atualizarCarrinhoCount);

// Atualiza a classe do body ao rolar a página
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
});
// Função para verificar a rolagem da página e alterar a opacidade do cabeçalho e da imagem de fundo
window.addEventListener('scroll', function() {
    const header = document.querySelector('.bg-header');
    const headerOverlay = document.querySelector('.bg-header::before');

    if (window.scrollY > 50) {
        header.classList.add('transparent'); // Reduz a opacidade do cabeçalho
    } else {
        header.classList.remove('transparent'); // Restaura a opacidade do cabeçalho
    }
});