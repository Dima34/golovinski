export const isLoaded = (cb) => {
  if(document.body.classList.contains('loaded')){
    if(cb) cb();
    return true;
  }
  if(cb) window.addEventListener('onLoaderLoaded', cb);
  return false;
}
