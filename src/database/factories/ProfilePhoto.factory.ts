import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { ProfilePhoto } from "../../entity/ProfilePhoto";

define(ProfilePhoto, (faker: typeof Faker) => {
    const profilePhoto = new ProfilePhoto()
    profilePhoto.url = faker.image.imageUrl();

    return profilePhoto;
});
