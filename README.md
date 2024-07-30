# API SOLID

Este projeto é uma API desenvolvida com os princípios SOLID em mente, utilizando TypeScript e outras tecnologias modernas.

## Descrição

O objetivo deste projeto é fornecer uma estrutura de API robusta e escalável, seguindo os princípios de design SOLID para garantir um código limpo, fácil de manter e extensível. A API é configurada para funcionar com Docker e inclui um setup inicial com Prisma para gerenciamento de banco de dados.

## Funcionalidades

- **CRUD de Usuários**: Criação, leitura, atualização e exclusão de usuários.
- **Autenticação e Autorização**: Implementação de JWT para autenticação segura.
- **Validação de Dados**: Uso de bibliotecas para validação e sanitização de entradas.
- **Configuração de Banco de Dados**: Configurado com Prisma para fácil manipulação de dados.
- **Testes Unitários**: Implementados com Vitest para garantir a qualidade do código.
- **Linting e Formatação**: Configurados com ESLint e Prettier para manter a consistência do código.

## Estrutura do Projeto

- **src/**: Código fonte principal da API.
- **prisma/**: Configurações e esquemas do Prisma.
- **tests/**: Testes unitários utilizando Vitest.
- **.github/**: Workflows para CI/CD.
- **.env.example**: Arquivo de exemplo para variáveis de ambiente.
- **docker-compose.yml**: Configuração do Docker Compose.

## Tecnologias Utilizadas

- **TypeScript**: Linguagem de programação usada no desenvolvimento.
- **Prisma**: ORM para interações com o banco de dados.
- **Docker**: Para containerização da aplicação.
- **ESLint**: Para linting do código.
- **Vite**: Ferramenta de build.
- **Vitest**: Framework de testes unitários.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/Glendson/api-solid.git
   ```
2. Instale as dependências:
   ```bash
   cd api-solid
   npm install
   ```
3. Configure as variáveis de ambiente:

   - Crie um arquivo `.env` baseado no `.env.example` e preencha com as suas configurações.

4. Inicie a aplicação com Docker:
   ```bash
   docker-compose up
   ```

## Uso

Após a instalação e configuração, a API estará disponível na porta definida no arquivo `.env`. Você pode começar a fazer requisições HTTP para os endpoints definidos no código fonte.

## Testes

Para rodar os testes unitários, use o comando:

````bash
````npm run test


## Uso

Após a instalação e configuração, a API estará disponível na porta definida no arquivo `.env`. Você pode começar a fazer requisições HTTP para os endpoints definidos no código fonte.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests. Para contribuir, siga os passos:

1. Fork este repositório.
2. Crie uma branch com a sua feature:
    ```bash
    git checkout -b minha-feature
    ```
3. Faça commit das suas mudanças:
    ```bash
    git commit -m 'Minha nova feature'
    ```
4. Envie para o branch principal:
    ```bash
    git push origin minha-feature
    ```
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
````
