export function quickSort(arr) {
    const animations = [];

    quickSortHelper(arr, 0, arr.length-1, animations);

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

        // Store comparing index i and j into comparison array.
        animation.comparison = [high, i, j];

        // pivot is only for comparing values. It's not swapped with any element.
        // If arr[j] is smaller than pivot, we swap arr[i] and arr[j].
        // arr[i] is one element before arr[j].
        // and increments i.
        if(arr[j] < pivot) {

            // Store bar height of index j into index i, and bar height of index i into index j. (for animation)
            animation.swap = [i, arr[j], j, arr[i]];
            
            // Push animation object into animations array.
            animations.push(animation);

            // Swap bar height of index j with bar height of index i. (actual logic)
            swap(arr, i, j);
            i++;
        } else {

            // We don't actually swap values here. values stay where they were. (for animation)
            animation.swap = [i, arr[i], j, arr[j]];

            // Push animation object into animations array.
            animations.push(animation);
        }

        

    }


    // After we loop through until j reaches right before the last element, we swap the pivot with arr[i].
    // This deals the case we compare and swap the pivot and the last point of index i after for loop.
    animations.push({
        comparison: [high, i, high],
        swap: [i, arr[high], high, arr[i]]
    })
    swap(arr, i, high);


    // Return the index after the partition.
    return i;

    
}

// swap function is for swaping arr[i] and arr[j].
// If we swap values like arr[i] = arr[j], it overwrites values so the whole array values become odd.
function swap(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}