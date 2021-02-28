import { Type } from 'class-transformer'
import MiniCategory from './MiniCategory'
import { IsArrayOfMongoId } from '../validate/decorator'
import { IsInt, IsDate, IsString, IsNotEmpty, ValidateIf, ArrayMinSize, ValidateNested, MinDate, IsPositive } from 'class-validator'



class Article {

  @IsString({ message: 'title类型错误' })
  @IsNotEmpty({ message: 'title不能为空' })
  @Type(() => String)
  public title: string;

  @IsString({ message: 'markdown类型错误' })
  @IsNotEmpty({ message: 'markdown不能为空' })
  @Type(() => String)
  public markdown: string;

  @IsString({ message: 'html类型错误' })
  @IsNotEmpty({ message: 'html不能为空' })
  @Type(() => String)
  public html: string;

  @ValidateNested({ message: 'categories格式错误' })
  @ArrayMinSize(1, { message: 'categories不能为空' })
  @Type(() => MiniCategory)
  public categories: MiniCategory[];

  @IsArrayOfMongoId({ message: 'tags为mongoId数组' })
  @ArrayMinSize(1, { message: 'tags不能为空' })
  @Type(() => String)
  public tags: string[];

  @ValidateIf((o, value) => value !== undefined)
  @IsPositive({ message: 'wordcount值错误' })
  @IsInt({ message: 'wordcount类型错误' })
  @Type(() => Number)
  public wordcount?: number;

  @ValidateIf((o, value) => value !== undefined)
  @IsPositive({ message: 'wordcount值错误' })
  @IsInt({ message: 'readingTime类型错误' })
  @Type(() => Number)
  public readingTime?: number;

  @ValidateIf((o, value) => value !== undefined)
  @IsNotEmpty({ message: 'postCover不能为空' })
  @IsString({ message: 'postCover类型错误' })
  @Type(() => String)
  public postCover?: string;

  constructor(
    title: string,
    markdown: string,
    html: string,
    categories: MiniCategory[],
    tags: string[],
    postCover?: string,
    wordcount?: number,
    readingTime?: number
  ) {
    this.title = title;
    this.markdown = markdown;
    this.html = html;
    this.categories = categories;
    this.tags = tags;

    postCover && (this.postCover = postCover);
    wordcount && (this.wordcount = wordcount);
    readingTime && (this.readingTime = readingTime);
  }
}

export default Article;