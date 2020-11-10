import React, {Component} from "react";

import "./SortingVisualizer.css";
import * as mergeSort from "./sortingAlgorithms/mergeSort.js";

class SortingVisualizer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        }
    }
    
    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 250; i++) {
            array.push(randomInt(5, 700));
        }
        this.setState({array});
    }

    mergeSort() {
        
        const sorted = mergeSort.mergeSort(this.state.array);

        console.log(sorted);
    }

    render() {
        const {array} = this.state;

        return (
            <div class="array-container">
                {array.map((value, idx) => (
                    <div className="array-bar" key={idx} style={{height: `${value}px`}}>
                    </div>
                ))}
                <button onClick={()=>this.resetArray()}>Generate Random Array</button>
                <button onClick={()=>this.mergeSort()}>mergeSort</button>
            </div>
        )
    }
}

// Generate randome numbers between two numbers
function randomInt(min, max) {
    // min and max are included
    return Math.floor(Math.random() * (max - min + 1)+ min);
}

export default SortingVisualizer;