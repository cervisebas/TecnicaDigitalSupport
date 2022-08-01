import { createAnimation, IonImg, IonModal, IonSpinner } from "@ionic/react";
import React, { Component } from "react"

import './ScreenLoading.scss'

type IProps = {
    visible: boolean;
};
type IState = {};

export default class ScreenLoading extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.resizeModal = this.resizeModal.bind(this);
    }
    private ModalRef: HTMLIonModalElement | null = null;
    resizeModal(): any {
        var div: any = this.ModalRef!.shadowRoot!.querySelector('div.modal-wrapper');
        div.style.height = '100%';
        div.style.width = '100%';
    }
    render() {
        return(<IonModal ref={(ref)=>this.ModalRef=ref} isOpen={this.props.visible} onWillPresent={this.resizeModal} backdropDismiss={false} animated={false}>
            <div id={'ScreenLoading'}>
                <div className={"logo-tecnica"} />
                <div className="spinner">
                    <IonSpinner />
                </div>
            </div>
        </IonModal>);
    }
}