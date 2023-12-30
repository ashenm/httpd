resource "heroku_drain" "default" {
  app_id        = heroku_app.production.id
  sensitive_url = var.secrets.HEROKU_DRAIN_URL
}
