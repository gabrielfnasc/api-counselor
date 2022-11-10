import { UpdateCouncilUseCase } from "../../../application/usecase/council/UpdateCouncilUseCase";
import { Validator } from "../../../domain/validator/validator";
import { HttpResponse } from "../../http/presentation/controllers/helpers/Http";
import {
  ok,
  serverError,
} from "../../http/presentation/controllers/helpers/HttpHelper";
import { BaseController } from "../BaseController";

export type UpdateCouncilRequestDto = {
  userId: string;
  councilId: string;
  content: string;
};

export class UpdateCouncilController implements BaseController {
  constructor(
    private readonly validator: Validator,
    private readonly usecase: UpdateCouncilUseCase
  ) {}

  async handle(request: UpdateCouncilRequestDto): Promise<HttpResponse> {
    try {
      this.validator.validate(request);
      await this.usecase.execute(request);
      return ok("Council updated successfully!");
    } catch (error) {
      return serverError(error as Error);
    }
  }
}