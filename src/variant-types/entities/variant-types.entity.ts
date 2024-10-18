import { AppBaseEntity } from "@/common/entities/app-base.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class VariantType extends AppBaseEntity {
    constructor(partial: Partial<VariantType>) {
        super();
        Object.assign(this, partial);
    }

    @ApiProperty({ example: 'Color', description: 'Name of the variant type' })
    @Column()
    name: string;
}