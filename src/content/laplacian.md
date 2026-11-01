## 本讲目标与符号约定

本讲从一维二阶导数出发，把拉普拉斯算子建立为「梯度的散度」，再把它写成可以逐项计算的形式。重点不是记住三个二阶偏导，而是理解 Δ 为什么同时携带「曲率」「通量」与「平均值偏差」三种读法。学完后应当能够：

- 从中心差商与散度定义独立写出 Δf = ∇·(∇f) 的直角坐标展开。
- 完整证明乘积法则 Δ(fg) = fΔg + gΔf + 2∇f·∇g。
- 用散度定理证明调和函数的均值定理、极值原理与狄利克雷问题的唯一性。
- 验证三维基本解 −1/(4πr) 与二维基本解 (1/2π)ln r。
- 说明球坐标、柱坐标展开式中尺度因子的来源。
- 计算具体函数的 Δ，并判断它是否调和。

全文采用右手直角坐标系 (x, y, z)，区域记作 Ω，边界记作 ∂Ω，单位外法向记作 n，沿外法向的方向导数记作 ∂_n。梯度与散度写作

$$
\nabla f=\left(\frac{\partial f}{\partial x},\ \frac{\partial f}{\partial y},\ \frac{\partial f}{\partial z}\right),\qquad
\nabla\cdot F=\frac{\partial F_x}{\partial x}+\frac{\partial F_y}{\partial y}+\frac{\partial F_z}{\partial z} \qquad (1)
$$

球坐标记作 (r, θ, φ)，其中 θ 是与 z 轴的夹角，φ 是方位角；柱坐标记作 (ρ, φ, z)，其中 ρ 是到 z 轴的距离。δ 表示狄拉克分布，⟨f⟩ 表示平均值。所有函数默认在所需阶数内连续可微。

## 问题设定与模型建立

### 一维：二阶差商描述弯曲

一元函数 f 的一阶导数给出斜率，二阶导数给出斜率的变化率。二阶导数不是另起炉灶的定义，而是对一阶差商再取一次差商：

$$
f''(x)=\lim_{h\to0}\frac{1}{h}\left[\frac{f(x+h)-f(x)}{h}-\frac{f(x)-f(x-h)}{h}\right]
=\lim_{h\to0}\frac{f(x+h)-2f(x)+f(x-h)}{h^2} \qquad (2)
$$

把 f(x±h) 在 x 处展开到四阶：

$$
f(x+h)+f(x-h)=2f(x)+h^2f''(x)+\frac{h^4}{12}f^{(4)}(x)+O(h^6) \qquad (3)
$$

移项立刻得到中心差分近似

$$
f''(x)=\frac{f(x+h)-2f(x)+f(x-h)}{h^2}+O(h^2) \qquad (4)
$$

误差是 O(h²)，因为展开中 h³ 项符号相反、自动抵消。符号决定凹凸：f'' > 0 时曲线凹向上，f'' < 0 时凹向下，f'' 变号处可能是拐点。一维的拉普拉斯算子就是 f''。

### 高维：把「弯曲」翻译成「净流出」

高维没有单一方向可以弯曲，但可以用一个小盒子测净流出。对向量场 F，定义散度为通量与体积之比的极限：

$$
\nabla\cdot F(x)=\lim_{|V|\to0}\frac{1}{|V|}\oint_{\partial V}F\cdot n\,dS \qquad (5)
$$

梯度把标量场变成向量场，散度再把向量场变回标量场。把 F = ∇f 代入，就得到拉普拉斯算子：

$$
\Delta f=\nabla\cdot(\nabla f) \qquad (6)
$$

这一步是定义，不是推导出来的巧合。它说明 Δ 测量的是「梯度场在一点向外发散多少」：梯度指向高处，若一点比周围低，梯度线从四面八方汇入，散度为负；若一点比周围高，梯度线向外发散，散度为正。

### 直角坐标：基向量不变，逐项展开

在直角坐标中，e_x、e_y、e_z 的方向与位置无关，因此对 F = ∇f 逐项求散度不会产生额外的基向量导数：

$$
\Delta f=\frac{\partial}{\partial x}\left(\frac{\partial f}{\partial x}\right)+\frac{\partial}{\partial y}\left(\frac{\partial f}{\partial y}\right)+\frac{\partial}{\partial z}\left(\frac{\partial f}{\partial z}\right)
=\frac{\partial^2 f}{\partial x^2}+\frac{\partial^2 f}{\partial y^2}+\frac{\partial^2 f}{\partial z^2} \qquad (7)
$$

这就是最常见的形式。它没有混合偏导，也没有一阶项，原因只有一个：直角坐标的基向量不随位置转动。换到球坐标或柱坐标后，基向量会随位置转动，展开式就会出现尺度因子与一阶导数项；但 Δ = ∇·∇f 的结构始终不变。

![图 1　一维二阶差分：f(x+h)+f(x−h)−2f(x) 近似 h²f″(x)](/notes/laplacian.svg)

## 逐步推导：从定义到可计算形式

先取一个二次函数验证逐项展开。令 f = x² + y² + z²，则

