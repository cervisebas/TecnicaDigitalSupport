import { PureComponent } from "react";
import Barcode from "./Barcode";
import ImageProfile from "./ImageProfile";

type IPropsCard = {
    scale: number;
    image: string;
    name: string;
    dni: string;
};
type IStateCard = {
    textTop: number;
};

export default class Card2 extends PureComponent<IPropsCard, IStateCard> {
    constructor(props: IPropsCard) {
        super(props);
        this.state = {
            textTop: 0
        };
        this.getScale = this.getScale.bind(this);
    }
    getScale(t: number) {
        return ((this.props.scale * t) / 1);
    }
    render() {
        return(<>
            <img
                src={require('../../assets/desings/card2.png')}
                style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, objectFit: 'cover' }}
            />
            <ImageProfile
                src={this.props.image}
                style={{
                    position: 'absolute',
                    top: this.getScale(246),
                    left: this.getScale(140),
                    overflow: 'hidden',
                    border: `${this.getScale(8)}px solid #0038FF`,
                    backgroundColor: '#0038FF',
                    width: this.getScale(308),
                    height: this.getScale(308),
                    borderRadius: this.getScale(308),
                    objectFit: 'cover'
                }}
            />
            <h1
                style={{
                    position: 'absolute',
                    left: this.getScale(565),
                    top: this.getScale(270),
                    color: '#000000',
                    justifyContent: 'center',
                    width: this.getScale(563),
                    fontSize: this.getScale(48),
                    margin: 0
                }}
            >{this.props.name}</h1>
            <Barcode
                value={`eest${this.props.dni}`}
                getScale={this.getScale}
                style={{
                    position: 'absolute',
                    top: this.getScale(432),
                    left: this.getScale(576),
                    width: this.getScale(526),
                    height: this.getScale(130)
                }}
            />
        </>);
    }
}