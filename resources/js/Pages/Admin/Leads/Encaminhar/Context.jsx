import React, {createContext, useContext, useEffect, useState} from "react";

const EncaminharContext = createContext();

export const EncaminharProvider = ({children}) => {
    const [leads, setLeads] = useState([])
    const [checked, setChecked] = useState([])

    const getLeads = async () => {
        const response = await axios.get(route('admin.leads.encaminhar.get-leads'))
        setLeads(response.data.data)
        console.log(response.data.data)
    }

    useEffect(() => {
        getLeads()
    }, []);

    return (<EncaminharContext.Provider value={{leads, checked, setChecked}}>
        {children}
    </EncaminharContext.Provider>);
}

export const useEncaminharLeads = () => {
    const context = useContext(EncaminharContext);

    if (!context) {
        throw new Error('useGerenciarLeads deve ser usado dentro de um GerenciarProvider');
    }

    return context;
};
