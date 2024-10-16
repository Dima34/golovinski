#!/bin/sh
DEPLOYMENT_PREVIEW_URL="https://bridge-affiliate-network.makinggoodshit.online"
DEPLOYMENT_PREVIEW_USER="ya537025"
DEPLOYMENT_PREVIEW_HOST="ya537025.ftp.tools"
DEPLOYMENT_PREVIEW_ROOT_DIR="/home/ya537025/makinggoodshit.online/bridge-affiliate-network"
DEPLOYMENT_PREVIEW_THEME_DIR="$DEPLOYMENT_PREVIEW_ROOT_DIR/wp-content/themes/sage-theme"
echo "HOST: $DEPLOYMENT_PREVIEW_URL"

# Define variables
HOST=""
USER=""

#Make theme-build on local machine
make build-production || { echo "Failed to build theme"; exit 1; }

# Start SSH agent and add key
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa || { echo "Failed to add SSH key"; exit 1; }

ssh $USER@$HOST "mkdir -p $DEPLOYMENT_PREVIEW_THEME_DIR" || { echo "Failed to create theme folder"; exit 1; }
rsync -avzr --progress --exclude 'node_modules' --exclude 'vendor' --exclude 'deploy.sh' --delete ./* $USER@$HOST:$DEPLOYMENT_PREVIEW_THEME_DIR || { echo "Failed to sync theme"; exit 1; }
# Make wp acorn view:clear on remote server
ssh $USER@$HOST "cd $DEPLOYMENT_PREVIEW_THEME_DIR && composer install && wp acorn view:clear" || { echo "Failed to clear views"; exit 1; }

echo "Deployment completed successfully"
