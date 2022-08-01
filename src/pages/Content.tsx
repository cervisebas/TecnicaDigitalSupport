import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonLabel, IonLoading, IonProgressBar, IonToast } from "@ionic/react";
import { brushOutline, downloadOutline, refreshOutline, shareSocialOutline } from "ionicons/icons";
import { Component, PureComponent } from "react";
import { decode } from "base-64";
import { toPng, toBlob } from "html-to-image";
import download from "downloadjs";
import { Family, urlBase } from "../scripts/ApiFamily";
import { FamilyDataAssist, StudentsData } from "../scripts/types";
import ChangeDesing from "../screens/ChangeDesing";
import CustomCredential from "../components/CustomCredential";

type IProps = {
    setLoadData: (active: boolean, data: StudentsData | undefined)=>any;
    openImageViewer: (source: string)=>any;
};
type IState = {
    isLoading: boolean;
    isError: boolean;
    messageError: string;
    dataUser: StudentsData | undefined;
    changeDesingVisible: boolean;
    designElection: number;
    isLoadingAssist: boolean;
    dataAssist: FamilyDataAssist[] | undefined;
    textAssist: string;
    textNotAssist: string;
    textTotal: string;
    scaleImage: number;
    loadingVisible: boolean;
    loadingText: string;
    showToast: boolean;
    textToast: string;
};

