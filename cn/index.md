# trzsz

[trzsz](https://trzsz.github.io) 是一个简单的文件传输工具，和 lrzsz ( rz / sz ) 类似但支持 tmux，

和 iTerm2 一起使用，并且有一个不错的进度条。

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


### 本地 macOS 安装 [trzsz-iterm2](https://pypi.org/project/trzsz-iterm2)
```
sudo python3 -m pip install --upgrade trzsz-libs trzsz-iterm2
```


### [iTerm2](https://iterm2.com/index.html) 配置触发器
打开 `Preferences -> Profiles -> Advanced -> Triggers -> Edit`，如下配置：

| Name | Value |
| ---- | ---- |
| Regular Expression | `:(:TRZSZ:TRANSFER:[SR]:\d+\.\d+\.\d+)` |
| Action | `Run Silent Coprocess` |
| Parameters | `/usr/local/bin/trzsz-iterm2 \1` |
| Enabled | ✅ |

![iTerm2触发器配置](https://trzsz.github.io/images/config.png)


### 本地 macOS 安装 [zenity](https://github.com/ncruces/zenity)

安装在 `/usr/local/bin/zenity` 就可以显示进度条，不安装也可以正常使用。

```
brew install ncruces/tap/zenity
```


## 使用指南

### `trz` 上传文件

`trz` 命令可以不带任何参数，将上传文件到当前目录。也可以带一个目录参数，指定上传到哪个目录。
```
trz /tmp/
```

### `tsz` 下载文件

`tsz` 可以带一个或多个文件名（可使用相对路径或绝对路径，也可使用通配符），将下载指定的文件。

```
tsz file1 file2 file3
```


## 屏幕截图

### 上传文件示例

![上传文件示例](https://trzsz.github.io/images/upload.gif)


### 下载文件示例

![下载文件示例](https://trzsz.github.io/images/download.gif)


## 联系方式

有什么问题可以发邮件给我 <lonnywong@qq.com>，也可以直接提 [Issues](https://github.com/trzsz/trzsz/issues) 。
