### pre confirmation

事前確認

- macbookでexpoとlaravelを立ち上げて、iPhoneで動作確認する場合
    - `http://localhost` では確認できないので、 `http://<local network ip address>` とすると確認できた
    - IPアドレスはこのコマンドで取得した `ipconfig getifaddr en0`

### server settings

初期設定

    $ cd client
    $ composer install
    $ cp .env.example .env
    $ php artisan migrate
    $ php artisan key:generate
    $ php artisan passport:keys

ログインユーザーの作成

    $ php artisan tinker
    > DB::table('users')->insert(['name'=>'testname','email'=>'test@test','password'=>Hash::make('testtest')])

ユーザーIDは1だと思うが念の為確認する

    $ sqlite3 database/database.sqlite 'select * from users'

client情報を登録する

- リダイレクトURLがclientで指定したものと違う場合エラーになるのできちんと `exp://localhost:19000` を指定する
- client id と client secret はclientの設定にも必要なのでメモっておく

    $ php artisan passport:client
    Which user ID should the client be assigned to?:
    > 1
    What should we name the client?:
    > testclient
    Where should we redirect the request after authorization? [http://localhost/auth/callback]:
    > exp://localhost:19000
    New client created successfully.
    Client ID: 1
    Client secret: hogehoge

### client settings

初期設定

    $ cd client
    $ npm install

App.jsの下記部分をserver設定時メモった値に書き換える

    clientId: '<your client id>',
    clientSecret: '<your client secret>',

localhostを事前確認しておいたlocal network ip addressに書き換える(redirectUriは `exp://localhost:19000` のままで良い)

    authorizationEndpoint: 'http://<local network ip address>:8000/oauth/authorize',
    tokenEndpoint: 'http://<local network ip address>:8000/oauth/tokens/refresh'

### execute example

expo起動

    $ cd client
    $ npm install
    $ expo install expo-app-auth expo-auth-session expo-random
    $ npm start

サーバー起動

ｰ wifiのアドレスで起動する

    $ cd server
    $ php artisan serve --host <local network ip address>

iPhoneでexpo goを起動して、loginリンクをタップすると、ログイン画面が出現すれば成功
作成したユーザー名とパスワードを入力して、Authorizeボタンを押す
