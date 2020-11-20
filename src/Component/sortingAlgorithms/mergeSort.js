
export function mergeSort(arr) {
  const animations = [];
  const sortingArr = arr.slice();
  if(arr.length <= 1) return arr;
  
  mergeHelp(arr, sortingArr, 0, arr.length - 1, animations);

  return animations;
}

function mergeHelp(arr, sortingArr, low, high, animations) {
  if (low === high) return;
  if (low < high) {
    var mid = Math.floor((low + high) / 2);
    mergeHelp(arr, sortingArr, low, mid, animations);
    mergeHelp(arr, sortingArr, mid + 1, high, animations);
    merge(arr, sortingArr, low, mid, high, animations);
  }
}
  
function merge(arr, sortingArr, low, mid, high, animations) {
  var l = mid-low+1, r = high-mid, k = low,  i = 0, j = 0;

  // Comparing each bars, do merge until one of group reaches to its last bar.
  // k represents starting index on each group whenever merge happens. i.e. 0, 2, 0, 4, ...
  while (i < l && j < r) {
    const animation = {};
    
    // Putting two comparing bars into animation.comparison.
    animation.comparison = [low+i, mid+j+1];

    if (arr[low+i] <= arr[mid+j+1]) {
      animation.swap = [k, arr[low+i]];
      sortingArr[k] = arr[low+i]; i++;
    } else {
      animation.swap = [k, arr[mid+j+1]];
      sortingArr[k] = arr[mid+j+1]; j++;
    }

    // Pushing animation object to animations array.
    animations.push(animation);
    k++;
  }

  // If first group reached the end, put rest of second group into the merging group.
  while (j < r) {
    animations.push({
      comparison: [mid+j+1, mid+j+1],
      swap: [k, arr[mid+j+1]]
    })
    sortingArr[k] = arr[mid+j+1]; k++; j++;
  }

  // If second group reached the end, put rest of first group into the merging group.
  while (i < l) {
    animations.push({
      comparison: [low+i, low+i],
      swap: [k, arr[low+i]]
    })
    sortingArr[k] = arr[low+i]; k++; i++;
  }

  for (var a = low; a < k; a++) {
    arr[a] = sortingArr[a];
  } 
}
