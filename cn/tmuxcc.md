---
layout: default
---

# iTerm2 与 tmux -CC 集成

`iTerm2` 支持与 `tmux -CC` 控制模式集成，只要在 `iTerm2` 中使用 `tmux` 时加上 `-CC` 参数即可。

- 例如：`tmux` 变成 `tmux -CC`；
- 又如：`tmux new-session -A -s xxx` 变成 `tmux -CC new-session -A -s xxx`。

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

## 常用快捷键介绍

- `command + d` 左右分屏
- `command + shift + d` 上下分屏
- `command + t` 新开一个 tab 窗口
- `command + control + shift + d` 分离 tmux，运行 `tmux -CC attach` 重新连接会恢复原来打开的所有窗口。

## 隐藏分屏标题栏

在默认情况下，使用 `tmux -CC` 分屏的窗口会显示一行标题栏，非常丑。

可以通过设置将分屏标题栏隐藏起来，`iTerm2 -> Preferences... / Settings... -> Appearance -> Panes`：

不要选中 `Show per-pane title bar with split panes` 即可。

## 非活动窗口样式

在默认情况下，使用 `tmux -CC` 分屏的窗口在不活动时是灰色的，非常丑。

可以通过设置优化不活动窗口的样式，`iTerm2 -> Preferences... / Settings... -> Appearance -> Dimming`：

选中 `Dimming affects only text, not background.` 即可。
