const { writeFileSync } = require('fs');
const {resolve} = require('path');
const manifest = require('./manifest');

delete manifest.content_security_policy;
manifest.chrome_url_overrides.newtab = 'index.html';

writeFileSync(resolve(__dirname, 'dist', 'manifest.json'), JSON.stringify(manifest));
