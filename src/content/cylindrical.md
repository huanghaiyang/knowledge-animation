## 本讲目标与符号约定

本讲在极坐标的平面上再长出一个 z 方向。柱坐标的拉普拉斯算子不是一条全新的公式，而是「平面极坐标结果 + 轴向二阶导」。要把这句话变成严格的推导，需要走完三步：写清坐标变换与尺度因子，用链式法则验证平面部分，再把 z 方向独立加上去。学完后应当能够：

- 写出柱坐标的正变换、反变换、线元与体积元。
- 由尺度因子 h_ρ = 1、h_φ = ρ、h_z = 1 直接写出 Δ 的柱坐标形式。
- 用链式法则逐项展开 ∂²/∂x² 与 ∂²/∂y²，说明交叉项为何抵消。
- 由分离变量导出 Bessel 方程，并区分标准 Bessel 与修正 Bessel 的符号来源。
- 说明 J_m 与 Y_m 在轴上的行为，以及为什么实心圆柱只保留 J_m。
- 用 Bessel 零点写出离散特征值，并完成半无限圆柱、有限圆柱、圆波导与热传导的模态计算。

符号约定：柱坐标记作 (ρ, φ, z)，其中 ρ 是到 z 轴的距离，φ 是绕 z 轴的方位角。为避免与球坐标的 r 混淆，本讲统一用 ρ；课程动画与部分代码把同一个量标注为 r，二者是同一个径向坐标。直角坐标为 (x, y, z)。尺度因子记作 h_ρ、h_φ、h_z。所有函数默认在所讨论区域内具有足够阶连续偏导。

$$
x=\rho\cos\varphi,\qquad y=\rho\sin\varphi,\qquad z=z \qquad (1)
$$

$$
\rho=\sqrt{x^2+y^2},\qquad \varphi=\arctan\frac{y}{x}\ \text{（按象限修正）},\qquad z=z \qquad (2)
$$

## 问题设定：柱坐标的几何

### 正变换与反变换

正变换在 xy 平面上做极坐标变换，z 方向完全不动：x = ρ cos φ，y = ρ sin φ，z = z。反变换把空间点还原成「到轴的距离、绕轴的角度、高度」：ρ = √(x² + y²)，φ 由 arctan(y/x) 给出并按象限修正，z 不变。ρ = 0 是 z 轴，φ 在轴上没有定义；所有含 1/ρ 的公式都默认 ρ > 0。

### 线元：交叉项自动抵消

对正变换逐项求微分：

$$
dx=\cos\varphi\,d\rho-\rho\sin\varphi\,d\varphi,\qquad
dy=\sin\varphi\,d\rho+\rho\cos\varphi\,d\varphi,\qquad
dz=dz \qquad (3)
$$

把三个微分的平方相加。dx² + dy² 中的 dρ dφ 交叉项来自 2(cos φ)(−ρ sin φ) 与 2(sin φ)(ρ cos φ)，恰好相消；ρ²dφ² 的系数是 sin²φ + cos²φ = 1。于是

$$
ds^2=dx^2+dy^2+dz^2=d\rho^2+\rho^2d\varphi^2+dz^2 \qquad (4)
$$

这正是「平面极坐标线元 + dz²」。从线元直接读出尺度因子：

$$
h_\rho=1,\qquad h_\varphi=\rho,\qquad h_z=1 \qquad (5)
$$

h_φ = ρ 的几何含义是：φ 增加 1 弧度，实际走过的弧长是 ρ。ρ 越大，同样的角度变化对应的弧长越长。

### 体积元

正变换的雅可比行列式为

$$
\frac{\partial(x,y,z)}{\partial(\rho,\varphi,z)}
=\cos\varphi\cdot\rho\cos\varphi-\left(-\rho\sin\varphi\right)\cdot\sin\varphi
=\rho\left(\cos^2\varphi+\sin^2\varphi\right)=\rho \qquad (6)
$$

因此

$$
dV=dx\,dy\,dz=\rho\,d\rho\,d\varphi\,dz \qquad (7)
$$

同一个因子 ρ 同时出现在线元的角向项、散度的分母与体积元中。记住 h_φ = ρ，柱坐标的大部分公式就不需要死背。

![图 1　柱坐标的几何与体积元：dV = ρ dρ dφ dz](/notes/cylindrical.svg)

## 逐步推导

### 一阶导：z 方向完全独立

设 u 是空间中的光滑函数，写成 u(ρ, φ, z)。当 x 变化时，ρ 与 φ 都随之变化，但 z 不变，所以 u 对 x 的变化只有两条路径：

$$
\frac{\partial u}{\partial x}=\frac{\partial u}{\partial\rho}\frac{\partial\rho}{\partial x}+\frac{\partial u}{\partial\varphi}\frac{\partial\varphi}{\partial x} \qquad (8)
$$

ρ、φ 对 x、y 的偏导与极坐标完全相同：

$$
\frac{\partial\rho}{\partial x}=\cos\varphi,\qquad
\frac{\partial\rho}{\partial y}=\sin\varphi,\qquad
\frac{\partial\varphi}{\partial x}=-\frac{\sin\varphi}{\rho},\qquad
\frac{\partial\varphi}{\partial y}=\frac{\cos\varphi}{\rho} \qquad (9)
$$

代入式 (8) 与对应的 y 方向式子，得到算子恒等式

$$
\frac{\partial}{\partial x}=\cos\varphi\,\frac{\partial}{\partial\rho}-\frac{\sin\varphi}{\rho}\frac{\partial}{\partial\varphi},\qquad
\frac{\partial}{\partial y}=\sin\varphi\,\frac{\partial}{\partial\rho}+\frac{\cos\varphi}{\rho}\frac{\partial}{\partial\varphi} \qquad (10)
$$

z 方向没有任何混合：z 同时是直角坐标与柱坐标的第三个变量，

$$
\frac{\partial}{\partial z}=\frac{\partial}{\partial z} \qquad (11)
$$

式 (10) 与极坐标的式 (13) 逐字相同，只是把 r 换成 ρ、θ 换成 φ。柱坐标的难点只集中在 xy 平面，z 方向可以最后单独补上。

### 二阶导 ∂²/∂x²：乘积法则四项

对式 (10) 再作用一次。cos φ 与 sin φ/ρ 都依赖 ρ、φ，所以必须对整个乘积用乘积法则：

$$
\frac{\partial^2}{\partial x^2}=\left(\frac{\partial}{\partial x}\cos\varphi\right)\partial_\rho+\cos\varphi\,\frac{\partial}{\partial x}\partial_\rho-\left(\frac{\partial}{\partial x}\frac{\sin\varphi}{\rho}\right)\partial_\varphi-\frac{\sin\varphi}{\rho}\frac{\partial}{\partial x}\partial_\varphi \qquad (12)
$$

两个系数的导数：

$$
\frac{\partial}{\partial x}\cos\varphi=-\sin\varphi\,\frac{\partial\varphi}{\partial x}
=\frac{\sin^2\varphi}{\rho} \qquad (13)
$$

