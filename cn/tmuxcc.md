---
layout: default
permalink: /cn/tmuxcc
title: iTerm2 tmux 集成模式 – 无缝 tmux 会话控制与工作流优化
description: "iTerm2 tmux -CC 集成模式使用指南，介绍如何在 iTerm2 中实现无感 tmux 会话管理、窗口分屏控制以及断线自动恢复，简化 tmux 使用流程，无需记忆复杂命令。"
---

# iTerm2 tmux 集成模式 – 无缝 tmux 会话控制与工作流优化

使用 `iTerm2` tmux 集成模式，你无需记忆 `tmux` 命令或快捷键。可以轻松创建新标签页、分割窗口，并在重新连接后自动恢复会话状态。

使用方法超级简单，只要在 `iTerm2` 中使用 `tmux` 时加上 `-CC` 参数即可：

- 例如：`tmux` 变成 `tmux -CC`；
- 又如：`tmux new-session -A -s xxx` 变成 `tmux -CC new-session -A -s xxx`。

在 `~/.ssh/config` 中如下配置，`ssh` 登录即自动恢复上次所有窗口和程序，意外断开时程序也会继续运行：

```
Host xxxxx
    RequestTTY Yes
    RemoteCommand tmux -u -CC new-session -A -D -X -s yyyyy /bin/bash
# 以上 xxxxx 和 yyyyy 你可以替换成任意你喜欢的名称
```

iTerm2 的文档：[tmux Integration](https://iterm2.com/documentation-tmux-integration.html)

## 常用快捷键介绍

以下快捷键属于 `iTerm2`，兼容未使用 `tmux` 的场景。

- `command + t` 新开 tab 窗口
- `command + d` 左右分屏
- `command + shift + d` 上下分屏
- `command + [` 或 `command + ]` 切换分屏
- `command + <-` 或 `command + ->` 切换 tab 窗口
- `command + shift + enter` 将某个分屏全屏化，或还原
- `command + fn + <-` 滚动到当前输出的最前面
- `command + fn + ->` 滚动到当前输出的最后面
- `command + k` 清空当前的所有输出
- `command + control + shift + d` 分离 tmux，重新连接会恢复打开的所有窗口

## 隐藏 tmux 控制窗口

在默认情况下，运行 `tmux -CC` 后，`iTerm2` 会显示两个窗口，原窗口会如下显示：

```
** tmux mode started **

Command Menu
----------------------------
esc    Detach cleanly.
  X    Force-quit tmux mode.
  L    Toggle logging.
  C    Run tmux command.
```

可以通过设置将此窗口隐藏起来，`iTerm2 -> Preferences... / Settings... -> General -> tmux`：

选中 `Automatically bury the tmux client session after connecting` 即可。

## 新窗口打开方式

可以按自己的喜好，设置打开新窗口的方式，`iTerm2 -> Preferences... / Settings... -> General -> tmux`：

在 `When attaching, restore windows as:` 中选择自己喜欢的方式即可。

设置后运行 `tmux -CC` 试试，就能看出每种方式有什么不同，这里不再赘述。

## 隐藏分屏标题栏

在默认情况下，使用 `tmux -CC` 分屏的窗口会显示一行标题栏，非常丑。

可以通过设置将分屏标题栏隐藏起来，`iTerm2 -> Preferences... / Settings... -> Appearance -> Panes`：

不要选中 `Show per-pane title bar with split panes` 即可。

## 非活动窗口样式

在默认情况下，使用 `tmux -CC` 分屏的窗口在不活动时是灰色的，非常丑。

可以通过设置优化不活动窗口的样式，`iTerm2 -> Preferences... / Settings... -> Appearance -> Dimming`：

选中 `Dimming affects only text, not background.` 即可。