$$
\frac{\partial^2 f}{\partial x^2}=2,\qquad \frac{\partial^2 f}{\partial y^2}=2,\qquad \frac{\partial^2 f}{\partial z^2}=2 \qquad (8)
$$

三项相加得 Δf = 6，与位置无关。若先求梯度再求散度，∇f = 2(x, y, z)，散度为 2 + 2 + 2 = 6，与式 (6) 一致。

再取 f = 1/r，其中 r = √(x² + y² + z²)。在 r ≠ 0 处，

$$
\frac{\partial f}{\partial x}=-\frac{x}{r^3},\qquad
\frac{\partial^2 f}{\partial x^2}=-\frac{1}{r^3}+\frac{3x^2}{r^5} \qquad (9)
$$

对 y、z 同理。三项相加：

$$
\Delta\left(\frac{1}{r}\right)=-\frac{3}{r^3}+\frac{3(x^2+y^2+z^2)}{r^5}=0 \qquad (10)
$$

所以 1/r 在原点以外处处调和。原点处函数奇异，必须单独用分布语言处理，这一点在结论 9 中完成。

### 球坐标与柱坐标：先记住尺度因子

在正交坐标 (q_1, q_2, q_3) 中，坐标增加一个单位时实际走过的长度由尺度因子 h_i 给出。球坐标与柱坐标的尺度因子如下。

| 坐标系 | h_1 | h_2 | h_3 |
| --- | --- | --- | --- |
| 球 (r, θ, φ) | 1 | r | r sin θ |
| 柱 (ρ, φ, z) | 1 | ρ | 1 |

球坐标中 θ 增加 1 弧度，实际弧长是 r；φ 增加 1 弧度，实际弧长是 r sin θ，因为该点离 z 轴的距离是 r sin θ。柱坐标中 φ 增加 1 弧度，实际弧长是 ρ。把这些因子代入结论 10 的通用公式，就得到

$$
\Delta f=\frac{1}{r^2}\frac{\partial}{\partial r}\left(r^2\frac{\partial f}{\partial r}\right)+\frac{1}{r^2\sin\theta}\frac{\partial}{\partial\theta}\left(\sin\theta\frac{\partial f}{\partial\theta}\right)+\frac{1}{r^2\sin^2\theta}\frac{\partial^2 f}{\partial\varphi^2} \qquad (11)
$$

$$
\Delta f=\frac{1}{\rho}\frac{\partial}{\partial\rho}\left(\rho\frac{\partial f}{\partial\rho}\right)+\frac{1}{\rho^2}\frac{\partial^2 f}{\partial\varphi^2}+\frac{\partial^2 f}{\partial z^2} \qquad (12)
$$

式 (11) 与 (12) 不是新定义，而是同一条 Δ = ∇·∇f 在不同度量下的展开。它们的完整来源在结论 10 中给出。

## 核心结论与证明

### 结论 1：乘积法则

设 f、g 具有连续二阶偏导，则

$$
\Delta(fg)=f\,\Delta g+g\,\Delta f+2\nabla f\cdot\nabla g \qquad (13)
$$

证明：先用梯度的乘积法则

$$
\nabla(fg)=f\nabla g+g\nabla f \qquad (14)
$$

再用散度的乘积法则。对任意可微标量 h 与向量场 F，

$$
\nabla\cdot(hF)=(\nabla h)\cdot F+h\,\nabla\cdot F \qquad (15)
$$

因为逐分量求导得 ∂_i(hF_i) = (∂_i h)F_i + h∂_iF_i，求和即得。于是

$$
\Delta(fg)=\nabla\cdot(f\nabla g)+\nabla\cdot(g\nabla f)
=\left(\nabla f\cdot\nabla g+f\Delta g\right)+\left(\nabla g\cdot\nabla f+g\Delta f\right) \qquad (16)
$$

两个点积相同，合并即得式 (13)。证毕。

取 g = f 得一个重要特例：

$$
\Delta(f^2)=2f\,\Delta f+2|\nabla f|^2 \qquad (17)
$$

这条特例说明：即使 f 调和，f² 一般也不调和，因为 |∇f|² 通常不为零。

### 结论 2：倒数的拉普拉斯

设 f 在讨论区域内不取零且具有连续二阶偏导，则

$$
\Delta\left(\frac{1}{f}\right)=-\frac{\Delta f}{f^2}+\frac{2|\nabla f|^2}{f^3} \qquad (18)
$$

证明：令 h = 1/f。由链式法则 ∇h = −∇f/f²。再对向量场 −∇f/f² 使用式 (15)：

$$
\Delta h=\nabla\cdot\left(-\frac{\nabla f}{f^2}\right)
=-\frac{\Delta f}{f^2}-\nabla f\cdot\nabla\left(\frac{1}{f^2}\right) \qquad (19)
$$

而 ∇(1/f²) = −2∇f/f³，代入得

$$
\Delta h=-\frac{\Delta f}{f^2}+\frac{2|\nabla f|^2}{f^3} \qquad (20)
$$

证毕。这个公式在验证基本解与构造泊松方程解时反复出现。

### 结论 3：球面平均的泰勒展开

设 f 在 x 附近具有四阶连续偏导，∂B_r 是以 x 为球心、半径为 r 的球面，则

