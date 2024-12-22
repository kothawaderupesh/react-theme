import React from 'react';
import ConfigurableTable from '../../components/ConfigurableTable';


const locations = [
    { name: 'New York', code: 'NY' },
    { name: 'Los Angeles', code: 'LA' },
    { name: 'Chicago', code: 'CH' },
];

const entities = [
    { name: 'Entity A', code: 'A' },
    { name: 'Entity B', code: 'B' },
    { name: 'Entity C', code: 'C' },
];

const configOptions = ['Option 1', 'Option 2', 'Option 3'];

const ConfigurableTablePage: React.FC = () => {
    return (
        <div>
            <h1>Configurable Table</h1>
            <ConfigurableTable
                
            />
        </div>
    );
};

export default ConfigurableTablePage;