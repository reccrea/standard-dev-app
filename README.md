### Vue3 项目框架搭建

> Vite、eslint、prettier、husky、commitlint、lint-staged、stylelint

> node—18.13.0、pnpm—7.23.0

#### 1. 使用`Vite`脚手架初始化项目

https://cn.vitejs.dev/guide/

```
pnpm create vite development-app --template vue-ts

选择vue-ts模板

修改vite.config.ts，修改域名端口，自动打开浏览器
server: {
    host: 'localhost',
    port: 8888,
    open: true
}
```

#### 2. 代码加入`eslint`校验，与`prettier`自动格式化

> https://eslint.bootcss.com/

> `eslint`运行代码前就可以发现一些语法错误和潜在的 bug，目标是保证团队代码的一致
> 性和避免错误

> https://www.prettier.cn/

> `prettier`是代码格式化工具，用于检测代码中的格式问题，比如单行代码长度，tab 长
> 度，空格，逗号表达式等等

> 区别联系：`eslint`偏向于把控项目的代码质量，而`prettier`更偏向于统一项目的编码
> 风格。`eslint`有小部分的代码格式化功能，一般和`prettier`结合使用

```
pnpm install eslint eslint-plugin-vue eslint-config-prettier prettier eslint-plugin-import eslint-plugin-prettier eslint-config-airbnb-base -D

eslint: ESLint的核心库
prettier: prettier格式化代码的核心库
eslint-config-airbnb-base	airbnb的代码规范（依赖plugin-import）
eslint-config-prettier		eslint结合prettier的格式化
eslint-plugin-vue			eslint在vue里的代码规范
eslint-plugin-import		项目里面支持eslint
eslint-plugin-prettier		将prettier结合进去eslint的插件

配置script脚本，项目安装eslint配置
"lint:create": "eslint --init"

执行npm run lint:create

会自动创建一个.eslintrc.cjs文件

安装完成后，后面的启动项目还缺少一些依赖，提前按需安装好
pnpm install typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-import-resolver-alias @types/eslint @types/node -D

@typescript-eslint/parser				eslint解析器，解析typescript，检查规范typescript代码
@typescript-eslint/eslint-plugin		eslint插件，包含了各类定义好的检测typescript代码的规范
eslint-import-resolver-alias			让我们可以用import的时候使用@别名
```

#### 3. `eslintrc`文件的修改

> 因为`eslint`是 node 工具，所以文件名是`.cjs`结尾(commonjs 规范)——对应
> 的`.mjs`就是 ES Module 规范

```
module.exports = {
	// 环境:
	env: {
		// 浏览器
		browser: true,
		// 最新es语法
		es2021: true,
		// node环境
		node: true,
	},
	// 扩展的eslint规范语法，可以被继承的规则
	// 字符串数组：每个配置继承它前面的配置
	// 分别是：
	// eslint-plugin-vue提供的
	// eslint-config-airbnb-base提供的
	// eslint-config-prettier提供的
	// 前缀 eslint-config-, 可省略
	extends: [
		'plugin:vue/vue3-strongly-recommended',
		'airbnb-base',
		'prettier'
	],
	// eslint 会对我们的代码进行检验
	// parser的作用是将我们写的代码转换为ESTree（AST）
	// ESLint会对ESTree进行校验
	parser: 'vue-eslint-parser',
	// 解析器的配置项
	parserOptions: {
		// es的版本号，或者年份都可以
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser',
		// 源码类型 默认是script，es模块用module
		sourceType: 'module',
		// 额外的语言类型
		ecmaFeatures: {
			tsx: true,
			jsx: true,
		},
	},
	// 全局自定义的宏，这样在源文件中使用全局变量就不会报错或者警告
	globals: {
		defineProps: 'readonly',
		defineEmits: 'readonly',
		defineExpose: 'readonly',
		withDefault: 'readonly',
	},
	// 插件
	// 前缀 eslint-plugin-, 可省略
	// vue官方提供了一个ESLint插件 eslint-plugin-vue，它提供了parser和rules
	// parser为 vue-eslint-parser，放在上面的parsr字段，rules放在extends字段里，选择合适的规则
	plugins: [
		'vue',
		'@typescript-eslint'
	],
	settings: {
		// 设置项目内的别名
		'import/reslover': {
			alias: {
				map: [
					['@', './src']
				],
			},
		},
		// 允许的扩展名
		'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
	},
	// 自定义规则，覆盖上面extends继承的第三方库的规则，根据组内成员灵活定义
	rules: {
		'import/no-extraneous-dependencies': 0,
		'no-param-reassing': 0,
		'vue/multi-word-commponent-names': 0,
		'vue/attribute-hyphenation': 0,
		'vue/v-on-event-hyphenation': 0,
	},
};
```

