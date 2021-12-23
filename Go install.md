## Go install

1. **https://golang.org** から最新版をダウンロード

2. ダウンロードしたアーカイブを/usr/localに解凍し、/usr/local/goにGoのツリーを作成します。

   **注意**：
   ここでは、/usr/local/go に以前のインストールがある場合、展開する前に削除します。
   先に進む前にデータをバックアップしてください。

   たとえば、rootまたはsudoで以下を実行します。

   ```
   rm -rf /usr/local/go && tar -C /usr/local -xzf go1.17.5.linux-amd64.tar.gz
   ```

3. $HOME/.profile に

   ``` 
   export PATH=$PATH:/usr/local/go/bin
   ```

   を追加

```
$ source $HOME/.profile
$ go version
```

で確認する。

参照 : https://go.dev/doc/install