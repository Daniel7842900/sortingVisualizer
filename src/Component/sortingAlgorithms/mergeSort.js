
export function mergeSort(arr) {
  const animations = [];
  const sortingArr = arr.slice();
  if(arr.length <= 1) return arr;
  
  mergeHelp(arr, sortingArr, 0, arr.length - 1, animations);

  console.log(animations);
  return animations;
}

function mergeHelp(arr, sortingArr, lower, higher, animations) {
  if (lower === higher) return;
  if (lower < higher) {
    var mid = Math.floor((lower + higher) / 2);
    mergeHelp(arr, sortingArr, lower, mid, animations);
    mergeHelp(arr, sortingArr, mid + 1, higher, animations);
    merge(arr, sortingArr, lower, mid, higher, animations);
  }
}
  
function merge(arr, sortingArr, lower, mid, higher, animations) {
  console.log("lower: " + lower + " mid: " + mid + " high: " + higher);
  const animation = {};
  var l = mid-lower+1, r = higher-mid, k = lower,  i = 0, j = 0;

  while (i < l && j < r) {
    let n1 = lower+i;
    let n2 = mid+j+1;
    console.log("lower+i: " + n1, " mid+j+1: " + n2);
    animation.comparison = [lower+i, mid+j+1];
    animations.push(animation);
    console.log(animation.comparison);
    console.log("this is lower half: " + arr[n1]);
    console.log("this is upper half: " + arr[n2]);
    if (arr[lower+i] <= arr[mid+j+1]) {
      sortingArr[k] = arr[lower+i]; i++;
    } else {
      sortingArr[k] = arr[mid+j+1]; j++;
    }
    k++;
    // console.log(animations);
  }

  while (j < r) {
    animations.push({
      comparison: [mid+j+1, mid+j+1]
    })
    console.log(animation.comparison);
    sortingArr[k] = arr[mid+j+1]; k++; j++;
  }
  while (i < l) {
    animations.push({
      comparison: [lower+i, lower+i]
    })
    console.log(animation.comparison);
    sortingArr[k] = arr[lower+i]; k++; i++;
  }
  //console.log(sortingArr, k, lower);

  for (var a = lower; a < k; a++) {
    arr[a] = sortingArr[a];
  } 
}
