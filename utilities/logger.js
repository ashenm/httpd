/**
 * httpd
 * Logger Utilities
 * https://github.com/ashenm/httpd
 *
 * Ashen Gunaratne
 * mail@ashenm.ml
 *
 */

module.exports = function logger (controller) {
  const context = {
    controller,
    environment: process.env.ENVIRONMENT // eslint-disable-line no-process-env
  };

  const log = function (level, intent) {
    /* eslint-disable-next-line no-console */
    console.log({ level, message: intent.message, context: this, event: intent.event });
  };

  return {
    info: log.bind(context, 'INFO'),
    warn: log.bind(context, 'WARN'),
    error: log.bind(context, 'ERROR')
  };
};

/* vim: set expandtab shiftwidth=2 syntax=javascript: */
