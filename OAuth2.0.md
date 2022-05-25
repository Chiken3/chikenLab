---
marp: true
---
 # OAuth2.0 まとめ & 実装

---

 # OAuth2.0 とは
 > - API 認可に使われるプロトコルである
 > - 認可とはリソースへのアクセス権を与える行為である。
 > 「認証と認可 Keycloak 入門」より

---

# OAuth のフロー
## 1.OAuth の登場人物

---

# 1. OAuth の登場人物


---

# OAuth プロバイダー で OAuth2.0 実装

---

# 主な OAuth プロバイダー 
[https://oauth.net/code/](https://oauth.net/code/)

---
# Keycloak で実装
### 環境
- ubuntu : 20.04.4 LTS
- Java : open jdk 11.0.15
- Keycloak : 18.0.0
---

# 1. Keycloak Setup

---

# :~/keycloak-18.0.0
前提：Keycloakのダウンロード＆解凍後
<br>
- 開発モードでサーバー起動
```
$ ./bin/kc.sh start-dev 
```
- その後 http://0.0.0.0:8080 にアクセス
- 管理者ユーザーの作成
ここでは簡易的に username password と設定した。

---

# 管理コンソールの表示とレルム（Realm）
>- 初期状態では、デフォルトで生成される「master」レルムの設定が表示されます。
>- なお、「レルム」とは Keycloak の管理単位のことで、ユーザーなどの情報は「レルム」単位で管理する。<br>
>- 「master」レルムは、すべてのレルムを管理している特別なレルムです。
><br> 「認証と認可 Keycloak 入門」より

---

# User と Realm の追加
- 管理コンソール上で新たなレルムと管理者でないユーザーを追加する。
- 管理コンソールとは別セッションでブラウザウィンドウを開き(http://localhost:8080/realms/{自作レルム名}/account)にアクセスして新たに作ったユーザーでログインしてみる。

---

# セッションの確認
![セッション確認](Screenshot1.png)

