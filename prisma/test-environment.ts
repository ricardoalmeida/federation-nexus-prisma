const NodeEnvironment = require('jest-environment-node');
const randomString = require('randomstring');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { PrismaClient } = require('@prisma/client');
const prismaBinary = './node_modules/.bin/prisma';
class PrismaTestEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    // Generate a unique schema identifier for this test context
    this.schema = `test_${randomString.generate({
      length: 16,
      charset: 'alphanumeric',
      capitalization: 'lowercase',
    })}`;
    // Generate the pg connection string for the test schema
    this.databaseUrl = 'postgres://postgres:postgres@localhost:5432/vitrola';
    process.env.DATABASE_URL = this.databaseUrl;
    this.global.process.env.DATABASE_URL = this.databaseUrl;
    this.client = new PrismaClient();
  }
  async setup() {
    await this.client.$executeRaw(`create schema if not exists "${this.schema}"`);
    // Set the required environment variable to contain the connection string
    // to our database test schema
    const url = `${this.databaseUrl}?schema=${this.schema}`;
    process.env.DATABASE_URL = url;
    this.global.process.env.DATABASE_URL = url;
    await exec(`${prismaBinary} migrate deploy --early-access-feature`);
    return super.setup();
  }
  async teardown() {
    // Drop the schema after the tests have completed
    await this.client.$executeRaw(`drop schema if exists "${this.schema}" cascade`);
    await this.client.$disconnect();
  }
}
module.exports = PrismaTestEnvironment;