$$
\langle f\rangle_{\partial B_r}=f(x)+\frac{r^2}{6}\Delta f(x)+O(r^4) \qquad (21)
$$

证明：把 f(x+s) 在 s = 0 处展开到三阶，余项为 O(|s|⁴)：

$$
f(x+s)=f(x)+\nabla f(x)\cdot s+\frac{1}{2}\sum_{i,j}\partial_i\partial_j f(x)\,s_is_j+\frac{1}{6}\sum_{i,j,k}\partial_i\partial_j\partial_k f(x)\,s_is_js_k+O(|s|^4) \qquad (22)
$$

在球面上对 s 积分。一次项是奇函数，积分为零；三次项也是奇函数，积分为零。二次项需要计算

$$
\frac{1}{4\pi r^2}\oint_{\partial B_r}s_is_j\,dS \qquad (23)
$$

球面在正交变换下不变，所以这个二阶张量必须是各向同性的，即等于 cδ_ij。取迹：左边对 i 求和得 r²，右边得 3c，所以 c = r²/3。于是

$$
\frac{1}{4\pi r^2}\oint_{\partial B_r}s_is_j\,dS=\frac{r^2}{3}\delta_{ij} \qquad (24)
$$

代回二次项，得到 (1/2)(r²/3)Σ_i∂_i²f = r²Δf/6。奇数次项消失，余项平均后为 O(r⁴)，于是式 (21) 成立。证毕。

移项并令 r → 0，得到 Δ 的「平均值偏差」读法：

$$
\Delta f(x)=\lim_{r\to0}\frac{6\left(\langle f\rangle_{\partial B_r}-f(x)\right)}{r^2} \qquad (25)
$$

在二维圆周上，同样的计算给出平均张量 (r²/2)δ_ij，因此系数是 1/4；在一维两个端点上，系数是 1/2。系数随维度变化，不能混用。

### 结论 4：调和函数的均值定理

若 Δf = 0 在 Ω 内成立，则对任意满足 B_r(x) ⊂ Ω 的球，

$$
f(x)=\frac{1}{4\pi r^2}\oint_{\partial B_r}f\,dS=\frac{1}{\frac{4}{3}\pi r^3}\int_{B_r}f\,dV \qquad (26)
$$

证明：记球面平均为 M(r)。把积分变量写成 x + rω，其中 |ω| = 1：

$$
M(r)=\frac{1}{4\pi}\oint_{|\omega|=1}f(x+r\omega)\,dS_\omega \qquad (27)
$$

对 r 求导，导数可以移到积分号内：

$$
M'(r)=\frac{1}{4\pi}\oint_{|\omega|=1}\nabla f(x+r\omega)\cdot\omega\,dS_\omega
=\frac{1}{4\pi r^2}\oint_{\partial B_r}\nabla f\cdot n\,dS \qquad (28)
$$

第二个等号把单位球面换回半径 r 的球面，并用 n = ω。由散度定理，

$$
M'(r)=\frac{1}{4\pi r^2}\int_{B_r}\Delta f\,dV=0 \qquad (29)
$$

所以 M(r) 是常数。令 r → 0，M(r) → f(x)，故 M(r) = f(x)。球平均再把球面平均对半径积分一次即可：把 B_r 分成同心球面，每个球面的平均值都是 f(x)，故球平均也是 f(x)。证毕。

均值定理的逆命题也成立：若连续函数在每一点的足够小球面上都等于中心值，则它调和。因此「Δf = 0」与「处处等于邻域平均」是同一件事的两种说法。

### 结论 5：极值原理

设 Ω 是有界连通区域，f 在 Ω 内调和、在闭包上连续，则

$$
\max_{\overline\Omega}f=\max_{\partial\Omega}f,\qquad
\min_{\overline\Omega}f=\min_{\partial\Omega}f \qquad (30)
$$

证明：先证最大值。设 M 是 f 在闭包上的最大值。若最大值只在内部点 x_0 取得，而边界上的值都小于 M。取任意足够小的 r，使 B_r(x_0) ⊂ Ω。由均值定理，f(x_0) 等于 B_r(x_0) 上的平均值。但 f 处处不超过 M，而平均值等于 M，所以 B_r(x_0) 内每一点都必须等于 M。

于是集合 A = {x ∈ Ω : f(x) = M} 非空。上面的论证说明 A 是开集；又因 f 连续，A 在 Ω 中是闭集。Ω 连通，故 A = Ω，即 f 在 Ω 内恒等于 M。再由连续性，边界值也等于 M。这与「边界值都小于 M」矛盾。所以最大值必在边界取得。对 −f 用同样论证得最小值结论。证毕。

极值原理有一个常用的定量版本：若 Δf > 0，则 f 不能在内部取得最大值；若 Δf < 0，则不能取得最小值。这与「Δf > 0 表示比周围低」的图像一致。

### 结论 6：旋转不变性

设 Q 是正交矩阵，定义 g(x) = f(Qx)，则

$$
\Delta g(x)=(\Delta f)(Qx) \qquad (31)
$$

证明：记 y = Qx，则 y_k = Σ_j Q_{kj}x_j。由链式法则，

