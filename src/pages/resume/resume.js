import 'normalize.css';
import '../../global/global.styl';
import './resume.styl';

const cache = {};
function importAll (r) {
  r.keys().forEach(key => cache[key] = r(key));
}  
importAll(require.context('../../components/', true, /^\.\/.*\.(jsx?)$/));

if (module.hot) {
    module.hot.accept();
  }