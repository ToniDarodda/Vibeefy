import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UserBaseDTO {
  @ApiProperty({
    example: 'cb638b04-44cc-432e-bfb5-7a971edcdb96',
    description: 'User id',
  })
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    example: '',
    description: '',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    example: '',
    description: '',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    example: '',
    description: '',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '',
    description: '',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UserCreate extends OmitType(UserBaseDTO, ['id']) {}

export class UserGetById extends PickType(UserBaseDTO, ['id']) {}

export class UserGetByEmail extends PickType(UserBaseDTO, ['email']) {}

export class UserPatch extends PartialType(OmitType(UserBaseDTO, ['id'])) {}

export class UserDelete extends PickType(UserBaseDTO, ['id']) {}
