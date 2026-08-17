# 静默回声声学档案馆 - 项目说明

## 项目简介

《静默回声档案馆》（Silent Echo Sound Archive）是一个虚构的 ARG 网站原型。

这个网站表面上是一个民间声学资料数字档案馆，提供旧录音、环境音、广播片段、田野录音的检索和试听。但玩家会逐渐发现档案馆隐藏着一批编号为 #7742 至 #7750 的异常磁带，并通过一系列线索和解谜，最终找到 #7742 号磁带的真相，并选择"公开档案"或"继续静默"。

**本项目是虚构叙事作品，不用于冒充真实机构。**

## 本地运行方式

1. 进入项目目录：
   ```bash
   cd silent-echo-archive
   ```

2. 启动本地 HTTP 服务器：
   ```bash
   python -m http.server 8080
   ```

3. 在浏览器中访问：
   ```
   http://localhost:8080
   ```

## 目录说明

```
silent-echo-archive/
├── index.html          # 首页
├── about.html          # 关于页
├── archive.html        # 档案检索页
├── item.html           # 档案详情页
├── contact.html        # 联系页
├── 404.html            # 404 页面
├── robots.txt          # 机器人协议（含隐藏线索）
├── sitemap.xml         # 站点地图（含隐藏线索）
├── README.md           # 本文件
├── author/             # 作者资料目录（不在网站导航中）
│   ├── story.md        # 完整故事设定
│   ├── script.md       # 玩家流程剧本
│   ├── puzzle-solution.md  # 谜题答案表
│   └── materials.md    # 素材清单
├── assets/             # 静态资源
│   ├── css/
│   │   └── main.css    # 主样式表
│   ├── js/
│   │   ├── main.js     # 全局功能
│   │   ├── search.js   # 搜索功能
│   │   ├── clues.js    # 线索与终端逻辑
│   │   ├── terminal.js # 终端辅助
│   │   └── data.js     # 终端数据
│   ├── audio/          # 音频占位文件
│   └── img/            # SVG 占位图片
├── hidden/             # 隐藏页面
│   ├── maintenance.html  # 维护索引页
│   ├── terminal.html     # 终端页
│   └── fragment.html     # 碎片页
├── endings/            # 结局页面
│   ├── public.html     # 公开结局
│   └── silent.html     # 静默结局
└── data/
    └── recordings.json # 档案数据
```

## 表层页面入口

普通用户可访问的页面：
- `/index.html` - 首页
- `/about.html` - 关于
- `/archive.html` - 档案检索
- `/item.html?id=编号` - 档案详情
- `/contact.html` - 联系

## 隐藏内容说明（作者与测试用）

以下页面不在网站导航中显示，需通过特定条件访问：

### hidden/ 目录
- `/hidden/maintenance.html` - 维护索引页（需从 item.html?id=3991&ts=19870412T031500Z 进入）
- `/hidden/terminal.html` - 终端页（需在 maintenance.html 输入正确序列码）
- `/hidden/fragment.html` - 碎片页（robots.txt 中暗示）

### endings/ 目录
- `/endings/public.html` - 公开结局
- `/endings/silent.html` - 静默结局

## 如何替换音频占位文件

`assets/audio/` 目录中的音频文件目前是占位文本文件。如需真实音频体验：

1. 准备以下音频文件：
   - `silence_01.mp3` - 7 秒接近静默的白噪声
   - `silence_02.mp3` - 14 秒带轻微底噪的空白磁带
   - `echo_fragment.mp3` - 7 秒低频脉冲（极弱，不要刺耳）

2. 将生成的 MP3 文件放入 `assets/audio/` 目录

3. 刷新页面即可播放

建议音频生成方式：
- 使用 Audacity 生成白噪声
- 使用合成器生成低频正弦波（约 20-40Hz）
- 添加极轻微的振幅调制模拟脉冲效果

## 如何修改 recordings.json

编辑 `data/recordings.json` 文件，每条记录格式如下：

```json
{
  "id": "0001",
  "title": "标题",
  "year": "年份",
  "duration": "时长",
  "medium": "介质",
  "status": "状态",
  "tags": ["标签"]
}
```

注意：
- `id` 字段用于 URL 参数和检索
- `tags` 数组中的词可用于搜索匹配
- 不要直接在此文件中暴露 #7742

## 如何重置本地状态

ARG 状态存储在浏览器 localStorage 中。如需重置：

方法一：使用快捷键
- 在任意页面按下 `Ctrl+Shift+Q`
- 系统将清除状态并返回首页

方法二：手动清除
- 打开浏览器开发者工具（F12）
- 进入 Application/Cookies 标签
- 找到 localStorage
- 删除 `sesa_maintenance_verified` 和 `sesa_7742_unlocked`

方法三：使用 JavaScript 控制台
```javascript
localStorage.removeItem('sesa_maintenance_verified');
localStorage.removeItem('sesa_7742_unlocked');
location.reload();
```

## 安全声明

1. **虚构性质**：本网站为虚构叙事作品，所有机构、人物与事件均为创作。

2. **非真实机构**：本站不模仿任何真实政府、大学、公司、档案馆或广播电台。

3. **无数据收集**：联系表单、订阅、登录等功能仅做前端模拟，不收集真实用户信息。

4. **本地存储**：所有状态数据仅存储在用户浏览器 localStorage 中，不上传至任何服务器。

5. **无外部请求**：本站不使用外部 CDN、字体、JS 库，不发送真实外部请求。

6. **退出机制**：随时可按 `Ctrl+Shift+Q` 退出隐藏层并清除状态。

## 技术栈

- HTML5
- CSS3
- 原生 JavaScript (ES5)
- JSON 数据文件
- 无后端框架
- 无数据库
- 无外部依赖

## 谜题链概览（测试用）

1. **第一层**：在 archive.html 搜索"静默""回声"或"7742"触发异常
2. **第二层**：查看源码或 console 获取时间戳 `ts=19870412T031500Z`
3. **第三层**：访问 `item.html?id=3991&ts=19870412T031500Z` 显示维护入口
4. **第四层**：在首页源码找到 Base64 `U0VMRUNULzEvMzk5MQ==`，解码得 `SELECT/1/3991`
5. **第五层**：在 maintenance.html 输入 `SELECT/1/3991` 进入终端
6. **第六层**：在终端输入 `frequency 7742` 然后 `y` 然后 `decode`
7. **第七层**：访问 `item.html?id=7742` 做出最终选择

详细答案请参考 `author/puzzle-solution.md`
