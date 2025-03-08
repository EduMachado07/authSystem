## Pastas
### Frontend

### Backend
- (src): contém todas as pastas do projeto;
    - (config): configuações globais. como conexão com o banco de dados e variáveis de ambiente;
    - (controllers): recebem as requisições HTTP e chamam os serviçoes;
    - (middlewares): funções que executam antes dos controladores, como autenticação, CORS;
    - (models): modelos das entidades do sistema, como Prisma, Sequelize;
    - (routes): os endpoints da API;
    - (services): todas as regras de negócio, lógica principal do sistema.
