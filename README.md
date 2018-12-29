# maqz
サイトビルダー「maqz」です。

## 使い方
### 1. GitHubからクローン

1. Node.js、Gitをインストールします。VS CodeなどのIDEのインストールもお勧めします。
2. 新しくフォルダーを作成します
3. `git init`
4. `git remote add upstream https://github.com/tamaina/maqz.git`
6. `git fetch upstream`
7. `git checkout src`
8. `npm install`
9. `npm install gulp -g`
10. `git worktree add docs master; git worktree add pages pages`

### ビルド

1. `gulp prebuild-files`  
   画像を直接files以下に追加した場合、このコマンドを実行します。少し重いと思います。   
   詳細は後述。
2. `gulp`

### ページのみビルド
ページのみを操作して公開したい場合`gulp pages`をすると、スタイルやスクリプトの生成をしないので、速くビルドできます。

### ローカルで確認
ローカルサーバーを立てて内容を事前に確認できます。`.config/debug-override.yml`で設定できます。

`gulp local-server`を実行し、緑色で表示されたlocalhostを含むアドレスにアクセスします。

### 公開する
GitHub Pagesを使って自分のサイトとして公開してみましょう。

1. GitHubでリポジトリを作成します。
2. `.config/default.yml`を編集し、自分のサイトの設定に合わせます。 
3. `package.json`も編集します。
4. `git remote add origin (git url).git`
5. **独自ドメインにする場合、**`theme/static`に`CNAME`という名前のファイル(拡張子なし)を作成し、中身は自分が公開したいドメインを書きます(例: `maqz.example.com`)
6. ビルド
7. `.\pushAll.bat 'コミットコメント'` (コミットコメントにはわかりやすいものに)
8. 実際にアクセスして確認してみましょう。 

### 画像の登録(圧縮)
maqzでは、画像は原則縮小・圧縮することになっています。

filesフォルダ以下に置いたファイルには圧縮がかかります。  
`theme/static/`に置いたファイルは圧縮されません。

設定は`./config/images.yml`で行います。

ImageMagickまたはGraphicsMagickが必要です。

#### 画像を追加
```
gulp image -i <glob-readable-path>
```

ラスタ画像は以下のようになります(設定で変更可)。  
- `/files/images/imports/yyyy/mm/{name}.{ext}` - 長辺が1600px以下で同系式(圧縮はする)
- `/files/images/imports/yyyy/mm/{name}.720.{ext}` - 長辺が720px以下で同系式(圧縮はする)
- `/files/images/imports/yyyy/mm/{name}.720c.jpeg` - 短編が720pxのjpeg

SVGも圧縮します。

#### 全ての画像を再圧縮
```
gulp image-prebuildFiles
```

## ページを編集する
ページを編集するには、`pages`フォルダ以下にmarkdown(.md)、pug(.pug)、html(.html)を配置します。通常はこのディレクトリ構造のままファイルが公開されることでしょう。

ファイルの先頭の`---`で囲んだ範囲をFrontMatterといい、Yaml形式でページに関する設定を行えます。  
たとえば、`title`はページのタイトル、`description`はページの短い説明、`theme`は使用するテンプレート(後述)を指定します。

pugファイルであれば、自身のFrontMatterは`page.attributes`から参照できます。

## テーマを編集する
`theme`フォルダにテーマがあり、編集できます。

### HTML(pug)
`templates`フォルダにはテンプレートを配置します。  
この中にあるどのファイル名のpugを利用するかをFrontMatterの`theme`で決定することができます。  
指定しなければ、または存在しなければ`default.pug`で処理を行います。  
ampはamp_を付加したものを利用します。  
ページをhtml化したものは`main_html`として格納されています。

`includes/_mixins.pug`, `includes/_script.pug`はページのpugをHTMLにするときに先頭に付加されます。

`.config`フォルダ内の設定は`site`にまとめて格納されています。

また、`scripts/builder/registerer/base.js`を編集することでデータを簡単に追加できます。

### スタイル(styl, sass)
sass形式で書かれています。main.jsを読みます。

### JavaScript
サイトに挿入するJavaScriptです。main.sassを読みます。ampはamp_mainを読みます。

## サイトを公開する
1. `.config/default.yml`を公開条件に合わせて編集する
2. ビルド(前述)する
3. `docs`フォルダもしくは`docs`ブランチを公開する


## Note

### worktreeの追加

1. (既存の{basebranch}ブランチを親として利用) `git checkout -b {basebranch}; git checkout {basebranch}`
   (親もたない新規ブランチを作成) 念のため新たな作業フォルダにcloneして`git checkout --orphan {branch}`→全てのフォルダを消去→`git push origin {branch}`
2. `git checkout master`
2. `git worktree add {path} {branch}`
3. `cd {path}`
4. 不要なファイルを消去
5. `git push --set-upstream origin {branch}` (set-upstreamを指定してあると、`git pull/push`などで明示的にリモートを指定する必要がなくなる)

worktreeについて他のコマンドを調べるには`git worktree -h`でヘルプを表示

## ライセンス
CC0
