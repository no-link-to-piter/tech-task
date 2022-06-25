import React from "react";

import "./style.sass";

type Props = {
    children: (JSX.Element | null)[]
}

const DropdownElement = ({
    children
}: Props) => (
    <>
        {children}
    </>
)

export { DropdownElement };