import { Usecase } from "./UseCase";
import { UserRepository } from "../repositories/UserRepository";
import { Validator } from "../../domain/validator/validator";
import { Criptography, Hash } from "../criptography";

export type InputCreateUserDto = {
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
};

export type OutputCreateUserDto = {
  accessToken: string;
};

export class CreateUserUseCase
  implements Usecase<InputCreateUserDto, OutputCreateUserDto>
{
  constructor(
    private readonly repository: UserRepository,
    private readonly validator: Validator,
    private readonly hash: Hash,

    private readonly criptography: Criptography
  ) {}
  async execute(data: InputCreateUserDto): Promise<OutputCreateUserDto> {
    this.validator.validate(data);
    const { email, password } = data;

    const hash = await this.hash.create(password);

    const userId = await this.repository.create({
      ...data,
      password: hash,
    });

    const accessToken = await this.criptography.encrypt(userId);

    return { accessToken };
  }
}