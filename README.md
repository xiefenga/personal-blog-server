# 个人博客后端

启动方式：

1. `yarn install`
2. `yarn dun dev`

启动后，服务器会跑在 8080 端口

技术栈：typescript + mongodb + koa

# 接口文档

## 实体

### MiniCategory

> 该实体仅是文章的categories字段存储时的类型

|   字段   |  类型  | 是否必须 |       备注       |
| :------: | :----: | :------: | :--------------: |
| topLevel | string |    是    |  一级类目，必须  |
| twoLevel | string |    否    | 二级类目，非必须 |

### TopLevelCategory

|     字段     |  类型  | 是否必须 |           备注            |
| :----------: | :----: | :------: | :-----------------------: |
|     _id      | string |    是    | mongodb中的索引，ObjectId |
| categoryName | string |    是    |      类目名称，唯一       |

### TwoLevelCategory

|     字段     |  类型  | 是否必须 |                        备注                         |
| :----------: | :----: | :------: | :-------------------------------------------------: |
|     _id      | string |    是    |              mongodb中的索引，ObjectId              |
| categoryName | string |    是    |              类目名称，一级类目下唯一               |
|    parent    | string |    是    | 所属一级类目的_id，该字段添加时需要，响应时可能没有 |

### Category

> 该类型仅在文章响应时存在

|   字段   |       类型       | 是否必须 |       备注       |
| :------: | :--------------: | :------: | :--------------: |
| topLevel | TopLevelCategory |    是    |  一级类目，必须  |
| twoLevel | TwoLevelCategory |    否    | 二级类目，非必须 |

### Categories

> 该类型仅在类目的响应中出现

|   字段    |        类型        | 是否必须 |       备注       |
| :-------: | :----------------: | :------: | :--------------: |
| topLevel  |  TopLevelCategory  |    是    |  一级类目，必须  |
| twoLevels | TwoLevelCategory[] |    否    | 二级类目，非必须 |

### Tag

|  字段   |  类型  | 是否必须 |           备注            |
| :-----: | :----: | :------: | :-----------------------: |
|   _id   | string |    是    | mongodb中的索引，ObjectId |
| tagName | string |    是    |      标签名称，唯一       |

### Article

|    字段     |    类型    | 是否必须 |                   备注                   |
| :---------: | :--------: | :------: | :--------------------------------------: |
|     _id     |   string   |    是    |        mongodb中的索引，ObjectId         |
|    title    |   string   |    是    |              文章标题，唯一              |
|  markdown   |   string   |    是    |            文章的markdown内容            |
|    html     |   string   |    是    |            文章的html格式内容            |
| categories  | Category[] |    是    | 文章所属的类目，仅支持二级，一级类目必需 |
|    tags     |   Tag[]    |    是    | 文章所属的标签，mongoId格式字符串，非空  |
|  wordcount  |   number   |    否    |                文章的字数                |
| readingTime |   number   |    否    |              文章的阅读时长              |
|  postCover  |   string   |    是    |                文章的封面                |
|  createdAt  |    Date    |    是    |    文章创建日期，mongoose生成的时间戳    |
|  updatedAt  |    Date    |    是    |    文章修改日期，mongoose生成的时间戳    |

## 文章

### 文章列表（分页）

url：`/article`

method：`GET`

query 列表：

| 字段 | 类型 | 是否必须 |      备注      |
| :--: | :--: | :------: | :------------: |
| page | int  |    否    | 分页获取的页码 |
| size | int  |    否    |  每一页的大小  |

响应消息：

|  字段  |   类型    | 是否必须 |                备注                |
| :----: | :-------: | :------: | :--------------------------------: |
| status |  string   |    是    | 响应状态，值为 `success` 或 `fail` |
| error  |  string   |    否    |      错误消息，有错误时才会有      |
|  data  | Article[] |    否    |      响应的数据，有错误时没有      |
| count  |    int    |    否    |     总的文章数量，有错误时没有     |

### 文章详情

url: `/article/:id`

method: `GET`

响应消息：

|  字段  |  类型   | 是否必须 |                备注                |
| :----: | :-----: | :------: | :--------------------------------: |
| status | string  |    是    | 响应状态，值为 `success` 或 `fail` |
| error  | string  |    否    |      错误消息，有错误时才会有      |
|  data  | Article |    否    |       响应数据，有错误时没有       |

### 添加文章

url: `/article`

method: `POST`

参数列表：

|    字段     |      类型      | 是否必须 |                   备注                   |
| :---------: | :------------: | :------: | :--------------------------------------: |
|    title    |     string     |    是    |                 文章标题                 |
|  markdown   |     string     |    是    |            文章的markdown内容            |
|    html     |     string     |    是    |            文章的html格式内容            |
| categories  | MiniCategory[] |    是    | 文章所属的类目，仅支持二级，一级类目必需 |
|    tags     |    string[]    |    是    | 文章所属的标签，mongoId格式字符串，非空  |
|  wordcount  |     number     |    否    |                文章的字数                |
| readingTime |     number     |    否    |              文章的阅读时长              |
|  postCover  |     string     |    否    |                文章的封面                |