$$
\frac{\partial g}{\partial x_i}=\sum_k Q_{ki}\,(\partial_kf)(Qx) \qquad (32)
$$

再求一次导数：

$$
\frac{\partial^2 g}{\partial x_i^2}=\sum_{k,l}Q_{ki}Q_{li}\,(\partial_k\partial_lf)(Qx) \qquad (33)
$$

对 i 求和。因为 Q 正交，Σ_iQ_{ki}Q_{li} = δ_{kl}，所以

$$
\Delta g=\sum_{k,l}\delta_{kl}\,\partial_k\partial_lf(Qx)=\sum_k\partial_k^2f(Qx)=(\Delta f)(Qx) \qquad (34)
$$

证毕。这条性质说明 Δ 只依赖长度与角度，不依赖坐标轴的朝向；它也解释了为什么极坐标下的 Δ 只能含有 r、∂_r、∂_θ，而不能出现「偏向某个直角方向」的项。

旋转不变性还有一个直接推论：径向函数的 Δ 只依赖 r。在三维与二维中分别有

$$
\Delta f(r)=f''(r)+\frac{2}{r}f'(r)\quad(3D),\qquad
\Delta f(r)=f''(r)+\frac{1}{r}f'(r)\quad(2D) \qquad (35)
$$

解径向调和方程。三维时 (r²f')' = 0，故 f' = C/r²，积分得 f = a/r + b；二维时 (rf')' = 0，故 f = a ln r + b。这两个解分别是三维与二维基本解的来源。

### 结论 7：格林恒等式

设 u、v 在 Ω 上具有连续二阶偏导，则

$$
\int_\Omega\left(u\,\Delta v+\nabla u\cdot\nabla v\right)dV=\oint_{\partial\Omega}u\,\partial_n v\,dS \qquad (36)
$$

$$
\int_\Omega\left(u\,\Delta v-v\,\Delta u\right)dV=\oint_{\partial\Omega}\left(u\,\partial_n v-v\,\partial_n u\right)dS \qquad (37)
$$

证明：对向量场 F = u∇v 用散度定理：

$$
\int_\Omega\nabla\cdot(u\nabla v)\,dV=\oint_{\partial\Omega}u\nabla v\cdot n\,dS \qquad (38)
$$

左边用式 (15) 展开为 ∇u·∇v + uΔv，右边就是 ∮u∂_n v，得式 (36)。把式 (36) 中 u、v 互换再相减，左边 ∇u·∇v 抵消，右边得到式 (37)。证毕。

式 (36) 是 Δ 的弱形式的基础：对任意检验函数 v，若 u 调和，则

$$
\int_\Omega\nabla u\cdot\nabla v\,dV=\oint_{\partial\Omega}v\,\partial_n u\,dS \qquad (39)
$$

当 v 在边界上为零时，右端消失，Δ 的「作用」完全转移到一阶导数上。这正是有限元与弱解理论的出发点。

### 结论 8：狄利克雷问题的唯一性

设 u 在 Ω 内调和、在闭包上连续，且 u = 0 在 ∂Ω 上，则 u ≡ 0。更一般地，泊松方程 Δu = f 在给定边界值下的解至多一个。

证明：在式 (36) 中取 v = u：

$$
\int_\Omega u\,\Delta u\,dV+\int_\Omega|\nabla u|^2\,dV=\oint_{\partial\Omega}u\,\partial_n u\,dS \qquad (40)
$$

第一项为零（Δu = 0），右端为零（u = 0），所以

$$
\int_\Omega|\nabla u|^2\,dV=0 \qquad (41)
$$

被积函数非负且连续，故 ∇u = 0，u 在连通区域上为常数；边界值为零，故常数为零。若有两个泊松方程解 u_1、u_2，则 w = u_1 − u_2 满足 Δw = 0 且 w = 0 在边界上，由上面的论证 w ≡ 0。证毕。

### 结论 9：基本解

三维中，对 r = |x|，

$$
\Delta\left(\frac{1}{r}\right)=0\quad(r\ne0),\qquad
\Delta\left(\frac{1}{r}\right)=-4\pi\delta \qquad (42)
$$

因此

$$
\Delta\left(-\frac{1}{4\pi r}\right)=\delta \qquad (43)
$$

二维中，

$$
\Delta\ln r=2\pi\delta,\qquad
\Delta\left(\frac{1}{2\pi}\ln r\right)=\delta \qquad (44)
$$

证明：三维逐项计算已在式 (9) 与 (10) 完成，得到 r ≠ 0 时 Δ(1/r) = 0。为确定原点处的强度，取以原点为心、半径 ε 的球 B_ε。由散度定理，

$$
\int_{B_\varepsilon}\Delta\left(\frac{1}{r}\right)dV=\oint_{\partial B_\varepsilon}\partial_r\left(\frac{1}{r}\right)dS
=-\frac{1}{\varepsilon^2}\,4\pi\varepsilon^2=-4\pi \qquad (45)
$$

由于 Δ(1/r) 除原点外处处为零，它只能是原点处的分布，其总强度为 −4π，故 Δ(1/r) = −4πδ。两边乘 −1/(4π) 得式 (43)。

二维同理。取半径 ε 的圆盘，

