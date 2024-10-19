import { AppBaseEntity } from "@/common/entities/app-base.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity } from "typeorm";

@Entity()
export class VariantOption extends AppBaseEntity {
    constructor(partial: Partial<VariantOption>) {
        super();
        Object.assign(this, partial);
    }

    @ApiProperty({ example: 'Red', description: 'The name of the option within the variant type group.' })
    @Column()
    name: string;
}
