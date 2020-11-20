export function quickSort(arr) {
    quickSortHelper(arr, 0, arr.length-1);
}

function quickSortHelper(arr, low, high) {
    if(low < high) {

        // pi is partition index, which is the index for correctly positioned element after partitioning.
        const pi = partition(arr, low, high);

        // sort before pi.
        quickSortHelper(arr, low, pi - 1);

        // sort after pi.
        quickSortHelper(arr, pi + 1, high);
    }
}

function partition(arr, low, high) {

    // Set the pivot as the lastest element in the array.
    const pivot = arr[high];

    // We are using two pointer approach here.
    let i = low;
    
    // Loop through until j reaches right before the last element(pivot).
    for(let j = low; j < high; j++) {

        // pivot is only for comparing values. It's not swapped with any element.
        // If arr[j] is smaller than pivot, we swap arr[i] and arr[j].
        // arr[i] is one element before arr[j].
        // and increments i.
        if(arr[j] < pivot) {
            swap(arr, i, j);
            i++;
        }
    }

    // After we loop through until j reaches right before the last element,
    // we swap the pivot with arr[i].
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