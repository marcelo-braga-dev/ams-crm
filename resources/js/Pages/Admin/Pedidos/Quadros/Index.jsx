import React, {useState} from 'react';
import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Switch from '@mui/material/Switch';

const FieldList = ({fields}) => {
    return (
        <Droppable droppableId="field-list">
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>

                        <RadioGroup defaultValue="female" name="radio-buttons-group">
                            {fields.map((field, index) => (
                                <Draggable key={field.id} draggableId={field.id.toString()} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                                width: '100%',
                                                borderRadius: '4px',
                                                border: '1px solid #ccc',
                                                padding: '10px',
                                                marginBottom: '10px',
                                                backgroundColor: snapshot.isDragging ? 'lightblue' : 'white',
                                                ...provided.draggableProps.style,
                                            }}
                                        >
                                            <div className="row justify-content-between mb-3">
                                                <div className="col">
                                                    <small className="d-block">Nome:</small>
                                                    <b>{field.nome}</b>
                                                </div>
                                                <div className="col-2">
                                                    <TextField type="color" fullWidth />
                                                </div>
                                                <div className="col-auto">
                                                    <FormControlLabel value={index} control={<Radio  size="small"/>} label="Inicial"/>
                                                </div>
                                            </div>
                                            <small className="d-block">Campos:</small>
                                            <div className="row mt-2">
                                                <div className="col-2 mb-3">
                                                    <TextField select label="Tipo" size="small" fullWidth required
                                                               >
                                                        {[{id: 1, nome: 'Texto'}, {id: 2, nome: 'Dinheiro'}, {id: 3, nome: 'Arquivo'}].map((franquia, index) => {
                                                            return (
                                                                <MenuItem key={index} value={franquia.id}>{franquia.nome}</MenuItem>
                                                            )
                                                        })}
                                                    </TextField>
                                                </div>
                                                <div className="col-4 mb-3">
                                                    <TextField label="Título" size="small" fullWidth required />
                                                </div>
                                                <div className="col-2 mb-3">
                                                    <FormControlLabel control={<Switch  />} label="Obrigatório" />
                                                </div>
                                                <div className="col-1 mb-3">
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </RadioGroup>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

const App = ({quadros, setores, setorAtual, franquias}) => {

    const [fields, setFields] = useState(quadros);

    const handleFieldMove = (result) => {
        if (!result.destination) {
            return;
        }

        const newFields = Array.from(fields);
        const [movedField] = newFields.splice(result.source.index, 1);
        newFields.splice(result.destination.index, 0, movedField);

        setFields(newFields);
    };

    return (
        <Layout titlePage="Quadros" menu="pedidos" submenu="franquias-lista">
            <div className="row row-cols-3">
                <div className="col mb-4">
                    <TextField select label="Franquia" size="small" fullWidth
                        // defaultValue={setorAtual ?? ''}
                               onChange={e => atualizarPagina(null, e.target.value)}>
                        <MenuItem value="todos">Todos</MenuItem>
                        {franquias.map((franquia, index) => {
                            return (
                                <MenuItem key={index} value={franquia.id}>{franquia.nome}</MenuItem>
                            )
                        })}
                    </TextField>
                </div>

                <div className="col mb-4">
                    <TextField select label="Setores" size="small" fullWidth
                        // defaultValue={setorAtual ?? ''}
                               onChange={e => atualizarPagina(null, e.target.value)}>
                        <MenuItem value="todos">Todos</MenuItem>
                        {setores.map((setor, index) => {
                            return (
                                <MenuItem key={index} value={setor.id}>{setor.nome}</MenuItem>
                            )
                        })}
                    </TextField>
                </div>
            </div>

            <h6>Ordem dos Status</h6>
            <div className="row">
                <div className="col">
                    <DragDropContext onDragEnd={handleFieldMove}>
                        <FieldList fields={fields}/>
                    </DragDropContext>
                </div>
            </div>
        </Layout>
    );
};

export default App;
