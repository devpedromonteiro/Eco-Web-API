import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ObjectIdColumn() id: ObjectID;
  @Column() email: string;
  @Column() password: string;
  @Column() user_color: string;
  @Column() name?: string;
  @CreateDateColumn() create_at: Date;
  @UpdateDateColumn() updated_at: Date;

  @BeforeInsert()
  public setRandomColor(): void {
    let hex = Math.floor(Math.random() * 0xffffff);
    let color = '#' + hex.toString(16);
    console.log(color);
    this.user_color = color;
  }

  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }
}
