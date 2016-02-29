/*
  Nora Mohamed 2015
  Todo app for olin.js
*/

var data = [
  {id: 1, text: "This is one comment ;-)", checked: false},
  {id: 2, text: "This is *another* comment :-0", checked: false}
];
var count = 2; 

var TodoHolder = React.createClass({
  getInitialState: function() {
    return ({data: data});
  },
  handleTodoSubmit: function(item) {
    this.setState({data: data});
  },
  handleDelete: function(id){
    var deleted = data
      .filter(function (item) {
            return item.id !== id;
       });
    console.log(id, deleted);
    data = deleted;
    this.setState({data: deleted});
  },
  getItemNodes: function() {
    var parentThis = this;
    var pendingItemNodes = this.state.data.map(function(item) {
      if (item.checked === false) {
        return (
          <TodoItem key={item.id} id={item.id} text={item.text} 
            checked={item.checked} handleDelete={parentThis.handleDelete} />
        );
      }
    });
    var doneItemNodes = this.state.data.map(function(item) {
      if (item.checked === true) {
        return (
          <TodoItem key={item.id} id={item.id} text={item.text}
            checked={item.checked} handleDelete={parentThis.handleDelete} />
        );
      }
    });

    return({pendingItemNodes: pendingItemNodes, doneItemNodes: doneItemNodes});
  },
  render: function() {
    var nodes = this.getItemNodes();
    return (
      <div className="todoHolder">
        <TodoForm handleTodoSubmit={this.handleTodoSubmit} />
        <TodoList pendingItemNodes={nodes.pendingItemNodes} doneItemNodes={nodes.doneItemNodes}/>
      </div>
    );
  }
});


var TodoForm = React.createClass({
  getInitialState: function() {
    return {text: ''};
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var text = this.state.text.trim();
    if (!text) {
      return;
    }
    var item = {id: count+1, text:text, checked:false};
    data.push(item);
    count = count+1;
    this.props.handleTodoSubmit(item);
    this.setState({text: ''});
  },
  render: function() {
    return (
      <form className="todoForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Add new task"
          value={this.state.text}
          onChange={this.handleTextChange} />
        <input type="submit" value="+"/>
      </form>
    );
  }
});


var TodoList = React.createClass({
  render: function() {
    return (
      <div className="todoList">
        <h1>TODO:</h1>
        <div className="pendingTodoList">
          {this.props.pendingItemNodes}
        </div><br></br>
        <h1>DONE:</h1>
        <div className="doneTodoList">
          {this.props.doneItemNodes}
        </div>
      </div>
    );
  }
});


var TodoItem = React.createClass({
  getInitialState: function() {
    return {text: this.props.text, id: this.props.id};
  },
  handleEdit: function(event) {
    this.setState({text: event.target.value});
  },
  handleClick: function(event) {
    this.setState({checked: event.target.checked});
  },
  render: function() {
    return (
      <div className="todoItem">
         <input type="checkbox" checked={this.state.checked || this.props.checked} onClick={this.handleClick} />
          <div className="todoText" contentEditable="true" onChange={this.handleEdit}>
            {this.state.text}
          </div> 
          <div className="deleteButton" onClick={this.props.handleDelete.bind(this, this.state.id)}>
            <b>X</b>
          </div>
      </div>
    );
  }
});

ReactDOM.render(
  <TodoHolder data={data} />,
  document.getElementById('content')
);