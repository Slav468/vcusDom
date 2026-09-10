// Налаштування шаблону
import templateConfig from '../template.config.js'
// Логгер
import logger from './logger.js'

import ghpages from 'gh-pages'

// Публікація зібраної папки dist на gh-pages без перезбірки
// Флаг --dry створює коммит локально, але не пушить його (push: false)
const isDry = process.argv.includes('--dry')
logger(`_GIT_DEPLOY_START`)
ghpages.publish('dist', {
	branch: templateConfig.git.branch,
	repo: templateConfig.git.repo,
	push: !isDry,
}, (err) => {
	if (err) {
		logger(`(!!)${err}`)
		process.exitCode = 1
	} else {
		logger(`_GIT_DEPLOY_DONE`)
	}
});
