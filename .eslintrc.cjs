module.exports = {
    // 环境:
    // 浏览器、最新es语法、node环境
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    // 扩展的eslint规范语法，可以被继承的规则
    // 字符串数组：每个配置继承它前面的配置
    // 分别是 eslint-plugin-vue提供的
    // eslint-config-airbnb-base提供的
    // eslint-config-prettier提供的
    // eslint-config- 前缀可以简写
    extends: [
        "plugin:vue/vue3-strongly-recommended",
        "airbnb-base",
        "prettier"
    ],
    // eslint 会对我们的代码进行检验，而parser的作用是将我们写的代码转换为ESTree（AST），ESLint会对ESTree进行校验
    parser: "vue-eslint-parser",
    // 解析器的配置项
    parserOptions: {
        // es的版本号，或者年份都可以
        ecmaVersion: "latest",
        parser: "@typescript-eslint/parser",
        // 源码类型 默认是script，es模块用module
        sourceType: "module",
        // 额外的语言类型
        ecmaFeatures: {
            tsx: true,
            jsx: true
        }
    },
    // 全局自定义的宏，这样在源文件中使用全局变量就不会报错或者警告
    /* global: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefault: 'readonly',
    }, */
    // 插件
    // 前缀 eslint-plugin- 可省略
    // vue官方提供了一个ESLint插件 eslint-plugin-vue，它提供了parser和rules
    // parser为 vue-eslint-parser，放在上面的parsr字段，rules放在extends字段里，选择合适的规则
    plugins: [
        "vue",
        "@typescript-eslint"
    ],
    settings: {
        // 设置项目内的别名
        "import/reslover": {
            alias: {
                map:[["@", "./src"]]
            }
        },
        // 允许的扩展名
        "import/extensions": [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".mjs"
        ]
    },
    // 自定义规则，覆盖上面extends继承的第三方库的规则，根据组内成员灵活定义
    rules: {
        "import/no-extraneous-dependencies": 0,
        "no-param-reassing": 0,
        "vue/multi-word-commponent-names": 0,
        "vue/attribute-hyphenation": 0,
        "vue/v-on-event-hyphenation": 0
    }
}
