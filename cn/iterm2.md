---
layout: default
---

# Trzsz-iTerm2 安装文档

`trzsz` ( trz / tsz ) 是一个简单的文件传输工具，和 lrzsz ( rz / sz ) 类似，并且支持 tmux。

`trzsz-iterm2` 是 [trzsz](https://trzsz.github.io/) 在 [iTerm2](https://iterm2.com/) 上使用的客户端。

GitHub: [https://github.com/trzsz/trzsz](https://github.com/trzsz/trzsz)

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg?style=flat)](https://choosealicense.com/licenses/mit/)
[![PyPI trzsz-iterm2](https://img.shields.io/pypi/v/trzsz-iterm2?style=flat)](https://pypi.python.org/pypi/trzsz-iterm2/)
[![中文网站](https://img.shields.io/badge/%E4%B8%AD%E6%96%87-%E7%BD%91%E7%AB%99-blue?style=flat)](https://trzsz.github.io/cn/iterm2)


## 安装指南

* 用 Python3 安装
  ```
  sudo python3 -m pip install trzsz-iterm2
  ```

* 用 Homebrew 安装
  ```
  brew install trzsz
  ```

## 配置指南

* 找出 `trzsz-iterm2` 安装的绝对路径 ( 可以是软链，但不支持相对路径 )。
  ```sh
  which trzsz-iterm2
  ```
  下文中的 `/usr/local/bin/trzsz-iterm2` 请自行替换成真实的 `trzsz-iterm2` 绝对路径。

* 打开 `iTerm2 -> Preferences... -> Profiles -> ( 在左边选中一个 Profile ) -> Advanced -> Triggers -> Edit -> [+]`，如下配置：

  | Name | Value | Note |
  | ---- | ----- | ---- |
  | Regular Expression | `:(:TRZSZ:TRANSFER:[SR]:\d+\.\d+\.\d+:\d+)` | <!-- avoid triple click copy a newline --> 前后无空格 |
  | Action | `Run Silent Coprocess...` | |
  | Parameters | `/usr/local/bin/trzsz-iterm2 \1` | <!-- avoid triple click copy a newline --> 前后无空格 |
  | Enabled | ✅ | 选中 |

  * 不要选中最下面的 `Use interpolated strings for parameters`。

  * 注意 `/usr/local/bin/trzsz-iterm2` 要替换成真实的 `trzsz-iterm2` 绝对路径。

  * 不同 `Profile` 的 `Trigger` 是互相独立的，也就是每个用到的 `Profile` 都要进行配置。

  * `Trigger` 的配置是允许输入多行的，但只会显示一行，注意不要多复制了一个换行符进去。

  ![iTerm2触发器配置](https://trzsz.github.io/images/config.jpg)


## 进度条配置

### 可选1：使用 [zenity](https://github.com/ncruces/zenity) 进度条

* 安装 `zenity`
  ```sh
  brew install ncruces/tap/zenity
  ```

* 如果 `Mac M1` 安装失败，可以试试用 `go` 进行编译安装：
  ```sh
  brew install go
  go install 'github.com/ncruces/zenity/cmd/zenity@latest'
  sudo cp ~/go/bin/zenity /usr/local/bin/zenity
  ```

* 执行 `ls -l /usr/local/bin/zenity` 应该输出 `zenity` 可执行文件或软链。不然可以建个软链：
  ```sh
  sudo ln -sv $(which zenity) /usr/local/bin/zenity
  ```

### 可选2：使用更帅的文本进度条
*此功能正在开发中...*

* 更新 iTerm2 到 `Build 3.4.16` ( *未发布* ) 以上的版本。

* `Trigger` 的 `Parameters` 配置增加 `-p text` 参数。
  ```
  /usr/local/bin/trzsz-iterm2 -p text \1
  ```
  注意 `/usr/local/bin/trzsz-iterm2` 要替换成真实的 `trzsz-iterm2` 绝对路径。

* 打开 `iTerm2 -> Preferences... -> General -> Magic`，选中 `Enabel Python API`。

  ![iTerm2 Enabel Python API](https://trzsz.github.io/images/PythonAPI.png)

