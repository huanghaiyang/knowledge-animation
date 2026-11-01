## 本讲目标与符号约定

经典力学里，动量是一个可以随时读出的数；量子力学里，它变成了作用在波函数上的一次求导。本讲要回答：这个算符为什么是 −iℏ∇、它的本征函数为什么是平面波、平面波如何归一化、位置与动量为什么不能同时对易、以及不确定性关系如何从对易关系推出来。

学完本讲，应当能够：

- 从德布罗意关系与平面波构造动量算符，并验证本征值。
- 解一维动量本征方程，写出通解并说明本征值为实数。
- 区分周期边界与硬壁边界下不同的动量量子化。
- 完成箱归一化与狄拉克 δ 归一化的换算。
- 证明动量算符的厄米性与对易关系。
- 在坐标表象与动量表象之间做傅里叶变换，并计算期望值。
- 证明 Robertson 不确定性关系，并验证高斯波包取到最小值。

符号约定：ℏ 是约化普朗克常数，h = 2πℏ；k 是波数，λ 是波长；p 是动量本征值，p̂ 是动量算符；ψ(x) 是坐标表象波函数，φ(p) 是动量表象波函数；⟨A⟩ 表示期望值，σ_A 表示标准差；x̂ 表示乘以 x 的位置算符。

$$
\hat{p}=-i\hbar\nabla,\qquad \hat{p}_x=-i\hbar\frac{\partial}{\partial x}=-i\hbar\frac{\mathrm{d}}{\mathrm{d}x} \qquad (1)
$$

一维问题只用 x 分量，后文若不特别说明，p̂ 均指 p̂_x。

## 动量算符从哪里来

### 德布罗意关系

德布罗意假设把粒子的动量与波的波长联系起来。

$$
p=\frac{h}{\lambda}=\hbar k,\qquad k=\frac{2\pi}{\lambda} \qquad (2)
$$

其中 k 是波数，量纲为长度的倒数。动量越大，波数越大，波长越短。这个关系不是从经典力学推出的，而是量子力学的基本假设之一；本讲的任务是找到与它一致的算符。

### 平面波与一次求导

一个沿 x 方向传播的平面波，其空间部分是 e^{ikx}。对 x 求导，指数原样保留，只多出一个因子 ik。

$$
\frac{\mathrm{d}}{\mathrm{d}x}e^{ikx}=ik\,e^{ikx} \qquad (3)
$$

要把这个因子变成 ℏk，只需在前面乘上 −iℏ，因为 −iℏ · ik = ℏk。

$$
-i\hbar\frac{\mathrm{d}}{\mathrm{d}x}e^{ikx}=\hbar k\,e^{ikx} \qquad (4)
$$

式 (4) 说明：−iℏ d/dx 作用在 e^{ikx} 上，结果仍是 e^{ikx} 本身，只多乘一个数 ℏk。这正是本征方程的形式。于是我们把这个算符认定为动量算符。

$$
\hat{p}_x=-i\hbar\frac{\mathrm{d}}{\mathrm{d}x} \qquad (5)
$$

负号与虚数单位不是装饰：−i 与 i 相乘得 1，保证本征值为实数；若只写 ℏ d/dx，本征值会变成 iℏk，是纯虚数，不可能对应可观测的动量。

### 正则对易关系作为出发点

另一种构造方式从对易关系出发。位置算符在坐标表象中只是乘以 x，动量算符则应当是「与 x 不对易、且对易子为常数」的一阶微分算符。直接验证式 (5) 满足

$$
\left[\hat{x},\hat{p}_x\right]=i\hbar \qquad (6)
$$

后文会给出完整证明。式 (6) 是正则量子化的基本关系，也是不确定性原理的代数源头。在这个意义上，动量算符的形式由「位置算符是乘法、对易子是 iℏ」这两条要求共同锁定。

## 一维动量本征方程

### 本征方程与通解

本征方程要求算符作用后只多一个常数，波函数形状不变。

$$
\hat{p}_x\psi=p\,\psi \qquad (7)
$$

这里的 p 是待定的数，不是算符。代入式 (5)，得到一阶线性常微分方程。

$$
-i\hbar\frac{\mathrm{d}\psi}{\mathrm{d}x}=p\,\psi \qquad (8)
$$

把含 ψ 的项移到左边、含 x 的项移到右边，分离变量。

$$
\frac{\mathrm{d}\psi}{\psi}=\frac{i p}{\hbar}\,\mathrm{d}x \qquad (9)
$$

两边积分，得到 ln ψ = i p x/ℏ + 常数；取指数。

$$
\psi(x)=A\,e^{i p x/\hbar} \qquad (10)
$$

**结论 1（本征函数通解）**：方程 (8) 的任何非零解都可写成式 (10)，其中 A 是非零复常数；反之，任何形如式 (10) 的函数都满足式 (8)，本征值为 p。

