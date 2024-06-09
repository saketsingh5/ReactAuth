
const useGlobal = ()=>{

   let arr = [5,9,8,3,7,4];

   return (arr)=>{
    if (arr.length <= 1) {
        return arr;
    }
    const pivot = arr[Math.floor(arr.length / 2)];

    // Partition the array into two sub-arrays around the pivot
    const left = [];
    const right = [];
    const equal = [];

    for (let element of arr) {
        if (element < pivot) {
            left.push(element);
        } else if (element > pivot) {
            right.push(element);
        } else {
            equal.push(element);
        }
    }

    return [...sort(left), ...equal, ...sort(right)];
   }
}

export default useGlobal