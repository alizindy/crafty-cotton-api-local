import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateVariantOptionDto {
    @ApiProperty({
        example: 'Red',
        description: 'The name of the option within the variant type group.',
    })
    @IsString()
    @IsNotEmpty()
    name: string;
}
