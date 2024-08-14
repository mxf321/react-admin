module.exports = {
  types: [
    { value: "feat", name: "feat:     新功能" },
    { value: "fix", name: "fix:      修复" },
    { value: "docs", name: "docs:     文档变更" },
    { value: "style", name: "style:    代码格式（不影响代码运行的变动）" },
    {
      value: "refactor",
      name: "refactor: 代码重构（既不是增加feature，也不是修复bug）",
    },
    { value: "perf", name: "perf:     性能优化" },
    { value: "test", name: "test:     添加一个测试" },
    { value: "chore", name: "chore:    构建过程或辅助工具的变动" },
    { value: "revert", name: "revert:   代码回退" },
    { value: "build", name: "build:    打包" },
  ],

  // 步骤
  messages: {
    type: "请选择提交的类型:",
    scope: "选择一个scope (可选):",
    // used if allowCustomScopes is true
    customScope: "请输入修改的范围（可选）",
    subject: "请简要描述提交（必填）",
    body: "请输入详细描述（可选）",
    breaking: "非兼容性说明 (可选):\n",
    footer: "请输入要关闭的issue（可选）",
    confirmCommit: "确定要使用以上信息提交?",
  },

  allowCustomScopes: true,
  allowBreakingChanges: ["特性", "修复"],
  // 跳过步骤
  skipQuestions: ["body", "footer"],
  // 默认长度为 72 （可改）
  subjectLimit: 72,
};
