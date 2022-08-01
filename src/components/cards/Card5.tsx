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

export default class Card5 extends PureComponent<IPropsCard, IStateCard> {
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
                src={require('../../assets/desings/card5.png')}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    objectFit: 'cover'
                }}
            />
            <ImageProfile
                src={this.props.image}
                style={{
                    position: 'absolute',
                    top: this.getScale(85),
                    left: this.getScale(51),
                    overflow: 'hidden',
                    backgroundColor: '#000000',
                    borderRadius: this.getScale(14),
                    width: this.getScale(300),
                    height: this.getScale(300),
                    objectFit: 'cover'
                }}
            />
            <h1
                style={{
                    position: 'absolute',
                    left: this.getScale(420),
                    top: this.getScale(192),
                    color: '#FFFFFF',
                    justifyContent: 'center',
                    width: this.getScale(780),
                    fontSize: this.getScale(64),
                    margin: 0,
                    textShadow: `${this.getScale(2.5)}px ${this.getScale(2.5)}px ${this.getScale(2)}px rgba(255,255,255,0.4)`
                }}
            >{this.props.name}</h1>
            <Barcode
                value={`eest${this.props.dni}`}
                getScale={this.getScale}
                style={{
                    position: 'absolute',
                    top: this.getScale(495),
                    left: this.getScale(100),
                    width: this.getScale(1000),
                    height: this.getScale(247)
                }}
            />
        </>);
    }
}