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

export default class DesingDefault extends PureComponent<IPropsCard, IStateCard> {
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
                src={require('../../assets/desings/default.png')}
                style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, objectFit: 'cover' }}
            />
            <ImageProfile
                src={this.props.image}
                style={{
                    position: 'absolute',
                    top: this.getScale(80),
                    left: this.getScale(60),
                    overflow: 'hidden',
                    border: `${this.getScale(8)}px solid #0038FF`,
                    backgroundColor: '#0038FF',
                    borderRadius: this.getScale(16),
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
                    color: '#000000',
                    justifyContent: 'center',
                    width: this.getScale(780),
                    fontSize: this.getScale(64),
                    margin: 0
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