export default class Contents extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoading: true,
            isError: false,
            messageError: '',
            dataUser: undefined,
            changeDesingVisible: false,
            designElection: 0,
            isLoadingAssist: true,
            dataAssist: undefined,
            textAssist: 'Cargando...',
            textNotAssist: 'Cargando...',
            textTotal: 'Cargando...',
            scaleImage: 0.3,
            loadingVisible: false,
            loadingText: '',
            showToast: false,
            textToast: ''
        };
        this.loadData = this.loadData.bind(this);
        this.loadDataAssist = this.loadDataAssist.bind(this);
        this.setScale = this.setScale.bind(this);
        this.viewImage = this.viewImage.bind(this);
        this.downloadImage = this.downloadImage.bind(this);
        this.shareImage = this.shareImage.bind(this);
    }
    private refForCard: HTMLIonCardContentElement | null = null;
    componentDidMount() {
        document.addEventListener('LoadNow', this.loadData);
        this.loadData();
    }
    setScale() {
        var scales: number[] = [];
        for (let i = 1; i > 0; i -= 0.001) { scales.push(i); }
        var scaleUse: number = 0;
        scales.forEach((val)=>(((1200 * val) < (this.refForCard?.clientWidth as number - 40)) && scaleUse == 0) && (scaleUse = val));
        this.setState({ scaleImage: scaleUse });
    }
    loadDataAssist() {
        this.setState({ isLoadingAssist: true, dataAssist: undefined, textAssist: 'Cargando...', textNotAssist: 'Cargando...', textTotal: 'Cargando...' }, ()=>
            Family.getDataAssistStudent()
                .then((data)=>{
                    let textAssist = data.filter((value)=>!!value.status).length.toString();
                    let textNotAssist = data.filter((value)=>!value.status).length.toString();
                    let textTotal = data.length.toString();
                    this.setState({ textAssist, textNotAssist, textTotal, isLoadingAssist: false });
                })
        );
    }
    loadData() {
        this.props.setLoadData(true, undefined);
        this.setState({ isLoading: true, isError: false, dataUser: undefined }, ()=>
            Family.getDataStudent()
                .then((dataUser)=>this.setState({ dataUser, isLoading: false }, ()=>{
                    setTimeout(this.setScale, 50);
                    this.loadDataAssist();
                    this.props.setLoadData(false, dataUser);
                }))
                .catch(({ cause })=>this.setState({ isLoading: false, isError: true, messageError: cause }))
        );
    }
    viewImage() {
        this.setState({ loadingVisible: true, loadingText: 'Generando...' }, ()=>
            setTimeout(()=>
                toPng(document.getElementById('card-student')!, { cacheBust: true })
                    .then((value)=>this.setState({ loadingVisible: false }, ()=>this.props.openImageViewer(value)))
                    .catch(()=>this.setState({ loadingVisible: false, showToast: true, textToast: 'Ocurrió un error al generar la imagen.' }))
            , 512)
        );
    }
    downloadImage() {
        this.setState({ loadingVisible: true, loadingText: 'Generando...' }, ()=>
            setTimeout(()=>
                toPng(document.getElementById('card-student')!, { cacheBust: true })
                    .then((value)=>this.setState({ loadingVisible: false }, ()=>download(value, `credential-student-${this.state.dataUser!.id}.png`)))
                    .catch(()=>this.setState({ loadingVisible: false, showToast: true, textToast: 'Ocurrió un error al generar la imagen.' }))
            , 512)
        );
    }
    shareImage() {
        this.setState({ loadingVisible: true, loadingText: 'Generando...' }, ()=>
            setTimeout(()=>{
                if (!('share' in navigator)) return this.setState({ loadingVisible: false, showToast: true, textToast: 'La función de compartir no está disponible.' });
                toBlob(document.getElementById('card-student')!, { cacheBust: true })
                    .then((value)=>this.setState({ loadingVisible: false }, ()=>{
                        try {
                            const files = [new File([value!], `credential-student-${this.state.dataUser!.id}.png`, { type: value!.type })];
                            if (navigator.canShare({ files })) return navigator.share({ files });
                            this.setState({ showToast: true, textToast: 'Tu navegador no es compatible con esta función.' });
                        } catch (error) {
                            console.log(error);
                            this.setState({ showToast: true, textToast: 'Ocurrió un error inesperado.' });
                        }
                    }))
                    .catch(()=>this.setState({ loadingVisible: false, showToast: true, textToast: 'Ocurrió un error al generar la imagen.' }))
            }, 512)
        );
    }
    render() {
        return(<div>
            <IonCard style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 12, paddingBottom: 12 }}>
                <h2 style={{ fontSize: 16, margin: 0 }}><b>Bienvenid@</b> {(this.state.isLoading)? 'Cargando...': (this.state.isError)? 'Error!!!': decode(this.state.dataUser!.name)}</h2>
            </IonCard>
            <IonCard style={{ overflow: 'hidden' }}>
                {(this.state.isLoadingAssist)&&<IonProgressBar type={'indeterminate'} />}
                <IonCardHeader style={{ position: 'relative' }}>
                    <IonCardTitle style={{ fontSize: 22 }}>Asistencia:</IonCardTitle>
                    <IonButton fill={'clear'} size={'small'} disabled={this.state.isLoadingAssist} onClick={this.loadDataAssist} style={{ position: 'absolute', right: 11, top: 0, bottom: 0, margin: 'auto' }}>
                        <IonIcon slot="icon-only" icon={refreshOutline} />
                    </IonButton>
                </IonCardHeader>
                <IonCardContent>
                    <div style={{ marginLeft: 11, display: 'flex', flexDirection: 'column' }}>
                        <PointItemList title={'Presentes'} text={this.state.textAssist} />
                        <PointItemList title={'Ausentes'} text={this.state.textNotAssist} />
                        <PointItemList title={'total'} text={this.state.textTotal} />
                    </div>
                </IonCardContent>
            </IonCard>
            <IonCard>
                {(this.state.isLoading)&&<IonProgressBar type={'indeterminate'} />}
                <IonCardHeader style={{ position: 'relative' }}>
                    <IonCardTitle style={{ fontSize: 22 }}>Tarjeta de ingreso:</IonCardTitle>
                    <IonButton fill={'clear'} size={'small'} style={{ position: 'absolute', right: 11, top: 0, bottom: 0, margin: 'auto' }} onClick={()=>this.setState({ changeDesingVisible: true })}>
                        <IonIcon slot={"icon-only"} icon={brushOutline} />
                    </IonButton>
                </IonCardHeader>
                <IonCardContent ref={(ref)=>this.refForCard=ref}>
                    {(this.state.dataUser)&&<CustomCredential
                        scale={this.state.scaleImage}
                        image={`${urlBase}/image/get.php?img=${decode(this.state.dataUser.picture)}`}
                        name={decode(this.state.dataUser.name)}
                        dni={decode(this.state.dataUser.dni)}
                        type={this.state.designElection}
                        onPress={this.viewImage}
                        style={{
                            overflow: 'hidden',
                            borderRadius: 8,
                            border: '2px solid #000000'
                        }}
                    />}
                    <div style={{ marginTop: 8, width: '100%', display: 'flex', justifyContent: 'end', flexDirection: 'row' }}>
                        <IonButton disabled={this.state.isLoading} fill={'clear'} onClick={this.downloadImage}>
                            <IonIcon slot={'start'} icon={downloadOutline} />
                            <IonLabel>Descargar</IonLabel>
                        </IonButton>
                        <IonButton disabled={this.state.isLoading} fill={'clear'} onClick={this.shareImage}>
                            <IonIcon slot={'start'} icon={shareSocialOutline} />
                            <IonLabel>Compartir</IonLabel>
                        </IonButton>
                    </div>
                </IonCardContent>
            </IonCard>
            <ChangeDesing
                visible={this.state.changeDesingVisible}
                close={()=>this.setState({ changeDesingVisible: false })}
                election={(el)=>this.setState({ designElection: el, changeDesingVisible: false })}
            />
            <IonLoading
                isOpen={this.state.loadingVisible}
                message={this.state.loadingText}
            />
            <IonToast
                isOpen={this.state.showToast}
                onDidDismiss={()=>this.setState({ showToast: false })}
                message={this.state.textToast}
                duration={3000}
                buttons={[{
                    text: 'OCULTAR',
                    role: 'cancel',
                    handler: ()=>this.setState({ showToast: false })
                }]}
            />
        </div>);
    }
}

type IProps2 = { title: string; text: string };
class PointItemList extends PureComponent<IProps2> {
    constructor(props: IProps2) {
        super(props);
    }
    render() {
        return(<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            <p style={{ marginLeft: 14 }}>⦿</p>
            <p style={{ marginLeft: 6, fontWeight: 'bold' }}>{`${this.props.title}:`}</p>
            <p style={{ marginLeft: 2 }}>{this.props.text}</p>
        </div>);
    }
};