import { Type } from "class-transformer"
import { IsString, IsNotEmpty, ValidateIf, IsMongoId } from "class-validator"

class MiniCategory {

  @IsMongoId({ message: 'topLevel类型应为ObjectId字符串' })
  @IsString({ message: 'topLevel格式错误' })
  @IsNotEmpty({ message: 'topLevel不能为空' })
  @Type(() => String)
  public topLevel: string;

  @ValidateIf((o, value) => value !== undefined)
  @IsMongoId({ message: 'twoLevel类型应为ObjectId字符串' })
  @IsString({ message: "twoLevel格式错误" })
  @Type(() => String)
  public twoLevel?: string;

  constructor(topLevel: string, twoLevel?: string) {
    this.topLevel = topLevel;
    twoLevel && (this.twoLevel = twoLevel);
  }
}

export default MiniCategory;