#!/bin/bash
ssh winterwell@baker.good-loop.com bash <<EOF 
/home/winterwell/config/build-scripts/builder.sh \
BUILD_TYPE="CI" \
PROJECT_NAME="studio" \
BRANCH_NAME="master" \
NAME_OF_SERVICE="studio" \
GIT_REPO_URL="github.com:good-loop/studio" \
PROJECT_ROOT_ON_SERVER="/home/winterwell/studio" \
PROJECT_USES_BOB="no" \
PROJECT_USES_NPM="yes" \
PROJECT_USES_WEBPACK="yes" \
PROJECT_USES_JERBIL="no" \
PROJECT_USES_WWAPPBASE_SYMLINK="yes"
EOF

