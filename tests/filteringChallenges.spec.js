const { readFileSync } = require('fs');
const { Sequelize } = require('sequelize');
const Importer = require('mysql-import');

describe('Desafios sobre filtragem de dados', () => {
  let sequelize;

  beforeAll(async () => {
    const importer = new Importer(
      { user: process.env.MYSQL_USER, password: process.env.MYSQL_PASSWORD, host: process.env.HOSTNAME }
    );

    await importer.import('./northwind.sql');

    importer.disconnect();

    sequelize = new Sequelize(
      `mysql://${process.env.MYSQL_USER}:${process.env.MYSQL_PASSWORD}@${process.env.HOSTNAME}:3306/northwind`
    );
  });

  afterAll(async () => {
    await sequelize.query('DROP DATABASE northwind;', { type: 'RAW' });
    sequelize.close();
  });

  describe('Mostre todos os valores de `notes` da tabela `purchase_orders` que não são nulos', () => {
    it('Verifica o desafio9', async () => {
      const challengeQuery = readFileSync('desafio9.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult9');

      expect(await sequelize.query(challengeQuery, { type: 'SELECT' })).toEqual(expectedResult);
    });
  });

  describe('Mostre todos os dados da tabela `purchase_orders` em ordem decrescente ordenados por `created_by` em que o `created_by` é maior ou igual a 3', () => {
    it('Verifica o desafio10', async () => {
      const challengeQuery = readFileSync('desafio10.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult10');

      expect(
        JSON.stringify(await sequelize.query(challengeQuery, { type: 'SELECT' }))
      ).toEqual(JSON.stringify(expectedResult));
    });
  });

  describe('Exiba os dados de `notes` da tabela `purchase_orders` em que seu valor de "Purchase generated based on Order" está entre 30 e 39, incluindo tanto o valor de 30 quanto de 39', () => {
    it('Verifica o desafio11', async () => {
      const challengeQuery = readFileSync('desafio11.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult11');

      expect(await sequelize.query(challengeQuery, { type: 'SELECT' })).toEqual(expectedResult);
    });
  });

  describe('Mostre as `submitted_date` de `purchase_orders` em que a `submitted_date` é do dia 26 de abril de 2006', () => {
    it('Verifica o desafio12', async () => {
      const challengeQuery = readFileSync('desafio12.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult12');

      expect(
        JSON.stringify(await sequelize.query(challengeQuery, { type: 'SELECT' }))
      ).toEqual(JSON.stringify(expectedResult));
    });
  });

  describe('Mostre o `supplier_id` das `purchase_orders` em que o `supplier_id` seja 1 ou 3', () => {
    it('Verifica o desafio13', async () => {
      const challengeQuery = readFileSync('desafio13.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult13');

      expect(await sequelize.query(challengeQuery, { type: 'SELECT' })).toEqual(expectedResult);
    });
  });

  describe('Mostre os `supplier_id` da `purchase_orders` em que o `supplier_id` seja de 1 a 3, incluindo tanto o 1 quanto o 3', () => {
    it('Verifica o desafio14', async () => {
      const challengeQuery = readFileSync('desafio14.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult14');

      expect(await sequelize.query(challengeQuery, { type: 'SELECT' })).toEqual(expectedResult);
    });
  });

  describe('Mostre somente as horas (sem os minutos e os segundos) da `submitted_date` de todos registros de `purchase_orders`. Chame essa coluna de `submitted_hour`', () => {
    it('Verifica o desafio15', async () => {
      const challengeQuery = readFileSync('desafio15.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult15');

      expect(await sequelize.query(challengeQuery, { type: 'SELECT' })).toEqual(expectedResult);
    });
  });

  describe('Exiba a `submitted_date` das `purchase_orders` que estão entre `2006-01-26 00:00:00` e `2006-03-31 23:59:59`', () => {
    it('Verifica o desafio16', async () => {
      const challengeQuery = readFileSync('desafio16.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult16');

      expect(
        JSON.stringify(await sequelize.query(challengeQuery, { type: 'SELECT' }))
      ).toEqual(JSON.stringify(expectedResult));
    });
  });

  describe('Mostre os registros das colunas `id` e `supplier_id` das `purchase_orders` em que os `supplier_id` sejam tanto 1, ou 3, ou 5, ou 7', () => {
    it('Verifica o desafio17', async () => {
      const challengeQuery = readFileSync('desafio17.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult17');

      expect(await sequelize.query(challengeQuery, { type: 'SELECT' })).toEqual(expectedResult);
    });
  });

  describe('Mostre todos os registros de `purchase_orders` que tem o `supplier_id` igual a 3 e `status_id` igual a 2', () => {
    it('Verifica o desafio18', async () => {
      const challengeQuery = readFileSync('desafio18.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult18');

      expect(
        JSON.stringify(await sequelize.query(challengeQuery, { type: 'SELECT' }))
      ).toEqual(JSON.stringify(expectedResult));
    });
  });

  describe('Quantos pedidos foram feitos na tabela `orders` pelo `employee_id` igual a 5 ou 6, e que foram enviados através do método `shipper_id` igual a 2? Chame a coluna de orders_count', () => {
    it('Verifica o desafio19', async () => {
      const challengeQuery = readFileSync('desafio19.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult19');

      expect(await sequelize.query(challengeQuery, { type: 'SELECT' })).toEqual(expectedResult);
    });
  });
});
