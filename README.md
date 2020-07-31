# Recuperação de senha

**RF - (Requisitos funcionais)**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF - (Requisitos não funcionais)**

- Utilizar Mailtrap para envio de email em ambiente de desenvolvimento;
- Utilizar o Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN - (Regra de negócios)**

- O link enviado para o email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;


# Atualização de perfil

**RN - (Regra de negócios)**

- O usuário deve poder atualizar o seu nome, email, senha;

**RN - (Regra de negócios)**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisar confirmar a nova senha;

# Painel do prestador

**RN - (Regra de negócios)**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as suas notificações não lidas;

**RNF - (Requisitos não funcionais)**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN - (Regra de negócios)**

- A notificação deve ter um status de lida ou não lida para que o pretador possa controlar;

# Agendamento de serviços

**RN - (Regra de negócios)**

- O usuário deve poder listar todos prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia epecífico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF - (Requisitos não funcionais)**

- A listagem de prestadores deve ser armazenada em cache;

**RN - (Regra de negócios)**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18 (Primeiro às 8h, último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;
