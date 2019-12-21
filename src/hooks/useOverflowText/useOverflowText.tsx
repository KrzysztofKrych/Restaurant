import { useEffect, useState, CSSProperties } from "react";


const useOverflowText = (overflow: number) => {
    const [style, setStyle] = useState<CSSProperties>();
    const overflowStyles: CSSProperties = {
        position: 'absolute',
        border: '1px solid #ddd',
        background: '#fafafa',
        zIndex: 10,
        boxShadow: '0px 0px 5px rgba(128, 128, 128, 0.25)',
        borderRadius: '3px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        transform: 'translate(0%,-50%)',
        maxWidth: '100%'
    }


    useEffect(() => {
        if(overflow > -1) setStyle(overflowStyles);
        else setStyle({});
    }, [overflow]);
    return style;
}

export default useOverflowText;