"using strict";
var random = module.exports = {};
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');


var Err = React.createClass({
    render: function() {
        return <div className="alert alert-danger" role="alert">
                    <span className="glyphicon glyphicon-exclamation-sign" 
                    aria-hidden="true"></span> <span className="sr-only">Error:</span> {this.props.children}
                    </div>;
    }
});

var Agroup = React.createClass({
    render:function(){
       var arr = this.props.outnumbers.map( function( n, i ) { 
                return <li className="list-group-item" key={n.i[0]}>{ n["rnd"] }</li>;
            });
            var groups = [];
            for ( var i = 0; i < arr.length; i++ ) {
                if ( groups.length <= parseInt(i/10) ) {
                    groups.push([]);
                }
                groups[parseInt(i/10)].push(arr[i]);
            }
            var cols = groups.map( function(g, i) { 
                return  <div key={i} className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                            <ul className="list-group">{g}</ul>
                        </div>
            });
            return <div className="row">{ cols }</div>; 
    }
});


var Random = React.createClass({
    getInitialState: function() {
        return { number: 0, outnumbers: [], errors: null };
    },
    changeNumber: function( event ){

        var number = parseInt(event.target.value);
        if ( isNaN(number))
            return;
        
        $.get(this.props.url, { number: number }, function(data){ 
            this.setState({ outnumbers: data, errors: null}); 
        }.bind(this)).fail(function(data){
            this.setState({ errors: data.responseJSON });
        }.bind(this));
        this.setState({ number: number });
    },
    render: function(){
        var msg = "Random Numbers " + this.state.number;
        var out = null;
        if ( this.state.errors ) {
            out = <Err>{this.state.errors[0]}</Err>;
        } else {
            out = <Agroup outnumbers={this.state.outnumbers} />
            
        }
        return  <div className="panel panel-default">
                    <div className="panel-heading">
                    <h1 className="panel-title">{ msg }</h1>
                    </div>
                    <div className="panel-body">
                    { out }
                    <input className="form-control" value={this.state.number} onChange={this.changeNumber}/>
                    </div>
                </div>;
    }
});

random.createRandomViewer = function(div, url) {
    ReactDOM.render(<Random url={url}/>, document.getElementById(div));
}
