## 本讲目标与符号约定

本讲只围绕一个符号展开：∇。目标不是背下三个公式，而是建立一套「先看输入输出类型、再看几何意义、最后逐项验证」的工作方法。学完后应当能够：

- 说明梯度、散度、旋度各自的输入类型、输出类型与几何含义。
- 独立完成散度与旋度的直角坐标展开，不跳步。
- 证明五条常用恒等式，并知道每条证明用到哪个解析条件。
- 判断一个场是否保守，理解「单连通」为何不可省略。
- 说出 Helmholtz 分解的结论与证明路线。

符号约定：采用右手直角坐标系 (x, y, z)，单位矢量记为 e_x、e_y、e_z；标量场记作 f 或 φ，矢量场记作 F = (F_x, F_y, F_z)；∇ 是形式矢量算子。

$$
\nabla=\left(\frac{\partial}{\partial x},\ \frac{\partial}{\partial y},\ \frac{\partial}{\partial z}\right) \qquad (1)
$$

三个基本作用定义如下。

$$
\nabla f=\left(\frac{\partial f}{\partial x},\ \frac{\partial f}{\partial y},\ \frac{\partial f}{\partial z}\right) \qquad (2)
$$

$$
\nabla\cdot\mathbf{F}=\frac{\partial F_x}{\partial x}+\frac{\partial F_y}{\partial y}+\frac{\partial F_z}{\partial z} \qquad (3)
$$

$$
\nabla\times\mathbf{F}=\left(\frac{\partial F_z}{\partial y}-\frac{\partial F_y}{\partial z},\ \frac{\partial F_x}{\partial z}-\frac{\partial F_z}{\partial x},\ \frac{\partial F_y}{\partial x}-\frac{\partial F_x}{\partial y}\right) \qquad (4)
$$

为避免混淆，全文用 div F 与 curl F 作为 ∇·F 与 ∇×F 的同义记号。所有场默认在所讨论区域上具有足够阶的连续偏导；需要二阶偏导交换次序时，会明确写出这一条件。

## 算子 ∇：先看类型，再看公式

∇ 本身不是场，也不是数，而是一台等待输入的机器。它的身份由输入与输出的类型决定。

| 作用 | 输入 | 输出 | 名称 | 几何读法 |
| --- | --- | --- | --- | --- |
| ∇f | 标量 | 矢量 | 梯度 | 最陡上升方向 |
| ∇·F | 矢量 | 标量 | 散度 | 单位体积净流出 |
| ∇×F | 矢量 | 矢量 | 旋度 | 单位面积环流 |

这张表比三条展开式更重要。看到 ∇ 时先问「它作用在谁身上」，再问「结果是什么类型」，最后才代入坐标公式。把标量场误当成矢量场、或把旋度算成标量，是最常见的低级错误。

∇ 还是一个线性算子：对任意常数 a、b，

$$
\nabla(af+bg)=a\nabla f+b\nabla g,\qquad \nabla\cdot(a\mathbf{F}+b\mathbf{G})=a\nabla\cdot\mathbf{F}+b\nabla\cdot\mathbf{G} \qquad (5)
$$

$$
\nabla\times(a\mathbf{F}+b\mathbf{G})=a\nabla\times\mathbf{F}+b\nabla\times\mathbf{G} \qquad (6)
$$

线性性来自偏导本身的线性性。它也解释了动画实验中的一个现象：把场强整体乘以 s，散度与旋度都同步乘以 s，方向与源汇位置不变。

![图 1　梯度与散度的几何含义：梯度指向最陡上升，散度度量净流出](/notes/vectorops.svg)

## 梯度：最陡上升方向

### 全微分与方向导数

设 f(x, y, z) 是可微标量场，从点 r 走微小位移 dr = (dx, dy, dz)。由全微分，

$$
\mathrm{d}f=\frac{\partial f}{\partial x}\mathrm{d}x+\frac{\partial f}{\partial y}\mathrm{d}y+\frac{\partial f}{\partial z}\mathrm{d}z=\nabla f\cdot\mathrm{d}\mathbf{r} \qquad (7)
$$

这个等式说明：梯度是一个「与位移做点积就能读出函数增量」的矢量。若沿单位方向 u 走一小步 t，则

$$
D_{\mathbf{u}}f=\left.\frac{\mathrm{d}}{\mathrm{d}t}f(\mathbf{r}+t\mathbf{u})\right|_{t=0}=\nabla f\cdot\mathbf{u}=|\nabla f|\cos\theta \qquad (8)
$$

其中 θ 是 u 与 ∇f 的夹角。

**结论 1（最速上升）**：在所有单位方向中，方向导数在 u 与 ∇f 同向时取最大值 |∇f|，在反向时取最小值 −|∇f|；当 ∇f 为零矢量时，所有方向导数都为零。

证明：由式 (8)，D_u f = |∇f|cosθ。余弦的最大值为 1，在 θ = 0 时取得，此时 u = ∇f/|∇f|；最小值为 −1，在 θ = π 时取得。若 ∇f = 0，则对一切 u 点积为零。证毕。

