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
    environment: process.env.ENVIRONMENT || 'development' // eslint-disable-line no-process-env
  };

  const log = function (level, intent) {
    const parameters = { context: this };

    if (intent.event) {
      parameters.event = intent.event;
    }

    if (intent.error instanceof Error) {
      parameters.error = { name: intent.error.name, message: intent.error.message, stack: intent.error.stack };
    }

    console.log({ ...parameters, level, message: intent.message }); // eslint-disable-line no-console
  };

  return {
    info: log.bind(context, 'INFO'),
    warn: log.bind(context, 'WARN'),
    error: log.bind(context, 'ERROR')
  };
};

/* vim: set expandtab shiftwidth=2 syntax=javascript: */