证明：式 (9) 的两边在 ψ 不为零的区间上都有定义。积分得 ln ψ 与 i p x/ℏ 相差一个常数，取指数即得式 (10)。反过来，把式 (10) 代入式 (8)，左边等于 −iℏ · (i p/ℏ) A e^{i p x/ℏ} = p ψ，正好等于右边。证毕。

一阶方程只含一个任意常数，所以通解只有这一个形式；这解释了为什么动量本征函数不是正弦或余弦，而是复指数。

### 本征值为实数

**结论 2（本征值实）**：动量算符的本征值 p 为实数。

证明：设 ψ 是归一化的本征函数，p̂ψ = pψ。由厄米性（结论 6），

$$
p\langle\psi|\psi\rangle=\langle\psi|\hat{p}\psi\rangle=\langle\hat{p}\psi|\psi\rangle=p^{*}\langle\psi|\psi\rangle \qquad (11)
$$

归一化给出 ⟨ψ|ψ⟩ = 1，故 p = p*，即 p 为实数。证毕。

这条证明说明了「厄米性」为什么重要：它把本征值从复数限制到实数，使本征值可以被解释为测量结果。

## 波数、波长与本征值

定义 k = p/ℏ，则式 (10) 写成更常见的形式。

$$
k=\frac{p}{\hbar},\qquad \psi_k(x)=A\,e^{ikx} \qquad (12)
$$

把式 (12) 代回算符，验证本征值。

$$
\hat{p}_x\psi_k=-i\hbar\frac{\mathrm{d}}{\mathrm{d}x}\left(Ae^{ikx}\right)=-i\hbar\left(ik\right)Ae^{ikx}=\hbar k\,\psi_k \qquad (13)
$$

**结论 3（平面波本征值）**：ψ_k = A e^{ikx} 是动量算符的本征函数，本征值为 ℏk；波数为 −k 的平面波 e^{−ikx} 的本征值为 −ℏk。

证明：式 (13) 给出前者。对后者，求导得 −ik e^{−ikx}，乘以 −iℏ 得 −ℏk e^{−ikx}，故本征值为 −ℏk。证毕。

波长与波数互为倒数关系。

$$
\lambda=\frac{2\pi}{k},\qquad k=\frac{2\pi}{\lambda} \qquad (14)
$$

三维情形把指数换成 e^{i k·r}，本征值为 ℏk，波矢 k 的方向与动量方向一致。

$$
\hat{p}\,e^{i\mathbf{k}\cdot\mathbf{r}}=-i\hbar\nabla e^{i\mathbf{k}\cdot\mathbf{r}}=\hbar\mathbf{k}\,e^{i\mathbf{k}\cdot\mathbf{r}} \qquad (15)
$$

## 归一化：箱、δ 函数与连续谱

### 平面波在全空间不可归一化

e^{ikx} 的模恒为 1，所以

$$
\int_{-\infty}^{\infty}\left\lvert A e^{ikx}\right\rvert^{2}\mathrm{d}x=\left\lvert A\right\rvert^{2}\int_{-\infty}^{\infty}\mathrm{d}x \qquad (16)
$$

积分发散，不存在有限的 A 使总概率为 1。这不是数学技巧问题，而是物理事实：一个动量完全确定的态在位置上完全离域，不能代表一个局域粒子。处理方式有两种：箱归一化与狄拉克归一化。

### 周期性边界条件

把波限制在长度 L 的区间 [0, L] 上，并采用周期性边界条件 ψ(x + L) = ψ(x)。对平面波，

$$
A e^{ik\left(x+L\right)}=A e^{ikx}\ \Longrightarrow\ e^{ikL}=1 \qquad (17)
$$

因此 kL 必须是 2π 的整数倍。

$$
k_n=\frac{2\pi n}{L},\qquad p_n=\hbar k_n=\frac{2\pi\hbar n}{L}=\frac{h n}{L},\qquad n\in\mathbb{Z} \qquad (18)
$$

相邻动量间隔为 Δp = 2πℏ/L = h/L。n 与 −n 是两个不同的态，对应方向相反的动量；n = 0 对应常量波函数与零动量。

**结论 4（周期箱的动量谱）**：在长度 L、周期边界的箱中，动量本征值只能是 2πℏn/L，n 为整数。

证明：由式 (17)，e^{ikL} = 1 等价于 kL = 2πn。代入 p = ℏk 即得式 (18)。证毕。

### 归一化振幅

在箱内要求总概率为 1。

$$
\int_0^L\left\lvert A\right\rvert^{2}\mathrm{d}x=\left\lvert A\right\rvert^{2}L=1 \qquad (19)
$$

$$
A=\frac{1}{\sqrt{L}} \qquad (20)
$$

A 的相位可以任意选取，因为它不影响概率密度；通常取正实数。

