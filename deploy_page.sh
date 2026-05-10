cp hugo.production.toml hugo.toml

hugo --cleanDestinationDir
rsync -avz --delete public/ digilm-cloud-server:/var/www/gepaeckaufgabe.jetzt
rm -rf public/

cp hugo.development.toml hugo.toml