$$
\int_{B_\varepsilon}\Delta(\ln r)\,dA=\oint_{\partial B_\varepsilon}\partial_r(\ln r)\,ds
=\frac{1}{\varepsilon}\,2\pi\varepsilon=2\pi \qquad (46)
$$

故 Δln r = 2πδ，除以 2π 得式 (44)。证毕。

基本解的符号约定值得记住：式 (43) 中 Δ(−1/(4πr)) = δ，而 Δ(1/(4πr)) = −δ。物理上常见的是 Δ(1/(4πr)) = −δ，因为点源的泊松方程写作 Δφ = −ρ/ε_0；数学上取格林函数时常用式 (43)。两者只差一个整体符号，不能混用。

### 结论 10：正交坐标的通用公式

设 (q_1, q_2, q_3) 是正交坐标，尺度因子为 h_i，则

$$
\Delta f=\frac{1}{h_1h_2h_3}\sum_{i=1}^{3}\frac{\partial}{\partial q_i}\left(\frac{h_jh_k}{h_i}\frac{\partial f}{\partial q_i}\right) \qquad (47)
$$

其中 (i, j, k) 是 (1, 2, 3) 的轮换。

证明：先写出梯度与散度。梯度在正交坐标中的物理分量是

$$
(\nabla f)_i=\frac{1}{h_i}\frac{\partial f}{\partial q_i} \qquad (48)
$$

散度由小坐标盒的通量平衡得到。考虑边长 h_i dq_i 的盒子。沿 q_1 方向，两个相对面的面积是 h_2h_3dq_2dq_3，净流出为

$$
\left[F_1h_2h_3\right]_{q_1+dq_1}-\left[F_1h_2h_3\right]_{q_1} \approx \frac{\partial}{\partial q_1}(F_1h_2h_3)\,dq_1dq_2dq_3 \qquad (49)
$$

三个方向相加，再除以体积 h_1h_2h_3dq_1dq_2dq_3，得到

$$
\nabla\cdot F=\frac{1}{h_1h_2h_3}\sum_{i=1}^{3}\frac{\partial}{\partial q_i}\left(h_jh_kF_i\right) \qquad (50)
$$

把式 (48) 的 F_i 代入式 (50)，即得式 (47)。证毕。

球坐标取 h_r = 1、h_θ = r、h_φ = r sin θ，乘积为 r² sin θ。逐项代入：

$$
\Delta f=\frac{1}{r^2\sin\theta}\left[\frac{\partial}{\partial r}\left(r^2\sin\theta\,\partial_rf\right)+\frac{\partial}{\partial\theta}\left(\sin\theta\,\partial_\theta f\right)+\frac{\partial}{\partial\varphi}\left(\frac{1}{\sin\theta}\partial_\varphi f\right)\right] \qquad (51)
$$

化简即式 (11)。柱坐标取 h_ρ = 1、h_φ = ρ、h_z = 1，乘积为 ρ，逐项代入得

$$
\Delta f=\frac{1}{\rho}\left[\frac{\partial}{\partial\rho}\left(\rho\,\partial_\rho f\right)+\frac{\partial}{\partial\varphi}\left(\frac{1}{\rho}\partial_\varphi f\right)+\frac{\partial}{\partial z}\left(\rho\,\partial_z f\right)\right] \qquad (52)
$$

化简即式 (12)。证毕。

### 结论 11：分离变量与特征值问题

在 Ω 上考虑狄利克雷特征值问题

$$
-\Delta u=\lambda u\ \text{in}\ \Omega,\qquad u=0\ \text{on}\ \partial\Omega \qquad (53)
$$

则所有特征值为正，且不同特征值对应的特征函数正交：

$$
\lambda\int_\Omega u^2\,dV=\int_\Omega|\nabla u|^2\,dV\gt 0 \qquad (54)
$$

$$
(\lambda-\mu)\int_\Omega uv\,dV=0 \qquad (55)
$$

证明：用式 (36) 取 v = u，并利用 u 的边界值为零：

$$
\int_\Omega|\nabla u|^2\,dV=\int_\Omega(-u\,\Delta u)\,dV=\lambda\int_\Omega u^2\,dV \qquad (56)
$$

若 λ = 0，则 ∇u = 0，u 为常数；边界值为零迫使 u ≡ 0，而零不是特征函数。故 λ > 0。若 u、v 分别对应 λ、μ，则

$$
\lambda\int_\Omega uv\,dV=\int_\Omega\nabla u\cdot\nabla v\,dV=\mu\int_\Omega uv\,dV \qquad (57)
$$

移项得式 (55)；λ ≠ μ 时积分必为零。证毕。

在矩形 Ω = (0, a) × (0, b) 上，直接验证

$$
u_{mn}(x,y)=\sin\frac{m\pi x}{a}\sin\frac{n\pi y}{b} \qquad (58)
$$

满足边界条件，并且

$$
-\Delta u_{mn}=\left[\left(\frac{m\pi}{a}\right)^2+\left(\frac{n\pi}{b}\right)^2\right]u_{mn} \qquad (59)
$$

所以特征值为

$$
\lambda_{mn}=\left(\frac{m\pi}{a}\right)^2+\left(\frac{n\pi}{b}\right)^2,\qquad m,n=1,2,3,\dots \qquad (60)
$$

