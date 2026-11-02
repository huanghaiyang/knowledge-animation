import type { BookSection } from './types'

const raw = String.raw

export const ch7Sections: BookSection[] = [
  {
    id: 'qm-7-1',
    no: '7.1',
    title: '算符的基本知识',
    pages: '263–266',
    tag: '把力学量写成规则',
    abstract:
      '算符是作用在函数上、得到另一个函数的线性规则。量子力学把坐标、动量、能量都翻译成算符：坐标是乘法，动量是微分。本节建立算符的线性、乘积、对易与逆这些基本语法。',
    keyIdeas: [
      '算符是线性的映射：$\\hat A(c_1\\psi_1+c_2\\psi_2)=c_1\\hat A\\psi_1+c_2\\hat A\\psi_2$。',
      '坐标算符是乘法，动量算符是 $-i\\hbar$ 对坐标的偏导。',
      '算符乘积一般不对易，对易子 $[\\hat A,\\hat B]=\\hat A\\hat B-\\hat B\\hat A$ 携带量子信息。',
      '本征值方程 $\\hat A\\psi_n=a_n\\psi_n$ 给出一次测量可能得到的读数。'
    ],
    beats: [
      {
        title: '从数到规则：算符的定义',
        paragraphs: [
          '经典力学里，位置 $x$ 与动量 $p$ 都是数。量子力学里，它们变成作用在波函数上的规则：$\\hat x\\psi(x)=x\\psi(x)$，$\\hat p\\psi(x)=-i\\hbar\\,d\\psi/dx$。同一个符号，作用的对象从粒子换成了波函数。',
          '算符必须是线性的。线性保证叠加原理在测量层面仍然成立：两个可能态的叠加，其测量结构由两个分量线性决定。',
          '能量算符由动量与势能拼成：$\\hat H=\\hat p^2/2m+V(\\hat x)$。把 $\\hat p$ 的微分形式代入，就得到熟悉的 $-\\hbar^2/2m\\,d^2/dx^2+V(x)$。'
        ],
        formulas: [
          { math: raw`\hat{x}\,\psi(x)=x\,\psi(x)`, note: '坐标算符：乘以坐标本身' },
          { math: raw`\hat{p}\,\psi(x)=-i\hbar\frac{\partial \psi}{\partial x}`, note: '动量算符：对坐标求导' },
          { math: raw`\hat H=-\frac{\hbar^2}{2m}\frac{\partial^2}{\partial x^2}+V(x)`, note: '哈密顿算符：动能加势能' }
        ],
        insight: '算符不是抽象矩阵，它的具体形式由“测量什么”决定。'
      },
      {
        title: '算符代数：和、积与对易子',
        paragraphs: [
          '两个算符之和按作用结果逐点相加；乘积则按顺序依次作用，$\\hat A\\hat B$ 表示先让 $\\hat B$ 作用，再让 $\\hat A$ 作用。',
          '顺序通常不能交换。$\\hat x\\hat p\\psi=x(-i\\hbar\\,\\psi^{\\prime})$，而 $\\hat p\\hat x\\psi=-i\\hbar\\,(x\\psi)^{\\prime}=\\hat x\\hat p\\psi-i\\hbar\\psi$，两者恰好相差一个常数项。',
          '对易子 $[\\hat A,\\hat B]=\\hat A\\hat B-\\hat B\\hat A$ 衡量这种顺序差异。它不是数学装饰，而是量子力学最核心的结构之一：不对易意味着两个力学量不能同时具有确定值。'
        ],
        formulas: [
          { math: raw`(\hat A+\hat B)\psi=\hat A\psi+\hat B\psi`, note: '算符加法：逐点相加' },
          { math: raw`(\hat A\hat B)\psi=\hat A(\hat B\psi)`, note: '算符乘积：从右向左依次作用' },
          { math: raw`[\hat x,\hat p]=i\hbar`, note: '坐标与动量的对易子' }
        ],
        insight: '对易子的数值不是零，而是 $i\\hbar$；这个常数后来长成了不确定性原理。'
      },
      {
        title: '本征值方程与期待值',
        paragraphs: [
          '若 $\\hat A\\psi_n=a_n\\psi_n$，则 $\\psi_n$ 是 $\\hat A$ 的本征函数，$a_n$ 是对应的本征值。一次测量该力学量，只能得到某个 $a_n$。',
          '任意波函数可以按本征函数展开：$\\psi=\\sum c_n\\psi_n$，系数满足归一化 $\\sum|c_n|^2=1$。',
          '期待值 $\\langle A\\rangle=\\int\\psi^*\\hat A\\psi\\,d\\tau=\\sum|c_n|^2a_n$。它是多次测量的平均，而不是单次测量必然得到的数。'
        ],
        formulas: [
          { math: raw`\hat A\psi_n=a_n\psi_n`, note: '本征值方程' },
          { math: raw`\psi=\sum_n c_n\psi_n`, note: '按本征函数展开' },
          { math: raw`\langle A\rangle=\sum_n |c_n|^2 a_n`, note: '期待值是本征值的加权平均' }
        ],
        insight: '本征值给出可能的读数，展开系数给出读数的概率。'
      }
    ],
    takeaways: [
      '算符是线性映射；坐标对应乘法，动量对应微分。',
      '算符乘积的顺序有物理后果，对易子编码了不确定性。',
      '本征值方程提供测量可能值，展开系数提供概率。'
    ],
    exercise: {
      question: '设 $\\psi$ 为任意波函数，直接计算 $(\\hat x\\hat p-\\hat p\\hat x)\\psi$，验证 $[\\hat x,\\hat p]=i\\hbar$。',
      hint: '先让 $\\hat p$ 作用再乘 $x$，再换顺序；注意乘积法则会多出一项 $-i\\hbar\\psi$。'
    }
  },
  {
    id: 'qm-7-2',
    no: '7.2',
    title: '厄米算符',
    pages: '267–270',
    tag: '实本征值与正交基',
    abstract:
      '厄米算符保证本征值为实数，也保证不同本征值的本征函数彼此正交。量子力学的每一次测量都必须落在实数轴上，厄米性正是这条要求的数学表达。',
    keyIdeas: [
      '厄米算符满足 $\\hat A^\\dagger=\\hat A$，等价于 $\\int\\varphi^*\\hat A\\psi\\,d\\tau=(\\int\\psi^*\\hat A\\varphi\\,d\\tau)^*$。',
      '厄米算符的本征值全是实数，可以直接表示测量结果。',
      '不同本征值的本征函数正交；简并时可用正交化手续处理。',
      '本征函数组构成完备基，任意态都能展开。'
    ],
    beats: [
      {
        title: '厄米性的定义',
        paragraphs: [
          '在有限维矩阵语言里，厄米算符就是自伴矩阵：$A_{mn}=A_{nm}^*$。在函数空间里，定义写成 $\\int\\varphi^*\\hat A\\psi\\,d\\tau=(\\int\\psi^*\\hat A\\varphi\\,d\\tau)^*$，对任意满足边界条件的 $\\varphi$、$\\psi$ 成立。',
          '动量算符的厄米性依赖边界项。分部积分给出 $\\int\\varphi^*(-i\\hbar\\,\\psi^{\\prime})\\,dx=\\int(i\\hbar\\,\\varphi^{\\prime})^*\\psi\\,dx$ 再加上边界项；只有当波函数在边界消失或满足周期条件，边界项才为零。',
          '这正是“物理波函数必须足够好”的技术原因：厄米性不是算符单方面的性质，而是算符与边界条件的共同契约。'
        ],
        formulas: [
          { math: raw`\int \varphi^*\hat A\psi\,d\tau=\left(\int \psi^*\hat A\varphi\,d\tau\right)^*`, note: '厄米算符的定义' },
          { math: raw`\int \varphi^*\hat p\,\psi\,dx=\int (\hat p\varphi)^*\psi\,dx`, note: '动量算符的厄米性依赖边界项消失' }
        ],
        insight: '测量结果为实数的要求，反过来限制了波函数在边界上的行为。'
      },
      {
        title: '实本征值与正交性',
        paragraphs: [
          '设 $\\hat A\\psi=a\\psi$。用 $\\psi^*$ 左乘并积分，利用厄米性可得 $a\\int|\\psi|^2=a^*\\int|\\psi|^2$，因此 $a=a^*$，本征值必为实数。',
          '设 $\\hat A\\psi_1=a_1\\psi_1$，$\\hat A\\psi_2=a_2\\psi_2$，且 $a_1\\neq a_2$。用两种顺序计算 $\\int\\psi_2^*\\hat A\\psi_1$，得到 $(a_1-a_2)\\int\\psi_2^*\\psi_1=0$，因此两态正交。',
          '归一化之后，本征函数组满足 $\\int\\psi_m^*\\psi_n\\,d\\tau=\\delta_{mn}$。这套正交归一关系让展开系数可以直接用内积算出。'
        ],
        formulas: [
          { math: raw`a=a^*`, note: '厄米算符的本征值必为实数' },
          { math: raw`(a_1-a_2)\int \psi_2^*\psi_1\,d\tau=0`, note: '不同本征值对应正交本征函数' },
          { math: raw`\int \psi_m^*\psi_n\,d\tau=\delta_{mn}`, note: '正交归一条件' }
        ],
        insight: '实本征值来自对称性，正交性来自不同本征值的区分。'
      },
      {
        title: '完备性与测量展开',
        paragraphs: [
          '厄米算符的本征函数组是完备的：任意波函数都能写成 $\\psi=\\sum c_n\\psi_n$，系数 $c_n=\\int\\psi_n^*\\psi\\,d\\tau$。',
          '若本征值简并，同一本征值对应多个线性无关的本征函数，可以用格拉姆—施密特手续把它们整理成正交组。',
          '测量力学量 $A$ 得到 $a_n$ 的概率是 $|c_n|^2$。测量之后波函数坍缩到对应的本征子空间，重复测量会得到同一个值。'
        ],
        formulas: [
          { math: raw`c_n=\int \psi_n^*\psi\,d\tau`, note: '展开系数由内积给出' },
          { math: raw`P(a_n)=|c_n|^2`, note: '得到本征值 aₙ 的概率' }
        ],
        insight: '完备性让“任意态”都能被一组测量结果完整描述。'
      }
    ],
    takeaways: [
      '厄米性是实测量值的数学保证。',
      '正交性让展开系数可以直接用内积算出。',
      '完备性把波函数与概率分布连接起来。'
    ],
    exercise: {
      question: '证明厄米算符属于不同本征值的本征函数正交。',
      hint: '分别计算 $\\int\\psi_2^*\\hat A\\psi_1$ 与 $\\int\\psi_1^*\\hat A\\psi_2$ 的复共轭，利用厄米性比较两式。'
    }
  },
  {
    id: 'qm-7-3',
    no: '7.3',
    title: '具有连续谱的本征函数',
    pages: '271–273',
    tag: 'δ 函数归一化',
    abstract:
      '动量与坐标的本征值可以取连续值，对应的本征函数不能平方归一。狄拉克 δ 函数提供了新的归一化语言，让连续谱与本征展开仍然保持正交归一的形式。',
    keyIdeas: [
      '自由粒子的动量本征函数是平面波 $e^{ikx}$，在全空间不可平方可积。',
      '连续谱本征函数用 δ 函数归一化：$\\langle k|k^{\\prime}\\rangle=\\delta(k-k^{\\prime})$。',
      '坐标本征函数是 $\\delta(x-x^{\\prime})$，位置表象波函数是它在坐标基上的投影。',
      '连续谱展开把求和换成积分，概率变成概率密度。'
    ],
    beats: [
      {
        title: '平面波与动量本征值',
        paragraphs: [
          '动量算符 $\\hat p=-i\\hbar\\,d/dx$ 作用在 $e^{ikx}$ 上，得到 $\\hbar k\\,e^{ikx}$。对任意实数 $k$，这都是一个本征态，本征值连续分布。',
          '但 $\\int|e^{ikx}|^2\\,dx=\\int dx$ 发散，平面波不能按普通方式归一化为 1。物理上，它描述的是理想化的、空间上无限延展的粒子。',
          '解决方式是放弃平方可积，改用 δ 函数归一化：不同 $k$ 的平面波仍然“正交”，只是内积不再是零，而是 $\\delta(k-k^{\\prime})$。'
        ],
        formulas: [
          { math: raw`\hat p\,e^{ikx}=\hbar k\,e^{ikx}`, note: '平面波是动量本征函数' },
          { math: raw`\int_{-\infty}^{\infty} e^{i(k-k')x}\,dx=2\pi\,\delta(k-k')`, note: '平面波的正交关系' },
          { math: raw`\langle k|k'\rangle=\delta(k-k')`, note: 'δ 函数归一化' }
        ],
        insight: '连续谱的“正交归一”不再是一个数，而是一个分布。'
      },
      {
        title: '坐标本征函数',
        paragraphs: [
          '坐标算符 $\\hat x$ 作用在 $\\delta(x-x^{\\prime})$ 上，结果是 $x^{\\prime}\\delta(x-x^{\\prime})$。δ 函数因此是 $\\hat x$ 的本征函数，本征值是 $x^{\\prime}$。',
          '位置表象的波函数可以理解为态矢量在坐标基上的投影：$\\psi(x)=\\langle x|\\psi\\rangle$。',
          '内积 $\\langle x|x^{\\prime}\\rangle=\\delta(x-x^{\\prime})$。这套写法把连续谱与离散谱放进同一个框架，也让“波函数”有了清晰的几何意义。'
        ],
        formulas: [
          { math: raw`\hat x\,\delta(x-x')=x'\,\delta(x-x')`, note: 'δ 函数是坐标本征函数' },
          { math: raw`\psi(x)=\langle x|\psi\rangle`, note: '波函数是态在位置基上的投影' },
          { math: raw`\langle x|x'\rangle=\delta(x-x')`, note: '坐标基的正交归一' }
        ],
        insight: '波函数不是“粒子在某处的概率”，而是态在位置基上的分量。'
      },
      {
        title: '连续展开与概率密度',
        paragraphs: [
          '任意波函数可以写成平面波的叠加：$\\psi(x)=1/\\sqrt{2\\pi}\\int\\varphi(k)e^{ikx}\\,dk$。$\\varphi(k)$ 就是动量表象的波函数。',
          '归一化条件变为 $\\int|\\varphi(k)|^2\\,dk=1$。$|\\varphi(k)|^2dk$ 是动量落在 $(k,k+dk)$ 内的概率。',
          '测量动量得到某一区间的概率由积分给出；单点概率为零，这正是连续谱与离散谱的区别。'
        ],
        formulas: [
          { math: raw`\psi(x)=\frac{1}{\sqrt{2\pi}}\int \phi(k)e^{ikx}\,dk`, note: '坐标表象波函数' },
          { math: raw`\phi(k)=\frac{1}{\sqrt{2\pi}}\int \psi(x)e^{-ikx}\,dx`, note: '动量表象波函数' },
          { math: raw`\int |\phi(k)|^2\,dk=1`, note: '动量概率密度归一化' }
        ],
        insight: '傅里叶变换就是动量表象与坐标表象之间的换基。'
      }
    ],
    takeaways: [
      '连续谱本征函数用 δ 函数归一化。',
      '坐标本征函数是 δ 函数，波函数是它在位置基上的投影。',
      '连续谱展开把求和换成积分，概率变成概率密度。'
    ],
    exercise: {
      question: '利用 δ 函数归一化，说明平面波 $e^{ikx}$ 的归一化常数应取 $1/\\sqrt{2\\pi}$。',
      hint: '计算 $\\int e^{i(k-k^{\\prime})x}\\,dx=2\\pi\\delta(k-k^{\\prime})$，再让内积恰好等于 $\\delta(k-k^{\\prime})$。'
    }
  },
  {
    id: 'qm-7-4',
    no: '7.4',
    title: '箱归一化',
    pages: '274–277',
    tag: '把连续谱切成离散',
    abstract:
      '把粒子关进一个长度为 L 的箱子，平面波被迫满足周期边界条件，连续动量谱被切成离散谱。当 L 趋于无穷，离散求和平滑地回到积分与 δ 函数。',
    keyIdeas: [
      '周期边界条件 $\\psi(x+L)=\\psi(x)$ 把波数限制为 $k_n=2\\pi n/L$。',
      '箱归一化让动量本征函数恢复平方可积：$\\psi_n=1/\\sqrt L\\,e^{ik_nx}$。',
      '离散本征函数组满足正交归一与完备性。',
      '$L\\to\\infty$ 时求和换成积分，δ 函数重新出现。'
    ],
    beats: [
      {
        title: '周期边界与离散动量',
        paragraphs: [
          '设想粒子被限制在长度 $L$ 的一维箱内，并要求波函数在两端满足周期条件：$\\psi(x+L)=\\psi(x)$。',
          '平面波 $e^{ikx}$ 满足该条件要求 $e^{ikL}=1$，于是 $k=2\\pi n/L$，$n$ 为整数。连续谱被切成等间距的离散谱。',
          '归一化常数取 $1/\\sqrt L$，使 $\\int_0^L|\\psi_n|^2dx=1$。这时每个本征函数都是真正平方可积的。'
        ],
        formulas: [
          { math: raw`\psi(x+L)=\psi(x)`, note: '周期边界条件' },
          { math: raw`k_n=\frac{2\pi n}{L},\quad n=0,\pm1,\pm2,\dots`, note: '离散波数' },
          { math: raw`\psi_n(x)=\frac{1}{\sqrt{L}}e^{ik_nx}`, note: '箱归一化本征函数' }
        ],
        insight: '边界条件不是技术细节，它直接决定动量谱的离散结构。'
      },
      {
        title: '正交归一与完备性',
        paragraphs: [
          '不同 $n$ 的箱本征函数正交：$\\int_0^L\\psi_m^*\\psi_n\\,dx=\\delta_{mn}$。',
          '完备性写成 $\\sum_n\\psi_n(x)\\psi_n^*(x^{\\prime})=\\delta(x-x^{\\prime})$，其中 δ 是周期箱内的 δ 函数。',
          '任意满足周期条件的波函数可展开为 $\\psi=\\sum c_n\\psi_n$，系数 $c_n=\\int\\psi_n^*\\psi\\,dx$。展开与测量概率的公式与离散谱完全一致。'
        ],
        formulas: [
          { math: raw`\int_0^L \psi_m^*\psi_n\,dx=\delta_{mn}`, note: '箱本征函数的正交归一' },
          { math: raw`\sum_n \psi_n(x)\psi_n^*(x')=\delta(x-x')`, note: '完备性关系' },
          { math: raw`\psi=\sum_n c_n\psi_n`, note: '任意态按箱本征函数展开' }
        ],
        insight: '离散基的正交、完备与连续基完全平行，只是求和替代了积分。'
      },
      {
        title: 'L→∞ 的极限',
        paragraphs: [
          '当箱子变大，相邻波数间隔 $\\Delta k=2\\pi/L$ 趋于零，求和 $\\sum_n$ 过渡为 $(L/2\\pi)\\int dk$。',
          '归一化因子 $1/\\sqrt L$ 与积分测度中的 $L$ 相抵消，δ 函数重新出现。',
          '这一极限说明：连续谱不是与离散谱对立的另一套理论，而是离散谱在无限大体积下的自然极限。'
        ],
        formulas: [
          { math: raw`\Delta k=\frac{2\pi}{L}`, note: '箱越大，动量间隔越密' },
          { math: raw`\sum_n \;\longrightarrow\; \frac{L}{2\pi}\int dk`, note: '求和过渡为积分' },
          { math: raw`\lim_{L\to\infty}\sum_n \psi_n(x)\psi_n^*(x')=\delta(x-x')`, note: '回到 δ 函数完备性' }
        ],
        insight: '箱归一化是连接离散代数与连续分析的桥梁。'
      }
    ],
    takeaways: [
      '周期边界条件把连续动量谱离散化。',
      '箱归一化恢复了平方可积与标准正交性。',
      '$L\\to\\infty$ 时离散求和回到积分与 δ 归一化。'
    ],
    exercise: {
      question: '验证箱归一化平面波的正交性：计算 $\\int_0^L(1/L)e^{i2\\pi(n-m)x/L}\\,dx$。',
      hint: '当 $n\\neq m$ 时被积函数是整周期振荡，积分为零；$n=m$ 时积分等于 1。'
    }
  },
  {
    id: 'qm-7-5',
    no: '7.5',
    title: '角动量算符',
    pages: '278–282',
    tag: '对易关系与升降算符',
    abstract:
      '角动量 $L=r\\times p$ 在量子力学里变成一组算符。三个分量互不对易，但 $\\hat L^2$ 与任一分量可以对易。升降算符把这种代数结构整理成阶梯，直接给出 $l(l+1)\\hbar^2$ 与 $m\\hbar$ 的本征值。',
    keyIdeas: [
      '角动量算符定义为 $\\hat L=\\hat r\\times\\hat p$，分量满足 $[\\hat L_i,\\hat L_j]=i\\hbar\\varepsilon_{ijk}\\hat L_k$。',
      '$\\hat L^2$ 与 $\\hat L_z$ 对易，可以同时取确定值。',
      '共同本征函数是球谐函数 $Y_{lm}$，本征值为 $l(l+1)\\hbar^2$ 与 $m\\hbar$。',
      '升阶、降阶算符 $\\hat L_\\pm$ 在 $m$ 上逐级升降。'
    ],
    beats: [
      {
        title: '定义与对易关系',
        paragraphs: [
          '把 $\\hat r$ 与 $\\hat p$ 的分量按叉乘写开，得到 $\\hat L_x=\\hat y\\hat p_z-\\hat z\\hat p_y$ 等三个分量。',
          '利用 $[\\hat x,\\hat p_x]=i\\hbar$，可以算出 $[\\hat L_x,\\hat L_y]=i\\hbar\\hat L_z$ 及其循环置换。三个分量不互相对易。',
          '但 $\\hat L^2=\\hat L_x^2+\\hat L_y^2+\\hat L_z^2$ 与每一个分量都对易，因此可以与 $\\hat L_z$ 同时对角化。'
        ],
        formulas: [
          { math: raw`\hat{\mathbf L}=\hat{\mathbf r}\times\hat{\mathbf p}`, note: '角动量算符的定义' },
          { math: raw`[\hat L_x,\hat L_y]=i\hbar\hat L_z`, note: '角动量分量的对易关系' },
          { math: raw`[\hat L^2,\hat L_z]=0`, note: '平方与分量对易' }
        ],
        insight: '角动量分量的不确定关系，来自它们彼此不对易。'
      },
      {
        title: '$\\hat L^2$ 与 $\\hat L_z$ 的本征值',
        paragraphs: [
          '在球坐标中，$\\hat L_z=-i\\hbar\\,\\partial/\\partial\\varphi$，作用在 $e^{im\\varphi}$ 上给出 $m\\hbar$。波函数的单值性要求 $m$ 为整数。',
          '$\\hat L^2$ 的角向部分是球谐函数满足的方程，本征值为 $l(l+1)\\hbar^2$，其中 $l$ 为非负整数，且 $|m|\\le l$。',
          '因此角动量的大小是 $\\sqrt{l(l+1)}\\hbar$，而不是 $l\\hbar$；后者只是角动量在某一方向上的最大投影。'
        ],
        formulas: [
          { math: raw`\hat L_z Y_{lm}=m\hbar\,Y_{lm}`, note: 'z 分量本征值' },
          { math: raw`\hat L^2 Y_{lm}=l(l+1)\hbar^2\,Y_{lm}`, note: '角动量平方的本征值' },
          { math: raw`|m|\le l`, note: '投影不能超过长度' }
        ],
        insight: '“角动量等于 $l\\hbar$”是常见的误读，真正的长度是 $\\sqrt{l(l+1)}\\hbar$。'
      },
      {
        title: '升降算符',
        paragraphs: [
          '定义 $\\hat L_\\pm=\\hat L_x\\pm i\\hat L_y$。由对易关系可得 $[\\hat L_z,\\hat L_\\pm]=\\pm\\hbar\\hat L_\\pm$。',
          '因此 $\\hat L_\\pm Y_{lm}$ 仍然是 $\\hat L^2$ 的本征函数，但 $\\hat L_z$ 的本征值变成 $(m\\pm1)\\hbar$，相当于把投影抬高或降低一格。',
          '反复作用直到 $m$ 达到 $\\pm l$，再作用必须为零。这一终止条件反过来锁定了 l 的整数性，也给出角动量谱的上界。'
        ],
        formulas: [
          { math: raw`\hat L_\pm=\hat L_x\pm i\hat L_y`, note: '升阶与降阶算符' },
          { math: raw`[\hat L_z,\hat L_\pm]=\pm\hbar\hat L_\pm`, note: '升降算符改变磁量子数' },
          { math: raw`\hat L_\pm Y_{lm}\propto Y_{l,m\pm1}`, note: '在 m 上移动一格' }
        ],
        insight: '升降算符把“为什么 l 是整数”变成一条代数阶梯的终止条件。'
      }
    ],
    takeaways: [
      '角动量算符的分量不对易，但 $\\hat L^2$ 与 $\\hat L_z$ 共同可对角化。',
      '本征值为 $l(l+1)\\hbar^2$ 与 $m\\hbar$，且 $|m|\\le l$。',
      '升降算符在 m 上逐级移动，并锁定 l 的整数性。'
    ],
    exercise: {
      question: '利用 $[\\hat L_z,\\hat L_\\pm]=\\pm\\hbar\\hat L_\\pm$，说明 $\\hat L_\\pm Y_{lm}$ 的 $\\hat L_z$ 本征值比原来多或少 $\\hbar$。',
      hint: '把 $\\hat L_z\\hat L_\\pm$ 改写成 $\\hat L_\\pm\\hat L_z\\pm\\hbar\\hat L_\\pm$，再作用到 $Y_{lm}$ 上。'
    }
  }
]