### 正交性

**结论 5（箱内正交归一）**：不同量子数的平面波在箱内正交，同量子数归一。

$$
\langle k_m|k_n\rangle=\frac{1}{L}\int_0^L e^{i\left(k_n-k_m\right)x}\,\mathrm{d}x=\delta_{mn} \qquad (21)
$$

证明：当 m = n 时被积函数为 1，积分等于 L，除以 L 得 1。当 m 不等于 n 时，k_n − k_m = 2π(n − m)/L 不为零，积分等于

$$
\frac{e^{i\left(k_n-k_m\right)L}-1}{i\left(k_n-k_m\right)}=\frac{e^{i2\pi\left(n-m\right)}-1}{i\left(k_n-k_m\right)}=0 \qquad (22)
$$

因为指数为 1。证毕。

### 连续谱与狄拉克归一化

让 L 趋于无穷，离散的 δ_mn 过渡为狄拉克 δ 函数。连续谱的平面波取归一化因子 1/√(2π)。

$$
\psi_k(x)=\frac{1}{\sqrt{2\pi}}e^{ikx},\qquad \langle k|k'\rangle=\delta\left(k-k'\right) \qquad (23)
$$

$$
\psi_p(x)=\frac{1}{\sqrt{2\pi\hbar}}e^{ipx/\hbar},\qquad \langle p|p'\rangle=\delta\left(p-p'\right) \qquad (24)
$$

式 (24) 的因子可以通过变量替换验证：k = p/ℏ，δ(k − k') = ℏ δ(p − p')，再配合 1/√(2π) 的归一化，正好得到 1/√(2πℏ)。这个归一化不是唯一的，但一旦选定，傅里叶变换的系数就随之固定。

### 硬壁边界：另一种量子化

若把粒子关在 [0, L] 中并施加硬壁条件 ψ(0) = ψ(L) = 0，动量本征函数 A e^{ikx} 无法满足 ψ(0) = 0（除非 A = 0）。因此硬壁箱里不存在动量本征函数，只有能量本征函数，即驻波。

$$
\phi_n(x)=\sqrt{\frac{2}{L}}\sin\left(\frac{n\pi x}{L}\right),\qquad n=1,2,3,\dots \qquad (25)
$$

**结论 6（硬壁箱的动量成分）**：式 (25) 的驻波不是动量本征函数，它是两个动量本征态的等权叠加，测量动量只能得到 ±πℏn/L。

证明：用欧拉公式展开正弦。

$$
\sin\left(\frac{n\pi x}{L}\right)=\frac{e^{i n\pi x/L}-e^{-i n\pi x/L}}{2i} \qquad (26)
$$

所以 φ_n 是 e^{i n\pi x/L} 与 e^{−i n\pi x/L} 的叠加，两个分量的动量分别为 πℏn/L 与 −πℏn/L。叠加态不是任何一个分量的本征态，故 φ_n 本身不是动量本征函数。证毕。

这里必须明确两种边界条件的区别：周期边界给 p_n = 2πℏn/L，包含零与正负整数；硬壁边界给 p = ±πℏn/L，n 为正整数，且这些动量只以叠加成分出现，不是箱中的动量本征态。把两套公式混用是最常见的错误之一。

## 自由粒子的能量与色散

自由粒子的哈密顿量为 p̂²/2m。把平面波代入含时薛定谔方程。

$$
i\hbar\frac{\partial}{\partial t}\psi=-\frac{\hbar^{2}}{2m}\frac{\partial^{2}}{\partial x^{2}}\psi \qquad (27)
$$

取 ψ = A e^{i(kx−ωt)}。左边给出 ℏω ψ，右边给出 (ℏ²k²/2m)ψ，所以

$$
\hbar\omega=\frac{\hbar^{2}k^{2}}{2m}\ \Longrightarrow\ \omega(k)=\frac{\hbar k^{2}}{2m},\qquad E=\frac{p^{2}}{2m}=\frac{\hbar^{2}k^{2}}{2m} \qquad (28)
$$

**结论 7（自由粒子色散与速度）**：自由粒子的相速度与群速度分别为

$$
v_{\text{p}}=\frac{\omega}{k}=\frac{\hbar k}{2m}=\frac{p}{2m},\qquad v_{\text{g}}=\frac{\mathrm{d}\omega}{\mathrm{d}k}=\frac{\hbar k}{m}=\frac{p}{m} \qquad (29)
$$

证明：相速度是相位 kx − ωt 的等相面速度，等于 ω/k；群速度是波包中心的传播速度，等于 dω/dk。对式 (28) 的 ω(k) 分别做除法与求导，即得两式。证毕。

群速度等于经典速度 p/m，这是波包能够代表粒子的关键；相速度只有群速度的一半，本身没有直接的粒子解释。

