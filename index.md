---
layout: default
permalink: /
title: trzsz / tssh / tsshd - Modern SSH File Transfer and Remote Terminal Tools
description: "trzsz provides tmux-compatible SSH file transfer, tssh is an enhanced OpenSSH-compatible client, and tsshd is a UDP-based SSH server with roaming and reconnect support for unstable or high-latency networks."
---

## trzsz / tssh / tsshd - Modern SSH File Transfer and Remote Terminal Tools

**trzsz** ( trz / tsz ) is a modern tmux-compatible file transfer tool, **tssh** is an enhanced SSH client, and **tsshd** is a UDP-based SSH server with roaming and reconnect support.

Together they provide a more reliable, user-friendly, and modern remote terminal experience.

### **trzsz**: Modern SSH File Transfer

**trzsz** ( trz / tsz ) is a modern alternative to `rz / sz`, designed for SSH terminals with native `tmux` compatibility.

It supports directory transfer, resume, drag-and-drop upload, Windows terminals, and web-based terminal environments.

Whether you are using traditional SSH, Web SSH, Electron terminals, or local shell environments, trzsz provides a unified and seamless file transfer experience.

<div class="img-crop-container">
  <img src="https://trzsz.github.io/images/iterm2_text.gif" width="800px" alt="trzsz">
</div>

- [Python Version](/py): Simple SSH file transfer tool similar to `lrzsz` ( rz / sz ) but compatible with `tmux`.

- [JavaScript Version](/js): Add native trzsz support to Web SSH terminals, webshells, and Electron terminal apps.

- [Go Version](/go): Enable native trzsz file transfer support in terminals with local shell access and Go applications.

- [iTerm2 Integration](/iterm2): Enable native trzsz integration in iTerm2.

### **tssh**: Enhanced SSH Client

**tssh** is a highly OpenSSH-compatible SSH client with many enhanced features while preserving familiar OpenSSH workflows.

It includes built-in trzsz file transfer, interactive server selection, batch login, password management, automated interaction, and better support for proxy-based network environments.

<div class="img-crop-container">
  <img src="https://trzsz.github.io/images/tssh_tiny.gif" width="800px" alt="tssh">
</div>

- [tssh](/tssh): Highly OpenSSH-compatible SSH client with extended features.

### **tsshd**: SSH Server with Roaming and Reconnect Support

**tsshd** is a UDP-based SSH server designed for unstable and high-latency network environments.

SSH sessions can automatically recover after network switching, Wi-Fi interruptions, or IP changes, providing a roaming experience similar to `mosh` while remaining highly compatible with OpenSSH.

<div class="img-crop-container">
  <img src="https://trzsz.github.io/images/tsshd_conn.gif" width="800px" alt="tsshd">
</div>

- [tsshd](/tsshd): UDP-based SSH server with roaming and reconnect support.

### Additional Documentation

- [iTerm2 tmux Integration](/tmuxcc): Manage tmux sessions and panes in iTerm2 without memorizing tmux commands or shortcuts.
