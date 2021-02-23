import { Type } from "class-transformer"

class Bing {
  public url: string;
  public copyright: string;
  @Type(() => Date)
  public date: Date;

  constructor(url: string, copyright: string, date: Date) {
    this.url = url;
    this.copyright = copyright;
    this.date = date;
  }
}

export default Bing;