$$
\frac{\partial}{\partial x}\frac{\sin\varphi}{\rho}
=\frac{\cos\varphi}{\rho}\frac{\partial\varphi}{\partial x}-\frac{\sin\varphi}{\rho^2}\frac{\partial\rho}{\partial x}
=-\frac{2\sin\varphi\cos\varphi}{\rho^2} \qquad (14)
$$

两个复合算子：

$$
\frac{\partial}{\partial x}\partial_\rho=\cos\varphi\,\partial_\rho^2-\frac{\sin\varphi}{\rho}\partial_\varphi\partial_\rho \qquad (15)
$$

$$
\frac{\partial}{\partial x}\partial_\varphi=\cos\varphi\,\partial_\rho\partial_\varphi-\frac{\sin\varphi}{\rho}\partial_\varphi^2 \qquad (16)
$$

代回并合并同类项：

$$
\frac{\partial^2}{\partial x^2}=\cos^2\varphi\,\partial_\rho^2+\frac{\sin^2\varphi}{\rho}\partial_\rho+\frac{\sin^2\varphi}{\rho^2}\partial_\varphi^2-\frac{2\sin\varphi\cos\varphi}{\rho}\partial_\rho\partial_\varphi+\frac{2\sin\varphi\cos\varphi}{\rho^2}\partial_\varphi \qquad (17)
$$

### 二阶导 ∂²/∂y²：只差符号

同样用乘积法则：

$$
\frac{\partial^2}{\partial y^2}=\left(\frac{\partial}{\partial y}\sin\varphi\right)\partial_\rho+\sin\varphi\,\frac{\partial}{\partial y}\partial_\rho+\left(\frac{\partial}{\partial y}\frac{\cos\varphi}{\rho}\right)\partial_\varphi+\frac{\cos\varphi}{\rho}\frac{\partial}{\partial y}\partial_\varphi \qquad (18)
$$

两个系数导数：

$$
\frac{\partial}{\partial y}\sin\varphi=\cos\varphi\,\frac{\partial\varphi}{\partial y}
=\frac{\cos^2\varphi}{\rho} \qquad (19)
$$

$$
\frac{\partial}{\partial y}\frac{\cos\varphi}{\rho}
=-\frac{\sin\varphi}{\rho}\frac{\partial\varphi}{\partial y}-\frac{\cos\varphi}{\rho^2}\frac{\partial\rho}{\partial y}
=-\frac{2\sin\varphi\cos\varphi}{\rho^2} \qquad (20)
$$

两个复合算子：

$$
\frac{\partial}{\partial y}\partial_\rho=\sin\varphi\,\partial_\rho^2+\frac{\cos\varphi}{\rho}\partial_\rho\partial_\varphi \qquad (21)
$$

$$
\frac{\partial}{\partial y}\partial_\varphi=\sin\varphi\,\partial_\varphi\partial_\rho+\frac{\cos\varphi}{\rho}\partial_\varphi^2 \qquad (22)
$$

合并得

$$
\frac{\partial^2}{\partial y^2}=\sin^2\varphi\,\partial_\rho^2+\frac{\cos^2\varphi}{\rho}\partial_\rho+\frac{\cos^2\varphi}{\rho^2}\partial_\varphi^2+\frac{2\sin\varphi\cos\varphi}{\rho}\partial_\rho\partial_\varphi-\frac{2\sin\varphi\cos\varphi}{\rho^2}\partial_\varphi \qquad (23)
$$

与式 (17) 相比，交叉项与 ∂_φ 项都变号。

### 平面部分相加，再补上 ∂²/∂z²

把式 (17) 与式 (23) 相加。交叉项 −2sin φcos φ/ρ 与 +2sin φcos φ/ρ 相消，∂_φ 项也相消，剩下

$$
\frac{\partial^2}{\partial x^2}+\frac{\partial^2}{\partial y^2}
=\partial_\rho^2+\frac{1}{\rho}\partial_\rho+\frac{1}{\rho^2}\partial_\varphi^2 \qquad (24)
$$

这正是极坐标的拉普拉斯算子，只是符号换了。z 方向没有混合项，∂²/∂z² 原样保留。于是

$$
\Delta=\partial_\rho^2+\frac{1}{\rho}\partial_\rho+\frac{1}{\rho^2}\partial_\varphi^2+\partial_z^2 \qquad (25)
$$

作用在函数上：

$$
\Delta u=\frac{\partial^2u}{\partial\rho^2}+\frac{1}{\rho}\frac{\partial u}{\partial\rho}+\frac{1}{\rho^2}\frac{\partial^2u}{\partial\varphi^2}+\frac{\partial^2u}{\partial z^2} \qquad (26)
$$

也可以写成更紧凑的散度形式：

$$
\Delta u=\frac{1}{\rho}\frac{\partial}{\partial\rho}\left(\rho\frac{\partial u}{\partial\rho}\right)+\frac{1}{\rho^2}\frac{\partial^2u}{\partial\varphi^2}+\frac{\partial^2u}{\partial z^2} \qquad (27)
$$

式 (26) 与式 (27) 恒等，因为 (1/ρ)∂_ρ(ρ∂_ρu) = ∂_ρ²u + (1/ρ)∂_ρu。前一种形式便于逐项计算，后一种形式便于记忆与做积分。

### 尺度因子法：三行得到同一个结果

正交坐标的梯度为

$$
\nabla u=\partial_\rho u\,e_\rho+\frac{1}{\rho}\partial_\varphi u\,e_\varphi+\partial_z u\,e_z \qquad (28)
$$

散度为

$$
\nabla\cdot F=\frac{1}{\rho}\frac{\partial}{\partial\rho}\left(\rho F_\rho\right)+\frac{1}{\rho}\frac{\partial F_\varphi}{\partial\varphi}+\frac{\partial F_z}{\partial z} \qquad (29)
$$

把 F = ∇u 代入：

$$
\Delta u=\frac{1}{\rho}\frac{\partial}{\partial\rho}\left(\rho\frac{\partial u}{\partial\rho}\right)+\frac{1}{\rho}\frac{\partial}{\partial\varphi}\left(\frac{1}{\rho}\frac{\partial u}{\partial\varphi}\right)+\frac{\partial^2u}{\partial z^2} \qquad (30)
$$

第二项中的 1/ρ 不依赖 φ，提到导数外面，得到式 (27)。展开第一项得到式 (26)。这条推导与极坐标完全同构，唯一新增的是最后一项 ∂_z²u。

## 柱坐标下的梯度与散度

### 梯度

$$
\nabla u=\partial_\rho u\,e_\rho+\frac{1}{\rho}\partial_\varphi u\,e_\varphi+\partial_z u\,e_z \qquad (31)
$$

角向分量带 1/ρ，因为 φ 增加 1 弧度对应的实际弧长是 ρ。轴向分量不带因子，因为 z 增加 1 个单位就是长度 1。

### 散度：柱形小盒的通量平衡

取一个由 ρ、ρ + dρ，φ、φ + dφ，z、z + dz 围成的小柱盒。体积为 ρ dρ dφ dz。

