## Describe

视图跟随鼠标自由移动vue2指令

## Installation

```
$ npm i @zhangjr0575/view-free-visual
```
## 指令修饰符支持
支持绑定meta、ctrl、alt、shift四组按键修饰符,将会严格检查修饰键按下状态

## 指令值支持绑定一个回调函数但不是必须的,在视图位置发生变化时, 将会检查绑定值是否是一个回调函数, 当绑定值为函数时将会触发该回调函数

## 在vue文件中使用
```vue
<template>
	<!--元素位置被更新时的回调函数并不是必须的-->
	<div style="width: 500px; height: 500px" v-viewFreeVisual="freeVisualCallback">
		<div style="width: 1500px; height: 1500px"></div>
	</div>
</template>

<script>
import viewFreeVisual from '@zhangjr0575/view-free-visual';

export default {
	directives: { viewFreeVisual },
	methods: {
		freeVisualCallback({ scrollTop, scrollLeft, clientWidth, clientHeight }, evt) {}
	}
}
</script>
```
