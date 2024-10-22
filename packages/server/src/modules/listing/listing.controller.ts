import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ListingService } from './services/listing.service';
import { CreateListingDto } from './dto/CRUD/create-listing.dto';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { Listing } from './entities/listing.entity';
import { UpdateListingDto } from './dto/CRUD/update-listing.dto';
import { ListingImageService } from './services/listing-image.service';
import { AddListingImageDto } from './dto/CRUD/add-listing-image.dto';
import { ListingImage } from './entities/listing-image.entity';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { SearchAreaDto } from './dto/search-area.dto';

@Controller('listing')
@UseGuards(JwtGuard)
export class ListingController {
  constructor(
    private readonly listingService: ListingService,
    private readonly listingImageService: ListingImageService,
  ) {}

  @Get('/')
  getListings(@GetUser() user: User): Promise<Listing[]> {
    return this.listingService.getListings(user);
  }

  @Get('/search')
  getListingBySearch(@Query() searchAreaDto: SearchAreaDto) {
    return this.listingService.getListingBySearch(searchAreaDto);
  }

  @Get('/:id')
  getListingById(
    @Param('id') listingId: string,
    @GetUser() user: User,
  ): Promise<Listing> {
    return this.listingService.getListingById(listingId, user);
  }

  @Post('/new')
  createListing(
    @Body()
    createListingDto: CreateListingDto,
    @GetUser() user: User,
  ): Promise<Listing> {
    return this.listingService.createListing(createListingDto, user);
  }

  @Patch('/:listingId')
  updateListing(
    @Param('listingId') listingId: string,
    @Body() updateListingDto: UpdateListingDto,
    @GetUser() user: User,
  ): Promise<Listing> {
    return this.listingService.updateListing(listingId, updateListingDto, user);
  }

  @Post('/:listingId/image/new')
  @UseInterceptors(FileInterceptor('image'))
  addImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000000 }),
          new FileTypeValidator({ fileType: 'image/(jpeg|jpg)' }),
        ],
        fileIsRequired: false,
      }),
    )
    image: Express.Multer.File,
    @Param('listingId') listingId: string,
    @Body() addListingImageDto: AddListingImageDto,
    @GetUser() user: User,
  ): Promise<ListingImage> {
    return this.listingImageService.addListingImage(
      listingId,
      addListingImageDto,
      image,
      user,
    );
  }

  @Delete('/:listingId')
  deleteListing(
    @Param('listingId') listingId: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.listingService.deleteListing(listingId, user);
  }

  @Delete('/:listingId/image/:listingImageId')
  deleteImage(
    @Param('listingId') listingId: string,
    @Param('listingImageId') listingImageId: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.listingImageService.deleteListingImage(
      listingId,
      listingImageId,
      user,
    );
  }
}
