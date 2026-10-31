# ANIMA · 知识动画实验室

用 Vue 3 + Three.js 把数理公式还原成可以看见、可以拨动的三维过程。每节课围绕一个公式展开：逐行推导、三维曲线生长、实时参数实验。

## 课程

| 编号 | 课程 | 领域 | 核心内容 |
| --- | --- | --- | --- |
| 001 | 马尔萨斯人口模型 | 人口学 | `dN/dt = rN`、指数曲线、翻倍时间、人口与粮食的失衡 |
| 002 | 逻辑斯蒂增长 | 生态学 | 环境容量 K、S 形曲线、拐点与最大增速 |
| 003 | 复利与自然常数 e | 金融数学 | 离散复利阶梯、连续复利极限 `A₀e^{rt}` |
| 004 | 知识关系图谱 | 认知工具 | 图结构、BFS 关联深度、两条知识主线 |
| 005 | 传染病问题 | 流行病学 | SIR 方程组、`R₀ = β/γ`、群体免疫与感染峰值 |

## 技术栈

- Vue 3（`<script setup>` + TypeScript）
- Vite 6
- Three.js r170：TubeGeometry 曲线生长、EffectComposer + UnrealBloom 辉光、Canvas 文字精灵
- KaTeX 0.16：公式渲染与关键项高亮
- 自研数值积分：SIR 模型使用 RK4 求解

## 快速开始

```bash
npm install
npm run dev      # 开发服务器，默认 http://127.0.0.1:5175
npm run build    # 生产构建，输出 dist/
npm run preview  # 预览构建结果
```

## 目录结构

```
src/
├── App.vue                 # 课程库 / 播放器切换
├── views/
│   ├── LibraryView.vue     # 课程库首页
│   └── LessonPlayer.vue    # 通用课程播放器
├── components/
│   ├── FormulaBlock.vue    # 公式逐行动画
│   ├── HeroCanvas.vue      # 首页三维生长曲线
│   └── SiteHeader.vue
├── data/
│   ├── types.ts            # 课程数据模型
│   ├── courses.ts          # 课程注册表
│   ├── malthus.ts          # 001 课程定义
│   ├── logistic.ts         # 002
│   ├── compound.ts         # 003
│   ├── graph.ts            # 004
│   └── sir.ts              # 005
└── three/
    ├── sceneKit.ts         # 公共舞台（渲染、运镜、工具）
    ├── MalthusScene.ts
    ├── LogisticScene.ts
    ├── CompoundScene.ts
    ├── GraphScene.ts
    └── SirScene.ts
```

## 播放器交互

- 章节导航：点击顶部标签跳转，或使用 `←` / `→`
- 播放控制：`Space` 暂停 / 继续，底部按钮可重播本节
- 实验模式：在每课最后一节拖动参数滑块、切换开关，曲线与读数即时更新
- 返回课程库：点击左上角按钮或按 `Esc`

## 扩展一节新课

1. 在 `src/data/types.ts` 的 `SceneKind` 中加入新的场景标识；
2. 新建课程数据文件，实现 `CourseDefinition`（章节、控制项、HUD、公式、统计）；
3. 在 `src/three/` 中实现场景类，满足 `LessonScene` 接口：
   ```ts
   setStep(index: number, progress: number): void
   setParams(params: Record<string, number>): void
   setToggle(key: string, value: boolean): void
   dispose(): void
   ```
4. 在 `src/data/courses.ts` 注册课程，并在 `LessonPlayer.vue` 的 `SCENES` 映射中挂上场景类。

播放器会自动从课程定义生成章节、HUD、公式、滑块与读数，无需修改模板。
