class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: "Tom"};
    }
    render() {
        return(
            <div>
                <h1>Woah my dudes {this.state.name}.</h1>
            </div>
        );
    };
}
ReactDOM.render(
    <App />,
    document.getElementById('boi')
  );