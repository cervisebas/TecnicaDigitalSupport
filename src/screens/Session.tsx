import { IonButton, IonLoading, IonModal, IonToast } from "@ionic/react";
import { Component } from "react";
import { Family } from "../scripts/ApiFamily";
import './Session.scss';

type IProps = {
    visible: boolean;
    goReverify: (wait: boolean)=>any;
};
type IState = {
    formDNI: string;
    showLoading: boolean;
    toastShow: boolean;
    toastText: string;
};

export default class Session extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            formDNI: '',
            showLoading: false,
            toastShow: false,
            toastText: ''
        };
        this.onChangeText = this.onChangeText.bind(this);
        this.resizeModal = this.resizeModal.bind(this);
        this.goLogin = this.goLogin.bind(this);
    }
    private ModalRef: HTMLIonModalElement | null = null;
    onChangeText(event: React.ChangeEvent<HTMLInputElement>) {
        var text = event.target.value.replace(/\D/g, '');
        this.setState({ formDNI: text });
    }
    resizeModal(): any {
        var div: any = this.ModalRef!.shadowRoot!.querySelector('div.modal-wrapper');
        div.style.height = '100%';
        div.style.width = '100%';
    }
    goLogin() {
        if (this.state.formDNI.length < 8) {
            this.setState({ toastShow: true, toastText: 'El DNI ingresado no es valido.' });
            return;
        }
        this.setState({ showLoading: true }, ()=>
            Family.open(this.state.formDNI)
                .then(()=>this.setState({ showLoading: false }, ()=>this.props.goReverify(true)))
                .catch(({ cause })=>this.setState({ showLoading: false, toastShow: true, toastText: cause }))
        );
    }
    render() {
        return(<IonModal ref={(ref)=>this.ModalRef=ref} isOpen={this.props.visible} onWillPresent={this.resizeModal} backdropDismiss={false} animated={false}>
            <div id={'session-page'}>
                <div className="title">
                    <h3>Bienvenid@ a</h3>
                    <h1><b>Tecnica</b><b>Digital</b></h1>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%', marginTop: 36 }}>
                    <input
                        className={'customInput'}
                        value={this.state.formDNI}
                        placeholder={'D.N.I'}
                        type={'number'}
                        minLength={9}
                        onChange={this.onChangeText}
                    />
                    <IonButton onClick={this.goLogin} style={{ marginTop: 16 }}>Iniciar Sesión</IonButton>
                </div>
            </div>
            <IonLoading
                isOpen={this.state.showLoading}
                message={'Espere por favor...'}
            />
            <IonToast
                isOpen={this.state.toastShow}
                onDidDismiss={()=>this.setState({ toastShow: false })}
                message={this.state.toastText}
                position={'bottom'}
                duration={3000}
                buttons={[{
                    text: 'OCULTAR',
                    role: 'cancel',
                    handler: ()=>this.setState({ toastShow: false })
                }]}
            />
        </IonModal>);
    }
}