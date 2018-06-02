import 'normalize.css';
import '../../global/global.styl';

function importAllStyles (context) {
  context.keys().forEach(key => context(key));
}
importAllStyles(require.context('../../components/', true, /^\.\/.*\.styl$/));

if (module.hot) {
    module.hot.accept();
  }