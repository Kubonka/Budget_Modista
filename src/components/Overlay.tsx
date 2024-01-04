import React, { useEffect, useState } from "react";
import classNames from "classnames";
import "./index.scss";

// const StyledOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;

//   /* Choose whatever z-index makes most sense to you */
//   z-index: 1050;
//   isolation: isolate;
// `
/* Workaround for touch events propagating to underlying elements https://github.com/radix-ui/primitives/issues/1658 */
const Overlay = ({ open }: { open: boolean }) => {
	const [visible, setVisible] = useState(open);
	useEffect(() => {
		if (!open) {
			const timer = setTimeout(() => {
				setVisible(false);
			}, 200);
			return () => {
				clearTimeout(timer);
			};
		}
		setVisible(true);
		return () => {};
	}, [open]);

	return visible ? (
		<div
			className="fixed top-0 right-0 bottom-0 left-0 z-[900]"
			onClick={(e) => e.stopPropagation()}
		/>
	) : null;
};
export default Overlay;
