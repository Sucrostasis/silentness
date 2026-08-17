// 线索脚本 - 处理隐藏条目、维护页验证与终端解锁

document.addEventListener('DOMContentLoaded', function() {
    var path = window.location.pathname;
    
    // 根据页面类型初始化
    if (path.indexOf('item.html') !== -1) {
        initItemPage();
    } else if (path.indexOf('maintenance.html') !== -1) {
        initMaintenancePage();
    } else if (path.indexOf('terminal.html') !== -1) {
        initTerminalPage();
    } else if (path.indexOf('public.html') !== -1 || path.indexOf('silent.html') !== -1) {
        initEndingsPage();
    }
});

// 初始化档案详情页
function initItemPage() {
    var id = getQueryParam('id');
    var ts = getQueryParam('ts');
    var content = document.getElementById('item-content');
    
    if (!id) {
        content.innerHTML = '<p>未指定档案编号。请从检索页进入。</p>';
        return;
    }
    
    // 特殊处理 #7742
    if (id === '7742') {
        handle7742(content);
        return;
    }
    
    // 特殊处理 #3991 + ts 参数
    if (id === '3991' && ts === '19870412T031500Z') {
        loadRecordingDetail(id, content, true);
        return;
    }
    
    // 普通档案
    loadRecordingDetail(id, content, false);
}

// 处理 #7742 页面
function handle7742(content) {
    var unlocked = localStorage.getItem('sesa_7742_unlocked');
    
    if (unlocked !== 'true') {
        content.innerHTML = '<section>' +
            '<h2>档案编号 #7742</h2>' +
            '<p>该编号暂时不可访问。请返回检索页。</p>' +
            '<p><a href="archive.html">返回检索</a></p>' +
            '</section>';
        return;
    }
    
    // 已解锁，显示隐藏详情和选择
    content.innerHTML = '<section>' +
        '<h2>档案编号 #7742</h2>' +
        '<p><strong>标题：</strong>低频回声片段（未分类）</p>' +
        '<p><strong>年份：</strong>1987</p>' +
        '<p><strong>时长：</strong>00:07（循环）</p>' +
        '<p><strong>介质：</strong>磁带</p>' +
        '<p><strong>状态：</strong>受限 - 已解锁</p>' +
        '<p><strong>技术备注：</strong></p>' +
        '<ul>' +
        '<li>每 7 秒出现一次低频脉冲</li>' +
        '<li>波形呈对称折叠</li>' +
        '<li>频谱图中形成类似走廊结构</li>' +
        '<li>与北岭实验广播站停电记录时间同步</li>' +
        '</ul>' +
        '<p><strong>志愿者备注：</strong></p>' +
        '<blockquote>"不要把它转成可听见的。" — Operator H.</blockquote>' +
        '<div class="choice-buttons">' +
        '<p>你决定：</p>' +
        '<button onclick="choosePublic()">公开档案</button>' +
        '<button onclick="chooseSilent()">继续静默</button>' +
        '</div>' +
        '</section>';
}

function choosePublic() {
    window.location.href = 'endings/public.html';
}

function chooseSilent() {
    window.location.href = 'endings/silent.html';
}

// 加载普通档案详情
function loadRecordingDetail(id, content, showMaintenanceLink) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/recordings.json', false);
    xhr.send();
    
    if (xhr.status !== 200) {
        content.innerHTML = '<p>无法加载档案数据。</p>';
        return;
    }
    
    var data = JSON.parse(xhr.responseText);
    var recording = null;
    
    for (var i = 0; i < data.recordings.length; i++) {
        if (data.recordings[i].id === id) {
            recording = data.recordings[i];
            break;
        }
    }
    
    if (!recording) {
        content.innerHTML = '<p>未找到该档案。</p><p><a href="archive.html">返回检索</a></p>';
        return;
    }
    
    var maintenanceLink = showMaintenanceLink ? 
        '<p style="margin-top:30px;"><a href="hidden/maintenance.html" style="color:#666;">维护索引 / 回声通道</a></p>' : '';
    
    content.innerHTML = '<section>' +
        '<h2>档案 #' + recording.id + '</h2>' +
        '<p><strong>标题：</strong>' + recording.title + '</p>' +
        '<p><strong>年份：</strong>' + recording.year + '</p>' +
        '<p><strong>时长：</strong>' + recording.duration + '</p>' +
        '<p><strong>介质：</strong>' + recording.medium + '</p>' +
        '<p><strong>状态：</strong>' + recording.status + '</p>' +
        '<p><strong>标签：</strong>' + recording.tags.join(', ') + '</p>' +
        '<h3>音频试听</h3>' +
        '<audio controls style="width:100%; margin:15px 0;">' +
        '<source src="assets/audio/silence_01.mp3" type="audio/mpeg">' +
        '音频不可用。档案可能已损坏。' +
        '</audio>' +
        '<h3>技术备注</h3>' +
        '<p>本录音为低质量存档版本，仅供学术参考。原始介质保存于恒温恒湿环境中。</p>' +
        '<p><a href="archive.html">返回检索</a></p>' +
        maintenanceLink +
        '</section>';
}