## 位置与动量的对易关系

**结论 8（正则对易关系）**：在坐标表象中，

$$
\left[\hat{x},\hat{p}_x\right]=i\hbar \qquad (30)
$$

证明：把对易子作用在任意光滑试验函数 f 上。x̂ 是乘以 x，p̂ 是 −iℏ d/dx。

$$
\left[\hat{x},\hat{p}_x\right]f=x\left(-i\hbar f'\right)-\left(-i\hbar\right)\left(xf\right)' \qquad (31)
$$

$$
=-i\hbar xf'+i\hbar\left(f+xf'\right)=i\hbar f \qquad (32)
$$

由于这对任意 f 成立，算符恒等式成立。证毕。

由此还可以得到与 p̂² 的对易关系，作为练习：对任意 f，

$$
\left[\hat{x},\hat{p}_x^{2}\right]f=-\hbar^{2}xf''+\hbar^{2}\left(xf\right)''=2\hbar^{2}f'=2i\hbar\left(-i\hbar f'\right) \qquad (33)
$$

所以 [x̂, p̂²] = 2iℏ p̂。这个结果在计算期望值的变化率时反复出现。

## 厄米性

**结论 9（动量算符厄米）**：对定义在实轴、在无穷远足够快衰减的平方可积函数 f、g，

$$
\langle f|\hat{p}_x g\rangle=\langle\hat{p}_x f|g\rangle \qquad (34)
$$

证明：写出内积并分部积分。

$$
\langle f|\hat{p}_x g\rangle=\int_{-\infty}^{\infty}f^{*}\left(-i\hbar g'\right)\mathrm{d}x=-i\hbar\int_{-\infty}^{\infty}f^{*}g'\,\mathrm{d}x \qquad (35)
$$

$$
=-i\hbar\left[f^{*}g\right]_{-\infty}^{\infty}+i\hbar\int_{-\infty}^{\infty}\left(f^{*}\right)'g\,\mathrm{d}x \qquad (36)
$$

平方可积且可微的函数在无穷远趋于零，边界项消失。再把 iℏ(f*)' 写成 (−iℏf')*。

$$
=i\hbar\int_{-\infty}^{\infty}\left(f^{*}\right)'g\,\mathrm{d}x=\int_{-\infty}^{\infty}\left(-i\hbar f'\right)^{*}g\,\mathrm{d}x=\langle\hat{p}_x f|g\rangle \qquad (37)
$$

证毕。

边界项是证明的核心。若把粒子关在硬壁箱里，f 与 g 在边界为零，边界项同样消失，但此时动量算符的定义域与边界条件不兼容，它只是对称的而不是自伴的，所以硬壁箱没有动量本征函数。周期箱没有边界，波函数与导数在两端衔接，分部积分的边界项也相消。

## 动量表象与傅里叶变换

### 变换对

任意平方可积的 ψ(x) 都可以展开为平面波的叠加，展开系数就是动量表象波函数。

$$
\psi(x)=\frac{1}{\sqrt{2\pi\hbar}}\int_{-\infty}^{\infty}\varphi(p)\,e^{ipx/\hbar}\,\mathrm{d}p \qquad (38)
$$

$$
\varphi(p)=\frac{1}{\sqrt{2\pi\hbar}}\int_{-\infty}^{\infty}\psi(x)\,e^{-ipx/\hbar}\,\mathrm{d}x \qquad (39)
$$

若用波数 k，则把 ℏ 换成 1，得到更对称的形式。

$$
\psi(x)=\frac{1}{\sqrt{2\pi}}\int\tilde{\psi}(k)e^{ikx}\,\mathrm{d}k,\qquad \tilde{\psi}(k)=\frac{1}{\sqrt{2\pi}}\int\psi(x)e^{-ikx}\,\mathrm{d}x \qquad (40)
$$

**结论 10（动量表象的乘法性）**：在动量表象中，动量算符就是乘以 p；坐标算符则变成 iℏ ∂/∂p。

$$
\widehat{p}\,\varphi(p)=p\,\varphi(p),\qquad \widehat{x}\,\varphi(p)=i\hbar\frac{\partial}{\partial p}\varphi(p) \qquad (41)
$$

证明第一式：对式 (39) 做分部积分，把 −iℏ d/dx 从 ψ 移到指数上。

