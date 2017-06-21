export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-animator-css')
	.plugin('aurelia-breeze')
  .plugin('aurelia-dialog', config => {
      config.useDefaults();
      config.settings.lock = false;
      config.settings.centerHorizontalOnly = false;
      config.settings.startingZIndex = 500;
    });


	//.plugin('aurelia-bs-modal')
	;
  aurelia.start().then(a => a.setRoot());
}
