import { Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('spreadsheet')
export class Spreadsheet {
  @ObjectIdColumn() id: ObjectID;
  @Column() name: string;
  @Column() user_id: string;
  @Column() user_name:string;
  @Column() user_email:string;
  @Column() user_color: string;
  @Column() file_s3_key: string;
  @Column() file_original_name: string;
  @Column() is_public: number;
  @Column() download_link: string;
  @Column() rows: string;
  @Column() columns: string[];
  @CreateDateColumn() date: string;

  constructor(spreadsheet?: Partial<Spreadsheet>) {
    Object.assign(this, spreadsheet);
  }
}
