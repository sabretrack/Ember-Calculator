export function initialize( application ) {
   application.inject('component', 'defaultTheme', 'service:active-theme');
   application.inject('route', 'defaultTheme', 'service:active-theme');
}

export default {
  	initialize
};