等价地，用柯西–施瓦茨不等式可直接写出

$$
|\nabla f\cdot\mathbf{u}|\le|\nabla f|\,|\mathbf{u}|=|\nabla f| \qquad (9)
$$

等号成立当且仅当 u 与 ∇f 共线。这个不等式不依赖夹角的几何直观，也可以推广到高维。

### 梯度垂直于等值面

**结论 2（法向性）**：在 ∇f 不为零的点，∇f 垂直于过该点的等值面 f = 常数。

证明：设曲线 r(t) 完全落在等值面 f = c 上，则对一切 t，f(r(t)) = c。两边对 t 求导，由链式法则得

$$
\frac{\mathrm{d}}{\mathrm{d}t}f(\mathbf{r}(t))=\nabla f(\mathbf{r}(t))\cdot\mathbf{r}'(t)=0 \qquad (10)
$$

曲线在每一点的切向 r'(t) 可以是等值面内的任意切方向，而 ∇f 与所有这些切方向正交，故 ∇f 是等值面的法向。证毕。

这条结论有直接的实用价值：要找等值面的法线，不必先求曲面方程，只需算梯度。

### 例：f = x² + y²

$$
\nabla f=(2x,\ 2y,\ 0) \qquad (11)
$$

在原点梯度为零；离原点越远箭头越长；方向始终沿半径向外。等值线是同心圆，梯度处处垂直于圆，与结论 2 一致。

## 散度：单位体积的净流出

### 通量密度定义

取场中一点，用一个小体积 V 包住它，表面记为 ∂V，外法向为 n。场的通量是穿出表面的面积分。让体积收缩到该点，通量与体积之比的极限定义为散度。

$$
\operatorname{div}\mathbf{F}=\lim_{V\to 0}\frac{1}{V}\iint_{\partial V}\mathbf{F}\cdot\mathbf{n}\,\mathrm{d}S \qquad (12)
$$

这个定义不依赖坐标系，适合做几何解释；要计算则通常换到直角坐标。

### 小盒推导

取一个边长为 Δx、Δy、Δz 的小长方体，中心在 (x, y, z)。先看垂直于 x 轴的两个面。右侧面外法向为 +e_x，通量约为 F_x(x + Δx/2)ΔyΔz；左侧面外法向为 −e_x，通量约为 −F_x(x − Δx/2)ΔyΔz。两者相加，

$$
\Phi_x\approx\left[F_x\left(x+\frac{\Delta x}{2}\right)-F_x\left(x-\frac{\Delta x}{2}\right)\right]\Delta y\,\Delta z \qquad (13)
$$

对括号内做一阶泰勒展开。两项的一阶项相加，二阶项相消。

$$
\Phi_x\approx\frac{\partial F_x}{\partial x}\,\Delta x\,\Delta y\,\Delta z=\frac{\partial F_x}{\partial x}\,\Delta V \qquad (14)
$$

y 方向与 z 方向的两对相对面完全同理，分别贡献 ∂_y F_y ΔV 与 ∂_z F_z ΔV。三对相对面相加再除以体积，取极限即得直角坐标表达式。

$$
\operatorname{div}\mathbf{F}=\frac{\partial F_x}{\partial x}+\frac{\partial F_y}{\partial y}+\frac{\partial F_z}{\partial z} \qquad (15)
$$

**结论 3（散度的盒式公式）**：若 F 的分量连续可微，则式 (12) 的极限存在，且等于式 (15)。

证明：上面的推导对每一对相对面给出「偏导乘以体积加高阶项」。把三对相加，通量为 (∂_x F_x + ∂_y F_y + ∂_z F_z)ΔV + o(ΔV)。除以 ΔV 并令体积趋于零，高阶项消失，得到式 (15)。证毕。

### 几何意义与例子

散度为正，表示该点像源，净往外流；散度为负，表示像汇，净往里流；散度为零，表示无源无汇，进入的量等于出去的量。

取 F = (x, y, 0)。三个偏导分别为 1、1、0。

$$
\operatorname{div}\mathbf{F}=1+1+0=2 \qquad (16)
$$

散度是常数 2，说明平面上处处是源；箭头从每个点向外放射，离原点越远越长。注意散度是标量，它不告诉你「往哪个方向流」，只告诉你「是否凭空多出来」。

## 旋度：单位面积的环流

### 环量密度定义

在一点附近取一块小面积 A，边界为闭合曲线 ∂A，法向单位矢量为 n。场沿边界的环量是线积分。面积收缩时，环量与面积之比的极限是旋度在 n 方向上的分量。

$$
\left(\operatorname{curl}\mathbf{F}\right)\cdot\mathbf{n}=\lim_{A\to 0}\frac{1}{A}\oint_{\partial A}\mathbf{F}\cdot\mathrm{d}\mathbf{r} \qquad (17)
$$

### 小矩形推导

在 xy 平面取一个边长为 Δx、Δy 的小矩形，按逆时针绕行。四条边的线积分依次为：

