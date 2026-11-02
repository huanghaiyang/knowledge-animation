import type { BookSection } from './types'

const raw = String.raw

export const ch8Sections: BookSection[] = [
  {
    id: 'qm-8-1',
    no: '8.1',
    title: '三维束缚态问题的一般解',
    pages: '283–288',
    tag: '中心势场下的分离变量',
    abstract:
      '中心势场只依赖半径 $r$，球对称性让薛定谔方程可以分离变量。波函数拆成径向部分与角向部分，角向给出量子数 $l$、$m$，径向决定能量。三维束缚态的结构由此展开。',
    keyIdeas: [
      '中心势 $V(r)$ 与方向无关，哈密顿量与 $\\hat L^2$、$\\hat L_z$ 对易。',
      '波函数写成 $\\psi=R(r)Y_{lm}(\\theta,\\varphi)$，三个量子数一起标记定态。',
      '分离常数取 $l(l+1)$，径向方程含离心势 $l(l+1)\\hbar^2/2mr^2$。',
      '原点正则与无穷远衰减两个边界条件，把能量筛成离散值。'
    ],
    beats: [
      {
        title: '球坐标与中心势',
        paragraphs: [
          '把直角坐标换成球坐标 $(r,\\theta,\\varphi)$，拉普拉斯算子拆成径向部分与球面部分。',
          '中心势 $V(r)$ 不依赖 $\\theta$、$\\varphi$，哈密顿量在转动下不变，因此与 $\\hat L^2$、$\\hat L_z$ 对易。',
          '这意味着能量本征态可以同时是角动量的本征态，量子数 $n$、$l$、$m$ 一起标记一个定态。'
        ],
        formulas: [
          { math: raw`\nabla^2=\frac{1}{r^2}\frac{\partial}{\partial r}\left(r^2\frac{\partial}{\partial r}\right)+\frac{1}{r^2}\nabla_\Omega^2`, note: '球坐标下的拉普拉斯算子' },
          { math: raw`\hat H=-\frac{\hbar^2}{2m}\nabla^2+V(r)`, note: '中心势场的哈密顿量' },
          { math: raw`[\hat H,\hat L^2]=[\hat H,\hat L_z]=0`, note: '球对称带来的守恒量' }
        ],
        insight: '对称性把三维问题切成一个径向问题加一个球面问题。'
      },
      {
        title: '分离变量',
        paragraphs: [
          '令 $\\psi(r,\\theta,\\varphi)=R(r)Y(\\theta,\\varphi)$。代入方程并除以 $\\psi$，径向项只含 $r$，角向项只含角度，两边只能等于同一个常数。',
          '角向方程分离出 $l(l+1)$，它的正则解正是球谐函数 $Y_{lm}$。',
          '径向方程变成一维方程，但势能多出一项离心项 $l(l+1)\\hbar^2/2mr^2$。这一项与角动量有关，不是外部力场。'
        ],
        formulas: [
          { math: raw`\psi(r,\theta,\varphi)=R(r)\,Y_{lm}(\theta,\varphi)`, note: '分离变量的形式' },
          { math: raw`-\frac{\hbar^2}{2m}\frac{1}{r^2}\frac{d}{dr}\left(r^2\frac{dR}{dr}\right)+\left[V(r)+\frac{l(l+1)\hbar^2}{2mr^2}\right]R=ER`, note: '径向方程' }
        ],
        insight: '离心项不是真实的力，而是角动量在径向运动上的几何代价。'
      },
      {
        title: '边界条件与量子数',
        paragraphs: [
          '$r\\to0$ 时波函数必须有限，$r\\to\\infty$ 时束缚态必须衰减。两个边界条件同时成立，只对某些离散能量有解。',
          '径向解在无穷远处既要衰减、又要在原点正则，这给出 $n-l-1$ 个径向节点。',
          '能量主要由 $n$ 决定，$l$ 影响径向细节；每个 $l$ 有 $2l+1$ 个 $m$ 值，因此能级一般有 $2l+1$ 重简并。'
        ],
        formulas: [
          { math: raw`R(r)\sim r^l\quad(r\to 0)`, note: '原点正则条件' },
          { math: raw`R(r)\sim e^{-\kappa r},\quad \kappa=\frac{\sqrt{2m|E|}}{\hbar}`, note: '束缚态的无穷远衰减' },
          { math: raw`\text{degeneracy}=2l+1`, note: '磁量子数带来的简并' }
        ],
        insight: '三个量子数不是人为贴上的标签，而是对称性与边界条件的产物。'
      }
    ],
    takeaways: [
      '中心势场中，能量、角动量平方与角动量投影可以同时确定。',
      '径向方程多出一个离心势，它把低 $l$ 的态拉向原子核。',
      '原点正则与无穷远衰减共同筛出离散能级。'
    ],
    exercise: {
      question: '说明为什么中心势场中的能量本征态可以同时是 $\\hat L^2$ 与 $\\hat L_z$ 的本征态。',
      hint: '$\\hat H$ 与 $\\hat L^2$、$\\hat L_z$ 都对易，对易的厄米算符存在共同本征函数组。'
    }
  },
  {
    id: 'qm-8-2',
    no: '8.2',
    title: '角向解',
    pages: '289–295',
    tag: '球谐函数',
    abstract:
      '角向方程拆成方位角与极角两部分。方位角的单值性给出磁量子数 $m$ 为整数，极角方程给出连带勒让德函数，两者相乘并归一化就是球谐函数。',
    keyIdeas: [
      '$\\Phi(\\varphi)=e^{im\\varphi}$，单值性要求 $m$ 为整数。',
      '极角方程是连带勒让德方程，$l$ 为非负整数，且 $|m|\\le l$。',
      '球谐函数 $Y_{lm}$ 是 $\\hat L^2$ 与 $\\hat L_z$ 的共同本征函数，在球面上正交归一。',
      '$Y_{lm}$ 的宇称是 $(-1)^l$，与 $m$ 无关。'
    ],
    beats: [
      {
        title: '方位角与磁量子数',
        paragraphs: [
          '角向方程中的 $\\varphi$ 部分最简单：$d^2\\Phi/d\\varphi^2=-m^2\\Phi$，解为 $e^{\\pm im\\varphi}$。',
          '波函数在 $\\varphi$ 转一圈后必须回到自身，$\\Phi(\\varphi+2\\pi)=\\Phi(\\varphi)$，所以 $m$ 必须是整数。',
          '$m$ 就是角动量在 $z$ 轴上的投影量子数，正负号对应绕 $z$ 轴的两个旋转方向。'
        ],
        formulas: [
          { math: raw`\Phi(\varphi)=\frac{1}{\sqrt{2\pi}}e^{im\varphi}`, note: '方位角本征函数' },
          { math: raw`m=0,\pm1,\pm2,\dots`, note: '磁量子数取整数' }
        ],
        insight: '一个周期边界条件，就把磁量子数锁成了整数。'
      },
      {
        title: '极角与连带勒让德函数',
        paragraphs: [
          '令 $x=\\cos\\theta$，极角方程化为连带勒让德方程。要让解在 $\\theta=0$ 与 $\\theta=\\pi$ 处正则，$l$ 必须是非负整数，且 $|m|\\le l$。',
          '满足条件的解是 $P_l^m(x)$，它带有 $(1-x^2)^{|m|/2}$ 的因子，在球面两极处平滑。',
          '分离常数 $l(l+1)$ 因此获得离散含义：角动量平方的本征值。'
        ],
        formulas: [
          { math: raw`(1-x^2)P''-2xP'+\left[l(l+1)-\frac{m^2}{1-x^2}\right]P=0`, note: '连带勒让德方程' },
          { math: raw`l=0,1,2,\dots,\qquad |m|\le l`, note: '量子数的允许范围' }
        ],
        insight: '球面的两个极点是角向方程的奇点，那里的正则性筛出了 l。'
      },
      {
        title: '球谐函数及其性质',
        paragraphs: [
          '把归一化的 $\\Phi$ 与 $P_l^m$ 相乘，得到球谐函数 $Y_{lm}(\\theta,\\varphi)$。归一化条件是在整个球面上积分为 1。',
          '不同 $(l,m)$ 的球谐函数正交：$\\int Y_{lm}^*Y_{l^{\\prime}m^{\\prime}}\\,d\\Omega=\\delta_{ll^{\\prime}}\\delta_{mm^{\\prime}}$。',
          '在空间反演 $(\\theta,\\varphi)\\to(\\pi-\\theta,\\varphi+\\pi)$ 下，$Y_{lm}$ 乘以 $(-1)^l$。这个宇称只由 $l$ 决定，是光谱选择定则的来源之一。'
        ],
        formulas: [
          { math: raw`Y_{lm}(\theta,\varphi)=N_{lm}\,P_l^{|m|}(\cos\theta)\,e^{im\varphi}`, note: '球谐函数的标准形式' },
          { math: raw`\int Y_{lm}^*Y_{l'm'}\,d\Omega=\delta_{ll'}\delta_{mm'}`, note: '球面上的正交归一' },
          { math: raw`\hat P\,Y_{lm}=(-1)^lY_{lm}`, note: '宇称只由 l 决定' }
        ],
        insight: '球谐函数是球面上的驻波，每个 (l,m) 对应一种基本花纹。'
      }
    ],
    takeaways: [
      '磁量子数来自方位角的周期边界条件。',
      '角量子数来自极角方程在两极的正则性。',
      '球谐函数同时是 $\\hat L^2$ 与 $\\hat L_z$ 的本征函数，并携带 $(-1)^l$ 的宇称。'
    ],
    exercise: {
      question: '由 $\\Phi(\\varphi+2\\pi)=\\Phi(\\varphi)$ 说明磁量子数为什么必须是整数。',
      hint: '把 $e^{im(\\varphi+2\\pi)}=e^{im\\varphi}$ 化简，得到 $e^{i2\\pi m}=1$，故 $m$ 为整数。'
    }
  },
  {
    id: 'qm-8-3',
    no: '8.3',
    title: '径向解',
    pages: '296–301',
    tag: '库仑场与拉盖尔多项式',
    abstract:
      '库仑势把径向方程变成一个可以精确求解的方程。幂级数解在无穷远处一般发散，只有级数在某一项截断时才能得到束缚态。截断条件给出 $n=l+1,l+2,\\dots$，能量随之离散成 $-13.6\\,\\mathrm{eV}/n^2$。',
    keyIdeas: [
      '令 $u(r)=rR(r)$，径向方程化为一维形式。',
      '库仑势下，无穷远处的两个渐近解一个衰减、一个发散。',
      '级数解必须截断才能全局平方可积，截断条件给出主量子数 $n$。',
      '径向解由广义拉盖尔多项式与指数因子组成。'
    ],
    beats: [
      {
        title: '径向方程与渐近行为',
        paragraphs: [
          '把 $R=u/r$ 代入径向方程，消去一阶导数项，得到 $u^{\\prime\\prime}+[2m(E-V)/\\hbar^2-l(l+1)/r^2]u=0$。',
          '库仑势 $V=-Ze^2/4\\pi\\varepsilon_0r$ 在 $r\\to\\infty$ 时趋于零，方程变成 $u^{\\prime\\prime}\\approx\\kappa^2u$，解为 $e^{\\pm\\kappa r}$。束缚态只能取衰减支 $e^{-\\kappa r}$。',
          '$r\\to0$ 时离心项主导，正则解要求 $u\\sim r^{l+1}$。两个端点各自筛掉一半的解，剩下的才是物理态。'
        ],
        formulas: [
          { math: raw`u''+\left[\frac{2m(E-V)}{\hbar^2}-\frac{l(l+1)}{r^2}\right]u=0`, note: '径向方程的一维形式' },
          { math: raw`u\sim r^{l+1}\ (r\to0),\qquad u\sim e^{-\kappa r}\ (r\to\infty)`, note: '两个边界条件' }
        ],
        insight: '径向方程的两个端点各自筛掉一半的解，剩下的才是物理态。'
      },
      {
        title: '库仑场的级数解',
        paragraphs: [
          '引入无量纲变量 $\\rho=2r/(na_0)$，把方程化为合流超几何方程。',
          '在原点附近设幂级数解，代入后得到系数递推。级数一般无限延伸，在 $\\rho\\to\\infty$ 时按 $e^{\\rho}$ 增长，破坏平方可积。',
          '要让级数在第 $n-l-1$ 项后截断，必须满足 $n=l+1,l+2,\\dots$。这就是主量子数的来源。'
        ],
        formulas: [
          { math: raw`\rho=\frac{2r}{na_0}`, note: '无量纲径向变量' },
          { math: raw`F(-n+l+1,\,2l+2,\,\rho)`, note: '截断后的合流超几何函数' },
          { math: raw`n=l+1,\ l+2,\ l+3,\dots`, note: '主量子数的允许值' }
        ],
        insight: '能量量子化不是假设，而是“无穷远处必须衰减”这一条边界条件的算术结果。'
      },
      {
        title: '广义拉盖尔多项式与归一化',
        paragraphs: [
          '截断后的合流超几何函数可以写成广义拉盖尔多项式 $L_{n-l-1}^{2l+1}(\\rho)$。',
          '完整的径向函数是 $R_{nl}(r)=N_{nl}\\rho^l e^{-\\rho/2}L_{n-l-1}^{2l+1}(\\rho)$。指数因子负责把波函数收进原子尺度。',
          '归一化条件 $\\int_0^\\infty|R_{nl}|^2r^2\\,dr=1$ 固定常数 $N_{nl}$。径向节点数正好等于 $n-l-1$。'
        ],
        formulas: [
          { math: raw`R_{nl}(r)=N_{nl}\,\rho^l e^{-\rho/2}L_{n-l-1}^{2l+1}(\rho)`, note: '氢原子径向函数' },
          { math: raw`\int_0^\infty |R_{nl}|^2 r^2\,dr=1`, note: '径向归一化' },
          { math: raw`\text{nodes}=n-l-1`, note: '径向节点数' }
        ],
        insight: '拉盖尔多项式负责径向节点的分布，指数因子负责把波函数收进原子尺度。'
      }
    ],
    takeaways: [
      '库仑势的径向方程可以精确求解。',
      '级数截断条件把连续能量筛成 $-13.6\\,\\mathrm{eV}/n^2$ 的离散谱。',
      '径向函数由指数因子与广义拉盖尔多项式组成，节点数为 $n-l-1$。'
    ],
    exercise: {
      question: '说明为什么库仑场束缚态的主量子数必须满足 $n\\ge l+1$。',
      hint: '截断项数 $n-l-1$ 必须是非负整数，否则级数不会终止，波函数在无穷远发散。'
    }
  },
  {
    id: 'qm-8-4',
    no: '8.4',
    title: '本征函数、概率密度与一般解',
    pages: '302–306',
    tag: '波函数的完整拼图',
    abstract:
      '把径向解与球谐函数相乘，得到氢原子的完整本征函数。概率密度在空间中的形状、径向概率随半径的分布，以及定态叠加的时间演化，都可以从这一个表达式读出来。',
    keyIdeas: [
      '$\\psi_{nlm}=R_{nl}(r)Y_{lm}(\\theta,\\varphi)$，三个量子数完整标记一个定态。',
      '概率密度 $|\\psi|^2$ 分解为径向因子与角向因子。',
      '径向概率密度 $P(r)=r^2|R|^2$，峰值给出最概然半径。',
      '一般解是定态的叠加，系数由初始波函数决定。'
    ],
    beats: [
      {
        title: '完整本征函数与正交归一',
        paragraphs: [
          '氢原子定态写成三个因子的乘积。径向部分管“离核多远”，角向部分管“朝哪个方向张开”。',
          '不同量子数之间正交：$\\int\\psi_{nlm}^*\\psi_{n^{\\prime}l^{\\prime}m^{\\prime}}\\,d\\tau=\\delta_{nn^{\\prime}}\\delta_{ll^{\\prime}}\\delta_{mm^{\\prime}}$。',
          '能量只由 $n$ 决定，因此同一 $n$ 下 $l$、$m$ 的不同态能量相同。计入自旋前，第 $n$ 层的简并度为 $n^2$。'
        ],
        formulas: [
          { math: raw`\psi_{nlm}=R_{nl}(r)\,Y_{lm}(\theta,\varphi)`, note: '氢原子完整本征函数' },
          { math: raw`E_n=-\frac{13.6\ \mathrm{eV}}{n^2}`, note: '能量只依赖主量子数' },
          { math: raw`\sum_{l=0}^{n-1}(2l+1)=n^2`, note: '第 n 层的简并度' }
        ],
        insight: '三个量子数各自负责一个几何维度，合起来才是完整的三维轨道。'
      },
      {
        title: '概率密度与电子云',
        paragraphs: [
          '$|\\psi_{nlm}|^2=|R_{nl}|^2|Y_{lm}|^2$。固定半径时，角向分布就是电子云的形状；固定方向时，径向分布决定壳层。',
          '径向概率密度 $P(r)=r^2|R_{nl}|^2$ 才是“在半径 $r$ 附近找到电子”的概率密度。球壳体积随 $r^2$ 增长，这个因子不能丢。',
          '1s 态的最概然半径是 $a_0$；2s 有一个径向节点，2p 没有径向节点但有角向节点。'
        ],
        formulas: [
          { math: raw`|\psi_{nlm}|^2=|R_{nl}|^2\,|Y_{lm}|^2`, note: '概率密度分解为径向与角向' },
          { math: raw`P(r)\,dr=r^2|R_{nl}|^2\,dr`, note: '径向概率密度' }
        ],
        insight: '$|\\psi|^2$ 是体积密度，$r^2|R|^2$ 才是半径密度；两者差一个几何因子。'
      },
      {
        title: '一般解与时间演化',
        paragraphs: [
          '任意态写成 $\\psi(r,t)=\\sum c_{nlm}\\psi_{nlm}(r)e^{-iE_nt/\\hbar}$，系数由初始条件的内积给出。',
          '定态本身的 $|\\psi|^2$ 不随时间变化；只有多个定态叠加时，干涉项才会随时间振荡。',
          '球谐函数带复数相位，实验上常把 $m=\\pm1$ 组合成实轨道 $p_x$、$p_y$。'
        ],
        formulas: [
          { math: raw`\psi(r,t)=\sum_{nlm}c_{nlm}\psi_{nlm}(r)e^{-iE_nt/\hbar}`, note: '一般解' },
          { math: raw`c_{nlm}=\int \psi_{nlm}^*\psi(r,0)\,d\tau`, note: '展开系数' }
        ],
        insight: '定态并不“静止”，它的相位在转，只是概率密度不变。'
      }
    ],
    takeaways: [
      '完整本征函数由径向因子与球谐函数相乘得到。',
      '径向概率密度必须带上 $r^2$ 这个球壳体积因子。',
      '定态叠加才产生可观察的时间演化。'
    ],
    exercise: {
      question: '解释 2s 与 2p 的径向概率分布为什么不同。',
      hint: '2s 有 $n-l-1=1$ 个径向节点；2p 的 $l=1$ 使离心项把电子推离原点，径向节点数为零。'
    }
  },
  {
    id: 'qm-8-5',
    no: '8.5',
    title: '氢原子',
    pages: '307–314',
    tag: '光谱、轨道与磁矩',
    abstract:
      '氢原子是唯一可以精确求解的三维原子。光谱系、径向壳层、角向电子云与轨道磁矩，四组实验事实都能从同一个本征函数出发得到解释。',
    keyIdeas: [
      '氢光谱由里德伯公式描述，跃迁满足选择定则 $\\Delta l=\\pm1$、$\\Delta m=0,\\pm1$。',
      '径向概率密度给出壳层与节点结构，最概然半径随 $n^2$ 增长。',
      '角向概率密度决定电子云形状：s 球对称、p 哑铃、d 四叶。',
      '轨道磁矩与角动量成正比，自然单位是玻尔磁子 $\\mu_{\\mathrm B}$。'
    ],
    beats: [
      {
        title: '氢原子光谱',
        paragraphs: [
          '巴尔末系落在可见光区，莱曼系在紫外，帕申系在红外。所有谱线都满足 $1/\\lambda=R(1/n_1^2-1/n_2^2)$。',
          '玻尔模型能给出这条公式，却无法解释谱线强度与精细结构。薛定谔方程给出波函数，再配合跃迁矩阵元才能算出强度。',
          '电偶极跃迁的选择定则要求 $\\Delta l=\\pm1$、$\\Delta m=0,\\pm1$。这就是为什么 s 态不能直接跃迁到 s 态。'
        ],
        formulas: [
          { math: raw`\frac{1}{\lambda}=R\left(\frac{1}{n_1^2}-\frac{1}{n_2^2}\right)`, note: '里德伯公式' },
          { math: raw`\Delta l=\pm1,\qquad \Delta m=0,\pm1`, note: '电偶极跃迁选择定则' }
        ],
        insight: '谱线的位置由能级差给出，强度由波函数的重叠积分给出。'
      },
      {
        title: '径向概率密度',
        paragraphs: [
          '1s 的径向概率在 $r=a_0$ 处达到峰值。这解释了玻尔半径的物理含义：最概然距离，而不是确定轨道。',
          '$n$ 越大，最概然半径整体外移；$l$ 越小，离心势越弱，电子越容易靠近核。',
          '径向节点数等于 $n-l-1$。节点处电子出现概率为零，是驻波结构的直接体现。'
        ],
        formulas: [
          { math: raw`P_{1s}(r)\propto r^2e^{-2r/a_0}`, note: '1s 径向概率密度' },
          { math: raw`\text{radial nodes}=n-l-1`, note: '径向节点数' }
        ],
        insight: '所谓“电子轨道”其实是概率峰，而不是一条线。'
      },
      {
        title: '角向电子云与磁矩',
        paragraphs: [
          '$l=0$ 的 s 态角向分布球对称；$l=1$ 的 p 态呈哑铃形；$l=2$ 的 d 态有四个瓣。磁量子数 $m$ 决定这些瓣相对 $z$ 轴的取向。',
          '电子绕核运动形成电流，磁矩 $\\mu=-(e/2m_e)L$。由于 $L$ 量子化，磁矩也量子化，单位是 $\\mu_{\\mathrm B}=e\\hbar/2m_e$。',
          '斯特恩—盖拉赫实验显示磁矩的空间取向是离散的，这与 $m$ 的离散谱一致。'
        ],
        formulas: [
          { math: raw`\boldsymbol{\mu}=-\frac{e}{2m_e}\mathbf L`, note: '轨道磁矩与角动量成正比' },
          { math: raw`\mu_{\mathrm B}=\frac{e\hbar}{2m_e}\approx 9.27\times10^{-24}\ \mathrm{T^{-1}}`, note: '玻尔磁子' }
        ],
        insight: '电子云的形状与磁矩的取向，都是同一个角向本征函数的两种读法。'
      }
    ],
    takeaways: [
      '光谱位置由能级差决定，强度由波函数重叠决定。',
      '径向概率的峰值对应最概然半径，而不是固定轨道。',
      '角向分布与轨道磁矩都来自同一个球谐函数。'
    ],
    exercise: {
      question: '为什么 1s→2s 的跃迁不是电偶极允许的？',
      hint: '初末态的 $l$ 都为 0，不满足 $\\Delta l=\\pm1$ 的选择定则。'
    }
  },
  {
    id: 'qm-8-6',
    no: '8.6',
    title: '无限深球形势阱',
    pages: '315–319',
    tag: '球里的量子音阶',
    abstract:
      '把粒子关进一个半径为 $a$ 的硬球，边界上波函数必须为零。径向解由球贝塞尔函数组成，能量由它的零点决定。$l=0$ 时退化成一维无限深势阱，$l>0$ 时离心项把能级整体抬高。',
    keyIdeas: [
      '球内 $V=0$，球外 $V=\\infty$，边界条件 $R(a)=0$。',
      '径向解是球贝塞尔函数 $j_l(kr)$。',
      '能量由 $j_l(ka)=0$ 的零点决定，$E\\propto k^2$。',
      '$l=0$ 时 $ka=n\\pi$，回到一维无限深势阱的能级。'
    ],
    beats: [
      {
        title: '模型与径向方程',
        paragraphs: [
          '球内薛定谔方程是自由粒子方程，球外波函数为零。连续性要求球面上 $\\psi=0$。',
          '径向方程在 $V=0$ 时化为球贝塞尔方程。正则解是 $j_l(kr)$，在原点有限。',
          '边界条件 $j_l(ka)=0$ 把连续参数 $k$ 切成离散值。'
        ],
        formulas: [
          { math: raw`j_l''+\frac{2}{r}j_l'+\left[k^2-\frac{l(l+1)}{r^2}\right]j_l=0`, note: '球贝塞尔方程' },
          { math: raw`j_l(ka)=0`, note: '硬球边界条件' }
        ],
        insight: '球形势阱的能级藏在球贝塞尔函数的零点表里。'
      },
      {
        title: '$l=0$：回到一维势阱',
        paragraphs: [
          '$l=0$ 时离心项消失，径向方程变成 $u^{\\prime\\prime}+k^2u=0$，解为 $\\sin(kr)$。',
          '边界 $u(a)=0$ 给出 $ka=n\\pi$，能量 $E_n=\\pi^2\\hbar^2n^2/2ma^2$。',
          '这与一维宽度为 $a$ 的无限深势阱完全一致：$l=0$ 的球形势阱只留下径向驻波。'
        ],
        formulas: [
          { math: raw`u(r)=\sin(kr)`, note: 'l=0 的径向解' },
          { math: raw`k_na=n\pi`, note: '边界条件离散化波数' },
          { math: raw`E_n=\frac{n^2\pi^2\hbar^2}{2ma^2}`, note: '与一维无限深势阱相同的能级' }
        ],
        insight: '三维球对称的 s 态，本质上是一根两端固定的弦。'
      },
      {
        title: '$l>0$ 与零点结构',
        paragraphs: [
          '$l>0$ 时 $j_l(ka)=0$ 的零点没有简单解析式，需要数值表或渐近公式。',
          '离心项相当于在球心加了一堵软墙，把波函数推离原点。因此同一主量子数下，$l$ 越大能量越高。',
          '每个 $(n,l)$ 能级有 $2l+1$ 重简并；把自旋算进去，壳层填充顺序与原子的壳层模型相关。'
        ],
        formulas: [
          { math: raw`E_{nl}=\frac{\hbar^2k_{nl}^2}{2m}`, note: '球形势阱的能级' },
          { math: raw`k_{nl}\ \text{随}\ l\ \text{增大}`, note: '离心项抬高能级' }
        ],
        insight: '球形势阱是理解原子核壳层与量子点的极简模型。'
      }
    ],
    takeaways: [
      '硬球边界把连续波数筛成球贝塞尔函数的零点。',
      '$l=0$ 的能级与一维无限深势阱完全一致。',
      '$l>0$ 的离心项抬高能量，并带来 $2l+1$ 重简并。'
    ],
    exercise: {
      question: '为什么 $l>0$ 的能级比同阶 $l=0$ 的能级高？',
      hint: '离心项 $l(l+1)\\hbar^2/2mr^2$ 正定，把有效势整体抬高，零点随之增大。'
    }
  },
  {
    id: 'qm-8-7',
    no: '8.7',
    title: '碱金属原子',
    pages: '320–324',
    tag: '价电子与量子缺',
    abstract:
      '碱金属的最外层只有一个价电子，内层电子形成原子实。原子实对价电子产生屏蔽，使有效核电荷随 $l$ 变化。量子缺把这个复杂问题压缩成一个可调参数，能级顺序 $4s<3d$ 由此得到解释。',
    keyIdeas: [
      '价电子在原子实的有效势中运动，内层电子屏蔽核电荷。',
      '量子缺 $\\delta_l$ 依赖 $l$，s 电子穿透最深，$\\delta_s$ 最大。',
      '能量公式 $E=-13.6\\,\\mathrm{eV}/(n-\\delta_l)^2$。',
      '能级高低由 $n-\\delta_l$ 决定，因此 4s 可以低于 3d。'
    ],
    beats: [
      {
        title: '原子实与有效势',
        paragraphs: [
          '碱金属的闭合内壳层形成原子实，价电子只感受到部分核电荷。',
          '穿透效应让 s 电子更靠近核，感受到更强的吸引；p、d 电子被离心势挡在外面，屏蔽更彻底。',
          '有效核电荷 $Z_{\\mathrm{eff}}$ 随 $l$ 与 $r$ 变化，严格求解需要自洽场方法。'
        ],
        formulas: [
          { math: raw`V_{\mathrm{eff}}(r)=-\frac{Z_{\mathrm{eff}}(r)e^2}{4\pi\varepsilon_0r}`, note: '原子实的有效势' }
        ],
        insight: '屏蔽不是一个常数，而是随电子所在轨道变化的函数。'
      },
      {
        title: '量子缺与能级',
        paragraphs: [
          '把复杂势的效应压缩成一个量子缺 $\\delta_l$，能级写成类氢公式的修正形式。',
          's 电子的 $\\delta_s$ 最大，p 次之，d 最小。因此同一 $n$ 下 $l$ 越小能量越低。',
          '当 $n$ 较小时，$n-\\delta_l$ 的差异足以让 4s 低于 3d。这正是钾、钙的填充顺序。'
        ],
        formulas: [
          { math: raw`E_{nl}=-\frac{13.6\ \mathrm{eV}}{(n-\delta_l)^2}`, note: '带量子缺的能级公式' },
          { math: raw`E_{4s}<E_{3d}\quad\text{（钾、钙）}`, note: '能级顺序由 n−δ 决定' }
        ],
        insight: '量子缺把“多体问题”变成了一个可以查表的单参数修正。'
      },
      {
        title: '基态波函数与极限行为',
        paragraphs: [
          '基态价电子的径向概率分布有一个主峰与若干小峰，主峰位置决定原子半径。',
          '当 $n$ 很大，量子缺相对变小，能级趋于类氢的 $-13.6/n^2$。',
          '当 $l$ 接近 $n-1$，离心势把电子推远，量子缺趋于零，态接近氢原子。'
        ],
        formulas: [
          { math: raw`\lim_{n\to\infty}E_{nl}\to-\frac{13.6\ \mathrm{eV}}{n^2}`, note: '高激发态趋于类氢' }
        ],
        insight: '量子缺是原子实留下的指纹，n 越大指纹越淡。'
      }
    ],
    takeaways: [
      '碱金属的价电子在原子实的有效势中运动。',
      '量子缺随 $l$ 变化，决定了能级的高低顺序。',
      '高激发态与高 $l$ 态趋近氢原子。'
    ],
    exercise: {
      question: '解释为什么钾的 4s 能级低于 3d。',
      hint: '4s 的量子缺远大于 3d，比较 $n-\\delta_l$ 的大小即可得到实际能级高低。'
    }
  },
  {
    id: 'qm-8-8',
    no: '8.8',
    title: '双原子分子：克拉策分子势',
    pages: '325–329',
    tag: '振动与转动',
    abstract:
      '双原子分子的振动与转动可以在克拉策势中精确求解。这个势在平衡距离附近近似抛物线，在远距离按 $1/r^2$ 衰减。精确解给出振动量子数与转动量子数，两者耦合形成带状光谱。',
    keyIdeas: [
      '克拉策势 $V(r)=D[(r_e/r)^2-2(r_e/r)]$，在 $r=r_e$ 处取最小值 $-D$。',
      '平衡点附近展开得到谐振子近似，力常数由 $D$ 与 $r_e$ 决定。',
      '精确解用有效角量子数把转动与 $1/r^2$ 势合并。',
      '振动-转动耦合产生 P 支与 R 支。'
    ],
    beats: [
      {
        title: '分子势与谐振子近似',
        paragraphs: [
          '双原子分子的势能在平衡距离 $r_e$ 处有极小值，远处趋于零，近距离急剧上升。',
          '克拉策势用一个 $1/r^2$ 项同时描述吸引与排斥，形式简单且可精确求解。',
          '在 $r_e$ 附近作泰勒展开，二次项给出谐振子频率。力常数 $k=2D/r_e^2$，频率 $\\omega=\\sqrt{k/\\mu}$。'
        ],
        formulas: [
          { math: raw`V(r)=D\left[\left(\frac{r_e}{r}\right)^2-2\frac{r_e}{r}\right]`, note: '克拉策势' },
          { math: raw`V(r_e)=-D,\qquad \omega=\sqrt{\frac{2D}{\mu r_e^2}}`, note: '势阱深度与谐振子频率' }
        ],
        insight: '谐振子近似只用到势阱底部，克拉策势则保留了 $1/r^2$ 的长程结构。'
      },
      {
        title: '精确解',
        paragraphs: [
          '径向方程在克拉策势下仍可化为合流超几何方程，因为 $1/r^2$ 项与离心项同阶。',
          '把离心项与势的 $1/r^2$ 部分合并，可以定义一个有效角量子数 $l^{\\prime}$，方程形式与库仑问题平行。',
          '截断条件同时给出振动量子数 $v$ 与转动量子数 $J$ 的允许组合，能量写成闭式。'
        ],
        formulas: [
          { math: raw`B=\frac{2\mu D r_e^2}{\hbar^2},\qquad l'=-\frac12+\frac12\sqrt{1+4J(J+1)+4B}`, note: '有效角量子数' },
          { math: raw`E_{vJ}=-\frac{DB}{\left(v+\frac12+l'+\frac12\right)^2}`, note: '克拉策势的精确能级' }
        ],
        insight: '$1/r^2$ 势把转动与振动焊在一起，精确解因此只依赖一个组合量子数。'
      },
      {
        title: '振动-转动能级与光谱',
        paragraphs: [
          '对低 $J$，能级近似成振动项 $(v+1/2)\\hbar\\omega$ 与转动项 $B_eJ(J+1)$ 的叠加。',
          '振动能级间隔约几千 $\\mathrm{cm^{-1}}$，转动间隔只有几十 $\\mathrm{cm^{-1}}$，因此光谱呈带状。',
          '跃迁选择定则 $\\Delta v=\\pm1$、$\\Delta J=\\pm1$，产生向高波数的 R 支与向低波数的 P 支。'
        ],
        formulas: [
          { math: raw`E_{vJ}\approx-D+\hbar\omega\left(v+\frac12\right)+B_eJ(J+1)`, note: '低 J 近似' },
          { math: raw`\Delta J=\pm1`, note: '转动跃迁选择定则' }
        ],
        insight: '带状光谱的精细结构，把分子的振动与转动同时暴露出来。'
      }
    ],
    takeaways: [
      '克拉策势在平衡点附近给出谐振子，在远处保留 $1/r^2$ 的分子特征。',
      '精确解用有效角量子数把转动与势的离心项合并。',
      '振动-转动耦合形成 P 支与 R 支。'
    ],
    exercise: {
      question: '为什么双原子分子的振动光谱呈现带状而不是单一谱线？',
      hint: '每个振动跃迁都伴随转动能级的变化，$\\Delta J=\\pm1$ 产生许多密集谱线。'
    }
  }
]
