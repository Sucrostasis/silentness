# 谜题答案表

## 完整答案清单

### 1. 异常搜索关键词
以下任意一个词在 archive.html 中搜索会触发异常状态：
- `静默`
- `回声`
- `7742`
- `空白`
- `北岭`

### 2. 隐藏时间戳
```
19870412T031500Z
```
含义：1987 年 4 月 12 日 03:15:00 UTC（北岭实验广播站事件发生时间）

### 3. 隐藏条目 ID
```
3991
```

### 4. 隐藏详情 URL
```
item.html?id=3991&ts=19870412T031500Z
```

### 5. 首页 Base64 线索
位置：index.html HTML 源码注释
```html
<!-- archive checksum: U0VMRUNULzEvMzk5MQ== -->
```

### 6. Base64 解码答案
```javascript
atob('U0VMRUNULzEvMzk5MQ==')
// 结果："SELECT/1/3991"
```

### 7. 维护页正确答案
在 hidden/maintenance.html 输入框中输入：
```
SELECT/1/3991
```

### 8. 终端关键命令序列
在 hidden/terminal.html 中依次输入：

```
help           # 查看帮助
status         # 查看系统状态，发现 pending_object: #7742
scan           # 扫描低频，发现 band 7742
list           # 列出磁带，发现#7742 restricted
frequency 7742 # 分析频率带
y              # 确认解码
decode         # 执行解码，解锁#7742
```

### 9. 最终解锁对象
```
#7742
```
访问方式：解锁后访问 `item.html?id=7742`

### 10. 最终选择
两个按钮：
- `公开档案` → endings/public.html
- `继续静默` → endings/silent.html

---

## 测试检查清单

### 表层功能测试
- [ ] 首页正常加载，显示标题、导航、搜索框
- [ ] 推荐馆藏列表显示 4 条记录
- [ ] 系统状态灯默认显示绿色
- [ ] 页脚有虚构声明文字
- [ ] 关于页显示志愿者名单（何默有删除线）
- [ ] 联系表单提交后显示模拟响应
- [ ] 404 页面正确显示

### 检索功能测试
- [ ] 正常搜索词返回匹配结果
- [ ] 搜索"雨声"返回#0001
- [ ] 搜索"北岭"返回#0005
- [ ] 无搜索词时显示全部记录

### 异常触发测试
- [ ] 搜索"静默"显示"索引校验失败"
- [ ] 搜索"回声"显示"索引校验失败"
- [ ] 搜索"7742"显示"索引校验失败"
- [ ] 异常搜索后底部出现浅灰文字"请验证会话完整性"
- [ ] 点击浅灰文字在 Console 输出 `checksum required: ts=19870412T031500Z`
- [ ] 搜索结果中插入隐藏条目#3991

### 隐藏条目测试
- [ ] 访问 item.html?id=3991 显示正常详情页
- [ ] 访问 item.html?id=3991&ts=19870412T031500Z 额外显示"维护索引 / 回声通道"链接
- [ ] 该链接指向 hidden/maintenance.html

### 维护页测试
- [ ] maintenance.html 显示验证表单
- [ ] 输入错误密码显示"低优先级队列"
- [ ] 错误时 HTML 注释包含提示
- [ ] 输入 SELECT/1/3991 显示"通道已验证"
- [ ] 成功后出现"进入终端"链接
- [ ] 链接指向 terminal.html
- [ ] localStorage 设置 sesa_maintenance_verified=true

### 终端测试
- [ ] terminal.html 显示初始欢迎信息
- [ ] 输入 help 显示命令列表
- [ ] 输入 status 显示系统状态（含 pending_object: #7742）
- [ ] 输入 scan 显示低频扫描结果
- [ ] 输入 list 显示磁带列表（#7742 restricted）
- [ ] 输入 open 7742 显示 Access denied
- [ ] 输入 frequency 7742 提示是否解码
- [ ] 输入 y 初始化解码会话
- [ ] 输入 decode 显示解码结果并解锁
- [ ] 解锁后 localStorage 设置 sesa_7742_unlocked=true
- [ ] 输入 exit 关闭会话

### #7742 详情页测试
- [ ] 未解锁时访问 item.html?id=7742 显示"暂时不可访问"
- [ ] 已解锁后访问显示完整详情
- [ ] 显示技术备注和志愿者备注
- [ ] 显示两个选择按钮

### 结局测试
- [ ] 点击"公开档案"跳转到 endings/public.html
- [ ] 公开结局显示相应文案
- [ ] 点击"继续静默"跳转到 endings/silent.html
- [ ] 静默结局清除 sesa_7742_unlocked
- [ ] 两个结局都有返回首页链接

### 全局功能测试
- [ ] Ctrl+Shift+Q 清除所有 ARG 状态
- [ ] 清除后返回首页
- [ ] 状态灯恢复绿色
- [ ] 页脚虚构声明在所有页面显示

### 文件与资源测试
- [ ] robots.txt 正确配置（Disallow /hidden/ 和 /endings/）
- [ ] robots.txt 包含隐藏注释
- [ ] sitemap.xml 不包含 hidden 和 endings 目录
- [ ] sitemap.xml 包含排除注释
- [ ] 所有 CSS 正确加载
- [ ] 所有 JS 正确加载
- [ ] SVG 占位图可正常显示
- [ ] 音频播放器在文件缺失时显示友好提示

### 安全与合规测试
- [ ] 没有使用真实机构名称
- [ ] 没有收集用户真实信息
- [ ] 联系表单不真实提交
- [ ] 没有外部 CDN 依赖
- [ ] 没有表情符号
- [ ] 所有内容为虚构声明

---

## 快速验证脚本

在浏览器 Console 中运行以下代码可快速验证状态：

```javascript
// 检查当前状态
console.log('Maintenance verified:', localStorage.getItem('sesa_maintenance_verified'));
console.log('7742 unlocked:', localStorage.getItem('sesa_7742_unlocked'));

// 直接解锁（测试用）
localStorage.setItem('sesa_maintenance_verified', 'true');
localStorage.setItem('sesa_7742_unlocked', 'true');
console.log('Unlock complete. Refresh and visit item.html?id=7742');

// 重置状态
localStorage.removeItem('sesa_maintenance_verified');
localStorage.removeItem('sesa_7742_unlocked');
console.log('State reset.');
```

---

## 预期游玩时长

- 快速通关（知道答案）：5-10 分钟
- 普通探索（查看线索）：20-40 分钟
- 深度沉浸（阅读所有文案）：40-60 分钟
