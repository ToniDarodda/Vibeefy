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
    example: 'Toni',
    description: 'Firstname of user',
  })
  @IsNotEmpty()
  @IsString()
  pseudo: string;

  @ApiProperty({
    example: 'toni.da.rodda.dev@gmail.pro@gmail.com',
    description: 'Email of user',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'toni.da.rodda.dev@gmail.pro@gmail.com',
    description: 'Email of user',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  dateOfBirth: string;

  @ApiProperty({
    example: 'test1234',
    description: 'Password of user',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UserCreate extends OmitType(UserBaseDTO, ['id']) {}

export class UserLogin extends PickType(UserBaseDTO, ['email', 'password']) {}

export class UserGetById extends PickType(UserBaseDTO, ['id']) {}

export class UserGetByEmail extends PickType(UserBaseDTO, ['email']) {}

export class UserPatch extends PartialType(OmitType(UserBaseDTO, ['id'])) {}

export class UserDelete extends PickType(UserBaseDTO, ['id']) {}
