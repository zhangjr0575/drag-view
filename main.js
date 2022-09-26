/**
 * @description 鼠标跟随指令
 */

let mousedownListener, mouseupListener;
// 支持的修饰键
const modifierKeys = ["meta", "ctrl", "alt", "shift"];
// prettier-ignore
export default {
	bind: (el, binding, { context }) => {
		const { modifiers } = binding;

		mousedownListener = function (e) {
			// 忽略右键
			if (e.button == 2) return;
			// 检查修饰键状态是否符合
			for (let i = 0; i < modifierKeys.length; i++) {
				if ((modifiers[modifiers[modifierKeys[i]]] || false) !== e[`${modifierKeys[i]}Key`]) return;
			}
			el.style.cursor = "move";
			el.style["scroll-behavior"] = "auto";
			
			const disX = e.clientX, disY = e.clientY, scrollTop = el.scrollTop, scrollLeft = el.scrollLeft;

			function mousemoveHandler(e) {
				// 移动时禁止默认事件
				e.preventDefault();

				el.scrollTop = scrollTop - (e.clientY - disY);
				el.scrollLeft = scrollLeft - (e.clientX - disX);
				// 检查是否绑定了回调函数
				typeof binding.value === "function" && binding.value.call(context, {
					scrollTop: el.scrollTop,
					scrollLeft: el.scrollLeft,
					clientWidth: el.clientWidth,
					clientHeight: el.clientHeight,
					scrollWidth: el.scrollWidth,
					scrollHeight: el.scrollHeight
				}, e);
			}
			function mouseupHandler(e) {
				el.style.cursor = "auto";
				document.removeEventListener("mousemove", mousemoveHandler);
				document.removeEventListener("mouseup", mouseupHandler);
			}
			document.addEventListener("mousemove", mousemoveHandler);
			document.addEventListener("mouseup", mouseupHandler);
		};
		mouseupListener = function (e) {
			// 忽略右键
			if (e.button == 2) return;
			// 鼠标抬起时，重新开启平滑滚动
			el.style["scroll-behavior"] = "smooth";
		};
		el.addEventListener("mousedown", mousedownListener);
		el.addEventListener("mouseup", mouseupListener);
	},
	unbind(el, binding) {
		// 解除事件监听
		el.removeEventListener("mousedown", mousedownListener);
		el.removeEventListener("mouseup", mouseupListener);
	}
};
