import React, {Component} from "react";

import "./SortingVisualizer.css";
import * as mergeSort from "./sortingAlgorithms/mergeSort.js";
import * as quickSort from "./sortingAlgorithms/quickSort.js";

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

        // Making newAnimations array because if we just use original animations array,
        // when we setTimeout, index will be re-set every time.
        const newAnimations = [];

        // We are pushing comparison and swap arrays in order of showing comparison,
        // reverting comparison, and swapping value.
        for(const animation of animations) {
            newAnimations.push(animation.comparison);
            newAnimations.push(animation.comparison);
            newAnimations.push(animation.swap);
        }

        for(let i = 0; i < newAnimations.length; i++) {
            const arrayBars = document.getElementsByClassName("array-bar");
            const isComparing = i % 3 !== 2;
            
            if(isComparing) {
                const [barOneIdx, barTwoIdx] = newAnimations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? 'red' : 'blue';
                setTimeout(()=>{ 
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, 10 * i); 
            } else {
                // We are swaping bars here. We grab first bar and then update its height
                // as shorter value.
                setTimeout(()=>{ 
                    const [barOneIdx, newHeight] = newAnimations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, 10 * i); 
            }
            
        }
    }

    animateQuickSort() {
        const array = this.state.array;
        const animations = quickSort.quickSort(array);
        // console.log(animations);
        const newAnimations = [];

        for(const animation of animations) {
            newAnimations.push(animation.comparison);
            newAnimations.push(animation.comparison);
            // console.log(animation.comparison);
        }

        // console.log(newAnimations);

        for(let i = 0; i < newAnimations.length; i++) {
            // console.log(newAnimations[i]);
            const arrayBars = document.getElementsByClassName("array-bar");
            // console.log(arrayBars);
            const [pivotBarIdx, barOneIdx, barTwoIdx] = newAnimations[i];
            console.log("pivot idx: " + pivotBarIdx);
            // console.log("bar one idx: " + barOneIdx);
            // console.log("bar two idx: " + barTwoIdx);

            const pivotBarStyle = arrayBars[pivotBarIdx].style;
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 2 === 0 ? 'red' : 'blue';
            setTimeout(() => {
                pivotBarStyle.backgroundColor = 'yellow';
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            }, 500 * i);
        }
        this.setState({array});
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
                <button onClick={()=>this.animateMergeSort()}>MergeSort</button>
                <button onClick={()=>this.animateQuickSort()}>QuickSort</button>
            </div>
        )
    }
}

// Generate randome numbers between two numbers.
function randomInt(min, max) {
    // min and max are included.
    return Math.floor(Math.random() * (max - min + 1)+ min);
}

export default SortingVisualizer;