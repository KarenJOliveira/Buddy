# Cheat Sheet

Guia rápido dos principais comandos que usamos para lidar com banco de dados.

## PostgreSQL

O PostgreSQL é o nosso SGBD (Sistema Gerenciador de Banco de Dados). Isso significa que o banco de dados que utilizamos é, na verdade, uma instância do PostgreSQL.

Para acessar o banco precisamos primeiro ligá-lo, não existe uma interface gráfica para isso, usamos linha de comando.

```bash
sudo systemctl start postgresql
```

> Liga o processo em background.  
> Este é o comando que usamos sempre antes de iniciar o servidor de desenvolvimento com `pnpm dev`.

```bash
sudo systemctl restart postgresql
```

> Reinicia o processo para aplicar mudanças na instalação do banco como extensões.  
> Não precisa ser usado após alterar o modelo de banco de dados.  
> Pode ser substituído por reiniciar o computador.

```bash
sudo systemctl status postgresql
```

> Verifica o estado do processo.

```bash
sudo systemctl enable postgresql
```

> Habilita que o postgres ligue sempre com o computador.

O TablePlus não liga o processo do banco, apenas age como um cliente, ou seja, como se fosse um site que envia requisições ao banco.

## Prisma

Prisma é uma biblioteca instalada **no projeto** via gerenciador de pacotes — no caso, o pnpm. Ele é um ORM (Object Relational Mapping), ferramentas que facilitam a interação com bancos de dados. Com elas, manipulamos os dados armazenados no banco de dados por meio de objetos e métodos, em vez de escrever consultas SQL diretamente.

```bash
pnpm add prisma @types/node @types/pg --save-dev
pnpm add @prisma/client @prisma/adapter-pg pg dotenv
```

> Adiciona o Prisma ao projeto.  
> As dependências adicionadas ficam no arquivo `package.json` na raiz do projeto.  
> Só precisa ser usado uma vez na criação do projeto.

```bash
pnpm dlx prisma init
```

> Cria a pasta `prisma`.  
> Cria dentro dela o arquivo `schema.prisma` onde fica o modelo de dados.  
> Cria o arquivo `.env` na raiz do projeto onde fica a URL de conexão.  
> Só precisa ser usado uma vez por máquina.

```bash
pnpm prisma generate
```

> Gera o banco.  
> Configura apenas os parâmetros do banco para conexão, como: porta, nome, senha.  
> Só precisa ser usado uma vez por máquina.

```bash
pnpm prisma migrate dev
```

> Gera as tabelas a partir do código em `schema.prisma`.  
> Deleta dados salvos no banco.  
> Precisa ser usado sempre que houver mudanças em `schema.prisma`.

## URL de conexão

Essa string contém os dados para conectar-se à instância do banco de dados. Usando uma interface gráfica precisamos informar cada um deles ao criar a conexão. Em projetos as informações ficam no arquivo `.env`.

> Este arquivo não deve ser incluído no controle de versão

O PostgreSQL usa por padrão:

```
postgresql:postgres:randompassword@localhost:5432/postgres?schema=public
```

No exemplo usamos:

```
postgresql:postgres:randompassword@localhost:5432/shopping_list?schema=public
```

De forma genérica:

```
protocolo:nome_de_usuário_do_banco:senha_do_banco@host:porta/nome_do_banco
```

> As informações após o `?` são opcionais
