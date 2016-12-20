const copyConfig = require('../node_modules/@ionic/app-scripts/config/copy.config');

copyConfig.include.push({
  src: '{{ROOT}}/node_modules/font-awesome/fonts/',
  dest: '{{WWW}}/assets/fonts/'
});