- 下边：沿 +x，约 F_x(x, y)Δx；
- 右边：沿 +y，约 F_y(x + Δx, y)Δy；
- 上边：沿 −x，约 −F_x(x, y + Δy)Δx；
- 左边：沿 −y，约 −F_y(x, y)Δy。

把四项相加并重新配对。

$$
\Gamma_z\approx\left[F_y(x+\Delta x,y)-F_y(x,y)\right]\Delta y-\left[F_x(x,y+\Delta y)-F_x(x,y)\right]\Delta x \qquad (18)
$$

对两个方括号做一阶展开，再除以面积 ΔxΔy。

$$
\frac{\Gamma_z}{\Delta x\,\Delta y}\approx\frac{\partial F_y}{\partial x}-\frac{\partial F_x}{\partial y} \qquad (19)
$$

这就是旋度的 z 分量。对 yz 平面与 zx 平面重复同样的推导，得到另外两个分量。

$$
\operatorname{curl}\mathbf{F}=\left(\frac{\partial F_z}{\partial y}-\frac{\partial F_y}{\partial z},\ \frac{\partial F_x}{\partial z}-\frac{\partial F_z}{\partial x},\ \frac{\partial F_y}{\partial x}-\frac{\partial F_x}{\partial y}\right) \qquad (20)
$$

**结论 4（旋度的矩形公式）**：若 F 的分量连续可微，则式 (17) 的极限存在，且三个分量由式 (20) 给出。

证明：式 (18) 与 (19) 给出 z 分量；另外两个平面给出 x 与 y 分量。每一块的误差都是 o(ΔA)，除以面积后消失。证毕。

### 旋转场与 2ω

取 F = (−y, x, 0)。计算两个需要的偏导：∂_x F_y = 1，∂_y F_x = −1。

$$
\operatorname{curl}\mathbf{F}=(0,\ 0,\ 1-(-1))=(0,\ 0,\ 2) \qquad (21)
$$

这是绕 z 轴的刚性旋转：箭头处处沿圆周切线方向。更一般地，角速度为 ω 的旋转场为 F = ω × r。

$$
\mathbf{F}=\boldsymbol{\omega}\times\mathbf{r}=\left(\omega_y z-\omega_z y,\ \omega_z x-\omega_x z,\ \omega_x y-\omega_y x\right) \qquad (22)
$$

**结论 5（旋转场的旋度）**：对任意常矢量 ω，curl(ω × r) = 2ω。

证明：逐分量计算。x 分量为

$$
\left[\operatorname{curl}\mathbf{F}\right]_x=\frac{\partial F_z}{\partial y}-\frac{\partial F_y}{\partial z}=\omega_x-\left(-\omega_x\right)=2\omega_x \qquad (23)
$$

y 分量为 ∂_z F_x − ∂_x F_z = ω_y − (−ω_y) = 2ω_y；z 分量为 ∂_x F_y − ∂_y F_x = ω_z − (−ω_z) = 2ω_z。三个分量合起来就是 2ω。证毕。

这解释了式 (21)：角速度 ω = (0, 0, 1)，旋度为 2ω = (0, 0, 2)。旋度不是角速度本身，而是角速度的两倍；这个因子 2 来自环量对面积的比值，而不是定义上的约定。

## 拉普拉斯算子：先梯度，再散度

把梯度与散度串联，输入标量与输出标量，得到二阶算子。

$$
\Delta f=\operatorname{div}\left(\operatorname{grad}f\right)=\nabla\cdot\left(\nabla f\right) \qquad (24)
$$

展开时不跳步：∇f 的三个分量是 ∂_x f、∂_y f、∂_z f，再分别求散度。

$$
\Delta f=\frac{\partial}{\partial x}\left(\frac{\partial f}{\partial x}\right)+\frac{\partial}{\partial y}\left(\frac{\partial f}{\partial y}\right)+\frac{\partial}{\partial z}\left(\frac{\partial f}{\partial z}\right) \qquad (25)
$$

$$
\Delta f=\frac{\partial^{2}f}{\partial x^{2}}+\frac{\partial^{2}f}{\partial y^{2}}+\frac{\partial^{2}f}{\partial z^{2}} \qquad (26)
$$

几何上，Δf 衡量一点与邻域平均值的偏差：碗形处为正，峰形处为负，线性斜坡处为零。取 f = x² + y²，两个二阶导都是 2，第三个为零。

$$
\Delta f=2+2+0=4 \qquad (27)
$$

## 恒等式：五条结论与完整证明

### 梯度无旋

**结论 6**：若 φ 具有连续二阶偏导，则

$$
\operatorname{curl}\left(\nabla\varphi\right)=\mathbf{0} \qquad (28)
$$

证明：令 g = ∇φ，其分量为 φ_x、φ_y、φ_z。旋度的 x 分量是

$$
\left[\operatorname{curl}\mathbf{g}\right]_x=\frac{\partial}{\partial y}\left(\frac{\partial\varphi}{\partial z}\right)-\frac{\partial}{\partial z}\left(\frac{\partial\varphi}{\partial y}\right)=\varphi_{zy}-\varphi_{yz} \qquad (29)
$$

