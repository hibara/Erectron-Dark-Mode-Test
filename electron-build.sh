cd `dirname $0`

# Name of your app
APP_NAME="ErectronDarkModeTest"
APP_VERSION="1.0.0"
# Copyright
COPYRIGHT="©2020 Mitsuhiro Hibara"
# Erectron version
ELECTRON_VERSION="10.1.0"

# ref. https://taku-o.hatenablog.jp/entry/20171204/1512415038
# ref. https://github.com/electron/electron-packager/blob/master/usage.txt
electron-packager ../ $APP_NAME \
  --appname=$APP \
  --app-version=$APP_VERSION \
  --app-copyright=$COPYRIGHT \
  --overwrite \
  --platform=darwin \
  --out=./ \
  --arch=x64 \
  --app-category-type="public.app-category.developer-tools" \
  --electronVersion=$ELECTRON_VERSION \
  --icon=main_icon/app.icns \
  --ignore="^/\.gitignore" \
  --ignore="^/\.git/" \
  --ignore="^/\.idea/" \
  --ignore="^/\.DS_Store" \
  --ignore="^/electron-build.sh" \
  --ignore="^/_images" \
  --ignore="^/_資料" \
  --ignore="^/icon.png" \
  --ignore="^ErectronDarkModeTest-darwin-x64" \
  --app-bundle-id="org.hibara.erectrondarkmodetest" \
  --darwin-dark-mode-support=true

# exit