在圆盘 r < R 上，极坐标分离变量给出

$$
u_{n,l}(r,\theta)=J_n\left(\frac{j_{n,l}}{R}r\right)\left(A\cos n\theta+B\sin n\theta\right),\qquad
\lambda_{n,l}=\left(\frac{j_{n,l}}{R}\right)^2 \qquad (61)
$$

其中 j_{n,l} 是 n 阶贝塞尔函数 J_n 的第 l 个正零点。这一结论的推导放在极坐标与柱坐标两讲，本讲只把它作为分离变量的一般图景。

## 典型例题

### 例题 1：逐项计算一个多项式

求 f = x²y + y²z + z²x 的拉普拉斯。

解：分别对三个变量求二阶偏导：

$$
\frac{\partial^2 f}{\partial x^2}=2y,\qquad
\frac{\partial^2 f}{\partial y^2}=2z,\qquad
\frac{\partial^2 f}{\partial z^2}=2x \qquad (62)
$$

混合项不会进入 Δ，因为每一项只在一个变量上出现两次。相加得

$$
\Delta f=2(x+y+z) \qquad (63)
$$

在点 (1, 2, 3) 处，Δf = 2(1 + 2 + 3) = 12。

### 例题 2：指数与三角函数的组合

判断 u = e^x sin y 是否调和。

解：在二维中逐项求导：

$$
\frac{\partial^2 u}{\partial x^2}=e^x\sin y,\qquad
\frac{\partial^2 u}{\partial y^2}=-e^x\sin y \qquad (64)
$$

相加得零，所以 u 在平面上处处调和。若把它看成三维函数、不依赖 z，则 ∂_z²u = 0，仍然调和。这个例子说明调和函数不必是多项式，也不必具有旋转对称性。

### 例题 3：1/r 的显式计算

验证 f = 1/r 在 r ≠ 0 处调和。

解：由式 (9)，

$$
\frac{\partial^2 f}{\partial x^2}=-\frac{1}{r^3}+\frac{3x^2}{r^5} \qquad (65)
$$

对 y、z 写出同样的式子，三项相加：

$$
\Delta f=-\frac{3}{r^3}+\frac{3(x^2+y^2+z^2)}{r^5}=-\frac{3}{r^3}+\frac{3r^2}{r^5}=0 \qquad (66)
$$

所以 f 在去掉原点的区域内调和。注意这是一个「局部」结论：原点处 f 无界，不能直接代入。

### 例题 4：偶极型调和函数

验证 u = x/r³ 在 r ≠ 0 处调和。

解：先算三个二阶偏导。对 x 求导两次：

$$
\frac{\partial u}{\partial x}=\frac{1}{r^3}-\frac{3x^2}{r^5},\qquad
\frac{\partial^2 u}{\partial x^2}=-\frac{9x}{r^5}+\frac{15x^3}{r^7} \qquad (67)
$$

对 y、z：

$$
\frac{\partial^2 u}{\partial y^2}=-\frac{3x}{r^5}+\frac{15xy^2}{r^7},\qquad
\frac{\partial^2 u}{\partial z^2}=-\frac{3x}{r^5}+\frac{15xz^2}{r^7} \qquad (68)
$$

三项相加：

$$
\Delta u=\left(-9-3-3\right)\frac{x}{r^5}+15x\frac{x^2+y^2+z^2}{r^7}
=-\frac{15x}{r^5}+\frac{15x}{r^5}=0 \qquad (69)
$$

所以 u 在原点以外调和。它是 1/r 沿 x 方向的方向导数（差一个符号），这类函数构成偶极子势。

### 例题 5：用具体函数验证乘积法则

取 f = x² + y²、g = x² − y²，验证 Δ(fg) = fΔg + gΔf + 2∇f·∇g。

解：先算各量：

$$
\Delta f=2+2=4,\qquad \Delta g=2-2=0 \qquad (70)
$$

$$
\nabla f=(2x,\ 2y),\qquad \nabla g=(2x,\ -2y),\qquad \nabla f\cdot\nabla g=4x^2-4y^2 \qquad (71)
$$

右边为

$$
f\Delta g+g\Delta f+2\nabla f\cdot\nabla g=0+4(x^2-y^2)+8(x^2-y^2)=12(x^2-y^2) \qquad (72)
$$

左边直接计算：

$$
fg=(x^2+y^2)(x^2-y^2)=x^4-y^4,\qquad \Delta(fg)=12x^2-12y^2 \qquad (73)
$$

两边相等，验证成立。

### 例题 6：用均值展开核对数值

取 f = x² + y² + z²，球心在原点、半径 R = 2。求球面平均，并用式 (21) 核对。

解：在球面 |s| = R 上，每个坐标平方的平均值是 R²/3，所以

$$
\langle f\rangle=\langle x^2\rangle+\langle y^2\rangle+\langle z^2\rangle=3\cdot\frac{R^2}{3}=R^2=4 \qquad (74)
$$

另一方面 f(0) = 0，Δf = 6，式 (21) 给出

$$
f(0)+\frac{R^2}{6}\Delta f=0+\frac{4}{6}\cdot6=4 \qquad (75)
$$