响应消息：

|  字段  |   类型   | 是否必须 |                备注                |
| :----: | :------: | :------: | :--------------------------------: |
| status |  string  |    是    | 响应状态，值为 `success` 或 `fail` |
| error  | string[] |    否    |      错误消息，有错误时才会有      |
|  data  | Article  |    否    |       响应数据，有错误时没有       |

### 修改文章

url: `/article/:id`

method: `PUT`

参数列表：

|    字段     |      类型      | 是否必须 |                   备注                   |
| :---------: | :------------: | :------: | :--------------------------------------: |
|    title    |     string     |    否    |                 文章标题                 |
|  markdown   |     string     |    否    |            文章的markdown内容            |
|    html     |     string     |    否    |            文章的html格式内容            |
| categories  | MiniCategory[] |    否    | 文章所属的类目，仅支持二级，一级类目必需 |
|    tags     |    string[]    |    否    | 文章所属的标签，mongoId格式字符串，非空  |
|  wordcount  |     number     |    否    |                文章的字数                |
| readingTime |     number     |    否    |              文章的阅读时长              |
|  postCover  |     string     |    否    |                文章的封面                |

响应消息：

|  字段  |   类型   | 是否必须 |                备注                |
| :----: | :------: | :------: | :--------------------------------: |
| status |  string  |    是    | 响应状态，值为 `success` 或 `fail` |
| error  | string[] |    否    |      错误消息，有错误时才会有      |

### 删除文章

url: `/article/:id`

method: `DELETE`

响应消息：

|  字段  |  类型  | 是否必须 |             备注             |
| :----: | :----: | :------: | :--------------------------: |
| status | string |    是    | 响应状态，值总是为 `success` |

## 类目

### 类目列表

url: `/category`

method: `GET`

响应消息：

|  字段  |     类型     | 是否必须 |               备注               |
| :----: | :----------: | :------: | :------------------------------: |
| status |    string    |    是    |   响应状态，值总是为 `success`   |
|  data  | Categories[] |    是    | 响应消息，类目组成的树形数据结构 |

### 文章列表（一级）

url: `/category/:topId`

method: `GET`

query列表：

| 字段 | 类型 | 是否必须 |      备注      |
| :--: | :--: | :------: | :------------: |
| page | int  |    否    | 分页获取的页码 |
| size | int  |    否    |  每一页的大小  |

响应消息：

|  字段  |   类型    | 是否必须 |                备注                |
| :----: | :-------: | :------: | :--------------------------------: |
| status |  string   |    是    | 响应状态，值为 `success` 或 `fail` |
| error  |  string   |    否    |      错误消息，有错误时才会有      |
|  data  | Article[] |    否    |      响应的数据，有错误时没有      |
| count  |    int    |    否    |     总的文章数量，有错误时没有     |

### 文章列表（二级）

url: `/category/:topId/:twoId`

method: `GET`

query列表：

| 字段 | 类型 | 是否必须 |      备注      |
| :--: | :--: | :------: | :------------: |
| page | int  |    否    | 分页获取的页码 |
| size | int  |    否    |  每一页的大小  |

响应消息：

|  字段  |   类型    | 是否必须 |                备注                |
| :----: | :-------: | :------: | :--------------------------------: |
| status |  string   |    是    | 响应状态，值为 `success` 或 `fail` |
| error  |  string   |    否    |      错误消息，有错误时才会有      |
|  data  | Article[] |    否    |      响应的数据，有错误时没有      |
| count  |    int    |    否    |     总的文章数量，有错误时没有     |

### 添加类目（一级）

url: `/category/topLevel`

method: `POST`

参数列表：

|     字段     |  类型  | 是否必须 |      备注      |
| :----------: | :----: | :------: | :------------: |
| categoryName | string |    是    | 类目名称，唯一 |

响应消息：

|  字段  |        类型        | 是否必须 |                备注                |
| :----: | :----------------: | :------: | :--------------------------------: |
| status |       string       |    是    | 响应状态，值为 `success` 或 `fail` |
| error  |      string[]      |    否    |      错误消息，有错误时才会有      |
|  data  | TopLevelCategory[] |    否    |    添加成功的数据，有错误时没有    |

### 添加类目（二级）

url: `/category/twoLevel`

method: `POST`

参数列表：

|     字段     |  类型  | 是否必须 |           备注           |
| :----------: | :----: | :------: | :----------------------: |
| categoryName | string |    是    | 类目名称，一级类目下唯一 |
|    parent    | string |    是    |    所属一级类目的_id     |

