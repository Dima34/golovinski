#!/bin/sh
envPath="/var/www/html/wp-content/themes/sage-theme/.env"
# Ensure the .env file is in the same directory as this script
if [ -f $envPath ]; then
   echo ".env file found"
  . "$envPath"
else
  echo ".env file not found at $envPath!"
   ls -a /tmp
  exit 1
fi

if [ "$1" = "--reset" ]; then
    WP_RESET="true"
else
    WP_RESET="false"
fi
#Sleep to wait db
DEVDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
echo $DEVDIR
cd /var/www/html;
if [ "$WP_RESET" = "true" ]; then
    echo "Resetting WP"
    wp plugin delete $PLUGINS --allow-root
    wp db reset --yes --allow-root
    rm wp-config.php;
fi

if [ ! -f wp-config.php ]; then
    echo "Configuring";
    wp config create --dbhost="$WP_DB_HOST" --dbname="$DB_NAME" --dbuser="$DB_USER" --dbpass="$DB_PASSWORD" --skip-check --allow-root;
    wp core install --url="$WP_SITEURL" --title="$WP_SITE_TITLE" --admin_user="$WP_ADMIN_USER" --admin_email="$WP_ADMIN_EMAIL" --admin_password="$WP_ADMIN_PASS" --skip-email --allow-root;
    wp plugin install $PLUGINS --activate --allow-root


    #Debug settings
    wp config set WP_DEBUG_LOG $WP_DEBUG_LOG --raw --allow-root
    wp config set WP_DEBUG_DISPLAY $WP_DEBUG_DISPLAY --raw --allow-root

    #Data import
    cd $DEVDIR/devcontainer/data/
    for f in *.sql; do
        wp db import $f --allow-root
    done

    cp -r plugins/* /var/www/html/wp-content/plugins
    for p in plugins/*; do
        wp plugin activate $(basename $p) --allow-root
    done

    #Activate theme
    wp theme activate sage-theme --allow-root
else
    echo "Already configured"
fi
