import MaterialTable from 'material-table';

export default function () {

    return (
        <MaterialTable
            title="Basic Filtering Preview"
            columns={[
                { title: 'Horodateur', field: 'timestamp' },
                { title: 'Filière', field: 'filiere' },
                { title: 'Matière', field: 'matiere' },
                { title: 'Demandes', field: 'wishes' },
            ]}
            data={[
                { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
                { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
            ]}
            options={{
                selection: true
            }}
            onSelectionChange={() => alert()}
        />
    )
}