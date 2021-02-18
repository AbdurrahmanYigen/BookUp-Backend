  
// import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { Invitee } from '../../entity/Invitee';

export default class CreateInvitee implements Seeder {
  public async run(factory: Factory): Promise<any> {

    await factory(Invitee)().createMany(10);
  }
}