$$
\frac{1}{\sqrt{2\pi\hbar}}\int\left(-i\hbar\psi'\right)e^{-ipx/\hbar}\mathrm{d}x=\frac{1}{\sqrt{2\pi\hbar}}\int\psi\left(i\hbar\frac{\mathrm{d}}{\mathrm{d}x}e^{-ipx/\hbar}\right)\mathrm{d}x \qquad (42)
$$

指数求导给出 −ip/ℏ，乘以 iℏ 得 p，故右边等于 pφ(p)。第二式是同一逻辑的对偶：在坐标表象 x 是乘法，在动量表象 p 是乘法，两者的傅里叶对偶把乘法与求导互换。证毕。

### 帕塞瓦尔等式

**结论 11（概率守恒）**：坐标空间与动量空间的概率总和相等。

$$
\int_{-\infty}^{\infty}\left\lvert\varphi(p)\right\rvert^{2}\mathrm{d}p=\int_{-\infty}^{\infty}\left\lvert\psi(x)\right\rvert^{2}\mathrm{d}x \qquad (43)
$$

证明：把式 (39) 代入左边，写成三重积分。

$$
\int\left\lvert\varphi(p)\right\rvert^{2}\mathrm{d}p=\frac{1}{2\pi\hbar}\iiint\psi^{*}(x)\psi(x')\,e^{ip\left(x-x'\right)/\hbar}\,\mathrm{d}x\,\mathrm{d}x'\,\mathrm{d}p \qquad (44)
$$