由于二阶偏导连续，混合偏导可交换，φ_zy = φ_yz，故 x 分量为零。y 分量为 φ_xz − φ_zx = 0，z 分量为 φ_yx − φ_xy = 0。三个分量都为零，故旋度为零矢量。证毕。

几何解释：梯度场沿闭合路径的环量为零，因为 ∮∇φ·dr = φ(终点) − φ(起点) = 0；没有环流，自然没有旋涡。

### 旋度无源

**结论 7**：若 F 具有连续二阶偏导，则

$$
\operatorname{div}\left(\operatorname{curl}\mathbf{F}\right)=0 \qquad (30)
$$

证明：把式 (20) 的三个分量代入散度，展开成六项。

$$
\operatorname{div}\left(\operatorname{curl}\mathbf{F}\right)=\frac{\partial}{\partial x}\left(\frac{\partial F_z}{\partial y}-\frac{\partial F_y}{\partial z}\right)+\frac{\partial}{\partial y}\left(\frac{\partial F_x}{\partial z}-\frac{\partial F_z}{\partial x}\right)+\frac{\partial}{\partial z}\left(\frac{\partial F_y}{\partial x}-\frac{\partial F_x}{\partial y}\right) \qquad (31)
$$

$$
=\left(F_{z,xy}-F_{y,xz}\right)+\left(F_{x,yz}-F_{z,yx}\right)+\left(F_{y,zx}-F_{x,zy}\right) \qquad (32)
$$

三对混合偏导相等：F_z,xy = F_z,yx，F_x,yz = F_x,zy，F_y,zx = F_y,xz。逐对相消，总和为零。证毕。

几何解释：旋度场不可能在一点凭空冒出或消失，流线只能闭合或延伸到边界与无穷。

### 标量乘矢量场的散度

**结论 8**：若 f 可微、F 可微，则

$$
\operatorname{div}\left(f\mathbf{F}\right)=\nabla f\cdot\mathbf{F}+f\,\operatorname{div}\mathbf{F} \qquad (33)
$$

证明：逐分量使用乘积法则。

$$
\operatorname{div}\left(f\mathbf{F}\right)=\frac{\partial}{\partial x}\left(fF_x\right)+\frac{\partial}{\partial y}\left(fF_y\right)+\frac{\partial}{\partial z}\left(fF_z\right) \qquad (34)
$$

$$
=\left(f_xF_x+fF_{x,x}\right)+\left(f_yF_y+fF_{y,y}\right)+\left(f_zF_z+fF_{z,z}\right) \qquad (35)
$$

把含 f 偏导的三项合起来是 ∇f·F，把含 F 偏导的三项合起来是 f div F。证毕。

### 标量乘矢量场的旋度

**结论 9**：在同样条件下，

$$
\operatorname{curl}\left(f\mathbf{F}\right)=\nabla f\times\mathbf{F}+f\,\operatorname{curl}\mathbf{F} \qquad (36)
$$

证明：只算 x 分量，另外两个分量完全同理。

$$
\left[\operatorname{curl}\left(f\mathbf{F}\right)\right]_x=\frac{\partial}{\partial y}\left(fF_z\right)-\frac{\partial}{\partial z}\left(fF_y\right) \qquad (37)
$$

$$
=f_yF_z+fF_{z,y}-f_zF_y-fF_{y,z}=\left(f_yF_z-f_zF_y\right)+f\left(F_{z,y}-F_{y,z}\right) \qquad (38)
$$

第一个括号正是 (∇f × F)_x，第二个括号是 f(curl F)_x。对 y、z 分量重复同样的展开即可。证毕。

注意顺序：梯度要写在叉乘的左边。因为叉乘反交换，若写成 F × ∇f，整体会多一个负号。

### 叉乘场的散度

**结论 10**：若 F、G 连续可微，则

$$
\operatorname{div}\left(\mathbf{F}\times\mathbf{G}\right)=\mathbf{G}\cdot\operatorname{curl}\mathbf{F}-\mathbf{F}\cdot\operatorname{curl}\mathbf{G} \qquad (39)
$$

证明：先写出叉乘的三个分量。

$$
\mathbf{F}\times\mathbf{G}=\left(F_yG_z-F_zG_y,\ F_zG_x-F_xG_z,\ F_xG_y-F_yG_x\right) \qquad (40)
$$

对第一个分量求 ∂_x，对第二个求 ∂_y，对第三个求 ∂_z，展开共十二项。按「对 F 求导」与「对 G 求导」重新分组。含 G 导数的项为

$$
G_z\left(F_{y,x}-F_{x,y}\right)+G_x\left(F_{z,y}-F_{y,z}\right)+G_y\left(F_{x,z}-F_{z,x}\right)=\mathbf{G}\cdot\operatorname{curl}\mathbf{F} \qquad (41)
$$

含 F 导数的项为

$$
F_y\left(G_{z,x}-G_{x,z}\right)+F_z\left(G_{x,y}-G_{y,x}\right)+F_x\left(G_{y,z}-G_{z,y}\right)=-\mathbf{F}\cdot\operatorname{curl}\mathbf{G} \qquad (42)
$$

