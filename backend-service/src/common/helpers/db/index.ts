import * as fs from 'fs';
import * as path from 'path';
import { Token } from '../../interfaces/index.interface';

interface TokenCollection {
  [key: string]: Token;
}

export class DB {
  private dbPath: string;
  constructor() {
    const dbPath = path.join(__dirname, '../../../../database/db.json');

    this.ensureFileExists(dbPath, '{}');
    this.dbPath = path.join(dbPath);
  }

  ensureFileExists(filePath: string, defaultContent = '') {
    if (fs.existsSync(filePath)) {
      return filePath;
    }

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, defaultContent, { encoding: 'utf8' });

    return filePath;
  }

  private readDB() {
    return JSON.parse(fs.readFileSync(this.dbPath, 'utf-8'));
  }

  private writeDB(data: Token) {
    fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2));
  }

  async findOne(address: string): Promise<Token | undefined> {
    const db = this.readDB();
    return db[address];
  }

  async findOneByAddress(address: string): Promise<Token | undefined> {
    const db = this.readDB() as TokenCollection;
    return Object.values(db).find((tokenInfo) => {
      return Object.values(tokenInfo.tokens).some(
        (token) => token.address.toLowerCase() === address.toLowerCase()
      );
    });
  }

  async findAll(): Promise<TokenCollection> {
    const db = this.readDB();
    return db;
  }

  async createOrUpdate(token: Token, address: string) {
    const db = this.readDB();
    db[address] = token;
    this.writeDB(db);
  }
}
