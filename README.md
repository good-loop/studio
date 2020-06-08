
# Widgets Studio

## How to use:

Visit http://localstudio.good-loop.com

or to run tests:

	node runtest.js

## Motivation

Widgets are critical components used across multiple projects. Testing should be robust enough to give us confidence that code changes will not break them in any way. Performing this testing through e2e tests using puppeteer on each individual website is not ideal. So this is a dedicated site for it.

## Setup for New Developers

studio is the ideal project for a new Good-Loop front-end developer. So let's run through it's setup:


These instructions assume Linux.

1. Install npm and less via apt-get.

2. Make a folder to hold this repo + its siblings. We'll name this `winterwell`, after the company that wrote the original code.

       cd ~
       mkdir winterwell
       cd winterwell

3. Clone this repo and its sibling `wwappbase.js`

       git clone git@github.com:winterstein/sogive-app.git
       git clone git@github.com:winterstein/wwappbase.js.git

Note: the studio repo contains some symlinks to folders in the `wwappbase.js` repo.

4. Install npm packages

       cd studio
       npm i

5. Compile the js (and watch for edits)

       ./watch.sh

6. Setup a local web-server. Let's use nginx, serving the `studio/web` folder, using a ready-made config file.
  
   sudo apt install nginx
   cd /etc/nginx/sites-available
   sudo ln -s /home/{myusername}/winterwell/stduio/config/studio.good-loop.com.nginx

   cd /etc/nginx/sites-enabled
   sudo ln -s ../sites-available/studio.good-loop.com.nginx .

   sudo ln -s /home/{myusername}/winterwell /home/winterwell

   sudo service nginx restart

7. Modify your /etc/hosts to have `127.0.0.1 localstudio.good-loop.com`

8. Test: You should be able to view your local web-app from a browser at http://localstudio.good-loop.com

9. Celebrate as you see best.