两组相加即式 (39)。证毕。

### 两个补充恒等式

下面两条在电磁学与流体力学中反复出现，证明同样只用到乘积法则与混合偏导交换。

$$
\Delta\left(fg\right)=f\,\Delta g+g\,\Delta f+2\nabla f\cdot\nabla g \qquad (43)
$$

证明：先对乘积取梯度，∇(fg) = f∇g + g∇f；再取散度，并用结论 8。

$$
\Delta\left(fg\right)=\nabla\cdot\left(f\nabla g\right)+\nabla\cdot\left(g\nabla f\right)=\nabla f\cdot\nabla g+f\Delta g+\nabla g\cdot\nabla f+g\Delta f \qquad (44)
$$

两个点积相同，合并为 2∇f·∇g。证毕。

$$
\operatorname{curl}\left(\operatorname{curl}\mathbf{F}\right)=\nabla\left(\nabla\cdot\mathbf{F}\right)-\Delta\mathbf{F} \qquad (45)
$$

这里的 ΔF 表示对每个分量分别取拉普拉斯。证明：只算 x 分量。

$$
\left[\operatorname{curl}\left(\operatorname{curl}\mathbf{F}\right)\right]_x=\frac{\partial}{\partial y}\left(\frac{\partial F_y}{\partial x}-\frac{\partial F_x}{\partial y}\right)-\frac{\partial}{\partial z}\left(\frac{\partial F_x}{\partial z}-\frac{\partial F_z}{\partial x}\right) \qquad (46)
$$

$$
=F_{y,xy}-F_{x,yy}-F_{x,zz}+F_{z,xz}=\frac{\partial}{\partial x}\left(F_{y,y}+F_{z,z}\right)-\left(F_{x,yy}+F_{x,zz}\right) \qquad (47)
$$

在括号中补上 F_x,x 再减去，得到

$$
=\frac{\partial}{\partial x}\left(F_{x,x}+F_{y,y}+F_{z,z}\right)-\left(F_{x,xx}+F_{x,yy}+F_{x,zz}\right)=\frac{\partial}{\partial x}\left(\nabla\cdot\mathbf{F}\right)-\Delta F_x \qquad (48)
$$

y、z 分量同理。证毕。

## 保守场与旋度为零

**结论 11（保守场判据）**：设 D 是 R³ 中的单连通开区域，F 在 D 上连续可微。则以下三条等价：

- F 是某个标量函数的梯度，即存在 φ 使 F = ∇φ；
- F 沿 D 内任意闭合曲线的环量为零；
- 在 D 内处处有 curl F = 0。

证明按循环顺序进行。

第一步，若 F = ∇φ，则对任意闭合曲线 C，

$$
\oint_C\mathbf{F}\cdot\mathrm{d}\mathbf{r}=\oint_C\nabla\varphi\cdot\mathrm{d}\mathbf{r}=\varphi\left(\text{终点}\right)-\varphi\left(\text{起点}\right)=0 \qquad (49)
$$

因为闭合曲线的起点与终点相同。

第二步，若所有闭合曲线环量为零，则线积分与路径无关。固定基点 P₀，定义

$$
\varphi(\mathbf{P})=\int_{\mathbf{P}_0}^{\mathbf{P}}\mathbf{F}\cdot\mathrm{d}\mathbf{r} \qquad (50)
$$

路径无关保证这个定义唯一。沿 e_i 方向走一小段 t，函数差为

$$
\varphi\left(\mathbf{P}+t\mathbf{e}_i\right)-\varphi(\mathbf{P})=\int_0^t F_i\left(\mathbf{P}+s\mathbf{e}_i\right)\mathrm{d}s \qquad (51)
$$

两边除以 t 并令 t 趋于零，由 F_i 的连续性得 ∂_i φ = F_i。三个分量合起来即 ∇φ = F。

第三步，若 F = ∇φ，由结论 6 得 curl F = 0。

第四步，若 curl F = 0，取任意闭合曲线 C。单连通保证 C 能在 D 内张成一张曲面 S，应用斯托克斯定理。

$$
\oint_C\mathbf{F}\cdot\mathrm{d}\mathbf{r}=\iint_S\left(\operatorname{curl}\mathbf{F}\right)\cdot\mathbf{n}\,\mathrm{d}S=0 \qquad (52)
$$

于是环量为零，回到第二步。四条推理闭合，三条命题等价。证毕。

**边界情形：单连通不能省略**。在挖去原点的平面 D = R² 减去 (0, 0) 上，取

$$
\mathbf{F}=\left(-\frac{y}{x^{2}+y^{2}},\ \frac{x}{x^{2}+y^{2}},\ 0\right) \qquad (53)
$$

直接计算可得 curl F = 0。但沿单位圆逆时针积分，

$$
\oint_{x^{2}+y^{2}=1}\mathbf{F}\cdot\mathrm{d}\mathbf{r}=\int_0^{2\pi}\left(-\sin\theta,\ \cos\theta\right)\cdot\left(-\sin\theta,\ \cos\theta\right)\mathrm{d}\theta=2\pi \qquad (54)
$$

