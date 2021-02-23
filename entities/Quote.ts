import { Type } from "class-transformer"

class Quote {
  public content: string;
  public author: string;
  @Type(() => Date)
  public assign_date: Date;
  public translation: string;

  constructor(
    content: string,
    author: string,
    assign_date: Date,
    translation: string
  ) {
    this.content = content;
    this.author = author;
    this.assign_date = assign_date;
    this.translation = translation;
  }
}

export default Quote;