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
| 006 | 单摆问题 | 力学 | 非线性摆动方程、小角近似、能量与周期修正 |
| 007 | 捕食者—被捕食者 | 生态学 | Lotka–Volterra 方程、平衡点、首次积分与闭合轨道 |
| 008 | 矢量微分算子 | 数学 · 场论 | 梯度、散度、旋度的定义与两条恒等式 |
| 009 | 动量算符的本征函数 | 量子力学 | `p̂ = −iℏ∇`、平面波 `e^{ikx}`、箱归一化与叠加 |
| 010 | 拉普拉斯算子 | 数学 · 偏微分方程 | `Δ = ∇·∇`、差商、调和函数与物理意义 |
| 011 | 极坐标下的拉普拉斯算子 | 数学 · 坐标变换 | 链式法则逐步推导、尺度因子与分离变量 |
| 012 | 柱坐标下的拉普拉斯算子 | 数学 · 坐标变换 | 度量系数、`h_φ = r`、Bessel 方程与分离变量 |

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
├── App.vue                 # 课程库 / 播放器 / 完整推导 / 自测四视图
├── views/
│   ├── LibraryView.vue     # 课程库首页
│   ├── LessonPlayer.vue    # 通用课程播放器
│   ├── DerivationView.vue  # Markdown 完整推导讲义
│   └── QuizView.vue        # 自测与判分
├── components/
│   ├── FormulaBlock.vue    # 公式逐行动画、自适应缩放、点击放大
│   ├── HeroCanvas.vue      # 首页三维生长曲线
│   └── SiteHeader.vue
├── content/                # 12 份 Markdown 讲义（完整推导 + 例题 + 习题 + 证明）
├── data/
│   ├── types.ts            # 课程数据模型
│   ├── courses.ts          # 课程注册表
│   ├── notes.ts            # 讲义加载（import.meta.glob）
│   ├── quizzes.ts          # 题库加载
│   ├── quizzes/            # 12 份自测题（每课 6 题）
│   └── 001–012 课程定义
├── utils/
│   └── markdown.ts         # 自研 Markdown + KaTeX 渲染器
└── three/
    ├── sceneKit.ts         # 公共舞台（渲染、运镜、拖拽旋转、工具）
    └── 12 个场景类
```

## 播放器交互

- 章节导航：点击顶部标签跳转，或使用 `←` / `→`
- 播放控制：`Space` 暂停 / 继续，底部按钮可重播本节
- 实验模式：在每课最后一节拖动参数滑块、切换开关，曲线与读数即时更新
- 三维舞台：在画面上按住鼠标横向/纵向拖动，可绕目标点旋转视角；双击复位；`Esc` 返回课程库
- 公式显示：公式超出容器时等比缩放，过宽时可横向拖动；点击任意公式可放大查看，`Esc` 关闭
- 完整推导：右上角「完整推导」进入该课的 Markdown 讲义，含逐步推导、例题、习题解答与公式/引理证明，可按目录跳转或导出 MD
- 自测：右上角「自测」进入该课 6 道单选题，即时判分并给出解析与错题回顾
- 导出讲义：在讲义页点击「导出 MD」，把该课完整推导保存为 Markdown 文件

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
4. 在 `src/data/courses.ts` 注册课程，并在 `LessonPlayer.vue` 的 `SCENES` 映射中挂上场景类；
5. 新建 `src/content/<courseId>.md` 讲义与 `src/data/quizzes/<courseId>.ts` 题库，二者按文件名为课程自动挂载。

播放器会自动从课程定义生成章节、HUD、公式、滑块与读数，无需修改模板。