对 p 积分得到 2πℏ δ(x − x')，因为

$$
\int e^{ip\left(x-x'\right)/\hbar}\mathrm{d}p=2\pi\hbar\,\delta\left(x-x'\right) \qquad (45)
$$

代回并对 x' 积分，δ 函数把 x' 替换为 x，三重积分化为式 (43) 的右边。证毕。

这条等式说明：在坐标空间归一化的态，在动量空间也自动归一化；变换不丢失概率。

## 不确定性关系

### Robertson 不等式

**结论 12（Robertson 不等式）**：对任意两个厄米算符 A、B 与任意归一化态，

$$
\sigma_{A}^{2}\sigma_{B}^{2}\ge\frac{1}{4}\left\lvert\left\langle\left[A,B\right]\right\rangle\right\rvert^{2} \qquad (46)
$$

证明：令 a = ⟨A⟩、b = ⟨B⟩，定义

$$
f=\left(A-a\right)\psi,\qquad g=\left(B-b\right)\psi \qquad (47)
$$

则 ‖f‖² = ⟨(A − a)²⟩ = σ_A²，‖g‖² = σ_B²。由柯西–施瓦茨不等式，

$$
\sigma_{A}^{2}\sigma_{B}^{2}=\lVert f\rVert^{2}\lVert g\rVert^{2}\ge\left\lvert\langle f|g\rangle\right\rvert^{2} \qquad (48)
$$

计算内积 ⟨f|g⟩ = ⟨(A − a)(B − b)⟩。它的虚部为

$$
\operatorname{Im}\langle f|g\rangle=\frac{\langle f|g\rangle-\langle g|f\rangle}{2i}=\frac{\left\langle\left[A,B\right]\right\rangle}{2i} \qquad (49)
$$

因为 a、b 是数，与算符对易，(A − a)(B − b) − (B − b)(A − a) = [A, B]。于是

$$
\left\lvert\langle f|g\rangle\right\rvert\ge\left\lvert\operatorname{Im}\langle f|g\rangle\right\rvert=\frac{1}{2}\left\lvert\left\langle\left[A,B\right]\right\rangle\right\rvert \qquad (50)
$$

两边平方即得式 (46)。证毕。

### 位置与动量

把 A = x̂、B = p̂ 代入，利用 [x̂, p̂] = iℏ。

$$
\left\langle\left[\hat{x},\hat{p}\right]\right\rangle=i\hbar\ \Longrightarrow\ \sigma_{x}\sigma_{p}\ge\frac{\hbar}{2} \qquad (51)
$$

这就是海森堡不确定性关系的严格形式。它不是测量误差的经验陈述，而是算符代数与柯西–施瓦茨不等式的直接推论。

### 高斯波包取到等号

取归一化的高斯波函数。

$$
\psi(x)=\left(\pi\sigma^{2}\right)^{-1/4}\exp\left(-\frac{x^{2}}{2\sigma^{2}}\right) \qquad (52)
$$

位置概率密度也是高斯，方差可直接积分。

$$
\left\langle x^{2}\right\rangle=\frac{1}{\sqrt{\pi}\sigma}\int x^{2}e^{-x^{2}/\sigma^{2}}\mathrm{d}x=\frac{\sigma^{2}}{2},\qquad \sigma_{x}=\frac{\sigma}{\sqrt{2}} \qquad (53)
$$

做傅里叶变换，得到动量表象波函数。

$$
\varphi(p)=\frac{\pi^{-1/4}\sigma^{1/2}}{\sqrt{\hbar}}\exp\left(-\frac{\sigma^{2}p^{2}}{2\hbar^{2}}\right) \qquad (54)
$$

$$
\left\lvert\varphi(p)\right\rvert^{2}=\frac{1}{\sqrt{\pi}}\frac{\sigma}{\hbar}\exp\left(-\frac{\sigma^{2}p^{2}}{\hbar^{2}}\right),\qquad \sigma_{p}=\frac{\hbar}{\sqrt{2}\sigma} \qquad (55)
$$

**结论 13（高斯取到最小值）**：式 (52) 的高斯波包满足 σ_x σ_p = ℏ/2，取到 Robertson 不等式的等号。

证明：由式 (53) 与 (55)，乘积为 (σ/√2)(ℏ/(√2σ)) = ℏ/2。等号成立的原因是柯西–施瓦茨不等式的等号条件 g = λf 被满足：对高斯波包，(p̂ − ⟨p⟩)ψ 正比于 (x̂ − ⟨x⟩)ψ。证毕。

## 典型例题

### 例题 1：平面波的本征值、波长与能量

取 ψ = A e^{i3x}（长度单位任意），求动量、波长与自由粒子能量。

解答：k = 3，由式 (13) p = 3ℏ。波长 λ = 2π/3 ≈ 2.094。能量 E = p²/2m = 9ℏ²/(2m)。若要把 A 归一化，必须先指定箱子长度 L 并满足 3L = 2πn；例如取 L = 2π/3（n = 1），则 A = √(3/(2π))。

### 例题 2：周期箱中的前两个动量

取 L = 6.4（与动画的显示箱长度相同），周期边界。求 n = 1 与 n = 2 的 k、p、λ。

解答：由式 (18)，k_n = 2πn/6.4。n = 1 时 k = 0.9817，p = 0.9817ℏ，λ = 6.4；n = 2 时 k = 1.9635，p = 1.9635ℏ，λ = 3.2。相邻动量间隔为 2πℏ/6.4 ≈ 0.9817ℏ。

动画默认的 k = 1.6 落在两个离散值之间。动画把 k 当作连续参数扫描，是为了展示平面波的形状随波长变化；严格的周期箱谱是离散的，k = 1.6 并不对应 L = 6.4 的某个本征态。这一点在实验步骤中必须区分。

### 例题 3：两个本征态的叠加

取 L 为箱长，k₁ = 2π/L、k₂ = 4π/L，构造

$$
\psi(x)=\frac{1}{\sqrt{2L}}\left(e^{ik_{1}x}+e^{ik_{2}x}\right) \qquad (56)
$$

求动量概率、⟨p⟩、⟨p²⟩、σ_p 与干涉条纹的拍长。

解答：两个系数都是 1/√(2L)，模平方为 1/(2L)，乘以 L 得概率 1/2。所以测量得到 ℏk₁ 与 ℏk₂ 的概率各为 1/2。

$$
\langle p\rangle=\frac{1}{2}\left(\hbar k_{1}+\hbar k_{2}\right)=\frac{1}{2}\left(\frac{2\pi\hbar}{L}+\frac{4\pi\hbar}{L}\right)=\frac{3\pi\hbar}{L} \qquad (57)
$$

$$
\left\langle p^{2}\right\rangle=\frac{1}{2}\left(\hbar^{2}k_{1}^{2}+\hbar^{2}k_{2}^{2}\right)=\frac{\hbar^{2}}{2}\left(\frac{4\pi^{2}}{L^{2}}+\frac{16\pi^{2}}{L^{2}}\right)=\frac{10\pi^{2}\hbar^{2}}{L^{2}} \qquad (58)
$$

$$
\sigma_{p}^{2}=\left\langle p^{2}\right\rangle-\langle p\rangle^{2}=\frac{10\pi^{2}\hbar^{2}}{L^{2}}-\frac{9\pi^{2}\hbar^{2}}{L^{2}}=\frac{\pi^{2}\hbar^{2}}{L^{2}},\qquad \sigma_{p}=\frac{\pi\hbar}{L} \qquad (59)
$$

位置概率密度为

$$
\left\lvert\psi(x)\right\rvert^{2}=\frac{1}{L}\left(1+\cos\left(\frac{2\pi x}{L}\right)\right) \qquad (60)
$$

因为 k₂ − k₁ = 2π/L，拍长为 Λ = 2π/(k₂ − k₁) = L。在 [0, L] 上积分，常数项给出 1，余弦项积分为零，总概率为 1。

### 例题 4：高斯波包的宽度

取式 (52) 中 σ = 1（长度单位），求 σ_x、σ_p 与乘积。

解答：σ_x = 1/√2 ≈ 0.707，σ_p = ℏ/√2 ≈ 0.707ℏ，乘积为 ℏ/2。若把 σ 减半到 0.5，则 σ_x ≈ 0.354，σ_p ≈ 1.414ℏ，乘积仍为 ℏ/2：位置越窄，动量越宽，反之亦然。

### 例题 5：实波函数的动量期望值

证明：若 ψ(x) 为实函数且平方可积，则 ⟨p⟩ = 0。

解答：由式 (39)，实函数的傅里叶变换满足 φ(−p) = φ(p)*。于是 |φ(−p)|² = |φ(p)|²，即动量概率密度是偶函数。⟨p⟩ = ∫p|φ(p)|²dp 的被积函数是奇函数，在对称区间上积分为零。例如基态氢原子的实波函数、硬壁箱的驻波，动量期望值都为零；但它们的动量分布并不为零，σ_p 仍为正。

### 例题 6：对易子 [x̂, p̂²]

证明 [x̂, p̂²] = 2iℏp̂。

解答：作用在任意光滑 f 上。

$$
\left[\hat{x},\hat{p}^{2}\right]f=x\left(-\hbar^{2}f''\right)-\left(-\hbar^{2}\right)\left(xf\right)'' \qquad (61)
$$

$$
=-\hbar^{2}xf''+\hbar^{2}\left(xf''+2f'\right)=2\hbar^{2}f'=2i\hbar\left(-i\hbar f'\right)=2i\hbar\,\hat{p}f \qquad (62)
$$

故算符等式成立。

## 习题

### 基础题

1. 验证 e^{ikx} 与 e^{−ikx} 都是动量本征函数，并写出各自的本征值。
2. 取周期箱 L = 10，求 n = 1、2、−1 的 k、p 与波长。
3. 求周期箱中平面波的归一化常数 A，并写出 n = 1 时的完整波函数。
4. 直接作用在任意 f 上，证明 [x̂, p̂] = iℏ。
5. 取 k = 2π/λ、λ = 2，求 p（以 ℏ 为单位）与自由粒子能量（以 ℏ²/2m 为单位）。

### 进阶题

6. 证明动量算符的厄米性，并说明边界项在什么条件下消失。
7. 证明实波函数的动量期望值为零，并举例说明 σ_p 不为零。
8. 取 L = 4，k₁ = 2π/L、k₂ = 6π/L，两个分量等权叠加。求 ⟨p⟩、⟨p²⟩、σ_p 与拍长。
9. 说明为什么硬壁箱的 sin(nπx/L) 不是动量本征函数，并写出它包含的动量值。
10. 证明帕塞瓦尔等式，并说明它对归一化的意义。

## 习题答案与详细解析

### 基础题解答

1. 对 e^{ikx}，p̂ 作用得 ℏk e^{ikx}，本征值 ℏk；对 e^{−ikx}，p̂ 作用得 −ℏk e^{−ikx}，本征值 −ℏk。两者方向相反，不能因为「波长相同」就认为动量相同。

2. k_n = 2πn/10 = 0.6283n。n = 1：k = 0.6283，p = 0.6283ℏ，λ = 10；n = 2：k = 1.2566，p = 1.2566ℏ，λ = 5；n = −1：k = −0.6283，p = −0.6283ℏ，λ = 10。负号表示传播方向相反。

3. A = 1/√L = 1/√10 ≈ 0.3162。n = 1 时 ψ₁(x) = (1/√10)e^{i2πx/10}。它在 [0, 10] 上归一化，并且 ψ₁(10) = ψ₁(0)，满足周期边界。

4. 见式 (31) 与 (32)。关键是 (xf)' = f + xf'，符号整理后常数项 iℏf 保留下来。

5. k = 2π/2 = π。p = ℏk = πℏ，所以以 ℏ 为单位是 π。自由粒子能量 E = p²/2m = π²ℏ²/(2m)，以 ℏ²/2m 为单位是 π² ≈ 9.87。

### 进阶题解答

6. 证明见式 (35) 至 (37)。边界项 [f*g] 在无穷远消失，因为平方可积函数在无穷远趋于零；在周期箱中，两端波函数与导数衔接，边界项相消；在硬壁箱中，f、g 在边界为零，边界项也消失，但动量算符的定义域与硬壁条件不兼容，厄米性退化为对称性。

7. 见例题 5。动量概率密度是偶函数，所以一阶矩为零；二阶矩一般不为零，例如高斯波包的 σ_p = ℏ/(√2σ) 大于零。⟨p⟩ = 0 只说明平均动量为零，不说明动量确定为零。

8. k₁ = 2π/4 = π/2，k₂ = 6π/4 = 3π/2。等权叠加，⟨p⟩ = (ℏ/2)(π/2 + 3π/2) = πℏ。⟨p²⟩ = (ℏ²/2)(π²/4 + 9π²/4) = 5π²ℏ²/4。σ_p² = 5π²ℏ²/4 − π²ℏ² = π²ℏ²/4，σ_p = πℏ/2。拍长 Λ = 2π/(k₂ − k₁) = 2π/π = 2。

9. 硬壁条件要求在 x = 0 与 x = L 处波函数为零。动量本征函数 A e^{ikx} 在 x = 0 处等于 A，要为零只能 A = 0，即没有波函数。因此硬壁箱没有动量本征态。把正弦展开为两个复指数，得到 p = ±πℏn/L 两个分量；测量动量会得到其中之一，概率各半，但 sin 本身不是本征态。

10. 证明见式 (44) 至 (45)。帕塞瓦尔等式说明傅里叶变换保持范数，因此坐标空间归一化的态在动量空间也归一化；概率解释在两个表象中一致，不会因为换表象而丢失或重复概率。

## 常见错误与边界情形

- 把 e^{ikx} 直接在全空间归一化为 1。它的模恒为 1，全空间积分发散；必须先装箱或采用 δ 归一化。
- 把 sin(kx) 或 cos(kx) 当成动量本征函数。它们满足二阶方程但不是一阶动量方程的本征函数；求导会把正弦变成余弦，形状改变。
- 忘记 ℏ 或把它与 h 混淆。k 与 p 差一个 ℏ，λ 与 p 通过 p = h/λ 联系，而 h = 2πℏ；不能写成 p = ℏ/λ。
- 把 p̂ 写成 +iℏ d/dx。符号选反会使 e^{ikx} 的本征值变成 −ℏk，与德布罗意关系相反。
- 认为平面波 σ_p = 0 就代表一个真实粒子。σ_p = 0 的态在位置上完全离域，不可归一化；真实局域粒子必须是波包，σ_p 大于零。
- 混用周期箱与硬壁箱的动量公式。周期箱是 2πℏn/L，硬壁驻波的成分是 ±πℏn/L；后者不是动量本征态。
- 把相速度当成粒子速度。自由粒子的群速度才是 p/m；相速度只有 p/2m。
- 把不确定性关系当成等式。σ_xσ_p = ℏ/2 只有高斯波包取到；一般态满足大于等于。
- 在分部积分证明厄米性时忽略边界项。无穷远衰减、周期衔接或硬壁为零都是必要的。
- 认为复本征函数意味着算符不厄米。厄米算符的本征函数完全可以取复值；厄米性保证的是本征值实与不同本征值本征函数正交。
- 认为不同动量的平面波在无限空间正交。严格说是 δ 正交，不是克罗内克正交；只有在箱中才是 δ_mn。
- 把动画中连续的 k 当成箱的离散谱。动画为了展示形状把 k 设为连续滑块；严格的箱谱必须满足边界条件。

## 与动画步骤的对应

| 动画步骤 | 画面重点 | 对应讲义内容 |
| --- | --- | --- |
| 算符 | −iℏ d/dx 与厄米性 | 式 (1) 至 (6)、结论 9 |
| 本征方程 | 一阶 ODE 与复指数解 | 式 (7) 至 (10)、结论 1 与 2 |
| 平面波 | e^{ikx} 与 ℏk | 式 (12) 至 (15)、结论 3 |
| 归一化 | 箱归一化与 δ 函数 | 式 (16) 至 (26)、结论 4 至 6 |
| 叠加 | 两个本征态的干涉 | 式 (38) 至 (45)、例题 3 |
| 实验 | k 与振幅滑块 | 式 (28)、(29) 与色散 |

动画的 HUD 同时显示 k、p = ℏk、λ = 2π/k 与相速度 ω/k。把 k 从 1.6 拉到 4，螺距变短、动量变大、波长变短；这些读数与本讲式 (13)、(14)、(29) 一一对应。动画把 ℏ 与 m 取为 1，所以 p 直接显示为 k，能量显示为 k²/2，相速度为 k/2。

实验步骤中的「实部 / 虚部投影」把 e^{i(kx−ωt)} 拆成 cos(kx − ωt) 与 sin(kx − ωt)。这两条实波的叠加就是复指数；单独的余弦或正弦不是动量本征函数，因为它们求导后形状改变。这一点可以与常见错误中的第三条对照。

## 小结

- 动量算符 p̂ = −iℏ∇ 来自德布罗意关系 p = ℏk 与平面波求导；负号与 i 保证本征值为实。
- 一维本征方程是一阶 ODE，通解为 ψ = A e^{ipx/ℏ}，本征值为 p = ℏk。
- 平面波在全空间不可归一化；周期箱给出 p_n = 2πℏn/L，硬壁驻波只含 ±πℏn/L 的成分且本身不是本征态。
- 动量算符厄米，本征值实，不同本征值的本征函数正交。
- 正则对易关系 [x̂, p̂] = iℏ 是位置与动量不能同时确定的代数根源。
- 坐标表象与动量表象通过傅里叶变换相连；动量算符在动量表象中就是乘以 p，帕塞瓦尔等式保证概率守恒。
- Robertson 不等式给出 σ_xσ_p ≥ ℏ/2，高斯波包恰好取到等号。
- 自由粒子的群速度为 p/m，相速度为 p/2m；波包才能代表局域粒子。
