import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @ObjectIdColumn() id: ObjectID;
  @Column() username: string;
  @Column() password: string;
  @Column() pictureUrl?: string;
  @Column() birthDate?: Date;

  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }
}
