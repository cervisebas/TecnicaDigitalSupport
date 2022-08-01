import { Component } from "react"
import Card1 from "./cards/Card1";
import Card2 from "./cards/Card2";
import Card3 from "./cards/Card3";
import Card4 from "./cards/Card4";
import Card5 from "./cards/Card5";
import DesingDefault from "./cards/Default";

type IProps = {
    style?: React.CSSProperties;
    scale: number;
    type: number;
    image: string;
    name: string;
    dni: string;
    onPress?: ()=>any;
};
type IState = {};

export default class CustomCredential extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }
    getScale(t: number) {
        return ((this.props.scale * t) / 1);
    }
    getSize() {
        return {
            width: this.getScale(1200),
            height: this.getScale(799)
        };
    }
    render() {
        return(<div className="card-student-content" style={{ ...this.props.style }}>
            <div id={"card-student"} style={{ position: 'relative', overflow: 'hidden', ...this.getSize() }} onClick={(this.props.onPress)&&this.props.onPress}>
                {(this.props.type == 0)? <DesingDefault image={this.props.image} name={this.props.name} dni={this.props.dni} scale={this.props.scale} />:
                (this.props.type == 1)? <Card1 image={this.props.image} name={this.props.name} dni={this.props.dni} scale={this.props.scale} />:
                (this.props.type == 2)? <Card2 image={this.props.image} name={this.props.name} dni={this.props.dni} scale={this.props.scale} />:
                (this.props.type == 3)? <Card3 image={this.props.image} name={this.props.name} dni={this.props.dni} scale={this.props.scale} />:
                (this.props.type == 3)? <Card4 image={this.props.image} name={this.props.name} dni={this.props.dni} scale={this.props.scale} />:
                <Card5 image={this.props.image} name={this.props.name} dni={this.props.dni} scale={this.props.scale} />}
            </div>
        </div>);
    }
}