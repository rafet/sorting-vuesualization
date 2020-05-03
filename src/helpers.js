exports.pseudocodes = {
  quick: `<pre>
<b>algorithm</b> quicksort(A, lo, hi) <b>is</b>
<b>if</b> lo &lt; hi <b>then</b>
  p&nbsp;:= partition(A, lo, hi)
  quicksort(A, lo, p - 1)
  quicksort(A, p + 1, hi)

<b>algorithm</b> partition(A, lo, hi) <b>is</b>
  pivot&nbsp;:= A[hi]
  i&nbsp;:= lo
  <b>for</b> j&nbsp;:= lo <b>to</b> hi <b>do</b>
      <b>if</b> A[j] &lt; pivot <b>then</b>
          swap A[i] with A[j]
          i&nbsp;:= i + 1
  swap A[i] with A[hi]
  <b>return</b> i
</pre>`,
  merge: `<pre><b>function</b> merge_sort(<i>list</i> m) <b>is</b>
<b>if</b> length of m ≤ 1 <b>then</b>
    <b>return</b> m
<b>var</b> left&nbsp;:= empty list
<b>var</b> right&nbsp;:= empty list
<b>for each</b> x <b>with index</b> i <b>in</b> m <b>do</b>
    <b>if</b> i &lt; (length of m)/2 <b>then</b>
        add x to left
    <b>else</b>
        add x to right
left&nbsp;:= merge_sort(left)
right&nbsp;:= merge_sort(right)
<b>return</b> merge(left, right)
</pre>`,
  bubble: `<pre>
<b>for</b> all elements <b>of</b> list
  <b>if</b> list[i] > list[i+1]
     <b>swap</b>(list[i], list[i+1])
</pre>`,

  selection: `
  <pre>
<b>func</b> selsrtI(lst)
  max = length(lst) - 1

  <b>for</b> i from 0 to max
      key = lst[i]
      keyj = i

      <b>for</b> j from i+1 to max
          if lst[j] < key
              key = lst[j]
              keyj = j

      lst[keyj] = lst[i]
      lst[i] = key

  <b>return</b> lst</pre>`,
  insertion: `
<pre>i = 1
<b>while</b> i &lt; length(A)
    j = i
    <b>while</b> j &gt; 0 <b>and</b> A[j-1] &gt; A[j]
        <b>swap</b> A[j] and A[j-1]
        j = j - 1
    <b>end while</b>
    i = i + 1
<b>end while</b>
</pre>`,
  heap: `<pre style='line-height:1.3em'>
<b>Heapsort</b>(A <b>as</b> array)
    <b>BuildHeap</b>(A)
    <b>for</b> i = n <b>to</b> 1
        <b>swap</b>(A[1], A[i])
        n = n - 1
        <b>Heapify</b>(A, 1)

<b>BuildHeap</b>(A <b>as</b> array)
    n = <b>elements_in</b>(A)
    <b>for</b> i = <b>floor</b>(n/2) to 1
        <b><b>Heapify</b></b>(A,i,n)

<b>Heapify</b>(A <b>as</b> array, i <b>as</b> int, n <b>as</b> int)
    left = 2i
    right = 2i+1
    if (left <= n) <b>and</b> (A[left] > A[i])
        max = left
    else max = i
    if (right<=n) <b>and</b> (A[right] > A[max])
        max = right

    if (max != i)
        <b>swap</b>(A[i], A[max])
        <b>Heapify</b>(A, max)
</pre>`
};
