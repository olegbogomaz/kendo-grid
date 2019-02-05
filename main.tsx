import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';

interface IProps {
}

interface IState {
    data: any[];
    skip: number;
    colDefs: any[];
}

export class KendoVirtualGrid extends React.Component<IProps, IState> {

    numberOfCols: number = 100;
    numberOfRows: number = 50000;
    pageSize: number = 20;

    constructor(props: IProps) {
        super(props);
        this.state = {
            data: [],
            skip: 0,
            colDefs: []
        };
    }

    componentDidMount() {
        this.getCols();
        this.getData();
    }

    getCols() {
        let colDefs = Array(this.numberOfCols).map(colIndex => {
            return <Column field={'Field-' + (colIndex + 1)} title={'Col-' + (colIndex + 1)} width="100px" key={(colIndex + 1)} />;
        });
        this.setState({
            colDefs: colDefs
        });
        return colDefs;
    }

    getData() {
        let data = Array(this.numberOfRows).fill({}).map((_, rowIndex) => {
            let row = {};
            for (let colIndex = 0; colIndex < this.numberOfCols; colIndex++) {
                row["Field-" + (colIndex + 1)] = "R" + (rowIndex + 1) + ":C" + (colIndex + 1);
            }
            return row;
        });
        this.setState({
            data: data
        });
    }

    pageChange(event) {
        this.setState({
            data: this.state.data,
            skip: event.page.skip
        });
    }

    render() {
        if (this.state.colDefs.length === 0 || this.state.data.length === 0) {
            return (<div>Loading...</div>);
        }
        return (
            <React.Fragment>
                <Grid
                    style={{ height: '600px' }}
                    rowHeight={40}
                    data={this.state.data.slice(this.state.skip, this.state.skip + this.pageSize)}
                    pageSize={this.pageSize}
                    total={this.state.data.length}
                    skip={this.state.skip}
                    scrollable={'virtual'}
                    onPageChange={this.pageChange.bind(this)}
                >
                    {...this.state.colDefs}
                </Grid>
            </React.Fragment>
        );
    };
}

ReactDOM.render(
    <KendoVirtualGrid />,
    document.querySelector('mount')
);