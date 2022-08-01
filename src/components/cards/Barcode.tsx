import { useBarcode } from "next-barcode";

export default function Barcode(props: { style: React.CSSProperties; value: string; getScale: (num: number)=>number }) {
    const { inputRef } = useBarcode({
        value: props.value,
        options: {
          displayValue: false,
          background: '#FFFFFF',
          width: props.getScale(1000),
          height: props.getScale(247),
          margin: 0
        }
    });
    return(<div style={props.style}>
        <canvas
            ref={inputRef}
            style={{ width: '100%', height: '100%' }}
            width={props.getScale(1000)}
            height={props.getScale(247)}
        />
    </div>);
}