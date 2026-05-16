---
layout: default
permalink: /tmuxcc
title: iTerm2 tmux Integration – Seamless Session Control with tmux Mode
description: "A practical guide to using iTerm2 tmux -CC integration mode for seamless session management, pane control, and automatic session restoration. Learn how to simplify tmux workflows inside iTerm2 without memorizing commands."
---

## iTerm2 tmux Integration – Seamless Session Control with tmux Mode

With `iTerm2` tmux integration mode, you don’t need to manually manage `tmux` commands or shortcuts. You can easily create new tabs, split panes, and restore sessions automatically after reconnecting.

The usage is super simple, just add `-CC` while using `tmux` in `iTerm2`.

- e.g., change `tmux` to `tmux -CC`
- e.g., change `tmux new-session -A -s xxx` to `tmux -CC new-session -A -s xxx`

Configure the following configuration in `~/.ssh/config`. After logging in with `ssh`, all windows and programs from the last time will be automatically restored. The program will also continue to run when it is accidentally disconnected:

```
Host xxxxx
    RequestTTY Yes
    RemoteCommand tmux -u -CC new-session -A -D -X -s yyyyy /bin/bash
## You can replace the above xxxxx and yyyyy with any name you like
```

iTerm2 documentation: [tmux Integration](https://iterm2.com/documentation-tmux-integration.html)

### Common Shortcuts

The following shortcuts belongs to `iTerm2`, and works without `tmux`.

- `command + t` open a new tab
- `command + d` split panes left and right
- `command + shift + d` split panes up and down
- `command + [` or `command + ]` switch between panes
- `command + <-` or `command + ->` switch between tabs
- `command + shift + enter` make a pane full screen or restore it
- `command + fn + <-` scroll to the front of the current output
- `command + fn + ->` scroll to the end of the current output
- `command + k` clear all the current output
- `command + control + shift + d` detach tmux, reconnecting will restore all open windows

### Hide tmux control window

By default, `iTerm2` will display two windows after running `tmux -CC`, one of them look like this:

```
** tmux mode started **

Command Menu
----------------------------
esc    Detach cleanly.
  X    Force-quit tmux mode.
  L    Toggle logging.
  C    Run tmux command.
```

This window can be hidden by setting `iTerm2 -> Preferences... / Settings... -> General -> tmux`:

Checked `Automatically bury the tmux client session after connecting`.

### How to open new window

Choose your favorite way to open new window by setting `iTerm2 -> Preferences... / Settings... -> General -> tmux`:

Choose a item in `When attaching, restore windows as`, then try `tmux -CC` to find your favorite way.

### Hide title bar of panes

By default, `iTerm2` will show a title bar for each split panes, which looks ugly.

The title bar of panes can be hidden by setting `iTerm2 -> Preferences... / Settings... -> Appearance -> Panes`:

Unchecked `Show per-pane title bar with split panes`.

### Inactive window style

By default, `iTerm2` will dimming the whole inactive windows, which looks ugly.

The dimming style can be changed by setting `iTerm2 -> Preferences... / Settings... -> Appearance -> Dimming`:

Checked `Dimming affects only text, not background`.

### Slow Re-attach / Lag

When using tmux integration in iTerm2 (`tmux -CC`), you may experience noticeable lag or a delay when re-attaching to a session. This is usually caused by syncing a massive amount of scrollback history. You can resolve this by adjusting your `~/.tmux.conf` on the server:

```
set -g history-limit 1000
```

- **Balancing History**: Setting `history-limit` too high (especially with multiple open windows) causes a massive data sync during the attach process, leading to lag. Conversely, setting it too low might cause you to lose important terminal history. A value between `1000` and `5000` is recommended.

- **Applying Changes**: After modifying the configuration, you must completely restart the tmux server for the changes to take effect. Please save your work in all active windows, and then run `tmux kill-server` in your terminal.