// 初始化维护页
function initMaintenancePage() {
    var form = document.getElementById('verification-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var input = document.getElementById('verify-input').value.trim();
        
        if (input === 'SELECT/1/3991') {
            localStorage.setItem('sesa_maintenance_verified', 'true');
            document.getElementById('verify-result').innerHTML = 
                '<p style="color:#4caf50;">通道已验证。</p>' +
                '<p><a href="terminal.html" style="color:#4caf50;">进入终端</a></p>';
        } else {
            document.getElementById('verify-result').innerHTML = 
                '<p>当前请求已转入低优先级队列。</p>' +
                '<!-- hint: checksum was printed on the front page footer -->';
        }
    });
}

// 初始化终端页
function initTerminalPage() {
    initTerminal();
}

// 初始化结局页
function initEndingsPage() {
    // 结局页不需要特殊初始化
}

// 工具函数：获取 URL 参数
function getQueryParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// 终端实现
function initTerminal() {
    var output = document.getElementById('terminal-output');
    var input = document.getElementById('terminal-input');
    
    if (!output || !input) return;
    
    // 初始输出
    printLine(output, 'SESA MAINTENANCE TERMINAL');
    printLine(output, 'Build 0.9.4');
    printLine(output, 'Last session: 2014-06-19');
    printLine(output, 'Type help for available commands.');
    printLine(output, '');
    
    input.focus();
    
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            var cmd = input.value.trim();
            printLine(output, '> ' + cmd);
            processCommand(cmd, output);
            input.value = '';
            
            // 保持滚动到底部
            output.scrollTop = output.scrollHeight;
        }
    });
}

function printLine(output, text) {
    var line = document.createElement('div');
    line.textContent = text;
    output.appendChild(line);
}

function processCommand(cmd, output) {
    var parts = cmd.split(' ');
    var command = parts[0].toLowerCase();
    var arg = parts[1] || '';
    
    switch(command) {
        case 'help':
            TerminalData.commands.help.forEach(function(line) {
                printLine(output, line);
            });
            break;
            
        case 'status':
            TerminalData.commands.status.forEach(function(line) {
                printLine(output, line);
            });
            break;
            
        case 'scan':
            TerminalData.commands.scan.forEach(function(line) {
                printLine(output, line);
            });
            break;
            
        case 'list':
            TerminalData.commands.list.forEach(function(line) {
                printLine(output, line);
            });
            break;
            
        case 'open':
            if (arg === '7742') {
                TerminalData.commands.open_denied.forEach(function(line) {
                    printLine(output, line);
                });
            } else {
                printLine(output, 'Specify archive ID. Example: open 7742');
            }
            break;
            
        case 'frequency':
            if (arg === '7742') {
                TerminalData.commands.frequency_7742.forEach(function(line) {
                    printLine(output, line);
                });
            } else {
                printLine(output, 'Specify band number. Example: frequency 7742');
            }
            break;
            
        case 'decode':
            var freqAccepted = sessionStorage.getItem('freq_7742_accepted');
            if (freqAccepted === 'true') {
                TerminalData.commands.decode.forEach(function(line) {
                    printLine(output, line);
                });
                localStorage.setItem('sesa_7742_unlocked', 'true');
            } else {
                printLine(output, 'No active decode session. Run "frequency 7742" first.');
            }
            break;
            
        case 'y':
            // 确认解码
            sessionStorage.setItem('freq_7742_accepted', 'true');
            printLine(output, 'Decode session initialized. Type "decode" to proceed.');
            break;
            
        case 'unlock':
            var unlocked = localStorage.getItem('sesa_7742_unlocked');
            if (unlocked === 'true') {
                printLine(output, 'Object #7742 is already unlocked.');
                printLine(output, 'Access via item.html?id=7742');
            } else {
                printLine(output, 'Unlock requires prior decode authorization.');
            }
            break;
            
        case 'clear':
            output.innerHTML = '';
            break;
            
        case 'exit':
            TerminalData.commands.exit.forEach(function(line) {
                printLine(output, line);
            });
            input.disabled = true;
            break;
            
        case '':
            break;
            
        default:
            printLine(output, TerminalData.commands.unknown(command));
    }
}
