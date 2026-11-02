import type { BookSection } from './types'

const raw = String.raw

export const ch6Sections: BookSection[] = [
  {
    id: 'qm-6-1',
    no: '6.1',
    title: '伦纳德-琼斯势：惰性气体分子',
    pages: '243–247',
    tag: '范德华束缚',
    abstract:
      '惰性气体原子没有永久偶极矩，它们之间的吸引完全来自电子云涨落诱导的瞬时偶极。伦纳德-琼斯用 12 次与 6 次两个幂次把这种排斥与吸引压缩成一个解析势，其势阱底部的谐振子近似给出毫电子伏特量级的振动能级。',
    keyIdeas: [
      '12 次幂描述近距离电子云重叠的强排斥，6 次幂描述范德华吸引。',
      '势阱最低点由 $dV/dr=0$ 决定，平衡距离 $r_0=2^{1/6}\\sigma$，阱深为 $\\varepsilon$。',
      '阱底展开为谐振子，力常数 $k=72\\varepsilon/r_0^2$，频率由约化质量决定。',
      '振动能级间隔 $\\hbar\\omega$ 只有几毫电子伏特，是理解惰性气体晶体与分子振动的入口。'
    ],
    beats: [
      {
        title: '12-6 势的形状',
        paragraphs: [
          '两个中性原子靠近时，电子云不能互相穿透，短距离处出现极强的排斥；稍远一些，瞬时偶极的涨落又带来微弱的吸引。伦纳德-琼斯用两个幂次概括这两种趋势：排斥项取 $r^{-12}$，吸引项取 $r^{-6}$。',
          '吸引项的 6 次幂有明确的物理来源：两个诱导偶极的相互作用能按 $r^{-3}$ 衰减，再对涨落做二次平均，就得到 $r^{-6}$。排斥项的 12 次幂没有同等严格的推导，它只是把陡峭的电子云重叠势拟合得足够好，而且计算上方便。',
          '参数 $\\sigma$ 是势为零的距离，$\\varepsilon$ 是势阱深度。把它们代入后，平衡距离 $r_0$ 与阱底能量都能由极值条件直接读出。'
        ],
        formulas: [
          { math: raw`V(r)=4\varepsilon\left[\left(\frac{\sigma}{r}\right)^{12}-\left(\frac{\sigma}{r}\right)^{6}\right]`, note: '伦纳德-琼斯 12-6 势' },
          { math: raw`\left.\frac{dV}{dr}\right|_{r_0}=0\;\Rightarrow\; r_0=2^{1/6}\sigma\approx1.122\,\sigma,\quad V(r_0)=-\varepsilon`, note: '平衡距离与阱深' }
        ],
        insight: '12 次幂是工程拟合，6 次幂才是范德华物理；两者合起来才让势阱既陡又浅。'
      },
      {
        title: '势阱底部的谐振子近似',
        paragraphs: [
          '在 $r_0$ 附近把势展开到二阶，一次项因极值条件消失，剩下一个抛物阱。任何光滑势的极小点附近都长得像谐振子，这是量子力学里最常用的一条近似。',
          '对 12-6 势直接求二阶导数，得到 $k=72\\varepsilon/r_0^2$。这个结果值得记住：阱越深、平衡距离越短，力常数越大，振动频率也越高。',
          '把 $k$ 与约化质量 $\\mu$ 组合，就得到阱底小振动的角频率。对由两个相同原子组成的分子，$\\mu$ 等于原子质量的一半，因此氢分子一类轻分子的频率明显高于氩分子。'
        ],
        formulas: [
          { math: raw`V(r)\simeq-\varepsilon+\frac{1}{2}k\,(r-r_0)^2,\qquad k=\left.\frac{d^2V}{dr^2}\right|_{r_0}=\frac{72\,\varepsilon}{r_0^2}`, note: '阱底抛物近似与力常数' },
          { math: raw`\omega=\sqrt{\frac{k}{\mu}}=\sqrt{\frac{72\,\varepsilon}{\mu\,r_0^2}}`, note: '阱底振动频率' }
        ],
        insight: '谐振子近似之所以好用，不是因为势真的二次，而是因为低能态只探测极小点附近的形状。'
      },
      {
        title: '惰性气体分子的振动能级',
        paragraphs: [
          '量子化后，阱底振动能量为 $E_n=\\hbar\\omega(n+1/2)$。对氩二聚体，取 $\\varepsilon\\approx10\\,\\mathrm{meV}$、$r_0\\approx3.8$ Å、$\\mu\\approx20\\,\\mathrm u$，可以估出 $\\hbar\\omega\\approx3\\,\\mathrm{meV}$，约合 $25\\,\\mathrm{cm^{-1}}$。',
          '这个间隔远小于阱深 $\\varepsilon$，因此阱内能容纳几十个束缚态；但它又远大于 $4\\,\\mathrm K$ 的热能 $k_{\\mathrm B}T\\approx0.35\\,\\mathrm{meV}$，所以在低温下分子几乎全部落在振动态基态。这正是惰性气体晶体可以用 Einstein 或 Debye 振子模型描述的根据。',
          '当温度升高或碰撞能量超过 $\\varepsilon$ 时，分子进入解离连续谱，两个原子分开。束缚态与连续谱的边界，就是 12-6 势第二个零点以外那条通向 $r\\to\\infty$ 的平台。'
        ],
        formulas: [
          { math: raw`E_n=\hbar\omega\left(n+\frac{1}{2}\right),\qquad \hbar\omega\approx3\ \mathrm{meV}\approx25\ \mathrm{cm^{-1}}`, note: '氩二聚体的阱底振动能级' },
          { math: raw`\frac{\hbar\omega}{k_{\mathrm B}}\approx38\ \mathrm{K}\gg4\ \mathrm{K}`, note: '低温下振动基态占主导' }
        ],
        insight: '范德华束缚很浅，却足以在低温下把两个中性原子绑成一个可观测的量子振子。'
      }
    ],
    takeaways: [
      '12-6 势用两个幂次同时刻画短程排斥与长程范德华吸引。',
      '阱底谐振子近似的频率由 $k=72\\varepsilon/r_0^2$ 与约化质量决定。',
      '惰性气体分子的振动能级间隔为毫电子伏特量级，低温下只剩基态振动。'
    ],
    exercise: {
      question: '对氩二聚体取 $\\varepsilon=10\\,\\mathrm{meV}$、$r_0=3.8$ Å、$\\mu=20\\,\\mathrm u$，估算阱底振动量子的能量，并判断 300 K 时分子是否处于振动基态。',
      hint: '$\\omega=\\sqrt{72\\varepsilon/(\\mu r_0^2)}\\approx5\\times10^{12}\\,\\mathrm{rad/s}$，$\\hbar\\omega\\approx3\\,\\mathrm{meV}$；而 300 K 的热能约 $26\\,\\mathrm{meV}$，远大于 $\\hbar\\omega$，因此室温下分子会被激发到多个振动态。'
    }
  },
  {
    id: 'qm-6-2',
    no: '6.2',
    title: '莫尔斯势：双原子分子',
    pages: '248–252',
    tag: '非谐振动',
    abstract:
      '莫尔斯势用指数型吸引壁代替 12-6 势的幂次吸引，既保留有限的解离能，又保持薛定谔方程的精确可解性。它的能级公式天然包含非谐修正，能解释双原子分子光谱中振动谱线间距随量子数增大而缩小的现象。',
    keyIdeas: [
      '莫尔斯势 $V=D_e[1-e^{-a(r-r_e)}]^2$ 在 $r\\to\\infty$ 时趋于解离极限 $D_e$。',
      '阱底谐振近似给出 $\\omega=a\\sqrt{2D_e/\\mu}$，力常数 $k=2D_e a^2$。',
      '精确能级为 $E_n=\\hbar\\omega(n+1/2)-(\\hbar\\omega)^2(n+1/2)^2/(4D_e)$。',
      '非谐性使能级间距随 n 线性减小，束缚态数目有限。'
    ],
    beats: [
      {
        title: '从谐振子到莫尔斯势',
        paragraphs: [
          '谐振子势随 r 无限上升，意味着化学键永远不会断裂；真实分子在 r 增大到一定程度后必然解离。莫尔斯势把吸引壁改成指数衰减，使势在 $r\\to\\infty$ 时趋于常数 $D_e$，从而给振动谱设定了有限的上界。',
          '在平衡距离 $r_e$ 附近展开，指数函数近似为线性，二次项给出 $k=2D_e a^2$。参数 $a$ 控制势阱的宽度：$a$ 越大，势阱越窄，振动频率越高。',
          '因此莫尔斯势的阱底仍然是谐振子，只是它的“弹性”随拉伸而变软。谐振近似只在低量子数时可靠，越接近解离极限，非谐效应越显著。'
        ],
        formulas: [
          { math: raw`V(r)=D_e\left[1-e^{-a(r-r_e)}\right]^2`, note: '莫尔斯势：有限的解离能' },
          { math: raw`k=\left.\frac{d^2V}{dr^2}\right|_{r_e}=2D_e a^2,\qquad \omega=a\sqrt{\frac{2D_e}{\mu}}`, note: '阱底谐振频率' }
        ],
        insight: '莫尔斯势的全部价值在于：它既像真实化学键，又保留了精确解。'
      },
      {
        title: '莫尔斯势的精确解',
        paragraphs: [
          '把莫尔斯势代入径向薛定谔方程，自变量换元 $z=2\\lambda e^{-a(r-r_e)}$ 后，方程化为拉盖尔方程。波函数由指数因子与拉盖尔多项式组成，量子数 $n$ 只能取到使波函数在无穷远处仍可归一化的范围。',
          '能谱的闭合形式只含两个参数：谐振频率 $\\hbar\\omega$ 与阱深 $D_e$。第一项是等间距的谐振谱，第二项是负的非谐修正，它让高能级逐渐向解离极限靠拢。',
          '束缚态数由 $\\lambda=\\sqrt{2\\mu D_e}/(a\\hbar)$ 控制，条件是 $n<\\lambda-1/2$。当 $\\lambda$ 不是整数时，最后一个能级与解离极限之间留有空隙；这正是真实分子光谱中“最后一个振动带”的来源。'
        ],
        formulas: [
          { math: raw`E_n=-D_e+\hbar\omega\left(n+\frac{1}{2}\right)-\frac{(\hbar\omega)^2}{4D_e}\left(n+\frac{1}{2}\right)^2`, note: '以解离极限为零点的精确能谱' },
          { math: raw`\lambda=\frac{\sqrt{2\mu D_e}}{a\hbar},\qquad n<\lambda-\frac{1}{2}`, note: '束缚态数目由 λ 决定' }
        ],
        insight: '非谐修正不是微扰补丁，而是精确解的自然结果；它把“等间距”改写成“越往上越密”。'
      },
      {
        title: '双原子分子的振动能级',
        paragraphs: [
          '光谱学家习惯用波数表示能级：$E_n=\\hbar\\omega_e(n+1/2)-\\hbar\\omega_e x_e(n+1/2)^2$，其中 $x_e=\\hbar\\omega_e/(4D_e)$ 称为非谐性常数。相邻谱线的间隔约为 $\\hbar\\omega_e[1-2x_e(n+1)]$，随 $n$ 增大而线性缩小。',
          '以 HCl 为例，$\\omega_e\\approx2990\\,\\mathrm{cm^{-1}}$，$D_e\\approx4.61\\,\\mathrm{eV}$，算得 $x_e\\approx0.020$，$\\omega_e x_e\\approx53\\,\\mathrm{cm^{-1}}$。这与实验测得的振动带间距递减完全吻合，说明莫尔斯势抓住了化学键的主要特征。',
          '把莫尔斯谱与谐振谱画在一起，可以看到两者在低能级几乎重合，在高能级分道扬镳。谐振子预言无穷多个等间距能级，莫尔斯势只给出有限个，并在解离极限处收拢。'
        ],
        formulas: [
          { math: raw`E_n=\hbar\omega_e\left(n+\frac{1}{2}\right)-\hbar\omega_e x_e\left(n+\frac{1}{2}\right)^2,\quad x_e=\frac{\hbar\omega_e}{4D_e}`, note: '光谱学形式的非谐振动能级' },
          { math: raw`\Delta E_n=\hbar\omega_e\left[1-2x_e(n+1)\right]`, note: '振动谱线间距随 n 递减' }
        ],
        insight: '化学键的“硬度”不是常数；莫尔斯势把这一点写进了能谱的二次项。'
      }
    ],
    takeaways: [
      '莫尔斯势兼有真实解离行为与精确可解性。',
      '精确能级包含谐振项与非谐修正项，修正强度由 $\\hbar\\omega/4D_e$ 决定。',
      '双原子分子振动谱线间距随量子数递减，是有限阱深的直接证据。'
    ],
    exercise: {
      question: '已知 HCl 的 $\\omega_e=2990\\,\\mathrm{cm^{-1}}$、$D_e=4.61\\,\\mathrm{eV}$，估算非谐性常数 $x_e$，并说明为什么高振动能级会越来越密。',
      hint: '$x_e=\\hbar\\omega_e/(4D_e)\\approx0.020$；间距 $\\Delta E\\propto1-2x_e(n+1)$，随 $n$ 线性减小，因为势阱在拉伸方向变软并逼近解离极限。'
    }
  },
  {
    id: 'qm-6-3',
    no: '6.3',
    title: '普薛耳-特勒势阱',
    pages: '253–257',
    tag: '精确可解势阱',
    abstract:
      '普薛耳-特勒势用一个 $\\cosh^{-2}$ 的钟形凹陷构造出光滑、有限深、有限宽的势阱。它既没有 12-6 势的强奇点，也不像谐振子那样无限上升，而且薛定谔方程可以精确求解，是研究“有限束缚态”与“反射透明”现象的模型势。',
    keyIdeas: [
      '势阱 $V=-D/\\cosh^2(\\alpha x)$ 光滑、对称、有限深，宽度由 $1/\\alpha$ 决定。',
      '阱底谐振频率为 $\\omega_0=\\hbar\\alpha^2\\sqrt{\\lambda(\\lambda+1)}/m$，$\\lambda$ 越大越接近谐振子。',
      '精确能级 $E_n=-(\\hbar^2\\alpha^2/2m)(\\lambda-n)^2$，束缚态数有限。',
      '$\\lambda$ 取特殊整数值时势阱对入射波完全透明，这是谐振子所没有的性质。'
    ],
    beats: [
      {
        title: '阱底谐振子近似',
        paragraphs: [
          '普薛耳-特勒势在 $x=0$ 处取最小值 $-D$，向两侧按 $\\cosh^{-2}$ 衰减，在 $|x|\\gg1/\\alpha$ 时迅速趋于零。它没有 12-6 势的硬核奇点，也没有谐振子的无穷高壁，因此是一个“温和”的有限阱。',
          '在阱底展开到二阶，得到力常数 $k=2D\\alpha^2$，对应的谐振频率随 $\\lambda$ 增大而增大。当 $\\lambda$ 很大时，势阱又深又宽，低能级几乎就是等间距的谐振谱。',
          '这个极限说明：谐振子并不是一个独立的模型，而是所有光滑对称势阱在深阱极限下的共同近似。普薛耳-特勒势正好提供了从有限阱平滑过渡到谐振子的教科书例子。'
        ],
        formulas: [
          { math: raw`V(x)=-\frac{D}{\cosh^2(\alpha x)},\qquad D=\frac{\hbar^2\alpha^2}{2m}\lambda(\lambda+1)`, note: '普薛耳-特勒势阱' },
          { math: raw`\omega_0=\sqrt{\frac{V''(0)}{m}}=\frac{\hbar\alpha^2}{m}\sqrt{\lambda(\lambda+1)}`, note: '阱底谐振频率' }
        ],
        insight: '阱底近似只依赖极小点的曲率；势阱的全局形状决定能级在高处的命运。'
      },
      {
        title: '精确解与能谱',
        paragraphs: [
          '作变量替换 $y=\\tanh(\\alpha x)$，薛定谔方程化为超几何方程，其解可用 Jacobi 多项式表示。边界条件要求波函数在 $x\\to\\pm\\infty$ 时衰减，这一条件直接把能级量子化。',
          '得到的能谱简单得惊人：$E_n\\propto-(\\lambda-n)^2$。它不是等间距，而是按“完全平方”排列；相邻间隔随 $n$ 增大而线性减小，越靠近解离极限能级越密。',
          '束缚态数由 $\\lambda$ 决定：$n$ 只能取 $0,1,\\dots,N$，且 $N<\\lambda$。当 $\\lambda\\le0$ 时势阱深度为零或为负，没有束缚态；当 $\\lambda$ 为正整数时，束缚态数恰好等于 $\\lambda$。'
        ],
        formulas: [
          { math: raw`E_n=-\frac{\hbar^2\alpha^2}{2m}\left(\lambda-n\right)^2,\qquad n=0,1,\dots,N<\lambda`, note: '精确能谱：平方律排列' },
          { math: raw`\psi_n(x)\propto P_n^{(\lambda-n,\lambda-n)}\left(\tanh\alpha x\right)`, note: '波函数由 Jacobi 多项式给出' }
        ],
        insight: '“平方律”能谱是有限深阱的典型特征；无限深阱与谐振子是它的两个不同极限。'
      },
      {
        title: '极限行为与物理意义',
        paragraphs: [
          '当 $\\lambda\\to\\infty$ 时，能级间隔 $\\Delta E\\approx(\\hbar^2\\alpha^2/2m)\\cdot2\\lambda$ 趋于常数 $\\hbar\\omega_0$，谱线重新变得等间距，普薛耳-特勒势退化为谐振子。反过来，当 $\\lambda$ 很小时，阱只能容纳一两个束缚态，相邻能级间隔很大。',
          '另一个有趣的性质是反射透明：对某些特殊 $\\lambda$，入射波经过势阱时完全没有反射，透射系数恒为 1。这与方势阱或谐振子的行为完全不同，说明势阱形状可以“设计”散射性质。',
          '在凝聚态与非线性物理中，普薛耳-特勒势常被用来描述孤子、磁性畴壁与光波导中的局域模。它的价值不在于模拟某个具体分子，而在于提供一个既有解析解又保留有限阱特征的基准模型。'
        ],
        formulas: [
          { math: raw`E_{n+1}-E_n=\frac{\hbar^2\alpha^2}{2m}\,2(\lambda-n-1)\;\xrightarrow{\ \lambda\gg n\ }\;\frac{\hbar^2\alpha^2\lambda}{m}=\hbar\omega_0`, note: '深阱极限回到等间距谐振谱' },
          { math: raw`T=1\quad(\text{特殊 }\lambda\text{ 值})`, note: '反射透明势：无反射透射' }
        ],
        insight: '有限阱的能级不是被“截断”的谐振谱，而是整体按平方律重排；这正是它可精确求解的原因。'
      }
    ],
    takeaways: [
      '普薛耳-特勒势是光滑、有限深、可精确求解的模型势。',
      '能级按 $-(\\lambda-n)^2$ 排列，束缚态数有限并由 $\\lambda$ 控制。',
      '$\\lambda$ 很大时回到谐振子，特殊 $\\lambda$ 时出现完全透射的反射透明现象。'
    ],
    exercise: {
      question: '取 $\\lambda=5$，列出普薛耳-特勒势的束缚态量子数与基态能量（以 $\\hbar^2\\alpha^2/2m$ 为单位），并与阱底谐振近似比较。',
      hint: '束缚态为 $n=0,1,2,3,4$，共 5 个；$E_0=-25$（单位 $\\hbar^2\\alpha^2/2m$），阱底为 $-30$，故基态高出阱底 5 个单位；谐振近似给出约 2.7 个单位，说明深阱极限下二者才吻合。'
    }
  },
  {
    id: 'qm-6-4',
    no: '6.4',
    title: '谐振子波包的振荡：光学钟',
    pages: '258–260',
    tag: '相干态与频率标准',
    abstract:
      '谐振子的相干态是平移后的基态波包，宽度不随时间改变，中心以经典频率往复运动。这个“不扩散的波包”展示了量子与经典最接近的一面，而光学钟正是把这种稳定振荡从原子跃迁搬到时间计量上的工程实现。',
    keyIdeas: [
      '相干态 $|\\alpha\\rangle$ 是湮灭算符的本征态，是最接近经典运动的量子态。',
      '相干态保持最小不确定关系 $\\Delta x\\Delta p=\\hbar/2$，且 $\\Delta x$ 不随时间增长。',
      '波包中心按 $x(t)=A\\cos(\\omega t)$ 振荡，周期 $T=2\\pi/\\omega$。',
      '光学钟以极窄的原子跃迁为频率基准，稳定度由品质因数 $Q$ 与信噪比决定。'
    ],
    beats: [
      {
        title: '相干态：平移的基态',
        paragraphs: [
          '把谐振子基态在相空间中平移，就得到相干态。它不是能量本征态，而是无穷多个 n 态按泊松权重叠加的结果，平均光子数（或振动量子数）为 $|\\alpha|^2$。',
          '相干态最重要的性质是“本征态”：湮灭算符作用在它上面只给出一个数 $\\alpha$，不会把它变成别的态。因此它在演化中始终保持同样的形状，只是中心在相空间里绕圈。',
          '能量期望值为 $\\hbar\\omega(|\\alpha|^2+1/2)$：前半是经典振动的能量，后半是不可消除的零点能。$\\alpha$ 越大，量子态越像一根摆动的经典弹簧。'
        ],
        formulas: [
          { math: raw`|\alpha\rangle=e^{-|\alpha|^2/2}\sum_{n=0}^{\infty}\frac{\alpha^n}{\sqrt{n!}}\,|n\rangle,\qquad \hat a|\alpha\rangle=\alpha|\alpha\rangle`, note: '相干态的定义与本征性质' },
          { math: raw`\langle E\rangle=\hbar\omega\left(|\alpha|^2+\frac{1}{2}\right)`, note: '相干态的平均能量' }
        ],
        insight: '相干态不是“没有量子效应”，而是把量子效应压缩到最小不确定的那一半。'
      },
      {
        title: '不扩散的振荡',
        paragraphs: [
          '一般波包由不同频率的分量叠加，各分量相位逐渐错开，波包会随时间展宽。相干态的特殊之处在于，所有分量都带着同一个相位关系，展宽效应被精确抵消。',
          '因此相干态的宽度恒为 $\\sqrt{\\hbar/2m\\omega}$，中心则按经典解运动。无论经过多少个周期，它都不会“融化”成一片，这一点与自由粒子的高斯波包形成鲜明对比。',
          '这个周期正是经典振子的周期 $T=2\\pi/\\omega$。在量子力学里，“钟”的本质就是这样一个相位稳定累积的振荡；相位每转一圈，时间就前进一个周期。'
        ],
        formulas: [
          { math: raw`\Delta x=\sqrt{\frac{\hbar}{2m\omega}},\qquad \langle x\rangle(t)=\sqrt{\frac{2\hbar}{m\omega}}\,|\alpha|\cos(\omega t-\phi)`, note: '宽度恒定，中心做经典振荡' },
          { math: raw`T=\frac{2\pi}{\omega}`, note: '振荡周期与经典振子一致' }
        ],
        insight: '波包不扩散，是因为相干态把“展宽”的自由度锁死在了最小不确定上。'
      },
      {
        title: '光学钟：把跃迁频率变成时间',
        paragraphs: [
          '光学钟的核心是一台频率极其稳定的“量子振子”：让原子或离子在两条长寿命能级之间跃迁，跃迁频率 $\\nu_0$ 由能级差决定，与外界扰动无关。把激光锁定到这个频率上，就得到一把以原子为刻度的尺。',
          '衡量频率标准的关键参数是品质因数 $Q=\\nu_0/\\Delta\\nu$，其中 $\\Delta\\nu$ 是谱线宽度。谱线越窄、频率越高，$Q$ 越大，同样的测量时间内积累的相位越多，频率分辨也越精细。',
          '现代光钟（如 Sr、Yb、$\\mathrm{Al}^+$）的 $Q$ 可达 $10^{14}\\text{–}10^{15}$，相对不确定度已进入 $10^{-18}$ 量级。这意味着即使运行宇宙年龄那么久，累积误差也只有不到一秒。相干态波包的稳定振荡，在这里变成了人类最精确的时间标尺。'
        ],
        formulas: [
          { math: raw`Q=\frac{\nu_0}{\Delta\nu},\qquad \frac{\delta\nu}{\nu_0}\sim\frac{1}{Q}\frac{1}{\sqrt{N}}`, note: '品质因数与频率稳定度' },
          { math: raw`\frac{\delta\nu}{\nu_0}\sim10^{-18}\;\Rightarrow\;\delta t\sim10^{-18}\times4.3\times10^{17}\ \mathrm{s}\approx0.4\ \mathrm{s}`, note: '光钟精度：宇宙年龄量级的累积误差不足一秒' }
        ],
        insight: '光学钟不是“更快的钟”，而是“谱线更窄的钟”；精度来自 Q，不来自频率本身。'
      }
    ],
    takeaways: [
      '相干态是平移的基态，宽度恒定、中心做经典振荡。',
      '波包不扩散源于各能量分量之间锁定的相位关系。',
      '光学钟用高 $Q$ 的原子跃迁作为频率基准，把量子振荡转化为时间单位。'
    ],
    exercise: {
      question: '若谐振子频率为 $\\omega=2\\pi\\times100\\,\\mathrm{Hz}$，相干态振幅对应 $|\\alpha|=2$，求波包中心的振幅与振荡周期，并说明为什么它不会随时间展宽。',
      hint: '中心振幅 $A=\\sqrt{2\\hbar/m\\omega}\\cdot|\\alpha|$，周期 $T=2\\pi/\\omega=0.01\\,\\mathrm s$；相干态所有 $n$ 分量的相对相位固定，展宽项相互抵消，故 $\\Delta x$ 恒为 $\\sqrt{\\hbar/2m\\omega}$。'
    }
  },
  {
    id: 'qm-6-5',
    no: '6.5',
    title: '原子力显微镜',
    pages: '261–262',
    tag: '微悬臂的量子极限',
    abstract:
      '原子力显微镜把一根微米尺度的悬臂当作机械谐振子，用激光杠杆读出它的弯曲。悬臂的振幅受热噪声与零点涨落限制，而力梯度引起的共振频移则把针尖与表面之间的原子级相互作用翻译成图像。',
    keyIdeas: [
      '微悬臂是准一维谐振子，$k$ 约为 $0.1\\text{–}10\\,\\mathrm{N/m}$，共振频率在千赫到兆赫量级。',
      '热噪声满足 $\\langle x^2\\rangle=k_{\\mathrm B}T/k$，室温下位移噪声为数十皮米到纳米。',
      '零点涨落 $x_{\\mathrm{zp}}=\\sqrt{\\hbar/2m\\omega_0}$ 是位移测量的最终量子极限。',
      '力梯度使共振频率移动 $\\Delta\\omega/\\omega_0=-(1/2k)\\partial F/\\partial z$，AFM 由此获得原子分辨。'
    ],
    beats: [
      {
        title: '微悬臂：一个机械谐振子',
        paragraphs: [
          'AFM 的探头是一根长几百微米、厚几微米的梁，末端带一个曲率半径约几纳米的针尖。梁的弯曲可以用一个等效弹簧描述，针尖受到的法向力把它推向或拉离样品。',
          '在平衡位置附近，悬臂的振动就是一个谐振子，频率 $\\omega_0=\\sqrt{k/m}$。由于质量只有皮克到纳克量级，共振频率很高，常见值为几十千赫到几兆赫，这使得测量带宽足够快，可以逐行扫描表面。',
          '量子化后能级为 $\\hbar\\omega_0(n+1/2)$。共振频率越高、质量越小，零点能越大，这也是微机械振子成为检验量子力学宏观极限的实验平台的原因。'
        ],
        formulas: [
          { math: raw`V(x)=\frac{1}{2}kx^2,\qquad \omega_0=\sqrt{\frac{k}{m}},\qquad E_n=\hbar\omega_0\left(n+\frac{1}{2}\right)`, note: '微悬臂的谐振子模型' },
          { math: raw`m\sim10^{-13}\ \mathrm{kg},\quad \frac{\omega_0}{2\pi}\sim10^{5}\text{–}10^{6}\ \mathrm{Hz}`, note: '典型微悬臂的质量与共振频率' }
        ],
        insight: '悬臂越小，共振频率越高；但质量越小，量子零点涨落也越显著。'
      },
      {
        title: '热噪声与量子极限',
        paragraphs: [
          '悬臂与温度为 $T$ 的环境处于热平衡，能量均分给出 $\\langle x^2\\rangle=k_{\\mathrm B}T/k$。对 $k=1\\,\\mathrm{N/m}$、$T=300\\,\\mathrm K$，位移均方根约为几十皮米，已经接近单个原子的尺度。',
          '降低温度或增大 $k$ 可以压住热噪声，但压到一定程度后会遇到不可消除的零点涨落。零点振幅 $\\sqrt{\\hbar/2m\\omega_0}$ 是海森堡不确定关系对位置测量的硬下限，任何线性放大都无法绕过。',
          '热噪声还转化为力噪声，其谱密度与 $k_{\\mathrm B}T$、阻尼和品质因数有关。高品质因数能把噪声集中到窄频带，从而提高力灵敏度；这正是超高真空与低温 AFM 追求 $Q$ 的原因。'
        ],
        formulas: [
          { math: raw`\langle x^2\rangle=\frac{k_{\mathrm B}T}{k},\qquad x_{\mathrm{zp}}=\sqrt{\frac{\hbar}{2m\omega_0}}`, note: '热位移噪声与零点涨落' },
          { math: raw`\delta F_{\min}=\sqrt{\frac{4\,k\,k_{\mathrm B}T\,B}{\omega_0 Q}}`, note: '热噪声限制的最小可测力（B 为带宽）' }
        ],
        insight: '温度趋于零时热噪声消失，但量子噪声留下；AFM 的终极分辨率由零点涨落设定。'
      },
      {
        title: 'AFM 的工作原理',
        paragraphs: [
          '工作时，激光打在悬臂末端并反射到位置敏感探测器上，形成光学杠杆：悬臂弯曲几个纳米，光斑就会移动几十微米，被放大到容易测量的尺度。',
          '针尖与样品之间的力包括短程排斥、范德华吸引与静电力。扫描时保持恒力（接触模式）或恒振幅（轻敲模式），反馈回路调节 z 方向高度，记录下来的高度曲线就是表面形貌。',
          '更灵敏的方式是测量力梯度：它使有效弹簧常数改变，从而移动共振频率。频率偏移与 $\\partial F/\\partial z$ 成正比，因此可以在不接触样品的情况下探测单个原子的化学身份。AFM 由此从“看形状”走向“测相互作用”。'
        ],
        formulas: [
          { math: raw`\frac{\Delta\omega}{\omega_0}=-\frac{1}{2k}\frac{\partial F}{\partial z}`, note: '力梯度引起的共振频移' },
          { math: raw`F(z)=-\frac{\partial U}{\partial z},\qquad \delta f\sim\frac{f_0}{2k}\frac{\partial F}{\partial z}`, note: '频移与力梯度的关系' }
        ],
        insight: 'AFM 读出的不是“力”，而是力随距离的变化率；微分让微弱的原子级相互作用变得可测。'
      }
    ],
    takeaways: [
      '微悬臂是一个高频、低质量的机械谐振子，量子化后具有零点能。',
      '热噪声给出位移噪声 $\\sqrt{k_{\\mathrm B}T/k}$，零点涨落给出最终量子极限。',
      'AFM 通过光学杠杆读弯曲、通过频移读力梯度，实现原子级成像。'
    ],
    exercise: {
      question: '一支 $k=1\\,\\mathrm{N/m}$ 的悬臂在 $300\\,\\mathrm K$ 下工作，估算其热位移噪声；若要把它降到零点涨落量级，需要采取什么措施？',
      hint: '$x_{\\mathrm{rms}}=\\sqrt{k_{\\mathrm B}T/k}\\approx\\sqrt{4.1\\times10^{-21}}\\approx6\\times10^{-11}\\,\\mathrm m$；需大幅降温使 $k_{\\mathrm B}T\\ll\\hbar\\omega_0$，并提高 $\\omega_0$ 或减小质量，使零点振幅本身足够小。'
    }
  }
]