径向两个侧面（圆柱面）的面积是 ρ dφ dz 与 (ρ + dρ)dφ dz，净流出为

$$
\left[(\rho+d\rho)F_\rho(\rho+d\rho)- \rho F_\rho(\rho)\right]d\varphi\,dz
\approx \frac{\partial}{\partial\rho}\left(\rho F_\rho\right)d\rho\,d\varphi\,dz \qquad (32)
$$

角向两个侧面（平面）的面积是 dρ dz，净流出为

$$
\left[F_\varphi(\varphi+d\varphi)-F_\varphi(\varphi)\right]d\rho\,dz
\approx \frac{\partial F_\varphi}{\partial\varphi}d\rho\,d\varphi\,dz \qquad (33)
$$

轴向两个端面的面积是 ρ dρ dφ，净流出为

$$
\left[F_z(z+dz)-F_z(z)\right]\rho\,d\rho\,d\varphi
\approx \rho\frac{\partial F_z}{\partial z}d\rho\,d\varphi\,dz \qquad (34)
$$

三项相加，除以体积 ρ dρ dφ dz，得到式 (29)。径向项里的 ρ 来自侧面积，最终化成 (1/ρ)∂_ρ(ρF_ρ)；角向项与轴向项各自只差一个 1/ρ 或 1。

### Δ = div grad

把 F = ∇u 代入式 (29)：

$$
\Delta u=\frac{1}{\rho}\frac{\partial}{\partial\rho}\left(\rho\frac{\partial u}{\partial\rho}\right)+\frac{1}{\rho}\frac{\partial}{\partial\varphi}\left(\frac{1}{\rho}\frac{\partial u}{\partial\varphi}\right)+\frac{\partial^2u}{\partial z^2} \qquad (35)
$$

化简即式 (27)。这条几何推导与链式法则推导互相独立，结果一致，说明尺度因子没有用错。

## 分离变量与 Bessel 方程

### 三个方向的乘积假设

设 u = R(ρ)Φ(φ)Z(z)。代入 Δu = 0：

$$
R''\Phi Z+\frac{1}{\rho}R'\Phi Z+\frac{1}{\rho^2}R\Phi''Z+R\Phi Z''=0 \qquad (36)
$$

整体除以 RΦZ（在 u 不为零的点）：

