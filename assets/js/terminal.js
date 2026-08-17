// 终端脚本 - 伪终端页面专用实现（与 clues.js 配合使用）
// 此文件主要用于 terminal.html 的独立功能

document.addEventListener('DOMContentLoaded', function() {
    // 如果 clues.js 已处理，则无需重复初始化
    if (window.terminalInitialized) return;
    window.terminalInitialized = true;
});
