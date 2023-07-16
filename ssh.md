---
layout: default
---

# Trzsz-ssh ( tssh ) Document

A ssh client that supports [trzsz](https://trzsz.github.io/), supports selecting or searching servers for login, supports remember password.

GitHub: [https://github.com/trzsz/trzsz-ssh](https://github.com/trzsz/trzsz-ssh) 　中文文档：[https://trzsz.github.io/cn/ssh](https://trzsz.github.io/cn/ssh)

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg?style=flat)](https://choosealicense.com/licenses/mit/)
[![GitHub Release](https://img.shields.io/github/v/release/trzsz/trzsz-ssh)](https://github.com/trzsz/trzsz-ssh/releases)

## Introduce

Does your favorite ssh terminal have server management feature? Does it support remembering password? Does it have a cool file transfer tool?

trzsz-ssh ( tssh ) supports selecting or searching servers configured in `~/.ssh/config`, supports vim operation habit, provides a server management solution.

trzsz-ssh ( tssh ) supports configuring server login password, solves the trouble of entering password each time ( It's recommended to use the public key to login ).

trzsz-ssh ( tssh ) supports [trzsz](https://trzsz.github.io/) ( trz / tsz ) natively, solved the issue of slow upload speeds while using `trzsz ssh` in Windows.

_On the author's MacOS, the upload speed using `trzsz ssh` is about 10 MB/s, while using `tssh` can reach over 80 MB/s._

## Installation

**_Here is how to install `trzsz-ssh (tssh)` on the client side (choose one):_**

- Install with [scoop](https://scoop.sh/) on Windows

  <details><summary><code>scoop install tssh</code></summary>

  ```sh
  scoop bucket add extras
  scoop update
  scoop install tssh
  ```

  </details>

- Install with [homebrew](https://brew.sh/) on MacOS

  <details><summary><code>brew install trzsz-ssh</code></summary>

  ```sh
  brew update
  brew install trzsz-ssh
  ```

  </details>

- Install with apt on Ubuntu

  <details><summary><code>sudo apt install tssh</code></summary>

  ```sh
  sudo apt update && sudo apt install software-properties-common
  sudo add-apt-repository ppa:trzsz/ppa && sudo apt update

  sudo apt install tssh
  ```

  </details>

- Install with apt on Debian

  <details><summary><code>sudo apt install tssh</code></summary>

  ```sh
  sudo apt install curl gpg
  curl -s 'https://keyserver.ubuntu.com/pks/lookup?op=get&search=0x7074ce75da7cc691c1ae1a7c7e51d1ad956055ca' \
    | gpg --dearmor -o /usr/share/keyrings/trzsz.gpg
  echo 'deb [signed-by=/usr/share/keyrings/trzsz.gpg] https://ppa.launchpadcontent.net/trzsz/ppa/ubuntu jammy main' \
    | sudo tee /etc/apt/sources.list.d/trzsz.list
  sudo apt update

  sudo apt install tssh
  ```

  </details>

- Install with yum on Linux

  <details><summary><code>sudo yum install tssh</code></summary>

  - Install with [gemfury](https://gemfury.com/) repository.

    ```sh
    echo '[trzsz]
    name=Trzsz Repo
    baseurl=https://yum.fury.io/trzsz/
    enabled=1
    gpgcheck=0' | sudo tee /etc/yum.repos.d/trzsz.repo

    sudo yum install tssh
    ```

  - Install with [wlnmp](https://www.wlnmp.com/install) repository. It's not necessary to configure the epel repository for tssh, take CentOS as an example:

    ```sh
    sudo rpm -ivh https://mirrors.wlnmp.com/centos/wlnmp-release-centos.noarch.rpm

    sudo yum install tssh
    ```

  </details>

- Install with [yay](https://github.com/Jguer/yay) on ArchLinux

  <details><summary><code>yay -S tssh</code></summary>

  ```sh
  yay -Syu
  yay -S tssh
  ```

  </details>

- Install with Go ( Requires go 1.20 or later )

  <details><summary><code>go install github.com/trzsz/trzsz-ssh/cmd/tssh@latest</code></summary>

  ```sh
  go install github.com/trzsz/trzsz-ssh/cmd/tssh@latest
  ```

  The binaries are usually located in ~/go/bin/ ( C:\Users\your_name\go\bin\ on Windows ).

  </details>

- Download from the [Releases](https://github.com/trzsz/trzsz-ssh/releases)

  <details><summary><code>Or build and install from the source code ( Requires go 1.20 or later )</code></summary>

  ```sh
  git clone https://github.com/trzsz/trzsz-ssh.git
  cd trzsz-ssh
  go build ./cmd/tssh
  ```

  </details>

**_[trzsz](https://trzsz.github.io/) needs to be installed on the server to use `trz / tsz` for uploading and downloading files._**

_Choose either the [Go version](https://trzsz.github.io/go) ( ⭐ Recommended ), [Py version](https://trzsz.github.io/), or [Js version](https://trzsz.github.io/js)._

_If trzsz is not installed on the server, you can still use `tssh`, but can't use `trz / tsz` for uploading and downloading._

## How to use

_`~/` represents the HOME directory. Please replace `~/` below with `C:\Users\your_name\` on Windows._

- Generate a key pair on the client, generally stored in `~/.ssh/`:

  - `ssh-keygen -t rsa -b 4096` generates a RSA key pair, private key `~/.ssh/id_rsa`, public key `~/.ssh/id_rsa.pub`.

- Append the public key to the `~/.ssh/authorized_keys` file on the server, and set the correct permissions:

  ```sh
  chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys
  ```

- Configure the `~/.ssh/config` file on the client, for example:

  ```
  Host alias1
      HostName 192.168.0.1
      Port 22
      User your_name
  Host alias2
      HostName 192.168.0.2
      Port 22
      User your_name
  ```

- Use `tssh` command to log in to the server, `tssh alias1` command to log in to the server corresponding to `alias1` in `~/.ssh/config`.

- Execute the `tssh` command without arguments, you can select or search the configured servers in `~/.ssh/config` to log in.

## Remember Password

- In order to be compatible with openssh, the password configuration is placed in `~/.ssh/password`.

- It's recommended to use the public key authentication. If you have to use the password authentication, it's recommended to set the permissions of `~/.ssh/password`:

  ```sh
  chmod 700 ~/.ssh && chmod 600 ~/.ssh/password
  ```

- The following `~/.ssh/password` configuration represents the alias `test2`'s password is `123456`, and other aliases starting with `test`'s password are `111111`:

  ```
  Host test2
      Password 123456

  # ~/.ssh/config and ~/.ssh/password support wildcards, and tssh will use the first matched value.
  # Here we want test2 to use a different password from other test*, so we put test* behind test2.

  Host test*
      Password 111111
  ```

## Remember Answers

- In addition, there is a keyboard interactive authentication. The server returns some questions, and log in by providing the correct answers. Many custom one-time passwords are implemented by it.

- If the answers are fixed, `tssh` supports remember answers, also configured in `~/.ssh/password`. Most have only one question, just configure `QuestionAnswer1`. For those with multiple questions, the answer to each question can be configured by serial number, or by the hex code of the question.

- Use `tssh --debug` to log in, and the hex code of the questions will be output, so that you will know how to configure with the hex code. For example:

  ```
  Host test1
      QuestionAnswer1 TheAnswer1
  Host test2
      QuestionAnswer1 TheAnswer1
      QuestionAnswer2 TheAnswer2
      QuestionAnswer3 TheAnswer3
  Host test3
      6e616d653a20 my_name  # The `6e616d653a20` is the hex code of `name: `
      636f64653a20 my_code  # The `636f64653a20` is the hex code of `code: `
  ```

## Screenshot

![tssh screenshot](https://trzsz.github.io/images/tssh.gif)

## Contact

Feel free to email the author <lonnywong@qq.com>, or create an [issue](https://github.com/trzsz/trzsz-ssh/issues). Welcome to join the QQ group: 318578930.

Want to buy the author a drink 🍺 ?

![sponsor wechat qrcode](https://trzsz.github.io/images/sponsor_wechat.jpg)
![sponsor alipay qrcode](https://trzsz.github.io/images/sponsor_alipay.jpg)
