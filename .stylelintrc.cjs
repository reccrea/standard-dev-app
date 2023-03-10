module.exports = {
	extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue'],
	overrides: [
		// 若项目中存在scss文件，添加以下配置
		{
			files: ['*.scss', '**/*.scss'],
			customSyntax: 'postcss-scss',
			extends: ['stylelint-config-recommended-scss'],
		},
		// 若项目中存在less文件，添加以下配置
		{
			files: ['*.less', '**/*.less'],
			customSyntax: 'postcss-less',
			extends: ['stylelint-config-recommended-less'],
		},
	],
	rules: {
		'no-empty-source': null,
	},
};
