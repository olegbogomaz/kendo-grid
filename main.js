var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "react", "react-dom", "@progress/kendo-react-grid"], function (require, exports, React, ReactDOM, kendo_react_grid_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var KendoVirtualGridFetchedData = /** @class */ (function (_super) {
        __extends(KendoVirtualGridFetchedData, _super);
        function KendoVirtualGridFetchedData(props) {
            var _this = _super.call(this, props) || this;
            _this.numberOfCols = 100;
            _this.numberOfRows = 50000;
            _this.pageSize = 20;
            _this.state = {
                data: [],
                skip: 0,
                colDefs: []
            };
            return _this;
        }
        KendoVirtualGridFetchedData.prototype.componentDidMount = function () {
            this.getCols();
            this.getData();
        };
        KendoVirtualGridFetchedData.prototype.getCols = function () {
            var colDefs = Array(this.numberOfCols).map(function (colIndex) {
                return React.createElement(kendo_react_grid_1.GridColumn, { field: 'Field-' + (colIndex + 1), title: 'Col-' + (colIndex + 1), width: "100px", key: (colIndex + 1) });
            });
            this.setState({
                colDefs: colDefs
            });
            return colDefs;
        };
        KendoVirtualGridFetchedData.prototype.getData = function () {
            var _this = this;
            var data = Array(this.numberOfRows).fill({}).map(function (_, rowIndex) {
                var row = {};
                for (var colIndex = 0; colIndex < _this.numberOfCols; colIndex++) {
                    row["Field-" + (colIndex + 1)] = "R" + (rowIndex + 1) + ":C" + (colIndex + 1);
                }
                return row;
            });
            this.setState({
                data: data
            });
        };
        KendoVirtualGridFetchedData.prototype.pageChange = function (event) {
            this.setState({
                data: this.state.data,
                skip: event.page.skip
            });
        };
        KendoVirtualGridFetchedData.prototype.render = function () {
            if (this.state.colDefs.length === 0 || this.state.data.length === 0) {
                return (React.createElement("div", null, "Loading..."));
            }
            return (React.createElement(React.Fragment, null,
                React.createElement(kendo_react_grid_1.Grid, { style: { height: '600px' }, rowHeight: 40, data: this.state.data.slice(this.state.skip, this.state.skip + this.pageSize), pageSize: this.pageSize, total: this.state.data.length, skip: this.state.skip, scrollable: 'virtual', onPageChange: this.pageChange.bind(this) }, this.state.colDefs)));
        };
        ;
        return KendoVirtualGridFetchedData;
    }(React.Component));
    exports.KendoVirtualGridFetchedData = KendoVirtualGridFetchedData;
    ReactDOM.render(React.createElement(KendoVirtualGridFetchedData, {}, ""), document.getElementById("mount"));
});
