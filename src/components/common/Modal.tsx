import {type ReactNode } from "react";


interface Props {
open: boolean;
children: ReactNode;
}


const Modal = ({ open, children }: Props) => {
if (!open) return null;
return (
<div className="fixed inset-0 bg-black/40 flex items-center justify-center">
<div className="bg-white p-4 rounded">{children}</div>
</div>
);
};


export default Modal;