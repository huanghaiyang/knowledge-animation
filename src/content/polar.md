## 本讲目标与符号约定

本讲只做一件事：把直角坐标中的 Δ = ∂²/∂x² + ∂²/∂y² 完整翻译成极坐标。翻译过程不能靠背结论，必须把链式法则、乘积法则与尺度因子三件事走完。学完后应当能够：

- 由 x = r cos θ、y = r sin θ 独立求出四个一阶偏导与面积元。
- 完整写出 ∂/∂x、∂/∂y 的极坐标形式。
- 用乘积法则逐项展开 ∂²/∂x² 与 ∂²/∂y²，并说明交叉项为何成对抵消。
- 解释一阶项 (1/r)∂/∂r 与角向系数 1/r² 的来源。
- 用极坐标公式判断 ln r、r^n cos nθ 等函数是否调和。
- 完成圆盘狄利克雷问题的傅里叶级数解，并写出泊松核。

符号约定：平面点记作 (x, y)，极坐标记作 (r, θ)，其中 r > 0，θ 是以 x 轴正方向为基准的极角。极坐标基向量记作 e_r、e_θ，它们随位置转动。区域 Ω 的边界记作 ∂Ω。所有函数默认在讨论区域内具有足够阶连续偏导。为避免与球坐标混淆，本讲的 θ 始终是平面极角。

$$
x=r\cos\theta,\qquad y=r\sin\theta \qquad (1)
$$

$$
r=\sqrt{x^2+y^2},\qquad \theta=\arctan\frac{y}{x}\ \text{（按象限修正）} \qquad (2)
$$

## 问题设定：极坐标与坐标变换

### 正变换与反变换

正变换把「多远、什么方向」翻译成「横多少、纵多少」：x = r cos θ，y = r sin θ。反变换把直角坐标还原成极坐标：r 是到原点的距离，θ 由 arctan(y/x) 给出，但必须按象限修正，否则只能得到 (−π/2, π/2) 内的角。

反变换在原点处不光滑：r 在原点不可微，θ 在原点没有定义。因此所有含 1/r 的公式都默认 r > 0。若区域包含原点，需要把原点挖掉后再讨论，或利用有界性条件单独处理。

### 四个一阶偏导：隐函数微分

要从 (x, y) 求 (r, θ)，最稳妥的办法是对正变换求隐函数微分。对 x 求偏导、固定 y，得

$$
1=r_x\cos\theta-r\,\theta_x\sin\theta,\qquad
0=r_x\sin\theta+r\,\theta_x\cos\theta \qquad (3)
$$

第一式乘 cos θ、第二式乘 sin θ 后相加，利用 cos²θ + sin²θ = 1，得 r_x = cos θ。代回第一式：

$$
1=\cos^2\theta-r\,\theta_x\sin\theta \quad\Rightarrow\quad r\,\theta_x\sin\theta=\cos^2\theta-1=-\sin^2\theta \qquad (4)
$$

当 sin θ ≠ 0 时，θ_x = −sin θ/r。当 sin θ = 0 时，由第二式直接得 r θ_x cos θ = 0，而 cos θ = ±1，仍得 θ_x = 0，与 −sin θ/r 一致。所以公式在 r > 0 上处处成立。

对 y 同理。固定 x，对 y 求偏导：

$$
0=r_y\cos\theta-r\,\theta_y\sin\theta,\qquad
1=r_y\sin\theta+r\,\theta_y\cos\theta \qquad (5)
$$

第一式乘 cos θ、第二式乘 sin θ后相加，得 r_y = sin θ。再代回第一式：

$$
0=\sin\theta\cos\theta-r\,\theta_y\sin\theta \quad\Rightarrow\quad \theta_y=\frac{\cos\theta}{r} \qquad (6)
$$

当 sin θ = 0 时，第二式给出 r θ_y cos θ = 1，即 θ_y = 1/(r cos θ) = cos θ/r，因为 cos θ = ±1。于是四个偏导为

$$
\frac{\partial r}{\partial x}=\cos\theta,\qquad
\frac{\partial r}{\partial y}=\sin\theta,\qquad
\frac{\partial\theta}{\partial x}=-\frac{\sin\theta}{r},\qquad
\frac{\partial\theta}{\partial y}=\frac{\cos\theta}{r} \qquad (7)
$$

这四个量是后面所有链式法则的砖块。它们的量纲也值得检查：r 对 x 的导无量纲，θ 对 x 的导是 1/长度。

### 面积元：雅可比行列式

正变换的雅可比行列式为

$$
\frac{\partial(x,y)}{\partial(r,\theta)}
=\cos\theta\cdot r\cos\theta-(-r\sin\theta)\cdot\sin\theta
=r\left(\cos^2\theta+\sin^2\theta\right)=r \qquad (8)
$$

因此

$$
dx\,dy=r\,dr\,d\theta \qquad (9)
$$

这个因子 r 不是可有可无的装饰：它同时出现在面积元、散度公式与拉普拉斯算子的角向项中。后文会看到，所有「多出来的 1/r」都来自同一个度量事实：同样 1 弧度的角变化，在半径 r 处对应的弧长是 r。

![图 1　极坐标的面积元：dA = r dr dθ，角向位移的实际长度是 r dθ](/notes/polar.svg)

## 逐步推导

### 一阶导：两条路径相加

设 f 是平面上的光滑函数，写成 f(r, θ)。当 x 变化时，r 与 θ 都随之变化，因此 f 的变化是两条路径的贡献之和。二维链式法则给出

$$
\frac{\partial f}{\partial x}=\frac{\partial f}{\partial r}\frac{\partial r}{\partial x}+\frac{\partial f}{\partial\theta}\frac{\partial\theta}{\partial x} \qquad (10)
$$

把式 (7) 代入：

$$
\frac{\partial f}{\partial x}=\cos\theta\,\frac{\partial f}{\partial r}-\frac{\sin\theta}{r}\frac{\partial f}{\partial\theta} \qquad (11)
$$

同理，对 y：

$$
\frac{\partial f}{\partial y}=\sin\theta\,\frac{\partial f}{\partial r}+\frac{\cos\theta}{r}\frac{\partial f}{\partial\theta} \qquad (12)
$$