与直接计算一致。这个例子也说明：二次函数的均值展开没有 O(r⁴) 误差，因为四阶导数全为零。

## 习题

### 基础题

1. 求 f = x³ + y³ + z³ 的拉普拉斯。
2. 判断 u = sin x sin y sinh(√2 z) 是否调和，并写出验证过程。
3. 判断 u = x² − y² 是否调和；若调和，写出它的等值线形状。
4. 证明 u = ln(x² + y²) 在去掉原点的平面上调和。
5. 设 u、v 都调和，证明 Δ(uv) = 2∇u·∇v，并进一步证明 Δ(u²) = 2|∇u|²。

### 进阶题

6. 推导 Δ(1/f) 的公式，并用它计算 f = r² 时的 Δ(1/r²)。
7. 证明三维中径向调和函数只能是 a/r + b，二维中只能是 a ln r + b。
8. 设 u 在 Ω 内调和且在边界上满足 ∂_n u = 0。证明 u 在 Ω 内为常数。
9. 用通量计算证明 Δln r = 2πδ，并说明为什么系数是 2π 而不是 4π。
10. 在矩形 (0, a) × (0, b) 上验证 u = sin(mπx/a)sin(nπy/b) 的特征值公式，并写出两个不同特征函数的正交性证明。

## 习题答案与详细解析

### 基础题解答

1. 逐项求二阶偏导：∂_x²(x³) = 6x，∂_y²(y³) = 6y，∂_z²(z³) = 6z，所以 Δf = 6(x + y + z)。在原点为零，但 Δf 并不恒为零，因此 f 不调和。

2. 记 u = sin x sin y sinh(√2 z)。则 ∂_x²u = −u，∂_y²u = −u，而 ∂_z²u = 2u，因为 sinh(√2 z) 的二阶导是 2 sinh(√2 z)。三项相加为 (−1 − 1 + 2)u = 0，所以 u 调和。这个函数是分离变量在直角坐标中的典型解。

3. ∂_x²(x²) = 2，∂_y²(−y²) = −2，故 Δu = 0，u 调和。等值线 x² − y² = c 是以两条对角线为渐近线的双曲线；c = 0 时退化为两条直线 y = ±x。

4. 令 s = x² + y²，则 u = ln s。求导：

$$
u_x=\frac{2x}{s},\qquad u_{xx}=\frac{2}{s}-\frac{4x^2}{s^2} \qquad (76)
$$

对 y 同理，u_yy = 2/s − 4y²/s²。相加：

$$
\Delta u=\frac{4}{s}-\frac{4(x^2+y^2)}{s^2}=\frac{4}{s}-\frac{4}{s}=0 \qquad (77)
$$

在 s > 0（即原点以外）成立。

5. 由乘积法则式 (13)，并代入 Δu = Δv = 0：

$$
\Delta(uv)=u\Delta v+v\Delta u+2\nabla u\cdot\nabla v=2\nabla u\cdot\nabla v \qquad (78)
$$

再取 v = u，得 Δ(u²) = 2uΔu + 2|∇u|² = 2|∇u|²。注意这里两个结论都用了「u、v 调和」这一前提，不能对任意函数使用。

### 进阶题解答

6. 公式为式 (18)：Δ(1/f) = −Δf/f² + 2|∇f|²/f³。取 f = r²，则 Δf = 6，∇f = 2(x, y, z)，|∇f|² = 4r²。代入：

$$
\Delta\left(\frac{1}{r^2}\right)=-\frac{6}{r^4}+\frac{2\cdot4r^2}{r^6}=-\frac{6}{r^4}+\frac{8}{r^4}=\frac{2}{r^4} \qquad (79)
$$

也可以用径向公式核对：f = r^{−2}，f' = −2r^{−3}，f'' = 6r^{−4}，Δf = f'' + 2f'/r = 6r^{−4} − 4r^{−4} = 2r^{−4}，一致。

