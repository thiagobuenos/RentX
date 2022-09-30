# Cadastro de Carro

**RF**
Deve ser possivel cadastrar um novo carro

**RN**
- Não deve ser possivel cadastrar um carro com uma placa ja existente
- O carro deve ser cadastrado com disponibilidade por padrao true
- *Somente Admin pode fazer cadastro de carro

# Listagem de Carros

**RF**
- Deve ser possivel listar todos os carros disponiveis
- Deve ser possivel listar todos os carros pelo nome da categoria
- Deve ser possivel listar todos os carros pelo nome da marca
- Deve ser possivel listar todos os carros pelo nome do modelo do carro

**RN**
- O usuario nao precisa estar logado no sistema

# Cadastro de especificacao no carro

**RF**
- Deve ser possivel cadastrar uma especificacao para um carro
- Deve ser possivel listar todas as especificacoes
- Deve ser possivel listar todos os carros

**RN**
- Nao deve ser cadastrar uma especificacao para um carro nao cadastrado
- Nao deve ser possivel cadastrar uma especificacao mais de uma vez para o mesmo carro
- Somente Admin pode fazer cadastro de especificacao

# Cadastro de imagens do carro

**RF**
- Deve ser possivel cadastrar a imagem do carro
- Deve ser possivel listar todos os carros

**RNF**
- Utilizar o multer para o upload dos arquivos

**RN**
- O usuario deve poder cadastrar mais de uma imagem para o mesmo carro
Somente Admin pode fazer cadastro de imagens

# Aluguel de carro

**RF**
- Deve ser possivel cadastrar um aluguel

**RN**
- O aluguel deve ter duracao minima de 24h
- Nao deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo aluguel 
- Ao realizar um aluguel o carro deve ficar indisponivel

# Devolução de carro

**RF**
- Deve ser possivel devolver um carro

**RN**

- Se o carro for devolvido com menos de 24 hrs, deverá ser cobrado diária completa
- Ao realizar devoulução, o carro deverá ser liberado para outro aluguel
- Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel
- Ao realizar a devolução deverá ser alculado o tota do aluguel
- Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso
- Caso haja multa deverá ser somado ao total do aluguel

# Listagem de alugueis para o usuário

**RF**
Deve ser possivel realizar a busca de todos os alugueis para o usuário

**RN**
O usuário deve estar logado na aplicação

# Recuperar senha

**RF**
- Deve ser possível o usuário recuperar a senha informando o e-mail
- O usuário deve receber um e-mail com o passo a passo para a recuperação da senha
- O usuário deve conseguir inserir uma nova senha

**RN**

- O usuário precisa informar uma nova senha
- O link enviado para a recuperação deve expirar em 3 horas