去掉测试函数 f，得到算子恒等式

$$
\frac{\partial}{\partial x}=\cos\theta\,\frac{\partial}{\partial r}-\frac{\sin\theta}{r}\frac{\partial}{\partial\theta},\qquad
\frac{\partial}{\partial y}=\sin\theta\,\frac{\partial}{\partial r}+\frac{\cos\theta}{r}\frac{\partial}{\partial\theta} \qquad (13)
$$

这两条式子的右端不再含 x、y，只剩 r、θ，说明算子已经被成功改写。角向导数前面的 1/r 是关键：越靠近原点，同样的角度变化对应的弧长越短，函数对角度的敏感度被放大。

反过来也可以把 ∂_r、∂_θ 用 ∂_x、∂_y 表示。由 x_r = cos θ、y_r = sin θ、x_θ = −r sin θ、y_θ = r cos θ，得

$$
\frac{\partial}{\partial r}=\cos\theta\,\frac{\partial}{\partial x}+\sin\theta\,\frac{\partial}{\partial y},\qquad
\frac{\partial}{\partial\theta}=-r\sin\theta\,\frac{\partial}{\partial x}+r\cos\theta\,\frac{\partial}{\partial y} \qquad (14)
$$

这正是梯度在两个直角方向上的分量组合；下一节会把它改写成 e_r、e_θ 的形式。

### 二阶导 ∂²/∂x²：乘积法则展开

二阶导就是把一阶算子再作用一次。注意式 (13) 中的 cos θ 与 sin θ/r 都依赖 r、θ，所以不能只把 ∂_r 换成 ∂_x，必须对整个乘积用乘积法则。先写出

$$
\frac{\partial^2}{\partial x^2}=\frac{\partial}{\partial x}\left(\cos\theta\,\partial_r-\frac{\sin\theta}{r}\partial_\theta\right) \qquad (15)
$$

按乘积法则展开为四项：

$$
\frac{\partial^2}{\partial x^2}=\left(\frac{\partial}{\partial x}\cos\theta\right)\partial_r+\cos\theta\,\frac{\partial}{\partial x}\partial_r-\left(\frac{\partial}{\partial x}\frac{\sin\theta}{r}\right)\partial_\theta-\frac{\sin\theta}{r}\frac{\partial}{\partial x}\partial_\theta \qquad (16)
$$

四项一个都不能漏：前两项来自第一个系数，后两项来自第二个系数。现在分别求两个系数的导数。利用式 (7)：

$$
\frac{\partial}{\partial x}\cos\theta=-\sin\theta\,\frac{\partial\theta}{\partial x}
=\frac{\sin^2\theta}{r} \qquad (17)
$$

$$
\frac{\partial}{\partial x}\frac{\sin\theta}{r}
=\frac{\cos\theta}{r}\frac{\partial\theta}{\partial x}-\frac{\sin\theta}{r^2}\frac{\partial r}{\partial x}
=-\frac{\sin\theta\cos\theta}{r^2}-\frac{\sin\theta\cos\theta}{r^2}
=-\frac{2\sin\theta\cos\theta}{r^2} \qquad (18)
$$

再展开两个复合算子：

$$
\frac{\partial}{\partial x}\partial_r=\cos\theta\,\partial_r^2-\frac{\sin\theta}{r}\partial_\theta\partial_r \qquad (19)
$$

$$
\frac{\partial}{\partial x}\partial_\theta=\cos\theta\,\partial_r\partial_\theta-\frac{\sin\theta}{r}\partial_\theta^2 \qquad (20)
$$

把式 (17) 至 (20) 代回式 (16)，按 ∂_r²、∂_r、∂_θ²、∂_r∂_θ、∂_θ 五类合并：

$$
\frac{\partial^2}{\partial x^2}=\cos^2\theta\,\partial_r^2+\frac{\sin^2\theta}{r}\partial_r+\frac{\sin^2\theta}{r^2}\partial_\theta^2-\frac{2\sin\theta\cos\theta}{r}\partial_r\partial_\theta+\frac{2\sin\theta\cos\theta}{r^2}\partial_\theta \qquad (21)
$$

逐项核对：∂_r² 只来自 cos θ·(cos θ∂_r²)；∂_r 来自系数导数 sin²θ/r；∂_θ² 来自 −(sin θ/r)·(−sin θ/r)∂_θ²；交叉项有两个 −sin θcos θ/r 的贡献，相加为 −2sin θcos θ/r；∂_θ 项来自 −(−2sin θcos θ/r²)∂_θ，即 +2sin θcos θ/r²。

### 二阶导 ∂²/∂y²：只差交叉项的符号

对 y 方向重复同样的四步。先按乘积法则：

$$
\frac{\partial^2}{\partial y^2}=\left(\frac{\partial}{\partial y}\sin\theta\right)\partial_r+\sin\theta\,\frac{\partial}{\partial y}\partial_r+\left(\frac{\partial}{\partial y}\frac{\cos\theta}{r}\right)\partial_\theta+\frac{\cos\theta}{r}\frac{\partial}{\partial y}\partial_\theta \qquad (22)
$$

两个系数的导数：

$$
\frac{\partial}{\partial y}\sin\theta=\cos\theta\,\frac{\partial\theta}{\partial y}
=\frac{\cos^2\theta}{r} \qquad (23)
$$

$$
\frac{\partial}{\partial y}\frac{\cos\theta}{r}
=-\frac{\sin\theta}{r}\frac{\partial\theta}{\partial y}-\frac{\cos\theta}{r^2}\frac{\partial r}{\partial y}
=-\frac{\sin\theta\cos\theta}{r^2}-\frac{\sin\theta\cos\theta}{r^2}
=-\frac{2\sin\theta\cos\theta}{r^2} \qquad (24)
$$

两个复合算子：

$$
\frac{\partial}{\partial y}\partial_r=\sin\theta\,\partial_r^2+\frac{\cos\theta}{r}\partial_r\partial_\theta \qquad (25)
$$

$$
\frac{\partial}{\partial y}\partial_\theta=\sin\theta\,\partial_\theta\partial_r+\frac{\cos\theta}{r}\partial_\theta^2 \qquad (26)
$$

合并后得到

