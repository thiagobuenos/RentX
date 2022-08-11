# Cadastro de Carro

**RF**
Deve ser possivel cadastrar um novo carro

**RN**
Não deve ser possivel cadastrar um carro com uma placa ja existente
Não deve ser possivel alterar a placa de um carro ja cadastrado
O carro deve ser cadastrado com disponibilidade por padrao true
Somente Admin pode fazer cadastro de carro

# Listagem de Carros

**RF**
Deve ser possivel listar todos os carros disponiveis
Deve ser possivel listar todos os carros pelo nome da categoria
Deve ser possivel listar todos os carros pelo nome da marca
Deve ser possivel listar todos os carros pelo nome do modelo do carro

**RN**
O usuario nao precisa estar logado no sistema

# Cadastro de especificacao no carro

**RF**
Deve ser possivel cadastrar uma especificacao para um carro
Deve ser possivel listar todas as especificacoes
Deve ser possivel listar todos os carros

**RN**
Nao deve ser cadastrar uma especificacao para um carro nao cadastrado
Nao deve ser possivel cadastrar uma especificacao mais de uma vez para o mesmo carro
Somente Admin pode fazer cadastro de especificacao

# Cadastro de imagens do carro

**RF**
Deve ser possivel cadastrar a imagem do carro
Deve ser possivel listar todos os carros

**RNF**
Utilizar o multer para o upload dos arquivos

**RN**
O usuario deve poder cadastrar mais de uma imagem para o mesmo carro
Somente Admin pode fazer cadastro de imagens

# Aluguel de carro

**RF**
Deve ser possivel cadastrar um aluguel

**RN**
O aluguel deve ter duracao minima de 24h
Nao deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo aluguel 