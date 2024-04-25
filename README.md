# DÉPOSITO DE BEBIDAS 🍺
Esse aplicativo foi desenvolvido com o objetivo de gerenciar o estoque de um depósito de bebidas, onde eu consigo fazer o controle de: listagem, entrada, atualização e deleção dos produtos. O projeto foi desenvolvido usando a linguagem JavaScript e como FrameWork usei o Angular: [Angular CLI](https://github.com/angular/angular-cli) version 15.1.3.

## CLONANDO O REPÓSITÓRIO 📥 
Coloque o este comando no terminal do projeto usando o "VISUAL STUDIO CODE": git clone https://github.com/talitassousa/app_mvp_secondSprint.git

## COMANDO PARA RODAR O SERVIDOR 📜
`ng serve` para o projeto rodar. Clicar neste link para ver o projeto rodando no browser `http://localhost:4200/`.

## DESCRIÇÃO 📜
O principal objetivo ao criar esse projeto, é que ele realmente pudesse ser usado na vida real. Foram feitas entradas onde coloco o nome, recipiente (em litros), quantidade e valor do produto. Tive o cuidado de não permitir que NOME e RECIPIENTE pudessem ser adicionados duas vezes com o mesmo "valor", pois posso ter duas coca-colas porém uma pode ser de 2L e a outra de 0.6L e são produtos diferentes. Adicionei a funcionalidade de adicionar um fornecedor, para que eu possa ter um controle de quais e de onde são os meus fornecedores. Coloquei alguns "Toast" para que as ações feitas durante o uso do aplicativo ficasse clara ao usuário.

## FUNCIONALIDADES ⚙️
- Cadastrar Produto: Permite o cadastro de novos produtos com informações como nome, recipiente, quantidade e valor.
- Listar Produtos: Exibe uma lista de todos os produtos cadastrados.
- Buscar Produto: Permite ao usuário filtrar a lista de produtos com base no nome.
- Editar Produto: Realiza a edição de procutos já cadastrados na base.
- Deletar Produto: Permite a deleção de um produto já cadastrado na base.
- Adicionar Fornecedor: Permite o cadastro de um novo fornecedor onde pego dados como nome, CNPJ, CEP(localidae e UF).
- Listar Fornecedores: No momento de cadastrar um novo produto consigo fazer uma busca dos meus fornecedores cadastrados.
- Mensagens de Alerta: Exibe mensagens de alerta para o usuário com base nas ações realizadas no sistema.

## CAPTURA DA TELA 🖼️
![Captura de tela 2023-12-01 160253](https://github.com/talitassousa/app_mvp_firstSprint/assets/86735363/f6dfd45f-17a1-4040-a87c-e29303b780a2)
