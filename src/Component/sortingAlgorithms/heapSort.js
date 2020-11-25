export function heapSort(arr) {

    const animations = [];

    heapSortHelper(arr, animations);

    return animations;
}

function heapSortHelper(arr, animations) {

    const arrSize = arr.length;

    // Step 1. make a max-heap.
    // The reason why we start i with arrSize / 2 - 1 is because while we making a max-heap,
    // values will be swapped in a pair. In easy saying, we don't need to care about half of array.
    for(let i = Math.floor(arrSize / 2) - 1; i >= 0; i--) {
        heapify(arr, arrSize, i, animations);
    }

    // Step 2. extraction.
    // In this step we swap the root (the very top element) with our lastest element.
    // The reason is after we make a max-heap, the root element is the largest and this needs to be
    // located at the very end after sorting.
    for(let j = arrSize - 1; j > 0; j--) {

        animations.push({
            comparison: [0, j],
            swap: [0, arr[j], j, arr[0]]
        });

        const temp = arr[0];
        arr[0] = arr[j];
        arr[j] = temp;

        // After we swap the root and the very last element, the small element will go to the top
        // and max-heap structure breaks.
        // That is the reason why we need to heapify again.
        heapify(arr, j, 0, animations);
    }
}

function heapify(arr, arrSize, i, animations) {

    let largest = i;
    const left = i * 2 + 1;
    const right = i * 2 + 2;

    // Comparing left and largest elements into animations.
    if(left < arrSize) {
        animations.push({
            comparison: [left, largest],
            swap: [largest, arr[largest], largest, arr[largest]]
        });
    }

    // If left element is larger than the current root element,
    if(left < arrSize && arr[left] > arr[largest]) {
        largest = left;
    }

    // Comparing right and largest elements into animations.
    if(right < arrSize) {
        animations.push({
            comparison: [right, largest],
            swap: [largest, arr[largest], largest, arr[largest]]
        });
    }

    // If right element is larger than the current root element,
    if(right < arrSize && arr[right] > arr[largest]) {
        largest = right;
    }

    // If the current root element is not the largest element,
    // one of its child element is larger than itself so we need to swap it.
    if(largest !== i) {

        animations.push({
            comparison: [i, largest],
            swap: [i, arr[largest], largest, arr[i]]
        });

        const temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;

        // Since we swapped the elements we need to check sub-arrays (or child elements) again
        // to make sure it's proper max-heap.
        heapify(arr, arrSize, largest, animations);
    }
}