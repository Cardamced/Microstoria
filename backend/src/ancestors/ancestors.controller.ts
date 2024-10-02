import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Patch,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { AncestorsService } from './ancestors.service';
import { CreateAncestorDto } from './dto/create-ancestor.dto';
import { UpdateAncestorDto } from './dto/update-ancestor.dto';
import { Ancestor } from './ancestor.entity'; // Adjust the path as necessary

@Controller('ancestors')
export class AncestorsController {
  constructor(private ancestorsService: AncestorsService) {}

  @Get()
  getAncestors() {
    return this.ancestorsService.getAncestors();
  }

  @Get(':id')
  getAncestor(@Param('id') id: number) {
    return this.ancestorsService.getAncestor(id);
  }

  @Post('new')
  create(@Body() createAncestorDto: CreateAncestorDto) {
    return this.ancestorsService.createAncestor(createAncestorDto);
  }

  @Put(':id')
  async updateCompleteAncestor(@Body() updateAncestorDto: UpdateAncestorDto) {
    return await this.ancestorsService.updateAncestor(updateAncestorDto);
  }

  @Patch(':id')
  async updatePartialAncestor(
    @Param('id') id: number,
    @Body() partialUpdateDto: Partial<UpdateAncestorDto>,
  ) {
    return await this.ancestorsService.updatePartialAncestor(
      id,
      partialUpdateDto,
    );
  }

  // TODO : Prévoir insertion d'une méthode @Patch(':id') pour les mises à jour partielles
  // @Patch(':id')
  //async updatePartialAncestor(@Body()

  @Delete(':id')
  deleteAncestor(@Param('id') id: number) {
    return this.ancestorsService.deleteAncestor(id);
  }

  @Get('search')
  async searchAncestors(
    @Query('q') query: string,
    @Query('exact') exact: string,
  ): Promise<Ancestor[]> {
    const exactSearch = exact === 'true';
    return this.ancestorsService.searchAncestors(query, exactSearch);
  }
}

// NB : le controller centralise les méthodes de l'api. Celles-ci utiliseront le service.
// Le controller est le point d'entrée de l'api. Il est décoré avec @Controller('ancestors').
