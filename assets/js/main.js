// 主脚本 - 全局功能与状态管理

document.addEventListener('DOMContentLoaded', function() {
    initStatusIndicator();
    initExitShortcut();
});

// 初始化状态指示灯
function initStatusIndicator() {
    var indicator = document.getElementById('status-indicator');
    var statusText = document.getElementById('status-text');
    
    if (!indicator) return;
    
    var unlocked = localStorage.getItem('sesa_7742_unlocked');
    
    if (unlocked === 'true') {
        indicator.classList.add('amber');
        if (statusText) {
            statusText.textContent = '监听中（异常）';
        }
    }
}

// 全局退出快捷键 Ctrl+Shift+Q
function initExitShortcut() {
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'Q') {
            e.preventDefault();
            clearARGState();
        }
    });
}

function clearARGState() {
    localStorage.removeItem('sesa_maintenance_verified');
    localStorage.removeItem('sesa_7742_unlocked');
    
    // 显示退出提示
    showExitNotice();
    
    // 返回首页
    window.location.href = 'index.html';
}

function showExitNotice() {
    var notice = document.createElement('div');
    notice.style.position = 'fixed';
    notice.style.bottom = '20px';
    notice.style.left = '50%';
    notice.style.transform = 'translateX(-50%)';
    notice.style.background = '#1a1a1a';
    notice.style.color = '#fff';
    notice.style.padding = '15px 25px';
    notice.style.fontSize = '13px';
    notice.style.zIndex = '9999';
    notice.textContent = '已退出隐藏层。';
    document.body.appendChild(notice);
    
    setTimeout(function() {
        notice.remove();
    }, 3000);
}

// 工具函数：获取 URL 参数
function getQueryParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// 工具函数：Base64 解码
function decodeBase64(str) {
    try {
        return atob(str);
    } catch(e) {
        return '';
    }
}
