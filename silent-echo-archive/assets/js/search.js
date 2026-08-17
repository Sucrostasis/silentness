// 搜索脚本 - 档案检索功能与异常检测

var recordingsData = null;

document.addEventListener('DOMContentLoaded', function() {
    loadRecordings();
    initSearchForm();
    checkInitialSearch();
});

// 加载录音数据
function loadRecordings() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/recordings.json', false);
    xhr.send();
    
    if (xhr.status === 200) {
        recordingsData = JSON.parse(xhr.responseText);
    }
}

// 初始化搜索表单
function initSearchForm() {
    var form = document.getElementById('search-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var query = document.getElementById('search-input').value.trim();
        performSearch(query);
    });
}

// 检查初始 URL 中的搜索参数
function checkInitialSearch() {
    var query = getQueryParam('q');
    if (query) {
        document.getElementById('search-input').value = query;
        performSearch(query);
    } else {
        // 无搜索词时显示全部
        displayResults(recordingsData.recordings);
    }
}

// 执行搜索
function performSearch(query) {
    if (!recordingsData) return;
    
    var anomalyKeywords = ['静默', '回声', '7742', '空白', '北岭'];
    var isAnomaly = false;
    
    for (var i = 0; i < anomalyKeywords.length; i++) {
        if (query.indexOf(anomalyKeywords[i]) !== -1) {
            isAnomaly = true;
            break;
        }
    }
    
    if (isAnomaly) {
        triggerAnomalyState(query);
    }
    
    // 正常过滤
    var results = [];
    var q = query.toLowerCase();
    
    for (var i = 0; i < recordingsData.recordings.length; i++) {
        var rec = recordingsData.recordings[i];
        if (rec.title.toLowerCase().indexOf(q) !== -1 ||
            rec.tags.some(function(tag) { return tag.toLowerCase().indexOf(q) !== -1; }) ||
            rec.id.indexOf(q) !== -1) {
            results.push(rec);
        }
    }
    
    displayResults(results);
}

// 触发异常状态
function triggerAnomalyState(query) {
    var anomalySection = document.getElementById('anomaly-section');
    var checksumHint = document.getElementById('checksum-hint');
    
    if (anomalySection) {
        anomalySection.classList.remove('hidden');
    }
    
    if (checksumHint) {
        checksumHint.style.display = 'block';
        checksumHint.addEventListener('click', function() {
            console.log('checksum required: ts=19870412T031500Z');
        });
    }
    
    // 在结果表格中插入隐藏条目 #3991
    insertHiddenEntry();
}

// 插入隐藏条目
function insertHiddenEntry() {
    var tbody = document.getElementById('results-body');
    if (!tbody) return;
    
    // 检查是否已存在
    if (document.getElementById('hidden-entry-3991')) return;
    
    var row = document.createElement('tr');
    row.id = 'hidden-entry-3991';
    row.setAttribute('data-ts', '19870412T031500Z');
    row.innerHTML = '<td><a href="item.html?id=3991&ts=19870412T031500Z">#3991</a></td>' +
                    '<td>未命名环境音片段</td>' +
                    '<td>1987</td>' +
                    '<td>00:07</td>' +
                    '<td>磁带</td>' +
                    '<td>部分损坏</td>';
    
    tbody.insertBefore(row, tbody.firstChild);
}

// 显示搜索结果
function displayResults(results) {
    var countEl = document.getElementById('result-count');
    var tbody = document.getElementById('results-body');
    
    if (countEl) {
        countEl.textContent = '找到 ' + results.length + ' 条记录';
    }
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    for (var i = 0; i < results.length; i++) {
        var rec = results[i];
        var row = document.createElement('tr');
        row.innerHTML = '<td><a href="item.html?id=' + rec.id + '">' + formatId(rec.id) + '</a></td>' +
                        '<td>' + rec.title + '</td>' +
                        '<td>' + rec.year + '</td>' +
                        '<td>' + rec.duration + '</td>' +
                        '<td>' + rec.medium + '</td>' +
                        '<td>' + rec.status + '</td>';
        tbody.appendChild(row);
    }
}

function formatId(id) {
    return '#' + id;
}

// 工具函数：获取 URL 参数
function getQueryParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
