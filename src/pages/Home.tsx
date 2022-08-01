import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { closeSharp, personCircleOutline } from 'ionicons/icons';
import { Component } from 'react';
import ImageViewer from 'react-simple-image-viewer';
import Options from '../screens/Options';
import { StudentsData } from '../scripts/types';
import Contents from './Content';

type IProps = {
  reVerify: ()=>any;
};
type IState = {
  disableButton: boolean;
  optionsVisible: boolean;
  dataUser: StudentsData | undefined;
  loadingVisible: boolean;
  loadingText: string;
  isViewerOpen: boolean;
  imageShow: string;
};

export default class Home extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      disableButton: true,
      optionsVisible: false,
      dataUser: undefined,
      loadingVisible: false,
      loadingText: '',
      isViewerOpen: false,
      imageShow: ''
    };
  }
  render() {
    return (
      <IonPage>
        <IonContent fullscreen>
          <IonHeader>
            <IonToolbar>
              <IonTitle>TecnicaDigital</IonTitle>
              <IonButtons slot={"end"}>
                <IonButton disabled={this.state.disableButton} onClick={()=>this.setState({ optionsVisible: true })}>
                  <IonIcon slot="icon-only" icon={personCircleOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <Contents
            setLoadData={(disableButton, dataUser)=>this.setState({ disableButton, dataUser })}
            openImageViewer={(source)=>this.setState({ isViewerOpen: true, imageShow: source })}
          />
          <Options
            visible={this.state.optionsVisible}
            close={()=>this.setState({ optionsVisible: false })}
            data={this.state.dataUser}
            showLoading={(loadingVisible, loadingText)=>this.setState({ loadingVisible, loadingText })}
            reVerify={this.props.reVerify}
          />
          <IonLoading
            isOpen={this.state.loadingVisible}
            message={this.state.loadingText}
          />
        </IonContent>
        {(this.state.isViewerOpen)&&<ImageViewer
          src={[this.state.imageShow]}
          currentIndex={0}
          disableScroll={true}
          closeOnClickOutside={true}
          backgroundStyle={{ backgroundColor: 'rgba(0, 0, 0, .8)' }}
          onClose={()=>this.setState({ isViewerOpen: false })}
          closeComponent={<IonButton fill={'clear'}>
            <IonIcon slot={'icon-only'} icon={closeSharp} />
          </IonButton>}
        />}
      </IonPage>
    );
  }
}