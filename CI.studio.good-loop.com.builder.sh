#!/bin/bash

TARGET_SERVER='baker.soda.sh'
TARGET_DIR='/home/winterwell/studio.good-loop.com/'
SYNC_LIST=("config" "convert.less.sh" "jest-puppeteer.config.js" "package.json" "puppeteer-tests" "runtest.js" "src" "tsconfig.json" "web" "webpack.config.js")

printf "\nRemoving old 'base' symlink\n"
rm -rf src/js/base
printf "\nSymlinking 'base' from where TeamCity keeps it's wwappbase.js repo\n"
ln -s /home/winterwell/TeamCity/buildAgent/work/9307b27f248c307/base src/js/base

for sync_item in ${SYNC_LIST[@]}; do
	rsync -rLhP $sync_item winterwell@$TARGET_SERVER:$TARGET_DIR
done

ssh winterwell@$TARGET_SERVER "cd $TARGET_DIR && npm i"
ssh winterwell@$TARGET_SERVER "cd $TARGET_DIR && npm run compile"
#ssh winterwell@$TARGET_SERVER "cd $TARGET_DIR && bash ./convert.less.sh"
