import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return await this.repository
      .createQueryBuilder('games')
      .where("games.title ILIKE :name", { name: `%${param}%` })
      .getMany();
      
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query(`SELECT COUNT(*) FROM games`); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const game = await this.repository
    .createQueryBuilder("games")
    .leftJoinAndSelect("games.users", "users")
    .where('games.id = :id',{id})
    .getOneOrFail()

    return game.users;
      // Complete usando query builder
  }
}