修改 package.json 文件，添加一个脚本命令 "lint": "eslint
\"src/\*_/_.{js,vue,ts}\" --fix"

#### 4. 修改`vite.config.js`

```
pnpm install vite-plugin-eslint -D
vite的一个插件，让项目可以方便的得到eslint支持，完成eslint配置后，可以快速的将其集成进vite之中，便于在代码不符合eslint规范的第一时间看到提示

import eslintPlugin from 'vite-plugin-eslint'

plugins: [vue(), eslintPlugin()]
```

#### 5. 修改添加常见配置文件

外部新建文件 `.eslintrcignore`、`.prettierrc.cjs`、`.prettierignore`

```
.eslintrcignore文件内容：

*.sh
node_modules
*.md
*.woff
*.ttf
.vscode
.idea
dist
/public
/docs
.husky
/bin
.eslintrc.js
prettier.config.js
/src/mock/*

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

.DS_Store
dist-ssr
*.local

/cypress/videos/
/cypress/screenshots/

# Editor directories and files
.vscode
!.vscode/extensions.json
.idea
*.suo
*.njsproj
*.sln
*.sw?

components.d.ts
```

```
.prettiercjs.js文件内容：

module.exports = {
	// 一行最多多少字符
	printWidth: 80,
	// 使用2个空格缩进
	tabWidth: 2,
	// 使用tab缩进，不使用空格
	useTabs: true,
	// 行尾需要分号
	semi: true,
	// 使用单引号
	singleQuote: true,
	// 对象的key仅在必要时使用引号
	quoteProps: 'as-needed',
	// jsx不使用单引号，而使用双引号
	jsxSingleQuote: false,
	// 尾随逗号
	trailingComma: 'es5',
	// 大括号内的收尾需要空格
	bracketSpacing: true,
	// 箭头函数，只有一个参数的时候，也需要括号
	arrowParens: 'always',
	// 每个文件格式化的范围是文件的全部内容
	rangeStart: 0,
	rangeEnd: Infinity,
	// 不需要写文件开头的@prettier
	requirePragma: false,
	// 不需要自动在文件开头插入@prettier
	insertPragma: false,
	// 使用默认的折行标准
	proseWrap: 'always',
	// 根据显示样式决定html要不要折行
	htmlWhitespaceSensitivity: 'css',
	// 换行符使用lf
	endOfLine: 'lf',
};
```

```
.prettierignore文件内容：

/dist/*
.local
.output.js
/node_modules/**
src/.DS_Store

**/*.svg
**/*.sh

/public/*
components.d.ts
```

修改 package.json 文件，添加一个脚本命令 "prettier-format": "prettier --config
.prettierrc.cjs \"src/\*_/_.{vue,js,ts}\" --write"