响应消息：

|  字段  |        类型        | 是否必须 |                备注                |
| :----: | :----------------: | :------: | :--------------------------------: |
| status |       string       |    是    | 响应状态，值为 `success` 或 `fail` |
| error  |      string[]      |    否    |      错误消息，有错误时才会有      |
|  data  | TwoLevelCategory[] |    否    |    添加成功的数据，有错误时没有    |

### 修改类目（一级）

url: `/category/topLevel/:id`

method: `PUT`

参数列表：

|     字段     |  类型  | 是否必须 |      备注      |
| :----------: | :----: | :------: | :------------: |
| categoryName | string |    是    | 类目名称，唯一 |

响应消息：

|  字段  |   类型   | 是否必须 |                备注                |
| :----: | :------: | :------: | :--------------------------------: |
| status |  string  |    是    | 响应状态，值为 `success` 或 `fail` |
| error  | string[] |    否    |      错误消息，有错误时才会有      |

### 修改类目（二级）

url: `/category/twoLevel/:id`

method: `PUT`

参数列表：

|     字段     |  类型  | 是否必须 |   备注   |
| :----------: | :----: | :------: | :------: |
| categoryName | string |    是    | 类目名称 |

响应消息：

|  字段  |   类型   | 是否必须 |                备注                |
| :----: | :------: | :------: | :--------------------------------: |
| status |  string  |    是    | 响应状态，值为 `success` 或 `fail` |
| error  | string[] |    否    |      错误消息，有错误时才会有      |

### 删除类目（一级）

url: `/category/topLevel/:id`

method: `DELETE`

响应消息：

|  字段  |  类型  | 是否必须 |                备注                |
| :----: | :----: | :------: | :--------------------------------: |
| status | string |    是    | 响应状态，值为 `success` 或 `fail` |
| error  | string |    否    |      错误消息，有错误时才会有      |

### 删除类目（二级）

url: `/category/twoLevel/:id`

method: `DELETE`

响应消息：

|  字段  |  类型  | 是否必须 |                备注                |
| :----: | :----: | :------: | :--------------------------------: |
| status | string |    是    | 响应状态，值为 `success` 或 `fail` |
| error  | string |    否    |      错误消息，有错误时才会有      |

## 标签

### 标签列表

url: `/tag`

method: `GET`

响应消息：

|  字段  |  类型  | 是否必须 |            备注            |
| :----: | :----: | :------: | :------------------------: |
| status | string |    是    | 响应状态，值总为 `success` |
|  data  | Tag[]  |    是    |          响应数据          |

### 文章列表（分页）

url: `/tag/:topId`

method: `GET`

query列表：

| 字段 | 类型 | 是否必须 |      备注      |
| :--: | :--: | :------: | :------------: |
| page | int  |    否    | 分页获取的页码 |
| size | int  |    否    |  每一页的大小  |

响应消息：

|  字段  |   类型    | 是否必须 |                备注                |
| :----: | :-------: | :------: | :--------------------------------: |
| status |  string   |    是    | 响应状态，值为 `success` 或 `fail` |
| error  |  string   |    否    |      错误消息，有错误时才会有      |
|  data  | Article[] |    否    |      响应的数据，有错误时没有      |
| count  |    int    |    否    |     总的文章数量，有错误时没有     |

### 添加标签

url: `/tag`

method: `POST`

参数列表：

|  字段   |  类型  | 是否必须 |      备注      |
| :-----: | :----: | :------: | :------------: |
| tagName | string |    是    | 类目名称，唯一 |

响应消息：

|  字段  |   类型   | 是否必须 |                备注                |
| :----: | :------: | :------: | :--------------------------------: |
| status |  string  |    是    | 响应状态，值为 `success` 或 `fail` |
| error  | string[] |    否    |      错误消息，有错误时才会有      |
|  data  |   Tag    |    否    |    添加成功的数据，有错误时没有    |

### 修改标签

url: `/tag/:id`

method: `PUT`

参数列表：

|  字段   |  类型  | 是否必须 |      备注      |
| :-----: | :----: | :------: | :------------: |
| tagName | string |    是    | 类目名称，唯一 |

响应消息：

|  字段  |   类型   | 是否必须 |                备注                |
| :----: | :------: | :------: | :--------------------------------: |
| status |  string  |    是    | 响应状态，值为 `success` 或 `fail` |
| error  | string[] |    否    |      错误消息，有错误时才会有      |

### 删除标签

url: `/tag/:id`

method: `DELETE`

响应消息：

|  字段  |  类型  | 是否必须 |                备注                |
| :----: | :----: | :------: | :--------------------------------: |
| status | string |    是    | 响应状态，值为 `success` 或 `fail` |
| error  | string |    否    |      错误消息，有错误时才会有      |