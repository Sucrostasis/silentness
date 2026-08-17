# 素材清单

## 文件总览

本项目包含以下类型的素材文件：

### HTML 页面（13 个）
- index.html - 首页
- about.html - 关于页
- archive.html - 档案检索页
- item.html - 档案详情页
- contact.html - 联系页
- 404.html - 404 页面
- hidden/maintenance.html - 维护索引页
- hidden/terminal.html - 终端页
- hidden/fragment.html - 碎片页
- endings/public.html - 公开结局
- endings/silent.html - 静默结局

### CSS 样式表（1 个）
- assets/css/main.css - 主样式表

### JavaScript 脚本（5 个）
- assets/js/main.js - 全局功能
- assets/js/search.js - 搜索功能
- assets/js/clues.js - 线索与终端逻辑
- assets/js/terminal.js - 终端辅助
- assets/js/data.js - 终端数据

### 数据文件（1 个）
- data/recordings.json - 档案数据

### 配置文件（2 个）
- robots.txt - 机器人协议
- sitemap.xml - 站点地图

### SVG 图片（3 个占位）
- assets/img/logo.svg - 网站标志
- assets/img/tape-7742.svg - 磁带图标
- assets/img/waveform.svg - 波形图

### 音频文件（3 个占位）
- assets/audio/silence_01.mp3
- assets/audio/silence_02.mp3
- assets/audio/echo_fragment.mp3

---

## SVG 占位图说明

