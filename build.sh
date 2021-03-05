npm run build
rm -rf ../asura/asura-ui-cli/src/main/resources/static/*
cp -R ./dist/asura-ui-cli-web/* ../asura/asura-ui-cli/src/main/resources/static
