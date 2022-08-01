import { IonSkeletonText } from "@ionic/react";
import { PureComponent, ReactNode } from "react";

type IProps = {
    src: string;
    style: React.CSSProperties;
};
type IState = {
    isLoading: boolean;
    source: string;
};

export default class ImageProfile extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoading: true,
            source: ''
        };
    }
    componentDidMount() {
        fetch(this.props.src)
            .then((response)=>response.blob())
            .then((blob)=>{
                const reader = new FileReader();
                reader.onloadend = ()=>this.setState({ isLoading: false, source: reader.result as string });
                reader.onerror = (reject)=>console.log(reject);
                reader.readAsDataURL(blob);
            });
    }
    render() {
        return(<div style={{ ...this.props.style, position: 'relative', padding: 0 }}>
            {(this.state.isLoading)? <IonSkeletonText
                animated={true}
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    '--background': '#FFFFFF',
                    backgroundColor: '#FFFFFF'
                }}
            />: <img
                src={this.state.source}
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    margin: 0
                }}
            />}
        </div>);
    }
}