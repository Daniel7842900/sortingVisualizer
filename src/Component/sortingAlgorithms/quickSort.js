export function quickSort(arr) {
    const animations = [];
    quickSortHelper(arr, 0, arr.length-1, animations);
    // console.log("this is aniamtions: " + animations);

    for(const animation in animations) {
        console.log(animation.swap);
    }
    return animations;
}

function quickSortHelper(arr, low, high, animations) {
    if(low < high) {

        // pi is partition index, which is the index for correctly positioned element after partitioning.
        const pi = partition(arr, low, high, animations);

        // sort before pi.
        quickSortHelper(arr, low, pi - 1, animations);

        // sort after pi.
        quickSortHelper(arr, pi + 1, high, animations);
    }
}

function partition(arr, low, high, animations) {

    // Set the pivot as the lastest element in the array.
    const pivot = arr[high];
    // console.log("pivot index: " + high);

    // We are using two pointer approach here.
    let i = low;
    
    // Loop through until j reaches right before the last element(pivot).
    for(let j = low; j < high; j++) {
        const animation = {};
        // console.log("j: " + j);
        // console.log("arr[i]: " + arr[i]);
        // console.log("arr[j]: " + arr[j]);
        // console.log("pivot: " + pivot);

        animation.comparison = [high, i, j];
        

        // pivot is only for comparing values. It's not swapped with any element.
        // If arr[j] is smaller than pivot, we swap arr[i] and arr[j].
        // arr[i] is one element before arr[j].
        // and increments i.
        if(arr[j] < pivot) {
            console.log("arr[j] < pivot swapping...");
            console.log("arr[i]: " + arr[i]);
            console.log("arr[j]: " + arr[j]);
            console.log("pivot: " + arr[high]);
            animation.swap = [i, arr[j], j, arr[i]];
            animations.push(animation);
            swap(arr, i, j);
            i++;
        } else {
            console.log("arr[j] >= pivot swapping...");
            console.log("arr[i]: " + arr[i]);
            console.log("arr[j]: " + arr[j]);
            console.log("pivot: " + arr[high]);
            animation.swap = [i, arr[i], j, arr[j]];
            animations.push(animation);
        }

        

    }


    // After we loop through until j reaches right before the last element,
    // we swap the pivot with arr[i].
    console.log("pivot and last i swapping: ");
    console.log("arr[high] (pivot): " + arr[high]);
    console.log("arr[i]: " + arr[i]);
    animations.push({
        comparison: [high, i, high],
        swap: [i, arr[high], high, arr[i]]
    })
    swap(arr, i, high);


    // Return the index after the partition.
    return i;

    
}

// swap function is for swaping arr[i] and arr[j].
// If we swap values like arr[i] = arr[j], it overwrites values so the whole array values
// become odd.
function swap(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}