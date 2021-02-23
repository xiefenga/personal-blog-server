import { Type } from "class-transformer"
import { IsMongoId, IsNotEmpty, IsString } from "class-validator"


class TopLevelCategory {
  @IsString({ message: 'categoryName格式错误' })
  @IsNotEmpty({ message: 'categoryName不能为空' })
  @Type(() => String)
  public categoryName: string;
  constructor(categoryName: string) {
    this.categoryName = categoryName;
  }
}

class TwoLevelCategory extends TopLevelCategory {
  @IsMongoId({ message: 'parent类型应为ObjectId字符串' })
  @IsNotEmpty({ message: 'parent不能为空' })
  @Type(() => String)
  public parent: string;

  constructor(categoryName: string, parent: string) {
    super(categoryName);
    this.parent = parent;
  }
}





export { TopLevelCategory, TwoLevelCategory }