import React, {Component} from 'react';
import './TodoApp.css';
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { history } from './../App';
import axios from 'axios';
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from '@material-ui/core/IconButton';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

var data = [];


export class AddEnlace extends Component {

    constructor(props) {
        super(props);
        this.state = {regional: '', codigo1: "", codigo2: "", enlace: "" , altAntena: "", azimut: "",
                    axio : axios.create({
                        baseURL: 'http://localhost:8080/api/',
                        timeout: 10000,
                        headers: {'Authorization': 'Bearer ' + localStorage.token}
                    })};
        this.handleRegionalChange = this.handleRegionalChange.bind(this);
        this.handleCodigo1Change = this.handleCodigo1Change.bind(this);
        this.handleCodigo2Change = this.handleCodigo2Change.bind(this);
        this.handleEnlaceChange = this.handleEnlaceChange.bind(this);
        this.handleAltAntenaChange = this.handleAltAntenaChange.bind(this);
        this.handleAzimutChange = this.handleAzimutChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }


    render() {

        return (
            <Box >
                <Toolbar>
                    <IconButton onClick={() => { this.handleLogOut() }}>
                            <ExitToAppRoundedIcon/>
                    </IconButton>  
                </Toolbar>
                <form onSubmit={this.handleSubmit} className="todo-form" >
                <Card>
                    <CardContent>
                    <h3>Nuevo Enlace</h3>
                    <label htmlFor="Regional" className="right-margin">
                        Regional:
                    </label>

                    <Input
                        id="Regional"
                        onChange={this.handleRegionalChange}
                        value={this.state.regional}>
                    </Input>

                    <br/>
                    <br/>
                    <label htmlFor="Codigo1" className="right-margin">
                        Código de emplzamiento A:
                    </label>

                    <Input
                        id="Codigo1"
                        onChange={this.handleCodigo1Change}
                        value={this.state.codigo1}>
                    </Input>

                    <br/>
                    <br/>
                    <label htmlFor="Codigo2" className="right-margin">
                        Código de emplzamiento B:
                    </label>

                    <Input
                        id="Codigo2"
                        onChange={this.handleCodigo2Change}
                        value={this.state.codigo2}>
                    </Input>

                    <br/>
                    <br/>
                    <label htmlFor="Enlace" className="right-margin">
                        Enlace Similar:
                    </label>

                    <Input
                        id="Enlace"
                        onChange={this.handleEnlaceChange}
                        value={this.state.enlace}>
                    </Input>

                    <br/>
                    <br/>
                    <label htmlFor="Altura" className="right-margin">
                        Altura de la antena:
                    </label>

                    <Input
                        id="Altura"
                        onChange={this.handleAltAntenaChange}
                        value={this.state.altAntena}>
                    </Input>

                    <br/>
                    <br/>
                    <label htmlFor="Azimut" className="right-margin">
                        Azimut:
                    </label>

                    <Input
                        id="Azimut"
                        onChange={this.handleAzimutChange}
                        value={this.state.azimut}>
                    </Input>
                    <br/>
                    <Button  type='submit'>
                        Generar
                    </Button>
                    </CardContent>
                { data.length > 0 ? 
                <ExcelFile element={<Button>Download Data</Button>}>
                    <ExcelSheet data={data} name="Enlaces">
                        <ExcelColumn label="Regional" value="regional"/>
                        <ExcelColumn label="Codigo A" value="codigo1"/>
                        <ExcelColumn label="Codigo B" value="codigo2"/>
                        <ExcelColumn label="Enlace" value="enlace"/>
                        <ExcelColumn label="Altura Antena" value="altAntena"/>
                        <ExcelColumn label="Azimut" value="azimut"/>
                    </ExcelSheet>
                </ExcelFile>
                : <h4>Genere un enlace</h4> }
                </Card>
                </form>
            </Box>
        );
    }

    handleRegionalChange(e) {
        this.setState({
            regional: e.target.value
        });
    }

    handleCodigo1Change(e) {
        this.setState({
            codigo1: e.target.value
        });
    }

    handleCodigo2Change(e) {
        this.setState({
            codigo2: e.target.value
        });
    }

    handleEnlaceChange(e) {
        this.setState({
            enlace: e.target.value
        });
    }

    handleAltAntenaChange(e) {
        this.setState({
            altAntena: e.target.value
        });
    }

    handleAzimutChange(e) {
        this.setState({
            azimut: e.target.value
        });
    }

    handleClear() {
        this.setState({
            regional: '', 
            codigo1: "", 
            codigo2: "", 
            enlace: "" , 
            altAntena: "", 
            azimut: "",
        })
    }

    handleSubmit(e) {

        e.preventDefault();

        if (!this.state.regional.length || !this.state.codigo1.length || !this.state.codigo2.length || !this.state.enlace.length || !this.state.altAntena.length || !this.state.azimut.length){
            alert("Debe ingresar todos los campos");
            return;
        }

        var newData = {
            regional : this.state.regional,
            codigo1 : this.state.codigo1,
            codigo2 : this.state.codigo2,
            enlace : this.state.enlace,
            altAntena : this.state.altAntena,
            azimut : this.state.azimut                        
        }

        data.push(newData);
        //this.state.axio.post("task", { 
        //    Regional: this.state.Regional,
        //    status: this.state.status,
        //    dueDate: this.state.dueDate.format("DD-MM-YYYY"),
        //    responsible : {email : this.state.responsibleEmail, name : this.state.responsibleName}
        // })
        //        .then((response) => {
        //            let newItem = response.data.responseMessage.task;
        //            let items = JSON.parse(localStorage.items);
        //            items = items.concat(newItem);
        //            localStorage.items = JSON.stringify(items);
        //            history.push({pathname: "/todoApp"});
        //        })
        //        .catch((error) => {
        //            console.log(error);
        //            console.log("Eror al crear una nueva tarea");
        //        })

        this.handleClear();
    }

    handleLogOut(){
        localStorage.token = undefined;
        history.push({pathname: "/login"});
    }
}