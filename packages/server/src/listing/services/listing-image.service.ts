import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as uuid from 'uuid';

import { ListingUploadService } from '../../common/upload/listing-upload.service';
import { ListingService } from './listing.service';
import { User } from '../../auth/user.entity';
import { ListingImage } from '../entities/listing-image.entity';
import { Repository } from 'typeorm';
import { AddListingImageDto } from '../dto/add-listing-image.dto';

@Injectable()
export class ListingImageService {
  logger = new Logger(ListingImageService.name);

  constructor(
    private readonly listingService: ListingService,
    private readonly listingUploadService: ListingUploadService,
    @InjectRepository(ListingImage)
    private listingImageRepository: Repository<ListingImage>,
  ) {}

  async addListingImage(
    listingId: string,
    addListingImageDto: AddListingImageDto,
    image: Express.Multer.File,
    user: User,
  ) {
    const { label, category } = addListingImageDto;

    const listing = await this.listingService.getListingById(listingId, user);
    console.log(listing);

    const listingImageId = uuid.v4();
    // Uploading image to bucket
    const { bucketLocation, publicUrl } =
      await this.listingUploadService.uploadListingImage(listingImageId, image);

    // Saving reference in database
    const listingImageReference = this.listingImageRepository.create({
      id: listingImageId,
      bucketLocation,
      publicUrl,
      label,
      category,
      listing,
    });
    return await this.listingImageRepository.save(listingImageReference);
  }
}
