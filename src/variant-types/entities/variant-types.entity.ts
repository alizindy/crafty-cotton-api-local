import { AppBaseEntity } from "@/common/entities/app-base.entity";
import { VariantOption } from "@/variant-options/entities/variant-option.entity";
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

    @OneToMany(() => VariantOption, (variantOptions) => variantOptions.variantType)
    variantOptions: VariantOption[];
}