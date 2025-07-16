import React, { Component } from 'react'

export default class Header extends Component {
    constructor(){
        super()
        this.state = {
            count: 1,
            text: "salom",
            data: [] 
        }
    }

    componentDidMount() {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(json => {
                this.setState({ data: json.products })
            })
            .catch(err => console.log(err))
    }
    
    render() {
        return (
            <div>
                <h2>Header {this.state.count}</h2>
                <button onClick={()=> this.setState({count: this.state.count + 1})}>increment</button>
                <button disabled={this.state.count === 1} onClick={()=> this.setState({count: this.state.count - 1})}>decrement</button>
                <button onClick={()=> this.setState({text: "hello"})}> {this.state.text}</button>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {this.state.data.map((item) => (
                        <div key={item.id} style={{ border: '1px solid gray', margin: '10px', padding: '10px', width: '200px' }}>
                            <img src={item.thumbnail} alt={item.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                            <h4>{item.title}</h4>
                            <p>Narxi: ${item.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