$$
\frac{\partial^2}{\partial y^2}=\sin^2\theta\,\partial_r^2+\frac{\cos^2\theta}{r}\partial_r+\frac{\cos^2\theta}{r^2}\partial_\theta^2+\frac{2\sin\theta\cos\theta}{r}\partial_r\partial_\theta-\frac{2\sin\theta\cos\theta}{r^2}\partial_\theta \qquad (27)
$$

与式 (21) 相比，∂_r²、∂_r、∂_θ² 的系数只是 cos 与 sin 互换；交叉项与 ∂_θ 项都变号。这不是巧合，而是 x 与 y 方向相差 90° 的代数表现。

### 合并：交叉项成对抵消

把式 (21) 与式 (27) 相加。两个交叉项 −2sin θcos θ/r 与 +2sin θcos θ/r 恰好互为相反数；两个 ∂_θ 项 +2sin θcos θ/r² 与 −2sin θcos θ/r² 也互为相反数。剩下的只有三块：

$$
\frac{\partial^2}{\partial x^2}+\frac{\partial^2}{\partial y^2}
=\left(\cos^2\theta+\sin^2\theta\right)\partial_r^2
+\frac{\sin^2\theta+\cos^2\theta}{r}\partial_r
+\frac{\sin^2\theta+\cos^2\theta}{r^2}\partial_\theta^2 \qquad (28)
$$

利用 cos²θ + sin²θ = 1，立刻得到极坐标下的拉普拉斯算子：

$$
\Delta=\frac{\partial^2}{\partial r^2}+\frac{1}{r}\frac{\partial}{\partial r}+\frac{1}{r^2}\frac{\partial^2}{\partial\theta^2} \qquad (29)
$$

作用在函数上写作

$$
\Delta f=\frac{\partial^2 f}{\partial r^2}+\frac{1}{r}\frac{\partial f}{\partial r}+\frac{1}{r^2}\frac{\partial^2 f}{\partial\theta^2} \qquad (30)
$$

一阶项 (1/r)∂_r 不是凭空加的：它来自两个一阶系数的导数 sin²θ/r 与 cos²θ/r 相加。角向系数 1/r² 则来自两次角向导数都带着 1/r，相乘得到 1/r²。交叉项消失也不是因为「极坐标没有混合偏导」这句口号，而是因为 x、y 两个方向对 ∂_r∂_θ 的贡献恰好相反。

### 尺度因子法：用度量核对同一个结果

正交坐标的通用公式为

$$
\Delta f=\frac{1}{h_r h_\theta}\left[\frac{\partial}{\partial r}\left(\frac{h_\theta}{h_r}\frac{\partial f}{\partial r}\right)+\frac{\partial}{\partial\theta}\left(\frac{h_r}{h_\theta}\frac{\partial f}{\partial\theta}\right)\right] \qquad (31)
$$

极坐标中 h_r = 1、h_θ = r。代入得

$$
\Delta f=\frac{1}{r}\left[\frac{\partial}{\partial r}\left(r\frac{\partial f}{\partial r}\right)+\frac{\partial}{\partial\theta}\left(\frac{1}{r}\frac{\partial f}{\partial\theta}\right)\right] \qquad (32)
$$

展开括号：

$$
\Delta f=\frac{1}{r}\left(\frac{\partial f}{\partial r}+r\frac{\partial^2 f}{\partial r^2}\right)+\frac{1}{r^2}\frac{\partial^2 f}{\partial\theta^2}
=\frac{\partial^2 f}{\partial r^2}+\frac{1}{r}\frac{\partial f}{\partial r}+\frac{1}{r^2}\frac{\partial^2 f}{\partial\theta^2} \qquad (33)
$$

与逐项展开的结果完全一致。两条路得到同一个算子，说明推导自洽；尺度因子法更适合记忆，链式法则法更适合理解每一项的来源。

## 极坐标下的梯度与散度

### 梯度

极坐标的基向量随位置转动：e_r 指向径向，e_θ 指向 θ 增加的方向，二者正交。坐标增加 dr 时实际位移是 dr e_r；增加 dθ 时实际弧长是 r dθ，所以 θ 方向的物理分量要除以 h_θ = r：

$$
\nabla f=\frac{\partial f}{\partial r}e_r+\frac{1}{r}\frac{\partial f}{\partial\theta}e_\theta \qquad (34)
$$

这也解释了式 (14)：把 ∇f 投影到 e_x、e_y 上，就得到 ∂_r f 与 (1/r)∂_θ f 的组合。

### 散度：为什么两项都带 1/r

取一个由 r、r + dr 与 θ、θ + dθ 围成的小扇环。它的面积约为 r dr dθ。先算径向两个弧面上的净流出：在 r + dr 处弧长是 (r + dr)dθ，在 r 处弧长是 r dθ，净流出为

$$
\left[(r+dr)F_r(r+dr,\theta)-rF_r(r,\theta)\right]d\theta
\approx \frac{\partial}{\partial r}\left(rF_r\right)dr\,d\theta \qquad (35)
$$

再算角向两个侧面上的净流出：两侧长度都是 dr，净流出为

$$
\left[F_\theta(r,\theta+d\theta)-F_\theta(r,\theta)\right]dr
\approx \frac{\partial F_\theta}{\partial\theta}dr\,d\theta \qquad (36)
$$

把两项相加，除以面积 r dr dθ，得到

$$
\nabla\cdot F=\frac{1}{r}\frac{\partial}{\partial r}\left(rF_r\right)+\frac{1}{r}\frac{\partial F_\theta}{\partial\theta} \qquad (37)
$$

两项都带 1/r，因为分母的面积本身就是 r dr dθ。这不是「角向导数特殊」，而是极坐标面积元特殊。

### Δ = div grad 的核对

把 F = ∇f 代入式 (37)：

$$
\Delta f=\frac{1}{r}\frac{\partial}{\partial r}\left(r\frac{\partial f}{\partial r}\right)+\frac{1}{r}\frac{\partial}{\partial\theta}\left(\frac{1}{r}\frac{\partial f}{\partial\theta}\right) \qquad (38)
$$

第二项中 1/r 不依赖 θ，可以提到导数外面，得到

