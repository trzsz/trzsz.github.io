---
layout: default
---

# Trzsz-iTerm2 Document

`trzsz` ( trz / tsz ) is a simple file transfer tools, similar to `lrzsz` ( rz / sz ), and compatible with `tmux`.

`trzsz-iterm2` is a client tool for [trzsz](https://trzsz.github.io/) used with [iTerm2](https://iterm2.com/).

GitHub: [https://github.com/trzsz/trzsz](https://github.com/trzsz/trzsz)

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg?style=flat)](https://choosealicense.com/licenses/mit/)
[![PyPI trzsz-iterm2](https://img.shields.io/pypi/v/trzsz-iterm2?style=flat)](https://pypi.python.org/pypi/trzsz-iterm2/)
[![中文网站](https://img.shields.io/badge/%E4%B8%AD%E6%96%87-%E7%BD%91%E7%AB%99-blue?style=flat)](https://trzsz.github.io/cn/iterm2)


## Installation

* With Python3
  ```
  sudo python3 -m pip install --upgrade trzsz-iterm2
  ```

* With Homebrew
  ```
  brew update
  brew install trzsz
  ```

## Configuration

* Find out the absolute path where `trzsz-iterm2` is installed.
  ```sh
  which trzsz-iterm2
  ```
  Change the `/usr/local/bin/trzsz-iterm2` below to the real absolute path of `trzsz-iterm2`.

* Open `iTerm2 -> Preferences... -> Profiles -> (select a profile on the left) -> Advanced -> Triggers -> Edit -> [+]`

  | Name | Value | Note |
  | ---- | ----- | ---- |
  | Regular Expression | `:(:TRZSZ:TRANSFER:[SR]:\d+\.\d+\.\d+:\d+)` | <!-- avoid triple click copy a newline --> No space at the end |
  | Action | `Run Silent Coprocess...` | |
  | Parameters | `/usr/local/bin/trzsz-iterm2 \1` | <!-- avoid triple click copy a newline --> No space at the end |
  | Enabled | ✅ | Checked |

  * Don't check the `Use interpolated strings for parameters` at the bottom.

  * The `/usr/local/bin/trzsz-iterm2` should be changed to the real absolute path of `trzsz-iterm2`.

  * Note that the `Triggers` should be configured for each `Profile` in use.

  * `Triggers` allows multiple lines, but only shows one line. Make sure don't copy a newline into it.

  ![iTerm2 Trigger configuration](https://trzsz.github.io/images/config.jpg)


## Progress Bar

### Option 1: The [zenity](https://github.com/ncruces/zenity) progress bar

* Screenshot of zenity progress bar
  ![using trzsz in iTerm2 with zenity progress bar](https://trzsz.github.io/images/iterm2_zenity.gif)

* Install `zenity`
  ```sh
  brew install ncruces/tap/zenity
  ```

* If `Mac M1` install fails, try to install it with `go`:
  ```sh
  brew install go
  go install 'github.com/ncruces/zenity/cmd/zenity@latest'
  sudo cp ~/go/bin/zenity /usr/local/bin/zenity
  ```

* `ls -l /usr/local/bin/zenity` should shows the `zenity` executable file or link. If not, create a soft link:
  ```sh
  sudo ln -sv $(which zenity) /usr/local/bin/zenity
  ```

### Option 2: The cooler text progress bar
*Not release yet...*

* Screenshot of text progress bar
  ![using trzsz in iTerm2 with text progress bar](https://trzsz.github.io/images/iterm2_text.gif)

* Upgrade iTerm2 to `Build 3.5.20220319-nightly` or higher.

* Add `-p text` to the parameters of iTerm2 `Trigger`.
  ```
  /usr/local/bin/trzsz-iterm2 -p text \1
  ```
  Don't forget to change `/usr/local/bin/trzsz-iterm2` to the real absolute path of `trzsz-iterm2`.

* Open `iTerm2 -> Preferences... -> General -> Magic`, check `Enabel Python API`.

  ![iTerm2 Enabel Python API](https://trzsz.github.io/images/PythonAPI.png)

