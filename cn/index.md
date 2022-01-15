# trzsz

[trzsz](https://trzsz.github.io) 是一个简单的文件传输工具，和 lrzsz ( rz / sz ) 类似但支持 tmux，和 iTerm2 一起使用，并且有一个不错的进度条。

GitHub: [https://github.com/trzsz/trzsz](https://github.com/trzsz/trzsz)

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg?style=flat)](https://choosealicense.com/licenses/mit/)
[![PyPI trzsz](https://img.shields.io/pypi/v/trzsz?style=flat)](https://pypi.python.org/pypi/trzsz/)
[![中文网站](https://img.shields.io/badge/%E4%B8%AD%E6%96%87-%E7%BD%91%E7%AB%99-blue?style=flat)](https://trzsz.github.io/cn/)


## 为什么开发 trzsz ?

登录远程电脑时用 tmux 保持会话，但 tmux 不支持用 rz / sz 上传和下载文件，这就很不方便了。

重新造一个 rz / sz 比修改 tmux 相对简单很多，并且可以加个进度条，体验上会好很多。


## 安装指南

### 远程服务器安装 [trzsz-svr](https://pypi.org/project/trzsz-svr)
```
sudo python3 -m pip install --upgrade trzsz-libs trzsz-svr
```
* 同样也支持 Python2:
  ```
  sudo pip install --upgrade trzsz-libs trzsz-svr
  ```
* 没有 `sudo` 权限也可以安装，但是要将安装路径 ( 可能是 `~/.local/bin` ) 添加到 PATH 环境变量中。
* 安装后执行 `trz -v` 或 `tsz -v`，如果输出 trzsz 的版本号就是安装成功了，否则检查前面安装的输出是不是有错误。


### 本地 macOS 安装 [trzsz-iterm2](https://pypi.org/project/trzsz-iterm2)
```
sudo python3 -m pip install --upgrade trzsz-libs trzsz-iterm2
```
* 同样也支持 Python2:
  ```
  sudo pip install --upgrade trzsz-libs trzsz-iterm2
  ```
* 安装后执行 `which trzsz-iterm2`，如果输出 `/usr/local/bin/trzsz-iterm2` 就是安装成功了，如果不是：
  * 执行 `which trzsz-iterm2` 没有输出，检查前面安装的输出是不是有错误。
  * 执行 `which trzsz-iterm2` 输出另一个路径，可以建一个软链接：\
    `sudo ln -sv $(which trzsz-iterm2) /usr/local/bin/trzsz-iterm2`


### [iTerm2](https://iterm2.com/index.html) 配置触发器
打开 `Preferences -> Profiles -> Advanced -> Triggers -> Edit`，如下配置：

| Name | Value | Note |
| ---- | ----- | ---- |
| Regular Expression | <span style="white-space: nowrap;">`:(:TRZSZ:TRANSFER:[SR]:\d+\.\d+\.\d+:\d+)`</span> | <!-- avoid triple click copy a newline --> 一行且前后无空格 |
| Action | `Run Silent Coprocess` | |
| Parameters | <span style="white-space: nowrap;">`/usr/local/bin/trzsz-iterm2 \1`</span> | <!-- avoid triple click copy a newline --> 一行且前后无空格 |
| Enabled | ✅ | 选中 |
| Use interpolated strings for parameters | ❎ | 不选中 |

* iTerm2 Trigger 的配置允许输入多行，但只显示一行，注意不要复制了一个换行符进去。

![iTerm2触发器配置](https://trzsz.github.io/images/config.jpg)


### 本地 macOS 安装 [zenity](https://github.com/ncruces/zenity)

安装在 `/usr/local/bin/zenity` 就可以显示进度条，不安装也可以正常使用。

```
brew install ncruces/tap/zenity
```
* 如果 `Mac M1` 安装失败，可以试试用 `go` 进行编译安装：
  ```
  brew install go
  go install 'github.com/ncruces/zenity/cmd/zenity@latest'
  sudo cp ~/go/bin/zenity /usr/local/bin/zenity
  ```
* 安装后执行 `which zenity`，如果输出 `/usr/local/bin/zenity` 就是安装成功了，如果不是：
  * 执行 `which zenity` 没有输出，检查前面安装的输出是不是有错误。
  * 执行 `which zenity` 输出另一个路径，可以建一个软链接：\
    `sudo ln -sv $(which zenity) /usr/local/bin/zenity`


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
二进制传输模式时，控制字符可能会导致传输失败，`trz -eb` 或 `tsz -eb xxx` ( 加上 `-e` 选项 ) 转义所有已知的控制字符。


#### `-B` 缓冲区大小
`trz -B 10k` 或 `tsz -B 2M xxx` 等，设置缓存区大小 ( 默认 1M )。太小会导致传输速度慢，太大会导致进度条更新不及时。


#### `-t` 超时时间
`trz -t 10` 或 `tsz -t 30 xxx` 等，设置超时秒数 ( 默认 100 秒 )。在超时时间内，如果无法传完一个缓冲区大小的数据则会报错并退出。设置为 0 或负数，则永不超时。


#### 异常处理方法
* 如果出现了错误，且 `trzsz` 挂住不能动了：
  1. 按组合键 `Command + Option + Shift + R` 停止 [iTerm2 Coprocesses](https://iterm2.com/documentation-coprocesses.html)。
  2. 按组合键 `Control + j` 停止服务器上的 `trz` 或 `tsz` 进程。

* 如果 `trz -b` 二进制上传失败，并且登录远程服务器时使用了 `telnet` 或 `docker exec`：
  1. 可以试试转义所有控制字符，例如 `trz -eb`。

* 如果 `trz -b` 二进制上传失败，并且远程服务器使用 Python3 ( 版本小于 3.7 )：
  1. Python3 ( 版本小于 3.7 ) 支持 base64 模式，不使用 `-b` 选项即可，使用 `trz` 代替。
  2. 如果想用 `trz -b` 二进制上传，则需要升级 Python3 到 3.7 以上的版本，或者使用 Python2。

* 如果 `trz -b` 或 `tsz -b` 二进制传输失败，并且登录远程服务器时使用了 `expect`：
  1. 可以试试在 `expect` 脚本前设置环境变量 `export LC_CTYPE=C`，例如：
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

#### 上传文件示例

![上传文件示例](https://trzsz.github.io/images/upload.gif)


#### 下载文件示例

![下载文件示例](https://trzsz.github.io/images/download.gif)


## 联系方式

有什么问题可以发邮件给我 <lonnywong@qq.com>，也可以直接提 [Issues](https://github.com/trzsz/trzsz/issues) 。
