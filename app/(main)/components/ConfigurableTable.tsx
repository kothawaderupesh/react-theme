'use client';
import React, { useState } from 'react';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface LegalEntity {
    name: string;
    code: string;
    country: string;
}

interface Location {
    name: string;
    code: string;
}

interface TableRow {
    entity: string;
    location: string;
    configs: { [key: string]: boolean };
    selectedCombination: { entity: LegalEntity; location: Location } | null;
}

const ConfigurableTable: React.FC = () => {
    const legalEntities: LegalEntity[] = [
        { name: 'Bankers Intern Corp', code: '6801', country: 'United States' },
        { name: 'Abbey Life Ass CoLtd', code: '7000', country: 'United Kingdom' },
        { name: 'BHW Bauspar AG FFM', code: '0720', country: 'Germany' },
        { name: 'BTVR Investments 1', code: '6601', country: 'Jersey' }
    ];

    const locations: Location[] = [
        { name: 'United States', code: 'US' },
        { name: 'United Kingdom', code: 'UK' },
        { name: 'Germany', code: 'DE' },
        { name: 'Jersey', code: 'JE' }
    ];

    const configOptions: string[] = [
        'Booking LE',
        'Deal Team LE',
        'Relationship LE',
        'Advisor',
        'Agent',
        'Broker',
        'Custodian',
        'Debtholder',
        'Hedge Provider',
        'Lender',
        'Trustee',
        'Ultimate P&L Owner',
        'Underwriter',
        'All/IM',
        'ACO'
    ];

    const [tableData, setTableData] = useState<TableRow[]>([]);

    // Generate cross join of legalEntities and locations
    const combinedOptions = legalEntities.flatMap((entity) =>
        locations.map((location) => ({
            entity,
            location
        }))
    );

    const addRow = () => {
        setTableData([
            ...tableData,
            {
                entity: '',
                location: '',
                configs: {},
                selectedCombination: null
            }
        ]);
    };

    const handleDropdownChange = (
        rowData: TableRow,
        selectedCombination: { entity: LegalEntity; location: Location } | null
    ) => {
        const updatedData = tableData.map((row) =>
            row === rowData ? { ...row, selectedCombination } : row
        );
        setTableData(updatedData);
    };

    const handleCheckboxChange = (rowData: TableRow, option: string, checked: boolean) => {
        const updatedData = tableData.map((row) =>
            row === rowData
                ? {
                      ...row,
                      configs: { ...row.configs, [option]: checked }
                  }
                : row
        );
        setTableData(updatedData);
    };

    const checkboxTemplate = (rowData: TableRow, { field }: { field: string }) => (
        <Checkbox
            checked={rowData.configs[field] || false}
            onChange={(e: CheckboxChangeEvent) =>
                handleCheckboxChange(rowData, field, e.checked || false)
            }
        />
    );

    return (
        <div className="p-4">
            {/* DataTable for Configurations */}
            <DataTable value={tableData} className="mt-4 p-datatable-bordered" dataKey="entity">
                {/* Column for Legal Entity and Location Dropdown with fixed width */}
                <Column
                    field="entity"
                    header="Legal Entity & Location"
                    body={(rowData) => (
                        <Dropdown
                            value={rowData.selectedCombination}
                            options={combinedOptions}
                            onChange={(e: DropdownChangeEvent) =>
                                handleDropdownChange(rowData, e.value)
                            }
                            optionLabel={(option: { entity: LegalEntity }) => option.entity.name}
                            placeholder="Select Legal Entity & Location"
                            itemTemplate={(option: { entity: LegalEntity; location: Location }) => (
                                <>
                                    {option.entity.name} - {option.location.name}
                                </>
                            )}
                            style={{ width: '250px' }} 
                        />
                    )}
                    headerStyle={{ width: '250px' }} // Fixed width for dropdown column
                    style={{ width: '250px' }} // Fixed width for dropdown column
                />

                {/* Column for Location */}
                <Column
                    field="location"
                    header="Location"
                    body={(rowData) => (
                        <span>{rowData.selectedCombination?.location.name || 'Select Location'}</span>
                    )}
                    headerStyle={{ width: '200px' }} // Fixed width for location column
                    style={{ width: '200px' }} // Fixed width for location column
                />

                {/* Columns for Configurations (Checkboxes) with fixed width */}
                {configOptions.map((option) => (
                    <Column
                        key={option}
                        header={<div className="vertical-header">{option}</div>}
                        body={(rowData) => checkboxTemplate(rowData, { field: option })}
                        headerStyle={{ width: '100px' }} // Fixed width for vertical headers
                        style={{ width: '100px' }} // Fixed width for checkboxes columns
                    />
                ))}
            </DataTable>

            {/* Add button below DataTable */}
            <Button label="Add Row" onClick={addRow} className="mt-3" />
        </div>
    );
};

export default ConfigurableTable;