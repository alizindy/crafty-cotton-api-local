import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateVariantTypeDto {
    @ApiProperty({
        example: 'Manager',
        description: 'The name of the staff role',
    })
    @IsString()
    @IsNotEmpty()
    name: string;
}
