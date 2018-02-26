export default function getSize($ele) {

  let $clone = $ele.cloneNode(true);
  let size = {};

  $clone.style.display = 'block'
  $clone.style.visibility = 'hidden';
  $clone.style.position = 'absolute';
  $ele.parentNode.insertBefore($clone, $ele);
  size.width = $clone.offsetWidth;
  size.height = $clone.offsetHeight;
  $clone.remove();
  
  return size;
}