import { IonButton, IonIcon, IonModal } from "@ionic/react";
import { chevronBackSharp } from "ionicons/icons";
import { decode } from "base-64";
import { Component, PureComponent } from "react";
import { urlBase } from "../scripts/ApiFamily";
import { StudentsData } from "../scripts/types";

import "./Options.scss";

type IProps = {
    visible: boolean;
    data: StudentsData | undefined;
    close: ()=>any;
    showLoading: (visible: boolean, text: string)=>any;
    reVerify: ()=>any;
};
type IState = {};

export default class Options extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.calculeSize = this.calculeSize.bind(this);
        this.closeSession = this.closeSession.bind(this);
    }
    private modalRef: HTMLIonModalElement | null = null;
    calculeSize() {
        var shadowRoot = this.modalRef!.shadowRoot;
        var modal_content: any = shadowRoot?.querySelector('div.modal-wrapper');
        modal_content.style.height = 'min-content';
        modal_content.style.borderRadius = '10px';
        modal_content.style.overflow = 'visible';
        modal_content.querySelector('slot').style.borderRadius = "inherit";
    }
    closeSession() {
        this.props.showLoading(true, 'Cerrando sesión...');
        setTimeout(()=>{
            localStorage.removeItem('FamilySession');
            this.props.reVerify();
            this.props.close();
            this.props.showLoading(false, 'Cerrando sesión...');
        }, 2500);
    }
    render() {
        return(<IonModal id={"options-student"} ref={(ref)=>this.modalRef = ref} isOpen={this.props.visible} onWillPresent={this.calculeSize} onDidDismiss={this.props.close}>
            {(this.props.data)? <div>
                <div className="image">
                    <img src={`${urlBase}/image/${decode(this.props.data.picture)}`} />
                </div>
                <div className="content">
                    <IonButton className="back-button" onClick={this.props.close} fill={'clear'}>
                        <IonIcon slot={'icon-only'} icon={chevronBackSharp} />
                    </IonButton>
                    <div className="details">
                        <h2>{decode(this.props.data.name)}</h2>
                        <div className="list">
                            <PointItemList title={'Curso'} text={decode(this.props.data.curse)} />
                            <PointItemList title={'DNI'} text={decode(this.props.data.dni)} />
                            <PointItemList title={'Cumpleaños'} text={decode(this.props.data.date)} />
                            <PointItemList title={'Teléfono'} text={decode(this.props.data.tel)} />
                            <PointItemList title={'E-Mail'} text={decode(this.props.data.email)} />
                        </div>
                        <div style={{ width: '100%', paddingTop: 12, display: 'flex', justifyContent: 'center' }}>
                            <IonButton style={{ textTransform: 'uppercase' }} onClick={this.closeSession}>Cerrar sesión</IonButton>
                        </div>
                    </div>
                </div>
            </div>: <></>}
        </IonModal>);
    }
}

type IProps2 = { title: string; text: string };
class PointItemList extends PureComponent<IProps2> {
    constructor(props: IProps2) {
        super(props);
    }
    render() {
        return(<div className={'point-item'} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            <p style={{ marginLeft: 14 }}>⦿</p>
            <p style={{ marginLeft: 6, fontWeight: 'bold' }}>{`${this.props.title}:`}</p>
            <p style={{ marginLeft: 2 }}>{this.props.text}</p>
        </div>);
    }
};