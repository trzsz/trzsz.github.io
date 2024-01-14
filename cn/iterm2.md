---
layout: default
description: trzsz ( trz / tsz ) 是一个兼容 tmux 的文件传输工具，和 lrzsz ( rz / sz ) 类似，并且有进度条和支持目录传输。
---

# Trzsz-iTerm2 安装文档

`trzsz-iterm2` 是 [trzsz](https://trzsz.github.io/) 在 [iTerm2](https://iterm2.com/) 上使用的客户端。

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg?style=flat)](https://choosealicense.com/licenses/mit/)
[![PyPI trzsz-iterm2](https://img.shields.io/pypi/v/trzsz-iterm2?style=flat)](https://pypi.python.org/pypi/trzsz-iterm2/)
[![GitHub trzsz](https://img.shields.io/badge/GitHub-https%3A%2F%2Fgithub.com%2Ftrzsz%2Ftrzsz-blue?style=flat)](https://github.com/trzsz/trzsz)

## 安装指南

- 用 Python3 安装

  ```
  sudo python3 -m pip install --upgrade trzsz-iterm2
  ```

- 用 Homebrew 安装
  ```
  brew update
  brew install trzsz
  ```

## 配置指南

- 找出 `trzsz-iterm2` 安装的绝对路径 ( 可以是软链，但不支持相对路径 )。

  ```sh
  which trzsz-iterm2
  ```

  下文中的 `/usr/local/bin/trzsz-iterm2` 请自行替换成真实的 `trzsz-iterm2` 绝对路径。

- 打开 `iTerm2 -> Preferences... / Settings... -> Profiles -> ( 在左边选中一个 Profile ) -> Advanced -> Triggers -> Edit -> [+]`，如下配置：

  | Name               | Value                                        | Note                                                  |
  | ------------------ | -------------------------------------------- | ----------------------------------------------------- |
  | Regular Expression | `:(:TRZSZ:TRANSFER:[SRD]:\d+\.\d+\.\d+:\d+)` | <!-- avoid triple click copy a newline --> 前后无空格 |
  | Action             | `Run Silent Coprocess...`                    |                                                       |
  | Parameters         | `/usr/local/bin/trzsz-iterm2 \1`             | <!-- avoid triple click copy a newline --> 前后无空格 |
  | Enabled            | ✅                                           | 选中                                                  |

  - 不要选中最下面的 `Use interpolated strings for parameters`。

  - 注意 `/usr/local/bin/trzsz-iterm2` 要替换成真实的 `trzsz-iterm2` 绝对路径。

  - 不同 `Profile` 的 `Trigger` 是互相独立的，也就是每个用到的 `Profile` 都要进行配置。

  - `Trigger` 的配置是允许输入多行的，但只会显示一行，注意不要多复制了一个换行符进去。

  ![iTerm2触发器配置](https://trzsz.github.io/images/config.jpg)

- 打开 `iTerm2 -> Preferences... / Settings... -> General -> Magic`，选中 `Enable Python API`。

  ![iTerm2 Enable Python API](https://trzsz.github.io/images/PythonAPI.png)

- 设置 `ITERM2_COOKIE` 环境变量可以使启动速度更快。

  打开 `iTerm2 -> Preferences... / Settings... -> Advanced`，筛选 `COOKIE`，选择 `Yes`。

  ![iTerm2 Enable ITERM2_COOKIE](https://trzsz.github.io/images/iterm2_cookie.png)

## 进度条配置

### 可选 1：使用文本进度条

- text 进度条示例
  ![using trzsz in iTerm2 with text progress bar](https://trzsz.github.io/images/iterm2_text.gif)

- 升级 iTerm2 到 `Build 3.5.20220503-nightly` 以上的版本。

- `Trigger` 的 `Parameters` 配置增加 `-p text` 参数。
  ```
  /usr/local/bin/trzsz-iterm2 -p text \1
  ```
  注意 `/usr/local/bin/trzsz-iterm2` 要替换成真实的 `trzsz-iterm2` 绝对路径。

### 可选 2：使用 [zenity](https://github.com/ncruces/zenity) 进度条

- zenity 进度条示例
  ![using trzsz in iTerm2 with zenity progress bar](https://trzsz.github.io/images/iterm2_zenity.gif)

- 安装 `zenity`

  ```sh
  brew install ncruces/tap/zenity
  ```

- 如果 `Mac M1` 安装失败，可以试试用 `go` 进行编译安装：

  ```sh
  brew install go
  go install 'github.com/ncruces/zenity/cmd/zenity@latest'
  sudo cp ~/go/bin/zenity /usr/local/bin/zenity
  ```

- 执行 `ls -l /usr/local/bin/zenity` 应该输出 `zenity` 可执行文件或软链。不然可以建个软链：

  ```sh
  sudo ln -sv $(which zenity) /usr/local/bin/zenity
  ```

- 如果进度条不是在前面弹出，可以尝试升级 [zenity](https://github.com/ncruces/zenity), 并且不要选中 `iTerm2 -> Secure Keyboard Entry`。

## 默认保存路径

如果你想自动下载文件到指定目录，而不是每次都弹窗询问。

例如，自动下载文件到 `/Users/xxxxx/Downloads`

- 使用文本进度条，将 `/usr/local/bin/trzsz-iterm2 -p text \1` 改为：

  ```
  /usr/local/bin/trzsz-iterm2 -p text -d '/Users/xxxxx/Downloads' \1
  ```

- 使用 zenity 进度条，将 `/usr/local/bin/trzsz-iterm2 \1` 改为：
  ```
  /usr/local/bin/trzsz-iterm2 -p zenity -d '/Users/xxxxx/Downloads' \1
  ```

注意 `/usr/local/bin/trzsz-iterm2` 要替换成真实的 `trzsz-iterm2` 绝对路径。

## 拖文件和目录上传

- 升级 iTerm2 到 `Build 3.5.20220806-nightly` 以上的版本。

- 打开 `iTerm2 -> Preferences... / Settings... -> Advanced`，筛选 `files are dropped into`，配置如下：

  ```
  /usr/local/bin/trzsz-iterm2 -p text dragfiles \(filenames)
  ```

  ![iTerm2 enable drag files](https://trzsz.github.io/images/drag_config.png)

注意 `/usr/local/bin/trzsz-iterm2` 要替换成真实的 `trzsz-iterm2` 绝对路径。
