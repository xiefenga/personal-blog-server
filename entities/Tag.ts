import { Type } from "class-transformer"
import { IsNotEmpty, IsString } from "class-validator"


class Tag {

  @IsString({ message: 'tagName类型有误' })
  @IsNotEmpty({ message: 'tagName不能为空' })
  @Type(() => String)
  public tagName: string;

  constructor(tagName: string) {
    this.tagName = tagName;
  }
}

export default Tag;