# Remix

アーカイブ：https://remix-ide.readthedocs.io/en/latest/
## 使い方

Remixデフォルトワークスペースは以下の場合存在する。

* ファイルエクスプローラからファイルをRemixに読み込んでない
* 新しくRemixワークスペースをを読み込んだとき



デフォルトワークスペースの３つのディレクトリについて...

1. contract : 3つのサンプルcontractがある。
2. scripts    : コントラクトをデプロイ
3. tests       : contractフォルダにあるBallot contract, 
                     Storage contract 用のテストファイルが入っている

SCRIPTSフォルダ

cripts' フォルダーには、'Storage' コントラクトをデプロイするための 2 つのサンプル async/await スクリプトが含まれています。
他のコントラクトをデプロイする場合は、 'contractName' と 'constructorArgs' を (必要なら他のコードと一緒に) 更新しなければなりません。

また、tests ディレクトリの中には、Storage コントラクトのユニットテストを含むスクリプトがあります。

スクリプトを実行するには、ファイル エクスプローラーでファイル名を右クリックし、'Run' をクリックします。Solidity ファイルは既にコンパイルされている必要があります。
スクリプトからの出力は remix ターミナルに表示されます。

なお、Remix がサポートするモジュールでは、'require' ステートメントが限定的にサポートされています。
今のところ、Remix がサポートしているモジュールは ethers, web3, swarmgw, chai, remix と hardhat.ethers object/plugin だけです。
サポートされていないモジュールの場合、次のようなエラーが投げられます: '<module_name> module require is not supported by Remix IDE will be shown.