7. 三维径向函数满足 Δf = f'' + 2f'/r = 0。乘以 r² 得 (r²f')' = 0，所以 r²f' = C，f' = C/r²，积分得 f = −C/r + D。把常数重新命名，即 f = a/r + b。二维时 Δf = f'' + f'/r = 0，乘以 r 得 (rf')' = 0，故 rf' = C，f' = C/r，积分得 f = C ln r + D，即 a ln r + b。这里用到 r > 0，原点被排除。

8. 在格林第一恒等式式 (36) 中取 v = u：

$$
\int_\Omega u\Delta u\,dV+\int_\Omega|\nabla u|^2\,dV=\oint_{\partial\Omega}u\,\partial_n u\,dS \qquad (80)
$$

第一项为零，右端因 ∂_n u = 0 而为零，所以 ∫|∇u|² = 0。于是 ∇u = 0，u 在连通区域上为常数。注意诺伊曼问题只能确定到常数，不能像狄利克雷问题那样唯一确定。

9. 取半径 ε 的圆盘 B_ε。由散度定理，

$$
\int_{B_\varepsilon}\Delta\ln r\,dA=\oint_{\partial B_\varepsilon}\partial_r\ln r\,ds
=\frac{1}{\varepsilon}\cdot2\pi\varepsilon=2\pi \qquad (81)
$$

而 Δln r 在原点以外为零，所以它只能是 2πδ。系数是 2π 而不是 4π，因为二维单位圆的周长是 2πr，而三维单位球面的面积是 4πr²；通量计算中的面积因子不同。

10. 直接求导：

$$
\frac{\partial^2}{\partial x^2}\sin\frac{m\pi x}{a}\sin\frac{n\pi y}{b}=-\left(\frac{m\pi}{a}\right)^2u \qquad (82)
$$

$$
\frac{\partial^2}{\partial y^2}u=-\left(\frac{n\pi}{b}\right)^2u \qquad (83)
$$

故 −Δu = [(mπ/a)² + (nπ/b)²]u，特征值为式 (60)。正交性用积化和差：

$$
\int_0^a\sin\frac{m\pi x}{a}\sin\frac{m'\pi x}{a}\,dx=\frac{a}{2}\delta_{mm'} \qquad (84)
$$

对 y 方向同理，乘积为 (ab/4)δ_mm'δ_nn'，所以不同指标的特征函数正交。

## 常见错误与边界情形

- 把 Δ 写成「梯度的模长」。Δf 是标量，|∇f| 才是模长；前者是二阶算子，后者是一阶量的平方。
- 在直角坐标中漏掉某一项，或误以为会出现混合偏导。只有坐标基向量随位置转动时才会出现额外项。
- 乘积法则漏掉系数 2。Δ(fg) 中的交叉项是 2∇f·∇g，不是 ∇f·∇g。
- 把球面平均展开的系数统一写成 1/6。三维球面是 1/6，二维圆周是 1/4，一维两端是 1/2。
- 认为 Δf 在某点为零就等于 f 调和。调和要求在区域上处处成立，单点条件不够。
- 在原点直接计算 Δ(1/r)。1/r 在原点无界，必须用分布或挖洞极限处理；原点外的值是零，原点处的分布强度是 −4πδ。
- 把基本解的符号记反。Δ(−1/(4πr)) = δ，而 Δ(1/(4πr)) = −δ。
- 认为极值原理对无界区域也直接成立。区域必须有界；无界时需要额外的增长条件。
- 认为「边界上没有极值」是极值原理的全部。它同时排除了内部极大与内部极小；对 −f 使用才能得到最小值结论。
- 认为调和函数的乘积仍调和。由式 (17)，Δ(f²) = 2|∇f|²，通常不为零。
- 把球坐标中的 θ 与极坐标中的 θ 混为一谈。球坐标 θ 是与 z 轴的夹角，极坐标 θ 是平面内与 x 轴的夹角。
- 在柱坐标中把 φ 的尺度因子写成 1。h_φ = ρ，角向导数前面的系数因此是 1/ρ。

## 与动画步骤的对应

| 动画步骤 | 画面重点 | 对应讲义内容 |
| --- | --- | --- |
| 二阶导数 | 三个采样点、弦与曲率圆 | 式 (2) 至 (4)，中心差分的 O(h²) |
| 散度与梯度 | 箭头汇入与流出 | 式 (5) 至 (7)，Δ = ∇·∇f |
| 直角坐标 | 三项二阶偏导逐项相加 | 式 (7) 至 (10)，f = x²+y²+z² 与 1/r |
| 物理意义 | 球面平均与中心值的差 | 式 (21) 至 (25)，三维系数 1/6 |
| 调和函数 | 无内部极值、等于邻域平均 | 式 (26) 至 (30)，结论 4 与 5 |
| 实验 | A、k 滑块与探针 | 式 (2)、(4) 与 f = A sin(kx) 的二阶导 |

动画实验取 f(x) = A sin(kx)，则

$$
\Delta f=-Ak^2\sin(kx) \qquad (85)
$$

当 A = 1.4、k = 1.4 时，Ak² = 1.4 × 1.96 = 2.744，所以 Δf 的峰值约为 2.744。波长 λ = 2π/k = 2π/1.4 ≈ 4.49。画面底部的「球平均偏差」用 r = 0.6 估算，r²/6 = 0.36/6 = 0.06，再乘以 Δf 的峰值，得到约 0.165 的量级，与 HUD 的读数逻辑一致。

## 小结

- 一维的 Δ 是 f''；高维的 Δ 是梯度的散度。两者都在测量「比邻居高还是低」。
- 直角坐标展开为三个纯二阶偏导之和，没有混合项，也没有一阶项。
- 乘积法则 Δ(fg) = fΔg + gΔf + 2∇f·∇g 是后续所有恒等式的基础。
- 调和函数满足均值定理与极值原理；狄利克雷问题由边界值唯一确定。
- 旋转不变性说明 Δ 只依赖度量；球坐标与柱坐标的额外项全部来自尺度因子。
- 三维基本解是 −1/(4πr)，二维基本解是 (1/2π)ln r；符号与维度都必须记准。
- 分离变量把 Δ 的特征值问题拆成若干常微分方程；矩形给出正弦模态，圆盘给出贝塞尔模态。
- 判断调和性只有一条可靠路径：写出坐标、逐项求导、相加验零；不要凭函数外形猜。
