  
// import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { ProfilePhoto } from '../../entity/ProfilePhoto';

export default class CreateProfilePhotos implements Seeder {
  public async run(factory: Factory): Promise<any> {

    await factory(ProfilePhoto)().createMany(10);
  }
}