### logo.svg
**用途**：网站标志，出现在所有页面头部
**当前状态**：已生成简单圆形声波图案
**尺寸**：48x48px
**颜色**：灰蓝色 (#1d3a5f)

如需替换：
- 可设计更复杂的声学相关标志
- 建议使用矢量格式保持清晰
- 保持低饱和度配色

### tape-7742.svg
**用途**：#7742 磁带的视觉表示
**当前状态**：已生成简单磁带轮廓
**标签**：显示"7742"字样
**颜色**：低饱和度

如需替换：
- 可设计更真实的磁带插图
- 添加做旧效果增强氛围
- 考虑添加阴影和质感

### waveform.svg
**用途**：音频波形可视化
**当前状态**：已生成平直波形线带轻微凸起
**含义**：象征几乎静默但有异常的声音

如需替换：
- 可使用真实音频的频谱图
- 或设计更具神秘感的波形图案
- 考虑添加对称折叠结构暗示

---

## 音频占位说明

### 当前状态
assets/audio/ 目录中的 MP3 文件目前是占位文本文件，内容为：
```
这是占位文件，请替换为真实音频。
```

### 需要替换的文件

#### silence_01.mp3
- **建议时长**：7 秒
- **内容**：接近静默的白噪声
- **用途**：普通档案试听占位
- **生成方式**：
  1. 使用 Audacity 生成白噪声
  2. 将音量降至极低（-40dB 或更低）
  3. 导出为 MP3

#### silence_02.mp3
- **建议时长**：14 秒
- **内容**：带轻微底噪的空白磁带
- **用途**：长音频占位
- **生成方式**：
  1. 录制真实磁带空白段
  2. 或使用模拟磁带噪声采样
  3. 保留轻微的嘶嘶声

#### echo_fragment.mp3
- **建议时长**：7 秒（可循环）
- **内容**：低频脉冲，极弱
- **用途**：#7742 的关键音频
- **生成方式**：
  1. 生成 20-40Hz 正弦波
  2. 添加振幅调制（每 7 秒一次脉冲）
  3. 通过低通滤波器
  4. 混入极少量白噪声
  5. 整体音量保持在可听边缘

### 音频实现建议

#### 方案 A：使用真实音频
1. 使用 DAW（如 Audacity、Reaper）生成
2. 导出为 MP3 格式（128kbps 足够）
3. 放入 assets/audio/ 目录
4. 刷新页面测试

#### 方案 B：保持占位
- 当前实现已处理音频加载失败的情况
- 播放器会显示"音频不可用。档案可能已损坏。"
- 不影响 ARG 流程进行
- 适合纯文本/视觉体验

#### 方案 C：使用 Web Audio API（进阶）
如需动态生成音频，可修改 item.html：
```javascript
// 示例：生成低频脉冲
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var oscillator = audioCtx.createOscillator();
oscillator.type = 'sine';
oscillator.frequency.value = 30; // 30Hz
oscillator.connect(audioCtx.destination);
oscillator.start();
```

---

## 文案素材

### 已完成文案
所有页面文案已完整写入对应 HTML 文件中，包括：

1. **首页**
   - 标题、副标题
   - 欢迎简介
   - 推荐馆藏说明

2. **关于页**
   - 项目简介
   - 收录范围
   - 数字化流程
   - 版权声明
   - 志愿者致谢

3. **检索页**
   - 搜索说明
   - 表格列头
   - 异常提示信息

4. **详情页**
   - 档案元数据模板
   - 技术备注
   - #7742 隐藏详情

5. **联系页**
   - 表单字段标签
   - 提交响应文案
   - 隐藏提示

6. **终端**
   - 所有命令输出文案
   - 系统状态信息
   - 日志片段

7. **结局**
   - 公开结局全文
   - 静默结局全文

### 文案风格指南
- **语气**：正式、克制、档案化
- **用词**：避免夸张、避免营销感
- **人称**：第三人称，客观描述
- **禁忌**：不使用"游戏""解谜""ARG"等词
- **安全**：页脚必须有虚构声明

---

## 作者资料

author/ 目录包含仅供创作者和测试者参考的文档：

- story.md - 完整故事设定和世界观
- script.md - 玩家流程剧本
- puzzle-solution.md - 谜题答案和测试清单
- materials.md - 本文件（素材清单）

这些文件不会出现在网站导航中，普通访问者无法直接看到。

---

## 文件依赖关系

```
index.html
├── assets/css/main.css
├── assets/js/main.js
├── assets/js/data.js
└── assets/img/logo.svg

archive.html
├── assets/css/main.css
├── assets/js/main.js
├── assets/js/data.js
├── assets/js/search.js
└── data/recordings.json

item.html
├── assets/css/main.css
├── assets/js/main.js
├── assets/js/data.js
└── assets/js/clues.js

hidden/maintenance.html
├── ../assets/css/main.css
├── ../assets/js/main.js
├── ../assets/js/data.js
└── ../assets/js/clues.js

hidden/terminal.html
├── ../assets/css/main.css
├── ../assets/js/main.js
├── ../assets/js/data.js
├── ../assets/js/clues.js
└── ../assets/js/terminal.js
```

---

## 可选扩展素材

如需增强体验，可考虑添加：

### 额外音频
- 更多环境音样本
- 不同质量的录音版本
- 经过处理的"异常"音频

### 额外图片
- 档案馆建筑照片（虚构）
- 设备照片（磁带机、示波器）
- 志愿者工作场景

### 额外文档
- PDF 格式的"内部备忘录"
- 扫描的"手写笔记"
- "技术报告"截图

### 交互元素
- 可拖动的频谱分析器
- 可调节的滤波器
- 可切换的视图模式

---

## 素材替换步骤

1. **备份原文件**
   ```bash
   cp assets/img/logo.svg assets/img/logo.svg.bak
   ```

2. **准备新素材**
   - 确保格式兼容（SVG、MP3）
   - 检查文件大小（建议单文件<1MB）
   - 测试在浏览器中的表现

3. **替换文件**
   ```bash
   mv new-logo.svg assets/img/logo.svg
   ```

4. **刷新测试**
   - 清除浏览器缓存
   - 重新加载页面
   - 检查显示效果

5. **回归测试**
   - 运行 puzzle-solution.md 中的测试清单
   - 确保所有功能正常

---

## 技术规格总结

| 类型 | 格式 | 尺寸/时长 | 数量 | 状态 |
|------|------|-----------|------|------|
| HTML | HTML5 | - | 13 | 完成 |
| CSS | CSS3 | - | 1 | 完成 |
| JS | ES5 | - | 5 | 完成 |
| JSON | JSON | - | 1 | 完成 |
| SVG | SVG 1.1 | 48-200px | 3 | 占位 |
| MP3 | MPEG-1 Layer 3 | 7-14s | 3 | 占位 |
| TXT | Markdown | - | 4 | 完成 |