$$
\Delta f=\frac{1}{r}\frac{\partial}{\partial r}\left(r\frac{\partial f}{\partial r}\right)+\frac{1}{r^2}\frac{\partial^2 f}{\partial\theta^2} \qquad (39)
$$

展开第一项即式 (30)。这条推导只用了几何通量，没有用到链式法则，因此可以作为式 (29) 的独立核对。

## 核心结论与证明

### 结论 1：雅可比行列式与面积元

极坐标变换的雅可比行列式为 r，且 dx dy = r dr dθ。

证明：行列式按定义计算：

$$
\det\frac{\partial(x,y)}{\partial(r,\theta)}
=\cos\theta\cdot r\cos\theta-\left(-r\sin\theta\right)\cdot\sin\theta
=r\left(\cos^2\theta+\sin^2\theta\right)=r \qquad (40)
$$

在 r > 0 时行列式为正，变换保持定向。由多重积分的变量替换公式，面积元乘以行列式绝对值，即得 dx dy = r dr dθ。证毕。

### 结论 2：一阶导算子

对任意可微 f，

$$
\frac{\partial f}{\partial x}=\cos\theta\,\partial_rf-\frac{\sin\theta}{r}\partial_\theta f,\qquad
\frac{\partial f}{\partial y}=\sin\theta\,\partial_rf+\frac{\cos\theta}{r}\partial_\theta f \qquad (41)
$$

证明：由二维链式法则，∂_x f = f_r r_x + f_θ θ_x。把式 (7) 的 r_x = cos θ、θ_x = −sin θ/r 代入，得第一式；把 r_y = sin θ、θ_y = cos θ/r 代入，得第二式。证毕。

### 结论 3：二阶导与极坐标拉普拉斯

对具有连续二阶偏导的 f，

$$
\frac{\partial^2 f}{\partial x^2}=\cos^2\theta\,f_{rr}+\frac{\sin^2\theta}{r}f_r+\frac{\sin^2\theta}{r^2}f_{\theta\theta}-\frac{2\sin\theta\cos\theta}{r}f_{r\theta}+\frac{2\sin\theta\cos\theta}{r^2}f_\theta \qquad (42)
$$

$$
\frac{\partial^2 f}{\partial y^2}=\sin^2\theta\,f_{rr}+\frac{\cos^2\theta}{r}f_r+\frac{\cos^2\theta}{r^2}f_{\theta\theta}+\frac{2\sin\theta\cos\theta}{r}f_{r\theta}-\frac{2\sin\theta\cos\theta}{r^2}f_\theta \qquad (43)
$$

两式相加，交叉项与 f_θ 项抵消，得到

$$
\Delta f=f_{rr}+\frac{1}{r}f_r+\frac{1}{r^2}f_{\theta\theta} \qquad (44)
$$

证明：式 (42) 的推导已在式 (15) 至 (21) 完成，式 (43) 的推导已在式 (22) 至 (27) 完成。相加时利用 cos²θ + sin²θ = 1，并注意 −2sin θcos θ/r 与 +2sin θcos θ/r 相消、+2sin θcos θ/r² 与 −2sin θcos θ/r² 相消。证毕。

### 结论 4：梯度、散度与 Δ 的一致性

极坐标中

$$
\nabla f=\partial_rf\,e_r+\frac{1}{r}\partial_\theta f\,e_\theta,\qquad
\nabla\cdot F=\frac{1}{r}\partial_r(rF_r)+\frac{1}{r}\partial_\theta F_\theta \qquad (45)
$$

并且 Δf = ∇·(∇f) 给出式 (44)。

证明：梯度的径向分量是沿 e_r 的方向导数 ∂_r f；角向单位弧长对应的方向导数是 (1/r)∂_θ f，故第一式成立。散度的扇环通量推导见式 (35) 至 (37)。把 F = ∇f 代入散度公式，得式 (38)，化简即式 (44)。证毕。

### 结论 5：二维径向调和函数

若 f 只依赖 r，则

$$
\Delta f=f''(r)+\frac{1}{r}f'(r) \qquad (46)
$$

方程 Δf = 0 的通解为

$$
f(r)=a\ln r+b \qquad (47)
$$

证明：在式 (44) 中令 f_θ = 0，得式 (46)。乘以 r：

$$
r f''+f'=(rf')'=0 \qquad (48)
$$

所以 rf' = C，f' = C/r，积分得 f = C ln r + D。把常数重新命名即式 (47)。证毕。

