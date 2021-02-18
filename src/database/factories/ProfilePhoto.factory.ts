import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { ProfilePhoto } from "../../entity/ProfilePhoto";

define(ProfilePhoto, (_faker: typeof Faker) => {
    const profilePhoto = new ProfilePhoto()
    profilePhoto.url = 'https://loremflickr.com/320/240';

    return profilePhoto;
});
