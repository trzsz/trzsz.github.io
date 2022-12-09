---
layout: default
---

# iTerm2 tmux Integration

`iTerm2` supports integration with the `tmux -CC` control mode, just add `-CC` while using `tmux` in `iTerm2`.
* e.g., change `tmux` to `tmux -CC`
* e.g., change `tmux new-session -A -s xxx` to `tmux -CC new-session -A -s xxx`


## Hide tmux control window
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


## How to open new window
Choose your favorite way to open new window by setting `iTerm2 -> Preferences... / Settings... -> General -> tmux`:

Choose a item in `When attaching, restore windows as`, then try `tmux -CC` to find your favorite way.


## Introduction to Shortcuts
* `command + d` Split the current pane into two, left and right.
* `command + shift + d` Split the current pane into two, top and bottom.
* `command + t` Open a new tab window.
* `command + control + shift + d` detach from tmux, run `tmux -CC attach` to attach and restore all windows.


## Hide title bar of panes
By default, `iTerm2` will show a title bar for each split panes, which looks ugly.

The title bar of panes can be hidden by setting `iTerm2 -> Preferences... / Settings... -> Appearance -> Panes`:

Unchecked `Show per-pane title bar with split panes`.


## Inactive window style
By default, `iTerm2` will dimming the whole inactive windows, which looks ugly.

The dimming style can be changed by setting `iTerm2 -> Preferences... / Settings... -> Appearance -> Dimming`:

Checked `Dimming affects only text, not background`.


## About transfer files
`tmux` doesn't support `rz / sz` to transfer files, and neither does `tmux -CC` control mode support `rz / sz`.

If `tmux` is running on the remote server, then [trzsz](https://github.com/trzsz/trzsz) `( trz / tsz )` supports both `tmux` normal mode and `tmux -CC` control mode.

If `tmux` is not running on the remote server, but on the local mac, or on a middler server, [trzsz](https://github.com/trzsz/trzsz) can't find the `tmux` process. So, we can't support `tmux` in normal mode, but can support `tmux -CC` in control mode.
