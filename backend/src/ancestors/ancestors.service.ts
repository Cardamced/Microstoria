import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ancestor } from './ancestor.entity';
import { CreateAncestorDto } from './dto/create-ancestor.dto';
import { UpdateAncestorDto } from './dto/update-ancestor.dto';
import { DeepPartial } from 'typeorm';

@Injectable()
export class AncestorsService {
  // on injecte le repository de l'entité Ancestor dans le service.
  // C'est lui qui permet d'interagir avec la BDD via les méthodes ci-après.
  // On injecte le repository dans le constructor.
  constructor(
    @InjectRepository(Ancestor)
    private ancestorsRepository: Repository<Ancestor>,
  ) {}

  async getAncestors(): Promise<Ancestor[]> {
    return await this.ancestorsRepository.find();
  }

  async getAncestor(id: number): Promise<Ancestor | null> {
    return await this.ancestorsRepository.findOne({
      select: [
        'lastname',
        'firstname',
        'image',
        'birthdate',
        'gender',
        'birth_place',
        'wedding_date',
        'wedding_place',
        'death_date',
        'death_place',
        'occupation',
      ],
      where: [{ id: id }],
    });
  }

  async createAncestor(
    createAncestorDto: CreateAncestorDto,
  ): Promise<Ancestor> {
    const ancestor = await this.ancestorsRepository.save(
      createAncestorDto as unknown as DeepPartial<Ancestor>,
    );
    return ancestor;
  }

  async updateAncestor(
    updateAncestorDto: UpdateAncestorDto,
  ): Promise<Ancestor | null> {
    await this.ancestorsRepository.update(
      updateAncestorDto.id,
      updateAncestorDto as DeepPartial<Ancestor>,
    );
    return this.getAncestor(updateAncestorDto.id);
  }

  async updatePartialAncestor(
    id: number,
    partialUpdateDto: Partial<UpdateAncestorDto>,
  ): Promise<Ancestor> {
    const ancestor = await this.ancestorsRepository.findOneBy({ id });
    if (!ancestor) {
      throw new NotFoundException(`Ancestor with id ${id} not found`);
    }
    // mise à jour partielle
    Object.assign(ancestor, partialUpdateDto);

    return this.ancestorsRepository.save(ancestor);
  }

  deleteAncestor(id: number): void {
    this.ancestorsRepository.delete(id);
  }

  searchAncestors(
    search: string,
    exactSearch: boolean = false,
  ): Promise<Ancestor[]> {
    console.log(
      `Executing search with query: ${search}, exactSearch: ${exactSearch}`,
    );
    const queryBuilder =
      this.ancestorsRepository.createQueryBuilder('ancestor');
    const fields = [
      'lastname',
      'firstname',
      'birth_place',
      'wedding_place',
      'death_place',
    ];

    if (exactSearch) {
      fields.forEach((field, index) => {
        if (index === 0) {
          queryBuilder.where(`ancestor.${field} LIKE :search`, {
            search: `%${search}%`,
          });
        } else {
          queryBuilder.orWhere(`ancestor.${field} LIKE :search`, {
            search: `%${search}%`,
          });
        }
      });
    } else {
      fields.forEach((field, index) => {
        if (index === 0) {
          queryBuilder.where(
            `ancestor.${field} COLLATE utf8mb4_general_ci LIKE :search`,
            { search: `%${search}%` },
          );
        } else {
          queryBuilder.orWhere(
            `ancestor.${field} COLLATE utf8mb4_general_ci LIKE :search`,
            { search: `%${search}%` },
          );
        }
      });
    }

    return queryBuilder
      .getMany()
      .then((results) => {
        console.log(`Query results: ${JSON.stringify(results)}`);
        return results;
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
        throw error;
      });

    // .where('ancestor.lastname LIKE :search', { search: `%${search}%` })
    // .orWhere('ancestor.firstname LIKE :search', { search: `%${search}%` })
    // .orWhere('ancestor.birth_place LIKE :search', { search: `%${search}%` })
    // .orWhere('ancestor.wedding_place LIKE :search', { search: `%${search}%` })
    // .orWhere('ancestor.death_place LIKE :search', { search: `%${search}%` })
    // .getMany()
    // .then((results) => {
    //   console.log(`Query results: ${JSON.stringify(results)}`);
    //   return results;
    // })
    // .catch((error) => {
    //   console.error(`Error: ${error}`);
    //   throw error;
    // });
  }

  // NB : le service centralise les méthodes de manipulation des entités.
  // Celles-ci utiliseront le repository qu'on lui injecte dans le constructeur.
  // Le service est le coeur de l'application. Il contient la logique métier.
  // Il est décoré avec @Injectable() pour pouvoir être injecté dans le controller.
}
