import 'normalize.css';
import '../../global/global.styl';

const cache = {};
function importAll (r) {
  r.keys().forEach(key => cache[key] = r(key));
}  
importAll(require.context('../../components/', true, /^\.\/.*\.jsx$/));
importAll(require.context('../../components/', true, /^\.\/.*\.styl$/));

if (module.hot) {
    module.hot.accept();
  }