这个结论说明：二维的「基本径向解」是对数而不是幂函数。三维的对应结果是 a/r + b，差别来自径向部分 (r²f')' 与 (rf')' 的不同。

### 结论 6：ln r 与角向模态的调和性

在 r > 0 上，

$$
\Delta(\ln r)=0 \qquad (49)
$$

对任意整数 n ≥ 0，

$$
\Delta\left(r^n\cos n\theta\right)=0,\qquad
\Delta\left(r^n\sin n\theta\right)=0 \qquad (50)
$$

更一般地，纯径向幂满足

$$
\Delta\left(r^n\right)=n^2r^{n-2} \qquad (51)
$$

证明：先算 ln r。f_r = 1/r，f_rr = −1/r²，f_θθ = 0，所以

$$
\Delta(\ln r)=-\frac{1}{r^2}+\frac{1}{r}\cdot\frac{1}{r}+0=0 \qquad (52)
$$

再算 r^n cos nθ。f_rr = n(n−1)r^{n−2}cos nθ，f_r = nr^{n−1}cos nθ，f_θθ = −n²r^n cos nθ。代入式 (44)：

$$
\Delta\left(r^n\cos n\theta\right)=\left[n(n-1)+n-n^2\right]r^{n-2}\cos n\theta=0 \qquad (53)
$$

括号内 n(n−1)+n = n²，与 −n² 抵消。sin nθ 的计算完全相同。最后，纯径向 r^n 没有角向因子，f_θθ = 0，所以

$$
\Delta\left(r^n\right)=n(n-1)r^{n-2}+nr^{n-2}=n^2r^{n-2} \qquad (54)
$$

证毕。

式 (51) 有一个容易误读的地方：n = 0 时 Δ(1) = 0，n = 1 时 Δ(r) = 1/r，并不为零。纯径向的 r 不是调和函数；调和的是 x = r cos θ，它的角向项 −cos θ/r 恰好抵消径向项 +cos θ/r。把「r」与「x」混为一谈，是本节最常见的错误。

### 结论 7：分离变量与角向周期性

设 u = R(r)Θ(θ) 且 Δu = 0。则

$$
\frac{R''}{R}+\frac{1}{r}\frac{R'}{R}+\frac{1}{r^2}\frac{\Theta''}{\Theta}=0 \qquad (55)
$$

乘以 r² 并移项：

$$
\frac{\Theta''}{\Theta}=-\left(r^2\frac{R''}{R}+r\frac{R'}{R}\right) \qquad (56)
$$

左端只依赖 θ，右端只依赖 r，因此两端都等于同一个常数，记作 −λ。于是

$$
\Theta''+\lambda\Theta=0 \qquad (57)
$$

若要求 Θ 在物理区域上单值、光滑且以 2π 为周期，则 λ 只能取

$$
\lambda=n^2,\qquad n=0,1,2,\dots \qquad (58)
$$

证明：分三种情形。若 λ < 0，写 λ = −μ²，μ > 0，则 Θ = Ae^{μθ} + Be^{−μθ}。周期性要求 Θ(θ+2π) = Θ(θ)，即 A(e^{2πμ}−1) = 0 且 B(e^{−2πμ}−1) = 0；括号都不为零，所以 A = B = 0，只有零解。若 λ = 0，Θ = A + Bθ，周期性迫使 B = 0，只剩常数。若 λ > 0，写 λ = ω²，则 Θ = A cos ωθ + B sin ωθ。函数与导数在 θ 与 θ + 2π 处必须相同，这等价于旋转矩阵转过的角度 2πω 是 2π 的整数倍，即 ω = n 为正整数；n = 0 对应常数。因此 λ = n²，n = 0, 1, 2, …。证毕。

### 结论 8：径向欧拉方程

在角向分离出 λ = n² 后，径向部分满足

$$
r^2R''+rR'-n^2R=0 \qquad (59)
$$

当 n ≥ 1 时，通解为

$$
R(r)=ar^n+br^{-n} \qquad (60)
$$

当 n = 0 时，通解为

$$
R(r)=a+b\ln r \qquad (61)
$$

证明：把式 (56) 的常数取为 −n²，两边乘以 R，即得式 (59)。这是欧拉方程，尝试幂函数 R = r^α：

$$
r^2\alpha(\alpha-1)r^{\alpha-2}+r\alpha r^{\alpha-1}-n^2r^\alpha
=\left[\alpha(\alpha-1)+\alpha-n^2\right]r^\alpha
=\left(\alpha^2-n^2\right)r^\alpha=0 \qquad (62)
$$

所以 α = ±n。n ≥ 1 时两个根不同，通解为 ar^n + br^{−n}。n = 0 时方程变为 r²R'' + rR' = 0，即 (rR')' = 0，故 rR' = C，R = C ln r + D。证毕。

### 结论 9：圆盘狄利克雷问题的傅里叶级数解

设圆盘半径为 R，边界数据为 g(θ)，求 Δu = 0 在 r < R 内、u(R, θ) = g(θ) 的解。若 g 在 [0, 2π] 上分段光滑，则

$$
u(r,\theta)=\frac{a_0}{2}+\sum_{n=1}^{\infty}\left(\frac{r}{R}\right)^n\left(a_n\cos n\theta+b_n\sin n\theta\right) \qquad (63)
$$

其中

$$
a_n=\frac{1}{\pi}\int_0^{2\pi}g(\varphi)\cos n\varphi\,d\varphi,\qquad
b_n=\frac{1}{\pi}\int_0^{2\pi}g(\varphi)\sin n\varphi\,d\varphi,\qquad
a_0=\frac{1}{\pi}\int_0^{2\pi}g(\varphi)\,d\varphi \qquad (64)
$$

证明：由结论 8，圆盘内处处有界的解只能保留 r^n 项，舍去 ln r 与 r^{−n}（它们在 r = 0 处无界）。于是

$$
u(r,\theta)=A_0+\sum_{n=1}^{\infty}r^n\left(A_n\cos n\theta+B_n\sin n\theta\right) \qquad (65)
$$

令 r = R，并把边界数据展开为傅里叶级数：

$$
g(\theta)=\frac{a_0}{2}+\sum_{n=1}^{\infty}\left(a_n\cos n\theta+b_n\sin n\theta\right) \qquad (66)
$$

比较系数得 A_0 = a_0/2、A_n = a_n/R^n、B_n = b_n/R^n，即式 (63)。每一项 r^n cos nθ 与 r^n sin nθ 都由结论 6 知调和，常数也调和，所以级数在 r < R 内逐项满足 Δu = 0。在 r = R 处，级数收敛到 g 的傅里叶级数；在分段光滑条件下收敛到 g 本身（不连续点取左右极限的平均）。证毕。

### 结论 10：泊松核与泊松积分公式

对 0 ≤ ρ < 1，定义

$$
P(\rho,\psi)=\frac{1-\rho^2}{1-2\rho\cos\psi+\rho^2} \qquad (67)
$$

则

$$
P(\rho,\psi)=1+2\sum_{n=1}^{\infty}\rho^n\cos n\psi \qquad (68)
$$

并且圆盘解可以写成

$$
u(r,\theta)=\frac{1}{2\pi}\int_0^{2\pi}P\left(\frac{r}{R},\theta-\varphi\right)g(\varphi)\,d\varphi \qquad (69)
$$

证明：先证式 (68)。令 z = ρe^{iψ}，当 ρ < 1 时几何级数收敛：

$$
1+2\sum_{n=1}^{\infty}\rho^n\cos n\psi=1+2\operatorname{Re}\sum_{n=1}^{\infty}z^n
=1+2\operatorname{Re}\frac{z}{1-z} \qquad (70)
$$

把 z/(1−z) 的实部算出来：

$$
2\operatorname{Re}\frac{\rho e^{i\psi}}{1-\rho e^{i\psi}}
=\frac{2\rho\cos\psi-2\rho^2}{1-2\rho\cos\psi+\rho^2} \qquad (71)
$$

于是

$$
1+\frac{2\rho\cos\psi-2\rho^2}{1-2\rho\cos\psi+\rho^2}
=\frac{1-\rho^2}{1-2\rho\cos\psi+\rho^2} \qquad (72)
$$

得式 (68)。再证式 (69)。把式 (68) 中的 ρ 换成 r/R、ψ 换成 θ − φ，并利用 cos n(θ−φ) = cos nθ cos nφ + sin nθ sin nφ：

$$
P\left(\frac{r}{R},\theta-\varphi\right)
=1+2\sum_{n=1}^{\infty}\left(\frac{r}{R}\right)^n\left(\cos n\theta\cos n\varphi+\sin n\theta\sin n\varphi\right) \qquad (73)
$$

两边乘 g(φ)，在 [0, 2π] 上积分并除以 2π。由三角函数的正交性，常数项给出 a_0/2，cos nθ 项给出 (r/R)^n a_n，sin nθ 项给出 (r/R)^n b_n，正好是式 (63)。证毕。

泊松核还有两条重要性质：P ≥ 0；并且当 ρ → 1 时，它集中在 ψ = 0 附近，积分平均收敛到边界值。这正是调和函数由边界值唯一确定、且中心值等于边界平均的解析表达。

### 结论 11：二维均值定理与极值原理

若 Δu = 0 在平面区域 Ω 内成立，则对任意圆周 ∂B_r(x) ⊂ Ω，

$$
u(x)=\frac{1}{2\pi r}\oint_{\partial B_r}u\,ds \qquad (74)
$$

并且 u 在 Ω 内不能取得严格的最大值或最小值；若 Ω 有界连通、u 在闭包上连续，则最大值与最小值都在边界上取得。

证明：二维球面平均的泰勒展开系数是 1/4：

$$
\langle u\rangle_{\partial B_r}=u(x)+\frac{r^2}{4}\Delta u(x)+O(r^4) \qquad (75)
$$

推导与三维相同：二次项的平均张量为 (r²/2)δ_ij，故 (1/2)(r²/2)Δu = r²Δu/4。当 Δu = 0 时，式 (75) 的二次项消失，但仍有 O(r⁴) 余项；精确等式仍要用散度定理证明。记圆周平均为 M(r)：

$$
M'(r)=\frac{1}{2\pi r}\oint_{\partial B_r}\partial_r u\,ds
=\frac{1}{2\pi r}\int_{B_r}\Delta u\,dA=0 \qquad (76)
$$

所以 M(r) 为常数，令 r → 0 得 M(r) = u(x)，即式 (74)。极值原理的证明与三维相同：若内部点取得最大值 M，则它等于任意小圆周上的平均值；由于所有值都不超过 M，该圆周上必须处处等于 M。集合 {u = M} 既开又闭，Ω 连通，故 u 恒等于 M，最大值也在边界取得。证毕。

## 典型例题

### 例题 1：r²cos 2θ 的调和性

验证 u = r²cos 2θ 在 r > 0 上调和。

解：逐项求导：

$$
u_r=2r\cos2\theta,\qquad u_{rr}=2\cos2\theta,\qquad u_\theta=-2r^2\sin2\theta,\qquad u_{\theta\theta}=-4r^2\cos2\theta \qquad (77)
$$

代入式 (44)：

$$
\Delta u=2\cos2\theta+\frac{1}{r}\cdot2r\cos2\theta+\frac{1}{r^2}\left(-4r^2\cos2\theta\right)
=\left(2+2-4\right)\cos2\theta=0 \qquad (78)
$$

所以 u 调和。它是 r^n cos nθ 在 n = 2 时的特例，也是偶极场在二维中的角度依赖部分。

### 例题 2：ln r 的调和性

验证 u = ln r 在 r > 0 上调和，并说明它在原点的行为。

解：u_r = 1/r，u_rr = −1/r²，u_θθ = 0，所以

$$
\Delta(\ln r)=-\frac{1}{r^2}+\frac{1}{r}\cdot\frac{1}{r}=0 \qquad (79)
$$

在原点处 ln r → −∞，函数无界，不能把原点包含进调和区域。若把 ln r 看成分布，则 Δln r = 2πδ；它是二维的基本解，而不是「处处调和」的普通函数。

### 例题 3：r² 与 r cos θ 的对比

计算 Δ(r²) 与 Δ(r cos θ)，并解释为什么前者不调和、后者调和。

解：对 r²，u_r = 2r，u_rr = 2，u_θθ = 0，所以

$$
\Delta(r^2)=2+\frac{1}{r}\cdot2r=4 \qquad (80)
$$

这与直角坐标中 Δ(x² + y²) = 4 一致。对 r cos θ = x，u_r = cos θ，u_rr = 0，u_θθ = −r cos θ，所以

$$
\Delta(r\cos\theta)=0+\frac{\cos\theta}{r}+\frac{1}{r^2}\left(-r\cos\theta\right)=0 \qquad (81)
$$

差别来自角向项：r² 没有角向依赖，径向的 2 + 2 无法抵消；r cos θ 的角向项恰好提供 −cos θ/r，把径向的 +cos θ/r 抵消。这也再次说明「r」本身不调和，而「x = r cos θ」调和。

### 例题 4：圆盘上的狄利克雷问题

在半径 R 的圆盘内解 Δu = 0，边界数据 u(R, θ) = cos²θ。

解：先把边界数据写成傅里叶级数。利用 cos²θ = (1 + cos 2θ)/2：

$$
g(\theta)=\frac{1}{2}+\frac{1}{2}\cos2\theta \qquad (82)
$$

所以 a_0 = 1，a_2 = 1/2，其余系数为零。由式 (63)，

$$
u(r,\theta)=\frac{1}{2}+\frac{1}{2}\left(\frac{r}{R}\right)^2\cos2\theta \qquad (83)
$$

核对边界：r = R 时 u = 1/2 + (1/2)cos 2θ = cos²θ。核对调和性：常数项与 r²cos 2θ 都调和，所以解满足 Δu = 0。中心值 u(0, 0) = 1/2，正好是 g 的平均值 (1/2π)∫cos²θ dθ = 1/2。

### 例题 5：圆环上的狄利克雷问题

在圆环 1 < r < 2 内解 Δu = 0，边界条件 u(1, θ) = 0、u(2, θ) = cos θ。

解：圆环不包含原点，所以 r^{−n} 与 ln r 都可以保留。边界数据只含 n = 1 的角向模式，常量模式在两端都为零，故只考虑

$$
u(r,\theta)=\left(Ar+\frac{B}{r}\right)\cos\theta \qquad (84)
$$

在 r = 1 处：A + B = 0。在 r = 2 处：2A + B/2 = 1。由 B = −A 得

$$
2A-\frac{A}{2}=\frac{3A}{2}=1 \quad\Rightarrow\quad A=\frac{2}{3},\qquad B=-\frac{2}{3} \qquad (85)
$$

所以

$$
u(r,\theta)=\frac{2}{3}\left(r-\frac{1}{r}\right)\cos\theta \qquad (86)
$$

核对：r = 1 时为零；r = 2 时 (2/3)(2 − 1/2)cos θ = (2/3)(3/2)cos θ = cos θ。r cos θ 与 r^{−1}cos θ 都是调和函数，所以解满足 Δu = 0。

### 例题 6：θ 的调和性与多值性

说明 u = θ 在挖去原点的平面上满足 Δu = 0，但它不是整个挖洞平面上的单值调和函数。

解：在 r > 0、θ 不跨越分支割线的区域上，u_r = u_rr = 0，u_θθ = 0，所以

$$
\Delta\theta=0 \qquad (87)
$$

然而 θ 不是单值函数：绕原点一周后 θ 增加 2π，函数值不回到原值。若把定义域限制在 cut plane（例如去掉正 x 轴），θ 可以单值化，并且仍是调和的。这个例子提醒我们：Δu = 0 是局部条件，函数的单值性与定义域拓扑是另外的问题。

## 习题

### 基础题

1. 在点 (x, y) = (1, 1) 处，求 r、θ 以及四个一阶偏导 ∂r/∂x、∂r/∂y、∂θ/∂x、∂θ/∂y。
2. 用直角坐标与极坐标两种方法计算 Δ(x² + 2y²)，并核对结果。
3. 证明 u = r cos θ 在 r > 0 上调和。
4. 证明 u = r^{−1}cos θ 在 r > 0 上调和。
5. 计算 Δ(r²sin²θ)，并说明它对应的直角坐标函数是什么。

### 进阶题

6. 完整推导 ∂²/∂y² 的极坐标表达式，并逐项说明两个系数导数与两个复合算子的来源。
7. 在半径 R 的圆盘内解 Δu = 0，边界数据 u(R, θ) = sin²θ。
8. 在圆环 1 < r < 2 内解 Δu = 0，边界条件 u(1, θ) = 1、u(2, θ) = cos 2θ。
9. 证明角向方程 Θ'' + λΘ = 0 的 2π 周期解只对应 λ = n²，n = 0, 1, 2, …。
10. 用圆周平均证明二维极值原理：若 Δu = 0 在连通区域 Ω 内成立，则内部不能取得严格最大值。

## 习题答案与详细解析

### 基础题解答

1. r = √(1² + 1²) = √2，θ = π/4。由式 (7)：∂r/∂x = cos θ = √2/2，∂r/∂y = sin θ = √2/2，∂θ/∂x = −sin θ/r = −(√2/2)/√2 = −1/2，∂θ/∂y = cos θ/r = 1/2。

2. 直角坐标：Δ(x²) = 2，Δ(2y²) = 4，所以 Δ = 6。极坐标中 x² + 2y² = r²(cos²θ + 2sin²θ) = r²(1 + sin²θ)。Δ(r²) = 4，Δ(r²sin²θ) = Δ(y²) = 2，所以总和也是 6。逐项代入式 (44) 也能得到同样结果：

$$
\Delta\left[r^2\left(1+\sin^2\theta\right)\right]
=2\left(1+\sin^2\theta\right)+2\left(1+\sin^2\theta\right)+2\cos2\theta=6 \qquad (88)
$$

最后一步用了 4 + 4sin²θ + 2(cos²θ − sin²θ) = 6。

3. u = r cos θ。u_r = cos θ，u_rr = 0，u_θθ = −r cos θ。代入式 (44)：Δu = 0 + cos θ/r − cos θ/r = 0。

4. u = r^{−1}cos θ。u_r = −r^{−2}cos θ，u_rr = 2r^{−3}cos θ，u_θθ = −r^{−1}cos θ。于是

$$
\Delta u=2r^{-3}\cos\theta-r^{-3}\cos\theta-r^{-3}\cos\theta=0 \qquad (89)
$$

在 r > 0 上成立。这个函数在原点发散，不能延伸到原点。

5. r²sin²θ = y²，而 Δ(y²) = 2，所以 Δ(r²sin²θ) = 2。极坐标核对：u_rr = 2sin²θ，f_r/r = 2sin²θ，f_θθ/r² = (2r²cos2θ)/r² = 2cos2θ，三者相加为 4sin²θ + 2cos2θ = 2。结果与直角坐标一致。

### 进阶题解答

6. 由式 (13)，∂_y = sin θ ∂_r + (cos θ/r)∂_θ。再作用一次：

$$
\frac{\partial^2}{\partial y^2}=\left(\partial_y\sin\theta\right)\partial_r+\sin\theta\,\partial_y\partial_r+\left(\partial_y\frac{\cos\theta}{r}\right)\partial_\theta+\frac{\cos\theta}{r}\partial_y\partial_\theta \qquad (90)
$$

系数导数：∂_y sin θ = cos θ·θ_y = cos²θ/r；∂_y(cos θ/r) = −sin θ·θ_y/r − cos θ·r_y/r² = −sin θcos θ/r² − sin θcos θ/r² = −2sin θcos θ/r²。复合算子：∂_y∂_r = sin θ∂_r² + (cos θ/r)∂_r∂_θ；∂_y∂_θ = sin θ∂_θ∂_r + (cos θ/r)∂_θ²。合并得式 (27)。其中 ∂_r 项的系数是 cos²θ/r，∂_θ 项的系数是 −2sin θcos θ/r²，交叉项系数是 +2sin θcos θ/r。

7. sin²θ = (1 − cos 2θ)/2，所以 a_0 = 1，a_2 = −1/2，其余为零。由式 (63)：

$$
u(r,\theta)=\frac{1}{2}-\frac{1}{2}\left(\frac{r}{R}\right)^2\cos2\theta \qquad (91)
$$

在 r = R 处给出 1/2 − (1/2)cos 2θ = sin²θ。中心值为 1/2，等于边界平均值。

8. 常量模式：u_0 = A + B ln r。边界 u(1) = A = 1，u(2) = A + B ln 2 = 1，所以 B = 0。n = 2 模式：u_2 = (Ar² + Br^{−2})cos 2θ。在 r = 1 处 A + B = 0；在 r = 2 处 4A + B/4 = 1。由 B = −A 得 4A − A/4 = 15A/4 = 1，所以 A = 4/15，B = −4/15。因此

$$
u(r,\theta)=1+\frac{4}{15}\left(r^2-\frac{1}{r^2}\right)\cos2\theta \qquad (92)
$$

核对 r = 2：1 + (4/15)(4 − 1/4)cos 2θ = 1 + (4/15)(15/4)cos 2θ = 1 + cos 2θ。

9. 见结论 7 的证明。要点是分 λ < 0、λ = 0、λ > 0 三种情形：负值时指数函数不可能以 2π 为周期；零值时线性函数只有常数周期；正值时 Θ = A cos ωθ + B sin ωθ，2π 周期性等价于 ω 为整数，故 λ = ω² = n²。

10. 设 u 在内部点 x_0 取得严格最大值 M。取足够小的 r，使圆周 ∂B_r(x_0) 完全落在 Ω 内。由式 (74)，u(x_0) 等于该圆周上的平均值。但圆周上每一点都不超过 M，平均值却等于 M，所以圆周上处处等于 M。于是集合 {u = M} 是开集；又由连续性它是闭集；Ω 连通，故 u 在 Ω 内恒等于 M。这与「严格最大值只在内部」矛盾，所以内部不能取得严格最大值。

## 常见错误与边界情形

- 漏掉角向导数的 1/r。∂_θ 本身不是弧长导数，(1/r)∂_θ 才是；少一个 r 会使量纲错误。
- 把 ∂²/∂x² 直接写成 cos²θ ∂_r²。系数 cos θ 与 sin θ/r 也依赖 r、θ，必须用乘积法则；漏掉系数导数就丢了 (1/r)∂_r 项。
- 把交叉项当成零。∂²_x 与 ∂²_y 各自都有交叉项，只有相加时才抵消；单独看 ∂²_x 绝不能删掉。
- 认为极坐标没有混合偏导。极坐标的 Δ 确实没有 ∂_r∂_θ 项，但这是两项相消的结果，不是定义。
- 把 λ 写成任意正数。角向必须 2π 周期，λ 只能取 n²；非整数次幂在绕原点一周后不闭合。
- 忘记 n = 0 的常数模式。n = 0 时 Θ 为常数，径向为 a + b ln r；圆盘内 b = 0。
- 在圆盘内保留 r^{−n} 或 ln r。它们在原点无界；只有在圆环或挖洞区域才允许。
- 把 r 当作调和函数。Δr = 1/r，不为零；调和的是 x = r cos θ 与 y = r sin θ。
- 反变换的 θ 不按象限修正。只用 arctan(y/x) 会把第三、四象限的点映射到错误角度。
- 把二维均值展开的系数写成 1/6。二维圆周是 1/4，三维球面才是 1/6。
- 边界数据不周期。圆盘狄利克雷问题要求 g(θ + 2π) = g(θ)；否则解在边界上不闭合。
- 把泊松核用在 ρ ≥ 1。级数 1 + 2Σρ^n cos nψ 只在 ρ < 1 收敛；ρ = 1 时是分布意义下的极限。

## 与动画步骤的对应

| 动画步骤 | 画面重点 | 对应讲义内容 |
| --- | --- | --- |
| 坐标 | 极坐标网格、x 与 y 的分解 | 式 (1) 至 (9)，四个偏导与面积元 |
| 一阶 | ∂_x、∂_y 的两条路径 | 式 (10) 至 (14)，角向系数 1/r |
| 二阶 | 乘积法则四项与系数求导 | 式 (15) 至 (27) |
| 合成 | 交叉项成对抵消 | 式 (28) 至 (33)，Δ 的极坐标形式 |
| 例子 | ln r 与 r^m cos mθ 的验算 | 式 (49) 至 (54) |
| 实验 | r₀ 与 m 滑块、极坐标网格 | 式 (44) 与 Δ(r^m) = m²r^{m−2} |

动画实验取 f = r^m cos(mθ) 时，Δf = 0；取 f = r^m 时，读数为

$$
\Delta\left(r^m\right)=m^2r^{m-2} \qquad (93)
$$

默认 r₀ = 1.00、m = 2，所以 Δ(r²) = 4.00，与画面读数一致。尺度因子 h_θ = r₀ 也随半径线性变化：r₀ = 1 时 h_θ = 1，r₀ = 2 时 h_θ = 2。课程第 04 步的提示已经把两类函数分开：纯径向的 r^n 只有 n = 0 时调和，n = 1 的 r 并不调和，但 r cos θ 与 r sin θ 调和。

## 小结

- 极坐标把平面点写成 (r, θ)，面积元多出一个因子 r；所有 1/r 项都源于这个度量因子。
- 一阶算子 ∂_x、∂_y 各由径向与角向两条路径相加，角向路径带 1/r。
- 二阶算子必须对整个乘积用乘积法则；系数本身求导产生 (1/r)∂_r，两个方向的交叉项在相加时抵消。
- 极坐标拉普拉斯为 Δ = ∂_r² + (1/r)∂_r + (1/r²)∂_θ²；尺度因子法给出同一结果。
- 径向调和函数为 a ln r + b；角向模态 r^n cos nθ、r^n sin nθ 对任意整数 n 调和。
- 分离变量给出 Θ'' + λΘ = 0；周期性与光滑性把 λ 限制为 n²。
- 圆盘狄利克雷问题由傅里叶级数与泊松积分给出；圆环问题还要保留 r^{−n} 与 ln r。
- 原点与分支割线是极坐标的两个边界情形：前者要求有界性，后者要求单值性。
