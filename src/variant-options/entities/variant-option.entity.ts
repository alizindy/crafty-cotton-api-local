import { AppBaseEntity } from "@/common/entities/app-base.entity";
import { VariantType } from "@/variant-types/entities/variant-types.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class VariantOption extends AppBaseEntity {
    constructor(partial: Partial<VariantOption>) {
        super();
        Object.assign(this, partial);
    }

    @ApiProperty({ example: 'Red', description: 'The name of the option within the variant type group.' })
    @Column()
    name: string;

    @ManyToOne(() => VariantType, (variantType) => variantType.variantOptions, {
        nullable: true,
    })
    variantType: VariantType;
}
