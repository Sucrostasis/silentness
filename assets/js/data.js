// 数据文件 - 终端命令输出与隐藏日志

var TerminalData = {
    commands: {
        help: [
            "SESA MAINTENANCE TERMINAL - Available Commands:",
            "-------------------------------------------",
            "help       - Show this help message",
            "status     - Show system status",
            "scan       - Scan low-frequency bands",
            "list       - List tape inventory",
            "open       - Open archive (requires authorization)",
            "play       - Play audio fragment",
            "frequency  - Analyze frequency band",
            "decode     - Decode echo pattern",
            "unlock     - Unlock restricted archive",
            "clear      - Clear terminal output",
            "exit       - Close session"
        ],
        status: [
            "index: read-only",
            "tape_drive: offline",
            "echo_channel: suspended",
            "last_operator: unknown",
            "pending_object: #7742"
        ],
        scan: [
            "Scanning low-frequency bands...",
            "Found irregular pulse at band 7742.",
            "Signal is silent but structured."
        ],
        list: [
            "#7741 normal",
            "#7742 restricted",
            "#7743 empty",
            "#7744 empty",
            "#7745 corrupted",
            "#7746 empty",
            "#7747 normal",
            "#7748 missing",
            "#7749 unreadable",
            "#7750 sealed"
        ],
        open_denied: [
            "Access denied.",
            "Reason: public hearing not authorized."
        ],
        frequency_7742: [
            "Band 7742 accepted.",
            "Echo pattern detected.",
            "Do you want to decode? y/n"
        ],
        decode: [
            "Decoding...",
            "Fragment recovered:",
            "\"Do not make it audible.\"",
            "Operator H. last note incomplete.",
            "",
            "Object #7742 can now be viewed.",
            "Return to item.html?id=7742"
        ],
        exit: [
            "Session closed. The archive remains silent."
        ],
        unknown: function(cmd) {
            return "Unknown command: " + cmd + ". Type 'help' for available commands.";
        }
    },
    
    logs: {
        lin_yan: [
            "[LOG-001] 元数据录入开始",
            "[LOG-002] #7742 号磁带标记为'空白'",
            "[LOG-003] 系统自动创建临时文件.tmp_7742",
            "[LOG-004] 临时文件在次日消失",
            "[LOG-005] 申请调取原始磁带，未获批准"
        ],
        zhou_lan: [
            "[DENOISE-01] 开始降噪处理",
            "[DENOISE-02] 低频区域存在规律性脉冲",
            "[DENOISE-03] 脉冲间隔约 7 秒",
            "[DENOISE-04] 尝试过滤后，耳机中出现延迟回声",
            "[DENOISE-05] 停止处理，转交下一环节"
        ],
        he_mo: [
            "[AUTO-SCRIPT] 自动化归档脚本 v0.3",
            "[AUTO-SCRIPT] 检测到#7742 存在异常元数据",
            "[AUTO-SCRIPT] 系统于 03:15 自动启动归档程序",
            "[AUTO-SCRIPT] 无人操作状态下完成压缩",
            "[AUTO-SCRIPT] 备注字段出现未知文本：'不要把它转成可听见的。'",
            "[AUTO-SCRIPT] 脚本终止，标记为.null"
        ]
    }
};