```
tsconfig.json

ts编译项目的根目录

Vite使用esbuild将Typescript转译到JavaScript，但不执行任何类型检查；vue-tsc比tsc速度更快

{
	"compilerOptions": {
		// 指定es的目标版本
		"target": "ESNext",
		"useDefineForClassFields": true,
		"module": "ESNext",
		// 决定如何处理模块
		"moduleResolution": "node",
		"strict": true,
		"jsx": "preserve",
		"sourceMap": true,
		"resolveJsonModule": true,
		"isolatedModules": true,
		"esModuleInterop": true,
		// 编译过程中需要引入的库文件的列表
		"lib": ["ESNext", "DOM", "DOM.Iterable"],
		// 默认所有可见的"@types"包会在编译过程中被包含进来
		"types": ["vite/client"],
		"skipLibCheck": true,
		"noEmit": true,
		// 解析非相对模块名的基准目录
		"baseUrl": ".",
		// 模块名到基于baseurl的路径映射的列表
		"paths": {
			"@/": ["scr/"],
			"*.ts": ["*"]
		}
	},
	"include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
	"references": [{ "path": "./tsconfig.node.json" }]
}
```

#### 6. `Husky`、`lint-staged`、`commitlint`功能添加

> `husky`是一个未 git 客户端增加 hook 的工具，在一些 git 操作之前自动触发的函数
>
> https://typicode.github.io/husky/#/
>
> 如果我们希望在检测错误的同时，自动修复`eslint`语法错误，就可以通过后面钩子实现

> `lint-staged`过滤出 git 代码暂存区（被 git add 的文件）的工具，将所有暂存文件
> 的列表传递给任务

> `commitlint`是对我们 git commit 提交的注释进行校验的工具

```
pnpm install husky -D

配置package.json文件
(新项目需要先 git init 一下)
"prepare": "husky install"

执行 npm run prepare, 将husky安装完毕

----------

后面就可以添加各种 git hooks 钩子
pre-commit 一般添加的是lint-staged，去对git暂存区的代码做一些格式化的操作
npx husky add .husky/pre-commit "npx lint-staged"

add: 追加
set: 直接覆盖

----------

lint-staged对add之后，暂存区里面的文件进行格式化修复等工作
pnpm install lint-staged -D

package.json文件中，添加

"lint-staged": {
    "*.{js,jsx,vue,ts,tsx}": [
      "pnpm run lint",
      "pnpm run prettier-format"
    ]
  }

----------

pnpm install @commitlint/config-conventional @commitlint/cli -D
安装这两个库，然后新建一个config文件(commitlint.config.cjs)

添加到git钩子里
npx husky add .husky/commit-msg "npx --no -- commitlint --edit ${1}"
通过一个命令添加钩子

使用git commit -m "提交说明"，进行提交，提交说明应尽量清晰明了，说明本次提交的目的
推荐使用Angular规范，这是目前使用最广的写法
```

```
commitlint-config.cjs文件内容：

module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [
			2,
			'always',
			[
				// 编译相关的修改，例如发布版本，对项目构建或者依赖的改动
				'build',
				// 新功能(feature)
				'feat',
				// 修复bug
				'fix',
				// 更新某功能
				'update',
				// 重构
				'refactor',
				// 文档
				'docs',
				// 构建过程或者辅助工具的变动,如增加依赖库等
				'chore',
				// 不影响代码运行的变动
				'style',
				// 撤销commit,回滚到上一个版本
				'revert',
				// 性能优化
				'perf',
				// 测试(单元,集成测试)
				'test',
			],
		],
		'type-case': [0],
		'type-empty': [0],
		'scope-empty': [0],
		'scope-case': [0],
		'subject-full-stop': [0, 'never'],
		'subject-case': [0, 'never'],
		'header-max-length': [0, 'always', 74],
	},
};
```

常用的 git hooks

- pre-commit：由 git commit 调用，在 commit 之前执行
- commit-msg：由 git commit 或 git merge 调用
- pre-merge-commit：由 git merge 调用，在 merge 之前执行
- pre-push：被 git push 调用，在 git push 之前执行，防止进行推送
