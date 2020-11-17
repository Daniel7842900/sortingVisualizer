import React, {Component} from "react";

import "./SortingVisualizer.css";
import * as mergeSort from "./sortingAlgorithms/mergeSort.js";

class SortingVisualizer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            animations: [],
        }
    }
    
    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 16; i++) {
            array.push(randomInt(5, 700));
        }
        this.setState({array});
    }

    animateMergeSort() {
        const array = this.state.array;
        const animations = mergeSort.mergeSort(array);
        const newAnimations = [];

        for(const animation of animations) {
            newAnimations.push(animation.comparison);
            newAnimations.push(animation.comparison);
        }

        console.log(newAnimations);

        for(let i = 0; i < animations.length; i++) {
            const {comparison} = animations[i];
            // console.log(animations[i]);
            // console.log(comparison);
            const arrayBars = document.getElementsByClassName("array-bar");
            const [barOneIdx, barTwoIdx] = newAnimations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 2 === 0 ? 'red' : 'blue';

            setTimeout(()=>{ 
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
                // console.log(comparison[1]);
                // console.log(comparison[0]);
                // // console.log(arrayBars[comparison[1]]);
                // // console.log(arrayBars[comparison[0]]);
                // arrayBars[comparison[1]].className = "array-comparing-bar";
                // arrayBars[comparison[0]].className = "array-comparing-bar";
                // setTimeout(()=> {
                //     const comparedBars = document.getElementsByClassName("array-comparing-bars");

                // })
            }, 3000 * i);
        }

        // console.log(animations);
        
        // this.setState({array});
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
                <button onClick={()=>this.animateMergeSort()}>mergeSort</button>
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