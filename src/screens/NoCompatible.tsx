import { Component } from "react";

export default class NoCompatible extends Component {
    constructor(props: any) {
        super(props);
    }
    render() {
        return(<div style={{ backgroundColor: '#000000', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h1 style={{ color: '#FFFFFF' }}>Tu dispositivo no es compatible</h1>
        </div>);
    }
}