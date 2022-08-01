import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { chevronBackSharp } from "ionicons/icons";
import { PureComponent } from "react";
import "./ChangeDesing.scss";

type IProps = {
    visible: boolean;
    close: ()=>any;
    election: (desing: number)=>any;
};
type IState = {};

export default class ChangeDesing extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }
    render() {
        return(<IonModal isOpen={this.props.visible} onDidDismiss={this.props.close} animated swipeToClose>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Cambiar diseño</IonTitle>
                    <IonButtons slot={'start'}>
                        <IonButton onClick={this.props.close}>
                            <IonIcon slot={'icon-only'} icon={chevronBackSharp} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div id={'list-desings-cards'}>
                    <div className="desings d1" onClick={()=>this.props.election(0)}><img /></div>
                    <div className="desings d2" onClick={()=>this.props.election(1)}><img /></div>
                    <div className="desings d3" onClick={()=>this.props.election(2)}><img /></div>
                    <div className="desings d4" onClick={()=>this.props.election(3)}><img /></div>
                    <div className="desings d5" onClick={()=>this.props.election(4)}><img /></div>
                    <div className="desings d6" onClick={()=>this.props.election(5)}><img /></div>
                </div>
            </IonContent>
        </IonModal>);
    }
}