import React, {Component} from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./SortingVisualizer.css";
import * as mergeSort from "./sortingAlgorithms/mergeSort.js";
import * as quickSort from "./sortingAlgorithms/quickSort.js";
import * as heapSort from "./sortingAlgorithms/heapSort.js";
import { Nav, Navbar, Button } from "react-bootstrap";

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
        for (let i = 0; i < 280; i++) {
            array.push(randomInt(5, 450));
        }
        this.setState({array});
    }

    animateMergeSort() {
        const array = this.state.array;
        const animations = mergeSort.mergeSort(array);

        // Making newAnimations array because if we just use original animations array,
        // when we setTimeout, index will be re-set every time.
        const newAnimations = [];

        this.createNewAnimation(newAnimations, animations);

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
                }, 1 * i); 
            } else {

                // We are swaping bars here. We grab first bar and then update its height as shorter value.
                setTimeout(()=>{ 
                    const [barOneIdx, newHeight] = newAnimations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, 1 * i); 
            }
        }
    }

    animateQuickSort() {
        const array = this.state.array;
        const animations = quickSort.quickSort(array);
        const newAnimations = [];

        this.createNewAnimation(newAnimations, animations);

        for(let i = 0; i < newAnimations.length; i++) {
            const arrayBars = document.getElementsByClassName("array-bar");
            const isComparing = i % 3 !== 2;

            if(isComparing) {
                const [pivotBarIdx, barOneIdx, barTwoIdx] = newAnimations[i];
                const pivotBarStyle = arrayBars[pivotBarIdx].style;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? 'red' : 'blue';
                setTimeout(() => {
                    pivotBarStyle.backgroundColor = 'yellow';
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, 1 * i);
            } else {
                setTimeout(() => {
                    const [barOneIdx, barOneNewHeight, barTwoIdx, barTwoNewHeight] = newAnimations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.height = `${barOneNewHeight}px`;
                    barTwoStyle.height = `${barTwoNewHeight}px`;
                }, 1 * i);
            }
        }
    }

    animateHeapSort() {
        const array = this.state.array;
        const animations = heapSort.heapSort(array);
        const newAnimations = [];

        this.createNewAnimation(newAnimations, animations);

        for(let i = 0; i < newAnimations.length; i++) {
            const arrayBars = document.getElementsByClassName("array-bar");
            const isComparing = i % 3 !== 2;

            if(isComparing) {
                const [barOneIdx, barTwoIdx] = newAnimations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? 'red' : 'blue';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, 1 * i);
            } else {
                setTimeout(() => {
                    const [barOneIdx, barOneNewHeight, barTwoIdx, barTwoNewHeight] = newAnimations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.height = `${barOneNewHeight}px`;
                    barTwoStyle.height = `${barTwoNewHeight}px`;
                }, 1 * i);
            }
        }
    }

    createNewAnimation(newAnimations, animations) {

        // We are pushing comparison and swap arrays in order of showing comparison,
        // reverting comparison, and swapping value.
        for(const animation of animations) {
            newAnimations.push(animation.comparison);
            newAnimations.push(animation.comparison);
            newAnimations.push(animation.swap);
        }
        return newAnimations;
    }

    render() {
        const {array} = this.state;

        return (
            <div class="array-container">
                <Navbar bg="dark" expand="lg" fixed="top">
                    <Navbar.Brand
                        className="algo-btn"
                        id="nav-brand">
                            Sorting Visualizer
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Button 
                                className="algo-btn"
                                variant="outline-success"
                                onClick={()=>this.resetArray()}>
                                    Generate Random Array
                            </Button>
                            <Button 
                                className="algo-btn"
                                variant="outline-success"
                                onClick={()=>this.animateMergeSort()}>
                                    MergeSort
                            </Button>
                            <Button 
                                className="algo-btn"
                                variant="outline-success"
                                onClick={()=>this.animateQuickSort()}>
                                    QuickSort
                            </Button>
                            <Button 
                                className="algo-btn"
                                variant="outline-success"
                                onClick={()=>this.animateHeapSort()}>
                                    HeapSort
                            </Button>
                            
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                {array.map((value, idx) => (
                    <div className="array-bar" key={idx} style={{height: `${value}px`}}>
                    </div>
                ))}
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