环量不为零，所以 F 不是保守场，也不存在全局势函数。原因正是定义域有洞：单位圆无法在 D 内张成一张完全落在 D 中的曲面，斯托克斯定理的前提失效。这个场描述的是绕原点的涡，旋度处处为零却在洞周围留下非零环量。

## Helmholtz 分解

**结论 12（Helmholtz 分解）**：设 F 是 R³ 上足够光滑、在无穷远衰减足够快的矢量场。则存在标量场 φ 与矢量场 A，使得

$$
\mathbf{F}=\nabla\varphi+\nabla\times\mathbf{A},\qquad \nabla\cdot\mathbf{A}=0 \qquad (55)
$$

并且在衰减条件与库仑规范下，φ（差一个常数）与 A 唯一。

证明思路如下，分三步。

第一步，解泊松方程。令 φ 满足

$$
\Delta\varphi=\nabla\cdot\mathbf{F},\qquad \varphi(\mathbf{r})=-\frac{1}{4\pi}\int\frac{\nabla'\cdot\mathbf{F}(\mathbf{r}')}{\left\lvert\mathbf{r}-\mathbf{r}'\right\rvert}\,\mathrm{d}V' \qquad (56)
$$

这个积分是牛顿势的标准解；衰减条件保证积分收敛。

第二步，令 W = F − ∇φ。由结论 7 与第一步，

$$
\nabla\cdot\mathbf{W}=\nabla\cdot\mathbf{F}-\Delta\varphi=0 \qquad (57)
$$

即 W 无源。

第三步，对无源场 W 构造矢量势。定义

$$
\mathbf{A}(\mathbf{r})=\frac{1}{4\pi}\int\frac{\nabla'\times\mathbf{W}(\mathbf{r}')}{\left\lvert\mathbf{r}-\mathbf{r}'\right\rvert}\,\mathrm{d}V' \qquad (58)
$$

利用恒等式 Δ(1/(4πr)) = −δ(r) 与 ∇×(∇×W) = ∇(∇·W) − ΔW，可得 ∇×A = W；同时 ∇·A = 0，即库仑规范。于是 F = ∇φ + ∇×A。证毕。

唯一性说明：若有两组解，作差得 ∇(φ₁ − φ₂) = ∇×(A₂ − A₁)。两边取散度，得 Δ(φ₁ − φ₂) = 0；在无穷远衰减的调和函数只能是常数。再对 A 的差取旋度为零，得到梯度场，配合 ∇·A = 0 与衰减条件可推出它为零。因此分解在规范固定后唯一。

分解的物理读法：∇φ 是无旋部分（纵场），∇×A 是无源部分（横场）。静电场只有纵场，磁场只有横场，一般的电磁场两者兼有。

## 典型例题

### 例题 1：梯度与方向导数

设 f = x²y + z³，求 ∇f 在点 (1, 2, 1) 的值，以及沿方向 u = (1, 1, 1)/√3 的方向导数。

解答：三个偏导为 ∂_x f = 2xy、∂_y f = x²、∂_z f = 3z²。在 (1, 2, 1) 处

$$
\nabla f=(4,\ 1,\ 3) \qquad (59)
$$

方向导数为

$$
D_{\mathbf{u}}f=\frac{4+1+3}{\sqrt{3}}=\frac{8}{\sqrt{3}}\approx4.619 \qquad (60)
$$

梯度模长为 √(16 + 1 + 9) = √26 ≈ 5.099，这是所有方向导数的上界，与结论 1 一致。

### 例题 2：方向导数与等值线切向

设 f = x² + y²，在点 (1, 1) 求沿指向 (2, 3) 的方向导数，并求一个使方向导数为零的方向。

解答：∇f = (2x, 2y)，在 (1, 1) 处为 (2, 2)。指向 (2, 3) 的单位方向为 (1, 2)/√5。

$$
D_{\mathbf{u}}f=\frac{2\cdot1+2\cdot2}{\sqrt{5}}=\frac{6}{\sqrt{5}}\approx2.683 \qquad (61)
$$

与 (2, 2) 垂直的方向为 (−1, 1)/√2，沿它的方向导数为 (−2 + 2)/√2 = 0。这正是过 (1, 1) 的等值圆 x² + y² = 2 的切线方向，与结论 2 一致。

### 例题 3：散度与旋度的完整计算

设 F = (x², xy, z)。求 div F 与 curl F。

解答：散度为

$$
\operatorname{div}\mathbf{F}=\frac{\partial}{\partial x}\left(x^{2}\right)+\frac{\partial}{\partial y}\left(xy\right)+\frac{\partial}{\partial z}\left(z\right)=2x+x+1=3x+1 \qquad (62)
$$

旋度三个分量为

$$
\left[\operatorname{curl}\mathbf{F}\right]_x=\frac{\partial z}{\partial y}-\frac{\partial\left(xy\right)}{\partial z}=0,\qquad \left[\operatorname{curl}\mathbf{F}\right]_y=\frac{\partial\left(x^{2}\right)}{\partial z}-\frac{\partial z}{\partial x}=0 \qquad (63)
$$

$$
\left[\operatorname{curl}\mathbf{F}\right]_z=\frac{\partial\left(xy\right)}{\partial x}-\frac{\partial\left(x^{2}\right)}{\partial y}=y \qquad (64)
$$

所以 curl F = (0, 0, y)。在点 (1, 1, 1) 处散度为 4，旋度为 (0, 0, 1)。散度随 x 增大，旋度随 y 增大，两者描述的是场的不同侧面。

### 例题 4：无旋但不保守

对式 (53) 的涡场，验证 curl F = 0 与单位圆环量为 2π。

解答：记 r² = x² + y²。计算 z 分量。

$$
\left[\operatorname{curl}\mathbf{F}\right]_z=\frac{\partial}{\partial x}\left(\frac{x}{r^{2}}\right)-\frac{\partial}{\partial y}\left(-\frac{y}{r^{2}}\right) \qquad (65)
$$

$$
=\left(\frac{1}{r^{2}}-\frac{2x^{2}}{r^{4}}\right)+\left(\frac{1}{r^{2}}-\frac{2y^{2}}{r^{4}}\right)=\frac{2}{r^{2}}-\frac{2\left(x^{2}+y^{2}\right)}{r^{4}}=0 \qquad (66)
$$

x 与 y 分量显然为零。沿单位圆参数化 r = (cosθ, sinθ)，dr = (−sinθ, cosθ)dθ，F = (−sinθ, cosθ)。

$$
\oint\mathbf{F}\cdot\mathrm{d}\mathbf{r}=\int_0^{2\pi}\left(\sin^{2}\theta+\cos^{2}\theta\right)\mathrm{d}\theta=2\pi \qquad (67)
$$

环量非零，故不保守。定义域不是单连通的，结论 11 的前提不满足。

### 例题 5：验证乘积恒等式

取 f = x、F = (x, y, z)，验证 div(fF) = ∇f·F + f div F。

解答：fF = (x², xy, xz)，散度为 2x + x + x = 4x。右边 ∇f = (1, 0, 0)，∇f·F = x；div F = 3，f div F = 3x；相加为 4x。两边相等，式 (33) 成立。

### 例题 6：Helmholtz 分解的具体例子

把 F = (−y, x, 0) 分解为梯度部分与旋度部分。

解答：取 φ = 0，则 ∇·F = 0，泊松方程 Δφ = 0 的解取零。令 A = (0, 0, −(x² + y²)/2)，则 ∇·A = 0，且

$$
\nabla\times\mathbf{A}=\left(-\frac{\partial A_z}{\partial y},\ \frac{\partial A_z}{\partial x},\ 0\right)=\left(-y,\ x,\ 0\right)=\mathbf{F} \qquad (68)
$$

所以 F 全部是无源部分，纵场为零。这与「刚性旋转没有源」的直觉一致。

## 习题

### 基础题

1. 设 f = x³y − 2yz，求 ∇f 在点 (1, 2, −1) 的值，以及沿单位方向 (2, −1, 2)/3 的方向导数。
2. 设 F = (yz, zx, xy)，求 div F 与 curl F，并指出 F 是哪个标量场的梯度。
3. 设 F = (x², xy, z)，求在点 (1, 1, 1) 处的散度与旋度。
4. 求 f = x² + y² + z² 的拉普拉斯，并说明 Δf 的符号含义。
5. 对 f = x² + y²、F = (x, y, z)，验证 div(fF) = ∇f·F + f div F。

### 进阶题

6. 证明 div(F × G) = G·curl F − F·curl G，并说明每一项的来源。
7. 证明保守场判据的三个命题等价，并指出「单连通」在证明的哪一步被使用。
8. 构造一个 curl F = 0 但在挖去原点的平面上不保守的场，计算它沿单位圆的环量。
9. 说明 Helmholtz 分解为什么需要「衰减条件」，并举出一个不满足衰减时分解不唯一的例子。
10. 证明恒等式 curl(curl F) = ∇(∇·F) − ΔF 的 x 分量，并说明它需要什么解析条件。

## 习题答案与详细解析

### 基础题解答

1. 偏导为 f_x = 3x²y、f_y = x³ − 2z、f_z = −2y。在 (1, 2, −1) 处，f_x = 6，f_y = 1 + 2 = 3，f_z = −4，所以 ∇f = (6, 3, −4)。方向导数为 (2 × 6 − 3 − 8)/3 = 1/3。

2. 散度逐项为零：∂_x(yz) = 0，∂_y(zx) = 0，∂_z(xy) = 0。旋度三个分量也都为零，例如 z 分量为 ∂_x(zx) − ∂_y(yz) = z − z = 0。因此 F 无旋；在 R³ 上单连通，由结论 11 知它保守。取 φ = xyz，则 ∇φ = (yz, zx, xy) = F。

3. 散度为 2x + x + 1 = 3x + 1，在 (1, 1, 1) 处为 4；旋度为 (0, 0, y)，在该点为 (0, 0, 1)。

4. 三个二阶导都是 2，Δf = 6。常数正拉普拉斯表示每一点都低于邻域平均值，即处处呈碗形；对 r² 这种二次函数，曲率均匀，所以 Δf 为常数。

5. 左边为 4x，右边为 x + 3x = 4x，见例题 5。

### 进阶题解答

6. 证明见式 (40) 至 (42)。含 G 导数的项重排后给出 G·curl F，因为每个分量 G_i 乘上的正是 curl F 的对应分量；含 F 导数的项重排后给出 −F·curl G，负号来自叉乘的反对称性。两项都来自乘积法则，不涉及任何几何假设。

7. 证明见式 (49) 至 (52) 的循环推理。单连通用在第四步：只有单连通才能保证任意闭合曲线在 D 内张成曲面，从而应用斯托克斯定理。若定义域有洞，闭合曲线可能绕过洞而无法收缩，斯托克斯定理不适用，反例见例题 4。

8. 取式 (53) 的 F。由式 (65) 与 (66)，curl F = 0；由式 (67)，单位圆环量为 2π。若存在势函数 φ，则沿闭合曲线的环量必须为零，与 2π 矛盾，所以不保守。

9. 衰减条件保证式 (56) 与 (58) 的积分收敛，并保证调和函数在无穷远有界，从而唯一性成立。若不衰减，可以加上任意在整个空间调和且不衰减的函数而不改变源与旋，例如在某个无源无旋区域外拼接不同的调和函数，分解就不再唯一。物理上，衰减条件对应「场源局限在有限区域」。

10. 证明见式 (46) 至 (48)。关键步骤是在括号中补上 F_x,x 再减去，这一步只是恒等变形；需要 F 具有连续二阶偏导，才能把 F_x,yy 写成 F_y,xy 并交换求导次序。若二阶偏导不连续，恒等式可能失效。

## 常见错误与边界情形

- 把 ∇ 当成一个普通矢量去「乘」标量。∇ 是算子，必须先写清楚作用对象与作用方式。
- 把散度算成矢量。散度是标量；旋度才是矢量。
- 旋度分量符号写反。记住 z 分量是 ∂_x F_y − ∂_y F_x，顺序与右手定则绑定。
- 在 curl(fF) 中把梯度写在叉乘右边，导致整体差一个负号。
- 忘记混合偏导交换需要二阶偏导连续。分段定义的场在拼接处可能不满足。
- 认为 curl F = 0 就一定保守。必须加上单连通；涡场是标准反例。
- 在有洞区域上用斯托克斯定理。曲面可能无法完全落在定义域内。
- 把 Δf 理解成「梯度的长度」。Δf 是梯度场的散度，是标量；|∇f| 才是梯度的长度。
- 认为散度为零就没有流动。无源场可以有环流，例如涡场散度为零但环量非零。
- 认为旋度为零就没有旋转。涡场每一点都在局部打转，但旋度为零，因为环量密度在极限下消失。
- 在 Helmholtz 分解中忽略规范与衰减条件，导致把「差一个调和函数」误当成不同的物理场。
- 把动画中的 spin 参数当成场本身的性质。spin 只改变演示相位，不改变场的数学值。

## 与动画步骤的对应

| 动画步骤 | 画面重点 | 对应讲义内容 |
| --- | --- | --- |
| 算子 | ∇ 的三个偏导与三种作用 | 式 (1) 至 (4) 与类型表 |
| 梯度 | 箭头指向上升最快方向 | 式 (7) 至 (11)、结论 1 与 2 |
| 散度 | 小盒子的净流出 | 式 (12) 至 (16)、结论 3 |
| 旋度 | 小风车与环流 | 式 (17) 至 (23)、结论 4 与 5 |
| 组合 | Δ = div(grad) | 式 (24) 至 (27) |
| 恒等式 | 六项成对相消 | 式 (28) 至 (48) |
| 实验 | scale 与 spin 滑块 | 式 (5)、(6) 与线性缩放 |

动画把同一个 scale 作用在三个示例场上：梯度场 f = x² + y²、散度场 F = (x, y, 0)、旋转场 F = (−y, x, 0)。由线性性，三个读数都按同一倍数变化，方向与源汇位置不变。这与本讲式 (5)、(6) 完全一致。spin 只改演示动画的相位，不进入任何数学公式。

## 小结

- ∇ 的身份由输入输出类型决定：标量到矢量是梯度，矢量到标量是散度，矢量到矢量是旋度。
- 梯度是唯一的最速上升方向，模长是该方向的变化率；它垂直于等值面。
- 散度是通量密度，正为源、负为汇；旋度是环量密度，方向为环流最强平面的法向。
- 拉普拉斯是梯度的散度，逐方向求两次导。
- 五条核心恒等式全部来自乘积法则与混合偏导交换：curl grad = 0、div curl = 0、div(fF) = ∇f·F + f div F、curl(fF) = ∇f × F + f curl F、div(F × G) = G·curl F − F·curl G。
- 保守场等价于无旋，但只在单连通区域成立；涡场说明洞会破坏等价性。
- Helmholtz 分解把任意衰减场拆成无旋的纵场与无源的横场，证明靠泊松方程与库仑规范。
