import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity('spreadsheet_rows')
export class SpreadsheetRows {
  @ObjectIdColumn() id: ObjectID;
  @Column() spreadsheet_id: string;
  @Column() Coordinator: string;
  @Column() seasonality: string;
  @Column() month: string;
  @Column() year: number;
  @Column() place: string;
  @Column() system: string;
  @Column() river_course: string;
  @Column() site: string;
  @Column() zone: string;
  @Column() utm_zone: number;
  @Column() X_utm: number;
  @Column() Y_utm: number;
  @Column() reign: string;
  @Column() phyllum: string;
  @Column() class: string;
  @Column() order: string;
  @Column() family: string;
  @Column() genre: string;
  @Column() species: string;
  @Column() sampler: string;
  @Column() organism: string;
  @Column() value: number;
  @Column() biomass: string;
  @Column() estoque_carbono: string;
  @Column() ab_total: number;
  @Column() specie_status: string;
  @Column() origin: string;

  constructor(spreadsheet?: Partial<SpreadsheetRows>) {
    Object.assign(this, spreadsheet);
  }
}
