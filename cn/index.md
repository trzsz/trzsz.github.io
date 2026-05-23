---
layout: default
permalink: /cn/
title: trzsz / tssh / tsshd - 更现代的 SSH 文件传输与远程终端工具
description: "trzsz 提供兼容 tmux 的 SSH 文件传输能力，tssh 是增强型 OpenSSH 客户端，tsshd 是支持 UDP 漫游与断线重连的 SSH 服务端，适用于 Linux、macOS、Windows、Web Terminal 与高延迟网络环境。"
---

# trzsz / tssh / tsshd - 更现代的 SSH 文件传输与远程终端工具

**trzsz**（ trz / tsz ）是兼容 `tmux` 的现代文件传输工具，**tssh** 是增强型 SSH 客户端，**tsshd** 是支持 UDP 漫游与断线重连的 SSH 服务端。

它们共同提供更稳定、更易用、更现代的远程终端体验。

## **trzsz**：现代化 SSH 文件传输工具

**trzsz**（ trz / tsz ）是类似 `rz / sz` 的文件传输工具，但原生兼容 `tmux`，支持目录传输、断点续传、拖拽上传、Windows 与 Web Terminal 等现代终端场景。

无论是在传统 SSH、Web SSH、Electron 终端还是本地终端环境中，都可以获得统一且流畅的文件传输体验。

<div class="img-crop-container">
  <img src="https://trzsz.github.io/images/iterm2_text.gif" width="800px" alt="trzsz">
</div>

- [Py 版](/cn/py)：用于 SSH 终端的简单文件传输工具，类似 `lrzsz`（ rz / sz ），但兼容 `tmux`。

- [Js 版](/cn/js)：为 Web SSH、WebShell 与 Electron 终端提供原生 trzsz 支持。

- [Go 版](/cn/go)：为支持本地 shell 的终端与 Go 应用启用原生 trzsz 文件传输能力。

- [iTerm2 集成](/cn/iterm2)：在 iTerm2 中启用原生 trzsz 文件传输集成。

## **tssh**：增强型 SSH 客户端

**tssh** 是一款高度兼容 OpenSSH 的 SSH 客户端，在保留 OpenSSH 使用习惯的同时，提供了大量增强功能。

除了内置 trzsz 文件传输能力外，还支持交互式服务器选择、批量登录、密码记忆、自动化交互，以及更适合代理网络环境的连接方式。

<div class="img-crop-container">
  <img src="https://trzsz.github.io/images/tssh_tiny.gif" width="800px" alt="tssh">
</div>

- [tssh](/cn/tssh)：高度兼容 OpenSSH 并提供丰富扩展功能的 SSH 客户端。

## **tsshd**：支持漫游与断线重连的 SSH 服务端

**tsshd** 是基于 UDP 的 SSH 服务端，专为高延迟与不稳定网络环境设计。

在网络切换、断线再重新联网后，SSH 会话可以自动恢复，提供类似 `mosh` 的不断线远程终端体验，同时保持对 OpenSSH 的高度兼容。

<div class="img-crop-container">
  <img src="https://trzsz.github.io/images/tsshd_attach.gif" width="800px" alt="tsshd">
</div>

- [tsshd](/cn/tsshd)：基于 UDP、支持漫游与断线重连的 SSH 服务端。

## 其他文档

- [iTerm2 tmux 集成模式](/cn/tmuxcc)：无需记忆 tmux 命令与快捷键，轻松管理 tmux 会话与分屏。
