import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateVariantTypeDto {
    @ApiProperty({
        example: 'Color',
        description: 'The name of the variant type',
    })
    @IsString()
    @IsNotEmpty()
    name: string;
}
