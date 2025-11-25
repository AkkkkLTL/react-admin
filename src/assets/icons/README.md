# SVG Icon 命名规范
## 格式
Icon 命名遵循以下模式：
```text
prefix-name[-variant]
```
- `prefix`：前缀，用于区分不同的图标集
- `name`：图标名称，用于标识具体的图标
- `variant`：变体，用于区分不同的图标样式
## 前缀（prefix）类型
- `ic` - 界面/UI 图标（按钮，导航等）
- `logo` - 品牌标识
- `flag` - 国家或地区标志
- `ill`- 插图
## 命名规则
1. 使用小写字母
2. 单词之间用连字符(-)分隔
3. 使用描述性和简洁的名称
4. 用连字符（-）添加变体（variant），例如：`-dark`, `-filled`
## 文件格式要求
- 格式：仅限于 SVG 文件
- 干净的 SVG 代码，没有额外的属性或注释
- 适当的 viewBox 属性
- 使用 currentColor 填充以支持主题更改
## 示例
```text
ic-dashboard    // Dashboard 图标
ic-user         // User 图标
ic-file-pdf     // PDF 文件图标
logo-company    // Company 品牌标识
flag-us         // United States 标志
ic-home-outlined // Home 图标（变体）