$$
\frac{R''}{R}+\frac{1}{\rho}\frac{R'}{R}+\frac{1}{\rho^2}\frac{\Phi''}{\Phi}+\frac{Z''}{Z}=0 \qquad (37)
$$

乘以 ρ²：

$$
\rho^2\frac{R''}{R}+\rho\frac{R'}{R}+\frac{\Phi''}{\Phi}+\rho^2\frac{Z''}{Z}=0 \qquad (38)
$$

式 (38) 中，Φ''/Φ 只依赖 φ，其余只依赖 ρ、z。把含 φ 的项单独移出：

$$
\frac{\Phi''}{\Phi}=-\left(\rho^2\frac{R''}{R}+\rho\frac{R'}{R}+\rho^2\frac{Z''}{Z}\right) \qquad (39)
$$

左端只依赖 φ，右端不依赖 φ，所以两者都等于常数，记作 −m²：

$$
\Phi''+m^2\Phi=0 \qquad (40)
$$

### 角向周期性给出整数 m

φ 是绕 z 轴的角度，物理量必须单值，所以 Φ(φ + 2π) = Φ(φ)。方程 (40) 的通解是

$$
\Phi(\varphi)=A\cos m\varphi+B\sin m\varphi \qquad (41)
$$

2π 周期性要求 m 为整数。证明与极坐标相同：若 m 不是整数，绕轴一周后函数值不闭合；若 m = 0，解为常数；若 m 为正整数，cos mφ 与 sin mφ 都以 2π 为周期。因此

$$
m=0,1,2,\dots \qquad (42)
$$

负整数给出的函数与正整数线性相关（cos(−mφ) = cos mφ，sin(−mφ) = −sin mφ），所以只需取非负整数。

### 轴向分离

把 Φ''/Φ = −m² 代回式 (38)，乘以 R：

$$
\rho^2R''+\rho R'-m^2R+\rho^2\frac{Z''}{Z}R=0 \qquad (43)
$$

移项：

$$
\rho^2R''+\rho R'-m^2R=-\rho^2\frac{Z''}{Z}R \qquad (44)
$$

左端只依赖 ρ，右端除 R 外只依赖 z，所以 Z''/Z 必须是常数。取这个常数为 k²：

$$
Z''-k^2Z=0 \qquad (45)
$$

于是式 (44) 变为

$$
\rho^2R''+\rho R'+\left(k^2\rho^2-m^2\right)R=0 \qquad (46)
$$

这就是 m 阶 Bessel 方程。它的解为 J_m(kρ) 与 Y_m(kρ)，下一节逐条说明。

若轴向不是指数型而是振荡型，则取 Z''/Z = −κ²，得到

$$
Z''+\kappa^2Z=0 \qquad (47)
$$

$$
\rho^2R''+\rho R'-\left(\kappa^2\rho^2+m^2\right)R=0 \qquad (48)
$$

式 (48) 是修正 Bessel 方程，解为 I_m(κρ) 与 K_m(κρ)。两种符号对应两种物理情形：z 方向有界且两端固定时常用式 (47)；z 方向半无限、要求衰减时常用式 (45)。不能把两支混在一起。

### 无量纲化

令 x = kρ，并把 R 看成 x 的函数。由 ∂_ρ = k d/dx，

$$
\rho^2R''+\rho R'=\rho^2k^2\frac{d^2R}{dx^2}+\rho k\frac{dR}{dx}=x^2\frac{d^2R}{dx^2}+x\frac{dR}{dx} \qquad (49)
$$

代回式 (46)：

$$
x^2\frac{d^2R}{dx^2}+x\frac{dR}{dx}+\left(x^2-m^2\right)R=0 \qquad (50)
$$

这是标准 Bessel 方程的无量纲形式。所有关于 J_m、Y_m 的性质都可以在 x 变量下讨论，最后把 x = kρ 代回。

## 核心结论与证明

### 结论 1：线元、尺度因子与体积元

柱坐标的线元与体积元为

$$
ds^2=d\rho^2+\rho^2d\varphi^2+dz^2,\qquad dV=\rho\,d\rho\,d\varphi\,dz \qquad (51)
$$

尺度因子为 h_ρ = 1、h_φ = ρ、h_z = 1。

证明：由式 (3) 计算 dx² + dy²。交叉项为 2cos φ(−ρ sin φ)dρ dφ + 2sin φ(ρ cos φ)dρ dφ = 0；dρ² 的系数为 cos²φ + sin²φ = 1；dφ² 的系数为 ρ²(sin²φ + cos²φ) = ρ²。加上 dz² 得式 (51) 的第一式。雅可比行列式由式 (6) 计算为 ρ，故体积元为 ρ dρ dφ dz。尺度因子是坐标单位增量对应的实际长度，由线元对角线读出。证毕。

### 结论 2：一阶导算子

$$
\frac{\partial u}{\partial x}=\cos\varphi\,\partial_\rho u-\frac{\sin\varphi}{\rho}\partial_\varphi u,\qquad
\frac{\partial u}{\partial y}=\sin\varphi\,\partial_\rho u+\frac{\cos\varphi}{\rho}\partial_\varphi u,\qquad
\frac{\partial u}{\partial z}=\partial_zu \qquad (52)
$$

证明：对 x 用二维链式法则，ρ_x = cos φ、φ_x = −sin φ/ρ，代入即得第一式；对 y 用 ρ_y = sin φ、φ_y = cos φ/ρ，得第二式。z 与 x、y 无关，且 z 坐标就是直角坐标的 z，故第三式为恒等。证毕。

### 结论 3：柱坐标拉普拉斯算子

$$
\Delta u=\frac{1}{\rho}\frac{\partial}{\partial\rho}\left(\rho\frac{\partial u}{\partial\rho}\right)+\frac{1}{\rho^2}\frac{\partial^2u}{\partial\varphi^2}+\frac{\partial^2u}{\partial z^2}
=\frac{\partial^2u}{\partial\rho^2}+\frac{1}{\rho}\frac{\partial u}{\partial\rho}+\frac{1}{\rho^2}\frac{\partial^2u}{\partial\varphi^2}+\frac{\partial^2u}{\partial z^2} \qquad (53)
$$

并且

$$
\Delta_{\mathrm{cyl}}=\Delta_{\mathrm{polar}}+\partial_z^2 \qquad (54)
$$

证明：链式法则的完整展开见式 (12) 至 (24)，交叉项与 ∂_φ 项成对抵消，平面部分等于 ∂_ρ² + (1/ρ)∂_ρ + (1/ρ²)∂_φ²。z 方向没有混合，直接补上 ∂_z²，得式 (53)。式 (54) 只是把式 (53) 的前三项识别为极坐标算子。证毕。

### 结论 4：正交坐标的通用公式

设 (q_1, q_2, q_3) 是正交坐标，尺度因子为 h_i，则

$$
\Delta u=\frac{1}{h_1h_2h_3}\sum_{i=1}^{3}\frac{\partial}{\partial q_i}\left(\frac{h_jh_k}{h_i}\frac{\partial u}{\partial q_i}\right) \qquad (55)
$$

其中 (i, j, k) 是 (1, 2, 3) 的轮换。

证明：梯度分量是 (1/h_i)∂_i u。散度由小坐标盒的通量平衡得到：沿 q_1 方向，两个相对面的面积为 h_2h_3dq_2dq_3，净流出为

$$
\left[F_1h_2h_3\right]_{q_1+dq_1}-\left[F_1h_2h_3\right]_{q_1}
\approx \frac{\partial}{\partial q_1}\left(F_1h_2h_3\right)dq_1dq_2dq_3 \qquad (56)
$$

三个方向相加，除以体积 h_1h_2h_3dq_1dq_2dq_3：

$$
\nabla\cdot F=\frac{1}{h_1h_2h_3}\sum_{i=1}^{3}\frac{\partial}{\partial q_i}\left(h_jh_kF_i\right) \qquad (57)
$$

把 F_i = (1/h_i)∂_i u 代入，即得式 (55)。柱坐标取 h_ρ = 1、h_φ = ρ、h_z = 1，乘积为 ρ，逐项代入：

$$
\Delta u=\frac{1}{\rho}\left[\frac{\partial}{\partial\rho}\left(\rho\,\partial_\rho u\right)+\frac{\partial}{\partial\varphi}\left(\frac{1}{\rho}\partial_\varphi u\right)+\frac{\partial}{\partial z}\left(\rho\,\partial_z u\right)\right] \qquad (58)
$$

化简即式 (53)。证毕。

### 结论 5：分离变量给出 Bessel 方程

若 u = R(ρ)Φ(φ)Z(z) 满足 Δu = 0，且 Φ 以 2π 为周期，则存在整数 m 与常数 k，使得

$$
\Phi''+m^2\Phi=0,\qquad Z''-k^2Z=0,\qquad \rho^2R''+\rho R'+\left(k^2\rho^2-m^2\right)R=0 \qquad (59)
$$

证明：分离步骤见式 (36) 至 (46)。关键论证是「只依赖 φ 的项等于只依赖其余变量的项，故两者都是常数」。角向常数取 −m² 是为了让 Φ 有周期解；m 必须为整数，否则绕轴一周不闭合。轴向常数取 k² 则得到指数型 Z；若取 −κ²，则得到式 (48) 的修正 Bessel 方程。径向方程由代回即得。证毕。

### 结论 6：J_m 的级数解

对整数 m ≥ 0，定义

$$
J_m(x)=\sum_{j=0}^{\infty}\frac{(-1)^j}{j!\,(j+m)!}\left(\frac{x}{2}\right)^{2j+m} \qquad (60)
$$

则 J_m 在 x > 0 上满足 Bessel 方程

$$
x^2J_m''+xJ_m'+\left(x^2-m^2\right)J_m=0 \qquad (61)
$$

且 J_m 在 x = 0 处有界，J_0(0) = 1，m ≥ 1 时 J_m(0) = 0。

证明：把幂级数写成 R = Σ c_j x^{2j+m}，其中

$$
c_j=\frac{(-1)^j}{j!\,(j+m)!\,2^{2j+m}} \qquad (62)
$$

逐项求导并代入式 (61)。x²R'' + xR' 给出的系数是

$$
(2j+m)(2j+m-1)+(2j+m)=(2j+m)^2 \qquad (63)
$$

所以

$$
x^2R''+xR'+\left(x^2-m^2\right)R
=\sum_{j=0}^{\infty}\left[(2j+m)^2-m^2\right]c_jx^{2j+m}+\sum_{j=0}^{\infty}c_jx^{2j+m+2} \qquad (64)
$$

第一项的括号等于 4j(j+m)。第二项把指标平移一位，写成 Σ_{j≥1} c_{j−1}x^{2j+m}。合并后，x^{2j+m} 的系数为

$$
4j(j+m)c_j+c_{j-1}=0 \qquad (65)
$$

其中 j = 0 时 c_{−1} = 0，自动满足。对 j ≥ 1，递推给出

$$
c_j=-\frac{c_{j-1}}{4j(j+m)} \qquad (66)
$$

从 c_0 = 1/(2^m m!) 出发，逐次迭代即得式 (62) 的系数，故式 (60) 的级数满足 Bessel 方程。级数在 x > 0 上绝对收敛，因为阶乘增长快于幂。x → 0 时，j = 0 项给出 x^m/(2^m m!)，故 J_0(0) = 1，m ≥ 1 时 J_m(0) = 0。证毕。

### 结论 7：递推关系与导数公式

对整数 m，

$$
\frac{d}{dx}\left[x^mJ_m(x)\right]=x^mJ_{m-1}(x),\qquad
\frac{d}{dx}\left[x^{-m}J_m(x)\right]=-x^{-m}J_{m+1}(x) \qquad (67)
$$

由此得到

$$
J_m'(x)=\frac{1}{2}\left[J_{m-1}(x)-J_{m+1}(x)\right] \qquad (68)
$$

特别地，J_0'(x) = −J_1(x)。

证明：由级数 (60)，

$$
x^mJ_m(x)=\sum_{j=0}^{\infty}\frac{(-1)^j}{j!\,(j+m)!}\frac{x^{2j+2m}}{2^{2j+m}} \qquad (69)
$$

逐项求导，指数 2j + 2m 落下，与 (j+m)! 中的因子约去一个 j+m：

$$
\frac{d}{dx}\left[x^mJ_m\right]
=\sum_{j=0}^{\infty}\frac{(-1)^j}{j!\,(j+m-1)!}\frac{x^{2j+2m-1}}{2^{2j+m-1}} \qquad (70)
$$

而右边 x^mJ_{m−1} 的级数正是同一个表达式，故第一式成立。第二式用同样的逐项求导，指数 2j 落下后与 j! 约去，得到负号与 J_{m+1}。把第一式展开：

$$
mx^{m-1}J_m+x^mJ_m'=x^mJ_{m-1} \quad\Rightarrow\quad xJ_m'=xJ_{m-1}-mJ_m \qquad (71)
$$

第二式展开：

$$
-mx^{-m-1}J_m+x^{-m}J_m'=-x^{-m}J_{m+1} \quad\Rightarrow\quad xJ_m'=mJ_m-xJ_{m+1} \qquad (72)
$$

两式相加，xJ_m' 的表达式相加，右边 mJ_m 抵消：

$$
2xJ_m'=x\left(J_{m-1}-J_{m+1}\right) \qquad (73)
$$

除以 2x 得式 (68)。令 m = 0，J_{−1} = −J_1（由 J_{−n} = (−1)^nJ_n），所以 J_0' = (J_{−1} − J_1)/2 = −J_1。证毕。

### 结论 8：Y_m 与轴上正则性

对非整数 m，第二类 Bessel 函数定义为

$$
Y_m(x)=\frac{J_m(x)\cos m\pi-J_{-m}(x)}{\sin m\pi} \qquad (74)
$$

对整数 m 取极限。J_m 在 x = 0 处有界，而 Y_m 在 x = 0 处无界，且含有 ln(x/2) 项。因此实心圆柱（包含 ρ = 0）内只保留 J_m(kρ)，舍去 Y_m(kρ)。

证明：整数 m 时，J_{−m} = (−1)^mJ_m。直接由级数验证：J_{−m} 的级数指标平移后，系数多出因子 (−1)^m，故 J_{−m} = (−1)^mJ_m。于是式 (74) 的分子在 m 为整数时为零，必须取极限；极限中存在 ln(x/2) 的项，这是第二类解的标志。x → 0 时 ln(x/2) → −∞，故 Y_m 无界。J_m 的级数首项为 x^m/(2^m m!)，在 x = 0 处有限（m = 0 时为 1，m ≥ 1 时为 0）。所以在包含轴的圆柱内，只有 J_m 满足有界性。证毕。

### 结论 9：Bessel 正交性与范数

设 j_{m,n} 是 J_m 的第 n 个正零点，k_n = j_{m,n}/a。则

$$
\int_0^a\rho\,J_m(k_n\rho)\,J_m(k_l\rho)\,d\rho=0\quad(n\ne l) \qquad (75)
$$

并且

$$
\int_0^a\rho\,J_m(k_n\rho)^2\,d\rho=\frac{a^2}{2}J_{m+1}(j_{m,n})^2 \qquad (76)
$$

证明：Bessel 方程可以写成自伴形式

$$
\left(\rho R'\right)'+\left(k^2\rho-\frac{m^2}{\rho}\right)R=0 \qquad (77)
$$

令 R_n = J_m(k_nρ)、R_l = J_m(k_lρ)。把 n 与 l 的方程分别乘以 R_l、R_n 后相减并积分：

$$
\left(k_n^2-k_l^2\right)\int_0^a\rho R_nR_l\,d\rho
=\int_0^a\left[R_l\left(\rho R_n'\right)'-R_n\left(\rho R_l'\right)'\right]d\rho \qquad (78)
$$

右端分部积分一次：

$$
\left[\rho\left(R_lR_n'-R_nR_l'\right)\right]_0^a \qquad (79)
$$

在 ρ = a 处 R_n = R_l = 0，边界项为零；在 ρ = 0 处，ρR'R → 0（J_m 在轴上至多按 ρ^m 增长，乘以 ρ 后趋于零）。所以右端为零，式 (75) 成立。

范数公式来自恒等式

$$
\int_0^x t\,J_m(t)^2\,dt=\frac{x^2}{2}\left[J_m(x)^2-J_{m-1}(x)J_{m+1}(x)\right] \qquad (80)
$$

它可以通过对右端求导并用式 (67) 的递推关系验证。把 x = j_{m,n} 代入，J_m(x) = 0，且由递推 J_{m−1}(x) = −J_{m+1}(x)，故右端为 (x²/2)J_{m+1}(x)²。再做变量替换 t = k_nρ：dρ = dt/k_n，积分变为

$$
\int_0^a\rho J_m(k_n\rho)^2\,d\rho
=\frac{1}{k_n^2}\int_0^{j_{m,n}}t\,J_m(t)^2\,dt
=\frac{1}{k_n^2}\cdot\frac{j_{m,n}^2}{2}J_{m+1}(j_{m,n})^2
=\frac{a^2}{2}J_{m+1}(j_{m,n})^2 \qquad (81)
$$

证毕。

### 结论 10：边界条件与离散特征值

在实心圆柱的侧壁 ρ = a 上取齐次狄利克雷条件 u(a, φ, z) = 0，则径向特征值由 J_m 的零点给出：

$$
J_m(ka)=0\quad\Rightarrow\quad k_{m,n}=\frac{j_{m,n}}{a},\qquad n=1,2,3,\dots \qquad (82)
$$

若 z 方向还有长度为 H 的两端齐次条件，则

$$
Z(z)=\sin\frac{l\pi z}{H},\qquad l=1,2,3,\dots \qquad (83)
$$

对热方程或 Helmholtz 方程，总特征值为

$$
\lambda_{m,n,l}=\left(\frac{j_{m,n}}{a}\right)^2+\left(\frac{l\pi}{H}\right)^2 \qquad (84)
$$

证明：侧壁条件直接给出 J_m(ka) = 0，因 Y_m 在轴上无界已被舍去。J_m 的零点都是单零点：若某零点同时满足 J_m(ka) = 0 与 J_m'(ka) = 0，则由二阶方程的解唯一性，J_m 在该点初值为零、导数也为零，只能恒为零，与级数首项矛盾。不同零点给出不同的 k，由结论 9 的加权正交性对应不同特征函数。z 方向两端为零时，Z'' + (lπ/H)²Z = 0 的解为 sin(lπz/H)，l = 1, 2, …；常数与 cos 项被端点条件排除。总特征值是径向与轴向特征值之和，因为 Δ 在这两个方向上可分离。证毕。

### 结论 11：柱谐函数

在 ρ > 0 上，

$$
\Delta\left(\rho^m\cos m\varphi\right)=0,\qquad
\Delta\left(\rho^m\sin m\varphi\right)=0\quad(m=0,1,2,\dots) \qquad (85)
$$

$$
\Delta(\ln\rho)=0,\qquad \Delta(z)=0,\qquad \Delta(1)=0 \qquad (86)
$$

而一般的「幂乘高度」满足

$$
\Delta\left(\rho^m z\right)=m^2\rho^{m-2}z \qquad (87)
$$

证明：式 (85) 的平面部分与极坐标完全相同：∂_ρ²(ρ^m cos mφ) = m(m−1)ρ^{m−2}cos mφ，(1/ρ)∂_ρ = mρ^{m−2}cos mφ，(1/ρ²)∂_φ² = −m²ρ^{m−2}cos mφ；三项相加，系数 m(m−1)+m−m² = 0。z 方向导数为零，所以 Δ = 0。sin 同理。式 (86) 中 Δlnρ 的平面部分为零，z 方向为零；Δz 的平面部分为零，∂_z²z = 0；常数显然调和。式 (87) 中平面部分 Δ_2(ρ^m) = m²ρ^{m−2}，z 方向 ∂_z²(ρ^m z) = 0，故总 Δ = m²ρ^{m−2}z。证毕。

注意 m = 0 时式 (87) 给出 Δz = 0，这是调和的；m = 1 时 Δ(ρz) = z/ρ，不是调和。这与极坐标中「纯径向 r 不调和、但 x = r cos θ 调和」的边界情形完全同源。

## 典型例题

### 例题 1：幂函数乘高度

计算 u = ρ^m z 的拉普拉斯，并代入课程实验的默认参数 m = 1、ρ = 1.6、z = 0.5。

解：平面部分只对 ρ 求导。对 ρ^m：

$$
\frac{\partial^2}{\partial\rho^2}\rho^m=m(m-1)\rho^{m-2},\qquad
\frac{1}{\rho}\frac{\partial}{\partial\rho}\rho^m=m\rho^{m-2},\qquad
\frac{1}{\rho^2}\frac{\partial^2}{\partial\varphi^2}\rho^m=0 \qquad (88)
$$

三项平面贡献相加为 m²ρ^{m−2}。z 方向二阶导为零。所以

$$
\Delta\left(\rho^m z\right)=m^2\rho^{m-2}z \qquad (89)
$$

代入 m = 1、ρ = 1.6、z = 0.5：

$$
\Delta u=1^2\cdot1.6^{-1}\cdot0.5=\frac{0.5}{1.6}=0.3125 \qquad (90)
$$

画面读数保留两位小数，显示 0.31。若取 m = 2，则 Δu = 4z，在 z = 0.5 处等于 2。

### 例题 2：一个真正的调和函数

验证 u = ρ² − 2z² 在柱坐标中调和。

解：平面部分 Δ_2(ρ²) = 4（与极坐标中 Δ(r²) = 4 相同）。轴向部分 ∂_z²(−2z²) = −4。所以

$$
\Delta u=4-4=0 \qquad (91)
$$

u 是二次调和多项式。若改成 u = ρ² − z²，则 Δu = 4 − 2 = 2，不调和；若改成 u = ρ² + z²，则 Δu = 4 + 2 = 6，也不调和。二次型中只有 ρ² − 2z² 这一种「横向两倍于纵向」的组合调和，这与三维直角坐标中 x² + y² − 2z² 的结论一致。

### 例题 3：Bessel 函数与半无限圆柱

验证 u = J_0(kρ) 满足 Δu = −k²u，并构造一个在半无限圆柱内调和、侧壁为零、随 z 衰减的解。

解：J_0 只依赖 ρ。由 Bessel 方程 m = 0 的形式，

$$
\frac{\partial^2}{\partial\rho^2}J_0(k\rho)+\frac{1}{\rho}\frac{\partial}{\partial\rho}J_0(k\rho)+k^2J_0(k\rho)=0 \qquad (92)
$$

更准确地说，令 x = kρ，式 (61) 给出 x²J_0'' + xJ_0' + x²J_0 = 0，除以 ρ² 得

$$
\frac{\partial^2}{\partial\rho^2}J_0(k\rho)+\frac{1}{\rho}\frac{\partial}{\partial\rho}J_0(k\rho)=-k^2J_0(k\rho) \qquad (93)
$$

所以平面拉普拉斯为 −k²J_0(kρ)。取 k = j_{0,1}/a，其中 j_{0,1} ≈ 2.4048 是 J_0 的第一个正零点，并令

$$
u(\rho,z)=J_0\left(\frac{j_{0,1}}{a}\rho\right)e^{-j_{0,1}z/a} \qquad (94)
$$

则 ∂_z²u = (j_{0,1}/a)²u，平面部分为 −(j_{0,1}/a)²u，两项相加为零。侧壁 ρ = a 处 J_0(j_{0,1}) = 0；z → +∞ 时指数衰减。所以它是半无限圆柱的基模。

### 例题 4：有限圆柱的边界值问题

设圆柱 0 ≤ ρ < a、0 < z < H，侧壁 u(a, φ, z) = 0，顶部 u(ρ, φ, H) = 0，底部 u(ρ, φ, 0) = J_0(j_{0,1}ρ/a)。求一个分离变量解。

解：径向仍取 J_0(j_{0,1}ρ/a)，它满足侧壁条件。轴向需要满足 Z(H) = 0，并让 Z'' = k²Z，其中 k = j_{0,1}/a。取

$$
Z(z)=\sinh\left(k(H-z)\right) \qquad (95)
$$

则 Z'' = k²Z，Z(H) = 0，Z(0) = sinh(kH) ≠ 0。于是

$$
u(\rho,z)=J_0\left(k\rho\right)\frac{\sinh\left(k(H-z)\right)}{\sinh(kH)} \qquad (96)
$$

在 z = 0 处给出 J_0(kρ)，在 z = H 处为零，在 ρ = a 处为零。平面部分为 −k²u，轴向部分为 +k²u，故 Δu = 0。这个解对应「底部给定非均匀温度 J0(kρ)、顶部恒零、侧壁恒零」的稳态分布的一个模态；侧壁取的是零温度（狄利克雷）条件，不是绝热条件。

### 例题 5：圆波导的模态与截止频率

圆形波导中，纵向场满足 Helmholtz 方程 (Δ + k²)u = 0，侧壁 u(a, φ, z) = 0。求 TM 型模态。

解：设 u = J_m(j_{m,n}ρ/a)cos mφ e^{iβz}。径向部分满足

$$
\Delta_2J_m\left(\frac{j_{m,n}}{a}\rho\right)=-\left(\frac{j_{m,n}}{a}\right)^2J_m\left(\frac{j_{m,n}}{a}\rho\right) \qquad (97)
$$

轴向部分给出 ∂_z²u = −β²u。所以

$$
(\Delta+k^2)u=\left[-\left(\frac{j_{m,n}}{a}\right)^2-\beta^2+k^2\right]u=0 \qquad (98)
$$

由此

$$
\beta^2=k^2-\left(\frac{j_{m,n}}{a}\right)^2 \qquad (99)
$$

当 k > j_{m,n}/a 时 β 为实数，波沿 z 传播；当 k < j_{m,n}/a 时 β 为虚数，波指数衰减，称为截止。截止波数为 k_c = j_{m,n}/a。m = 0、n = 1 时 j_{0,1} ≈ 2.4048，对应最低的 TM 模。

### 例题 6：有限圆柱的热传导模态

设温度 u 满足 ∂_t u = αΔu，圆柱侧壁与两端都保持零温度。求分离变量模态与衰减率。

解：设

$$
u=e^{-\alpha\lambda t}J_m\left(\frac{j_{m,n}}{a}\rho\right)\cos m\varphi\sin\frac{l\pi z}{H} \qquad (100)
$$

平面部分：

$$
\Delta_2u=-\left(\frac{j_{m,n}}{a}\right)^2u \qquad (101)
$$

轴向部分：

$$
\partial_z^2u=-\left(\frac{l\pi}{H}\right)^2u \qquad (102)
$$

所以 Δu = −λu，其中

$$
\lambda=\left(\frac{j_{m,n}}{a}\right)^2+\left(\frac{l\pi}{H}\right)^2 \qquad (103)
$$

代入热方程得 ∂_t u = −αλu，指数衰减率是 αλ。侧壁 ρ = a 处 J_m(j_{m,n}) = 0；两端 z = 0、H 处 sin(lπz/H) = 0；角向 cos mφ 以 2π 为周期。m = 0、n = 1、l = 1 给出最低模态，衰减最慢。

## 习题

### 基础题

1. 写出柱坐标的正变换、反变换、线元与体积元，并说明 h_φ 为什么等于 ρ。
2. 计算 Δ(ρ²sin 2φ)，并说明它对应的直角坐标函数。
3. 计算 Δ(ρ²z)，并求在 ρ = 2、z = 1 处的值。
4. 证明 u = z ln ρ 在 ρ > 0 上调和。
5. 计算 Δ(ρ² + z²)，并解释结果是否调和。

### 进阶题

6. 从 Δu = 0 与 u = R(ρ)Φ(φ)Z(z) 出发，在 Z'' − k²Z = 0 的约定下完整导出 Bessel 方程，并说明另一符号约定会得到什么方程。
7. 用级数或递推关系证明 J_0'(x) = −J_1(x)。
8. 设 j_{0,1} 与 j_{0,2} 是 J_0 的两个不同正零点，a > 0。证明 ∫_0^a ρJ_0(j_{0,1}ρ/a)J_0(j_{0,2}ρ/a)dρ = 0。
9. 在半无限圆柱 0 ≤ ρ < a、z > 0 内解 Δu = 0，侧壁 u(a, φ, z) = 0，底部 u(ρ, φ, 0) = J_0(j_{0,1}ρ/a)，并要求 z → ∞ 时有界。
10. 在有限圆柱 0 ≤ ρ < a、0 < z < H 内解 Δu = 0，侧壁与顶部为零，底部为 J_0(j_{0,1}ρ/a)，写出解并核对三个边界条件。

## 习题答案与详细解析

### 基础题解答

1. 正变换 x = ρcos φ、y = ρsin φ、z = z；反变换 ρ = √(x² + y²)、φ = arctan(y/x) 按象限修正、z = z。线元 ds² = dρ² + ρ²dφ² + dz²，体积元 dV = ρdρdφdz。h_φ = ρ 因为 φ 增加 1 弧度时，半径为 ρ 的圆周上弧长是 ρ；也可以由线元中 dφ² 的系数 ρ² 开方得到。

2. ρ²sin 2φ = 2ρ²sin φcos φ = 2xy，而 Δ(2xy) = 0，所以结果为 0。直接在柱坐标中：∂_ρ²(ρ²sin 2φ) = 2sin 2φ，(1/ρ)∂_ρ = 2sin 2φ，(1/ρ²)∂_φ² = −4sin 2φ，三项相加为零。这个函数是柱谐函数 ρ²sin 2φ。

3. 由式 (89)，Δ(ρ²z) = 4z。在 ρ = 2、z = 1 处等于 4。注意 ρ 的取值不影响结果，因为 m = 2 时 ρ^{m−2} = 1。

4. u = z ln ρ。平面部分 Δ_2lnρ = 0（见极坐标结论 6），轴向部分 ∂_z²(z lnρ) = 0，所以 Δu = 0。函数在 ρ = 0 处无界，定义域必须是 ρ > 0。它不是整个实心圆柱内的调和函数，但在挖去轴的区域内调和。

5. Δ(ρ²) = 4，Δ(z²) = 2，所以 Δ(ρ² + z²) = 6。它与直角坐标中 Δ(x² + y² + z²) = 6 一致；因为 6 ≠ 0，所以不调和。常数正拉普拉斯表示每一点都低于邻域平均。

### 进阶题解答

6. 设 u = RΦZ，代入 Δu = 0 并除以 u：

$$
\frac{R''}{R}+\frac{1}{\rho}\frac{R'}{R}+\frac{1}{\rho^2}\frac{\Phi''}{\Phi}+\frac{Z''}{Z}=0 \qquad (104)
$$

乘以 ρ²，并利用 φ 方向的周期性得 Φ''/Φ = −m²：

$$
\rho^2\frac{R''}{R}+\rho\frac{R'}{R}-m^2+\rho^2\frac{Z''}{Z}=0 \qquad (105)
$$

在 Z'' − k²Z = 0 的约定下，Z''/Z = k²，代入并乘以 R：

$$
\rho^2R''+\rho R'+\left(k^2\rho^2-m^2\right)R=0 \qquad (106)
$$

这就是 m 阶 Bessel 方程。若改用 Z'' + κ²Z = 0，则 Z''/Z = −κ²，径向方程变成

$$
\rho^2R''+\rho R'-\left(\kappa^2\rho^2+m^2\right)R=0 \qquad (107)
$$

这是修正 Bessel 方程，解为 I_m(κρ) 与 K_m(κρ)。两种约定对应 z 方向指数型与振荡型两种边界情形，不能同时混用。

7. 由式 (67) 取 m = 0：

$$
\frac{d}{dx}\left[x^0J_0(x)\right]=x^0J_{-1}(x) \qquad (108)
$$

即 J_0'(x) = J_{−1}(x)。又由 J_{−n} = (−1)^nJ_n，取 n = 1 得 J_{−1} = −J_1。所以 J_0'(x) = −J_1(x)。也可以用式 (68)：J_0' = (J_{−1} − J_1)/2 = (−J_1 − J_1)/2 = −J_1。

8. 这是结论 9 在 m = 0 的特例。令 k_1 = j_{0,1}/a、k_2 = j_{0,2}/a。Bessel 方程的自伴形式为 (ρR')' + k²ρR = 0。把两个方程分别乘以另一个解后相减并积分：

$$
\left(k_1^2-k_2^2\right)\int_0^a\rho R_1R_2\,d\rho
=\left[\rho\left(R_2R_1'-R_1R_2'\right)\right]_0^a \qquad (109)
$$

在 ρ = a 处 R_1 = R_2 = 0；在 ρ = 0 处边界项为零。k_1 ≠ k_2，所以积分必须为零，即两个不同零点的 J_0 在权重 ρ 下正交。

9. 取

$$
u(\rho,z)=J_0\left(\frac{j_{0,1}}{a}\rho\right)e^{-j_{0,1}z/a} \qquad (110)
$$

平面部分为 −(j_{0,1}/a)²u，轴向部分为 +(j_{0,1}/a)²u，故 Δu = 0。ρ = a 处 J_0(j_{0,1}) = 0；z = 0 处 u = J_0(j_{0,1}ρ/a)；z → ∞ 时 e^{−j_{0,1}z/a} → 0，满足有界性。由极值原理与唯一性，这个有界解就是该边界问题的解。

10. 取

$$
u(\rho,z)=J_0\left(\frac{j_{0,1}}{a}\rho\right)\frac{\sinh\left(j_{0,1}(H-z)/a\right)}{\sinh\left(j_{0,1}H/a\right)} \qquad (111)
$$

核对：ρ = a 时 J_0(j_{0,1}) = 0；z = H 时 sinh 0 = 0；z = 0 时 sinh(j_{0,1}H/a)/sinh(j_{0,1}H/a) = 1，给出 J_0(j_{0,1}ρ/a)。调和性：令 k = j_{0,1}/a，平面部分 Δ_2J_0(kρ) = −k²J_0(kρ)；轴向 Z = sinh(k(H−z)) 满足 Z'' = k²Z；两项相加为零。

## 常见错误与边界情形

- 把 h_φ 写成 1。h_φ = ρ；角向导数前面必须是 1/ρ，体积元也必须带 ρ。
- 把柱坐标拉普拉斯写成 ∂_ρ² + ∂_φ² + ∂_z²。缺少 1/ρ 与 1/ρ² 两个度量因子，量纲与旋转不变性都不对。
- 把 (1/ρ)∂_ρ(ρ∂_ρu) 展开错。它等于 ∂_ρ²u + (1/ρ)∂_ρu，不是 ∂_ρ²u + ρ∂_ρu。
- 在 xy 平面部分漏掉交叉项抵消的步骤。∂²_x 与 ∂²_y 各自都有 ∂_ρ∂_φ 项，只有相加才消失。
- 把 z 方向也做极坐标变换。z 与 φ 无关，∂_z = ∂_z，不产生 1/ρ 因子。
- 分离变量时把 Z''/Z 的符号与 Bessel 类型配错。Z'' − k²Z = 0 给标准 Bessel J_m、Y_m；Z'' + κ²Z = 0 给修正 Bessel I_m、K_m。
- 在实心圆柱内保留 Y_m。Y_m 在 ρ = 0 处无界，只有挖去轴的圆环区域才允许保留。
- 把 Bessel 零点当成 π 的整数倍。J_m 的零点不是等间距的；必须查表或数值求解，j_{0,1} ≈ 2.4048，j_{1,1} ≈ 3.8317。
- 忘记正交性的权重 ρ。Bessel 函数在权重 ρ 下正交，不是普通 L² 正交；少了 ρ 积分不成立。
- 把侧壁条件写成 k a = nπ。侧壁给出 J_m(ka) = 0，即 ka = j_{m,n}；nπ 是正弦函数的零点，不是 Bessel 的。
- 认为有限圆柱两端都为零时仍有非零调和解。若侧壁、顶部、底部全部为零，由狄利克雷唯一性解恒为零；非零解必须至少一端有非零数据。
- 在 ρ = 0 处直接使用柱坐标公式。轴上的 φ 没有定义，含 1/ρ 的项必须通过有界性条件处理。
- 把动画中的 r 与球坐标的 r 混淆。动画的 r 是柱坐标的 ρ；球坐标的 r 是到原点的距离。

## 与动画步骤的对应

| 动画步骤 | 画面重点 | 对应讲义内容 |
| --- | --- | --- |
| 坐标 | 底面极坐标网格与高度 | 式 (1) 至 (7)，线元与体积元 |
| 度量 | h_φ = r 的标注、角向弧长 | 式 (5)、(28) 至 (30) |
| 一阶 | ∂_x、∂_y 的链式法则，z 不变 | 式 (8) 至 (11) |
| 合成 | 平面交叉项抵消，补上 ∂_z² | 式 (12) 至 (27) |
| 分离变量 | Φ、Z 与 Bessel 径向方程 | 式 (36) 至 (50) |
| 实验 | 半径、模式、高度三个滑块 | 式 (89) 与 Δ(r^m z) 的读数 |

动画实验采用 u = r^m z（画面中的 r 就是本讲的 ρ），实时公式为

$$
\Delta\left(r^m z\right)=m^2r^{m-2}z \qquad (112)
$$

默认半径 r = 1.60、模式 m = 1、高度 z = 0.50，所以 Δu = 1² × 0.50/1.60 = 0.3125，画面显示 0.31。尺度因子 h_φ 同步显示为 1.60。若把函数改成 r^m cos(mφ)，读数会始终为零，因为它是柱谐函数；这正是结论 11 的内容。画面中「Bessel 参数 kr」一栏只作示意，真正的离散参数是 j_{m,n}/a，而不是任意的 kr。

## 小结

- 柱坐标是「平面极坐标 + 独立的 z」；线元、体积元与尺度因子都由这一结构直接得到。
- 一阶算子与极坐标完全相同，z 方向是恒等映射；二阶平面部分复用极坐标的抵消机制。
- 柱坐标拉普拉斯为 Δ = (1/ρ)∂_ρ(ρ∂_ρ) + (1/ρ²)∂_φ² + ∂_z²，也可以写成 ∂_ρ² + (1/ρ)∂_ρ + (1/ρ²)∂_φ² + ∂_z²。
- 分离变量给出 Φ'' + m²Φ = 0、Z'' − k²Z = 0 与 Bessel 方程 ρ²R'' + ρR' + (k²ρ² − m²)R = 0。
- J_m 在轴上正则，Y_m 在轴上奇异；实心圆柱只保留 J_m。
- 侧壁零条件把 k 离散化为 j_{m,n}/a；Bessel 函数在权重 ρ 下正交。
- 半无限圆柱的基模是 J_0(j_{0,1}ρ/a)e^{−j_{0,1}z/a}；有限圆柱用 sinh 组合满足两端条件；圆波导的截止波数是 j_{m,n}/a。
- 柱谐函数 ρ^m cos mφ、ρ^m sin mφ、ln ρ、z 都调和；ρ^m z 一般不调和，只有 m = 0 时例外。
