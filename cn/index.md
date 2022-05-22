---
layout: default
---

# Trzsz 中文文档

`trzsz` ( trz / tsz ) 是一个简单的文件传输工具，和 lrzsz ( rz / sz ) 类似，并且支持 tmux。

GitHub: [https://github.com/trzsz/trzsz](https://github.com/trzsz/trzsz)

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg?style=flat)](https://choosealicense.com/licenses/mit/)
[![PyPI trzsz](https://img.shields.io/pypi/v/trzsz?style=flat)](https://pypi.python.org/pypi/trzsz/)
[![中文网站](https://img.shields.io/badge/%E4%B8%AD%E6%96%87-%E7%BD%91%E7%AB%99-blue?style=flat)](https://trzsz.github.io/cn/)


## 为什么?

考虑 `laptop -> hostA -> hostB -> docker -> tmux` 这种场景，使用 `scp` 或 `sftp` 是不方便的。

在这种场景下，使用 `lrzsz` ( rz / sz ) 是很方便的，但是很可惜它与 `tmux` 不兼容。

`tmux` 不愿意支持 rz / sz ( [906](https://github.com/tmux/tmux/issues/906), [1439](https://github.com/tmux/tmux/issues/1439) )，而重新造一个工具比修改 `tmux` 简单很多。


## 安装指南

### 在远程服务器上安装

* 用 Python3 安装
  ```
  sudo python3 -m pip install --upgrade trzsz
  ```

* 用 Python2 安装
  ```
  sudo python2 -m pip install --upgrade trzsz
  ```

* 用 Homebrew 安装
  ```
  brew update
  brew install trzsz
  ```

<!--
* 用 Node.js 安装
  *Under development ...*

* 用 APT 安装
  *Under development ...*
-->

&nbsp;&nbsp;没有 `sudo` 权限也可以安装，只要将安装路径 ( 可能是 `~/.local/bin` ) 添加到 `PATH` 环境变量中即可。


### 支持的终端

* [iTerm2](https://iterm2.com/) -- 参考 [Trzsz-iTerm2 安装文档](https://trzsz.github.io/cn/iterm2)。

* [tabby](https://tabby.sh/) -- 安装 [tabby-trzsz](https://github.com/trzsz/tabby-trzsz) 插件即可。

* [electerm](https://electerm.github.io/electerm/) -- 升级到 `1.19.0` 以上的版本即可。

* [trzsz-go](https://github.com/trzsz/trzsz-go) -- 只要是支持本地 shell 的终端就可以用。

* [trzsz.js](https://github.com/trzsz/trzsz.js) -- 让运行在浏览器中的 webshell 和用 electron 开发的终端支持 `trzsz`。

&nbsp;&nbsp;*如果你的终端也支持 `trzsz`，请告诉我，我很乐意将它加到此列表中。*


## 使用指南

#### `trz` 上传文件

`trz` 命令可以不带任何参数，将上传文件到当前目录。也可以带一个目录参数，指定上传到哪个目录。
```
trz /tmp/
```


#### `tsz` 下载文件

`tsz` 可以带一个或多个文件名（可使用相对路径或绝对路径，也可使用通配符），将下载指定的文件。
```
tsz file1 file2 file3
```


#### `-q` 静默模式

`trz -q` 或 `tsz -q xxx` ( 加上 `-q` 选项 )，则在传输文件时不显示进度条。


#### `-y` 覆盖模式

`trz -y` 或 `tsz -y xxx` ( 加上 `-y` 选项 )，如果存在相同文件名的文件就直接覆盖。


#### `-b` 二进制模式
`trz -b` 或 `tsz -b xxx` ( 加上 `-b` 选项 )，二进制传输模式，对于压缩包、图片、影音等较快。


#### `-e` 转义控制字符
二进制模式时，控制字符可能会导致失败，`trz -eb` 或 `tsz -eb xxx` ( 加上 `-e` 选项 ) 转义所有已知的控制字符。


#### `-B` 缓冲区上限
`trz -B 20m` 或 `tsz -B 2M xxx` 等，设置最大缓冲区上限 ( 默认 10M )。会自动根据网速选择合适的缓冲区大小，但不会超过此上限。


#### `-t` 超时时间
`trz -t 10` 或 `tsz -t 30 xxx` 等，设置超时秒数 ( 默认 100 秒 )。在超时时间内，如果无法传完一个缓冲区大小的数据则会报错并退出。设置为 0 或负数，则永不超时。


#### 异常处理方法
* 如果 `tmux` 不是运行在远程服务器上，而是运行在本地电脑上，或者运行在中间的跳板机上。
  * 方案1：使用 `tmux -CC` 与 iTerm2 集成，请参考 [iTerm2 与 tmux -CC 集成](https://trzsz.github.io/cn/tmuxcc)。
  * 方案2：在本地电脑上安装 [trzsz-go](https://github.com/trzsz/trzsz-go)，设置 `alias ssh="trzsz ssh"` 可以方便使用。

* 如果出现了错误，且 `trzsz` 挂住不能动了：
  * 按组合键 `control + c` 可以停止服务器上的 `trz` 或 `tsz` 进程。
  * 对于 iTerm2 用户，按组合键 `command + option + shift + r` 可以停止 [iTerm2 Coprocesses](https://iterm2.com/documentation-coprocesses.html)。

* 如果 `trz -b` 二进制上传失败，并且登录远程服务器时使用了 `telnet` 或 `docker exec`：
  * 可以试试转义所有控制字符，例如 `trz -eb`。

* 如果 `trz -b` 二进制上传失败，并且远程服务器使用 Python3 ( 版本小于 3.7 )：
  * Python3 ( 版本小于 3.7 ) 支持 base64 模式，不使用 `-b` 选项即可，使用 `trz` 代替。
  * 如果想用 `trz -b` 二进制上传，则需要升级 Python3 到 3.7 以上的版本，或者使用 Python2。

* 如果 `trz -b` 或 `tsz -b` 二进制传输失败，并且登录远程服务器时使用了 `expect`：
  * 可以试试在 `expect` 脚本前设置环境变量 `export LC_CTYPE=C`，例如：
    ```
    #!/bin/sh
    export LC_CTYPE=C
    expect -c '
      spawn ssh xxx
      expect "xxx: "
      send "xxx\n"
      interact
    '
    ```


## 屏幕截图

#### trzsz 在 iTerm2 中 text 进度条示例

  ![using trzsz in iTerm2 with text progress bar](https://trzsz.github.io/images/iterm2_text.gif)


#### trzsz 在 iTerm2 中 zenity 进度条示例

  ![using trzsz in iTerm2 with zenity progress bar](https://trzsz.github.io/images/iterm2_zenity.gif)


#### trzsz 在 tabby 中 tabby-trzsz 插件示例

  ![using trzsz in tabby with tabby-trzsz plugin](https://trzsz.github.io/images/tabby_trzsz.gif)


## 联系方式

有什么问题可以发邮件给我 <lonnywong@qq.com>，也可以直接提 [Issues](https://github.com/trzsz/trzsz/issues) 。
